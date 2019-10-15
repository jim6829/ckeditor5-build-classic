import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import Notification from '@ckeditor/ckeditor5-ui/src/notification/notification';
import UpcastWriter from '@ckeditor/ckeditor5-engine/src/view/upcastwriter';
import env from '@ckeditor/ckeditor5-utils/src/env';

import FileUploadCommand from './fileuploadcommand';
import { fetchLocalImage, isLocalImage } from '@ckeditor/ckeditor5-image/src/imageupload/utils';

export default class FileUploadEditing extends Plugin {
	static get requires() {
		return [ FileRepository, Notification ];
	}

	init() {
		const editor = this.editor;
		const doc = editor.model.document;
		const schema = editor.model.schema;
		const conversion = editor.conversion;
		const fileRepository = editor.plugins.get( FileRepository );

		schema.extend( 'image', {
			allowAttributes: [ 'uploadId', 'uploadStatus' ]
		} );

		editor.commands.add( 'imageUpload', new FileUploadCommand( editor ) );

		conversion.for( 'upcast' )
			.attributeToAttribute( {
				view: {
					name: 'img',
					key: 'uploadId'
				},
				model: 'uploadId'
			} );

		this.listenTo( editor.editing.view.document, 'clipboardInput', ( evt, data ) => {
			if ( isHtmlIncluded( data.dataTransfer ) ) {
				return;
			}

			const files = Array.from( data.dataTransfer.files ).filter( file => {
				if ( !file ) {
					return false;
				}

				return true;
			} );

			const ranges = data.targetRanges.map( viewRange => editor.editing.mapper.toModelRange( viewRange ) );

			editor.model.change( writer => {
				writer.setSelection( ranges );

				if ( files.length ) {
					evt.stop();

					editor.model.enqueueChange( 'default', () => {
						editor.execute( 'imageUpload', { file: files } );
					} );
				}
			} );
		} );

		if ( editor.plugins.has( 'Clipboard' ) ) {
			this.listenTo( editor.plugins.get( 'Clipboard' ), 'inputTransformation', ( evt, data ) => {
				const fetchableImages = Array.from( editor.editing.view.createRangeIn( data.content ) )
					.filter( value => isLocalImage( value.item ) && !value.item.getAttribute( 'uploadProcessed' ) )
					.map( value => { return { promise: fetchLocalImage( value.item ), imageElement: value.item }; } );

				if ( !fetchableImages.length ) {
					return;
				}

				const writer = new UpcastWriter();

				for ( const fetchableImage of fetchableImages ) {
					// Set attribute marking that the image was processed already.
					writer.setAttribute( 'uploadProcessed', true, fetchableImage.imageElement );

					const loader = fileRepository.createLoader( fetchableImage.promise );

					if ( loader ) {
						writer.setAttribute( 'src', '', fetchableImage.imageElement );
						writer.setAttribute( 'uploadId', loader.id, fetchableImage.imageElement );
					}
				}
			} );
		}

		editor.editing.view.document.on( 'dragover', ( evt, data ) => {
			data.preventDefault();
		} );

		doc.on( 'change', () => {
			const changes = doc.differ.getChanges( { includeChangesInGraveyard: true } );

			for ( const entry of changes ) {
				if ( entry.type == 'insert' && entry.name != '$text' ) {
					const item = entry.position.nodeAfter;
					const isInGraveyard = entry.position.root.rootName == '$graveyard';

					for ( const image of getImagesFromChangeItem( editor, item ) ) {
						const uploadId = image.getAttribute( 'uploadId' );

						if ( !uploadId ) {
							continue;
						}

						const loader = fileRepository.loaders.get( uploadId );

						if ( !loader ) {
							continue;
						}

						if ( isInGraveyard ) {
							loader.abort();
						} else if ( loader.status == 'idle' ) {
							this._readAndUpload( loader, image );
						}
					}
				}
			}
		} );
	}

	_readAndUpload( loader, imageElement ) {
		const editor = this.editor;
		const model = editor.model;
		const t = editor.locale.t;
		const fileRepository = editor.plugins.get( FileRepository );
		const notification = editor.plugins.get( Notification );

		model.enqueueChange( 'transparent', writer => {
			writer.setAttribute( 'uploadStatus', 'reading', imageElement );
		} );

		return loader.read()
			.then( () => {
				const promise = loader.upload();

				// Force re–paint in Safari. Without it, the image will display with a wrong size.
				// https://github.com/ckeditor/ckeditor5/issues/1975
				/* istanbul ignore next */
				if ( env.isSafari ) {
					const viewFigure = editor.editing.mapper.toViewElement( imageElement );
					const viewImg = viewFigure.getChild( 0 );

					editor.editing.view.once( 'render', () => {
						// Early returns just to be safe. There might be some code ran
						// in between the outer scope and this callback.
						if ( !viewImg.parent ) {
							return;
						}

						const domFigure = editor.editing.view.domConverter.mapViewToDom( viewImg.parent );

						if ( !domFigure ) {
							return;
						}

						const originalDisplay = domFigure.style.display;

						domFigure.style.display = 'none';

						// Make sure this line will never be removed during minification for having "no effect".
						domFigure._ckHack = domFigure.offsetHeight;

						domFigure.style.display = originalDisplay;
					} );
				}

				model.enqueueChange( 'transparent', writer => {
					writer.setAttribute( 'uploadStatus', 'uploading', imageElement );
				} );

				return promise;
			} )
			.then( data => {
				model.enqueueChange( 'transparent', writer => {
					// TODO: href correction
					writer.setAttributes( { uploadStatus: 'complete', /*src: data.default,*/ href: 'https://naver.com' }, imageElement );
					this._parseAndSetSrcsetAttributeOnImage( data, imageElement, writer );
				} );

				clean();
			} )
			.catch( error => {
				if ( loader.status !== 'error' && loader.status !== 'aborted' ) {
					throw error;
				}

				if ( loader.status == 'error' && error ) {
					notification.showWarning( error, {
						title: t( 'Upload failed' ),
						namespace: 'upload'
					} );
				}

				clean();

				model.enqueueChange( 'transparent', writer => {
					writer.remove( imageElement );
				} );
			} );

		function clean() {
			model.enqueueChange( 'transparent', writer => {
				writer.removeAttribute( 'uploadId', imageElement );
				writer.removeAttribute( 'uploadStatus', imageElement );
			} );

			fileRepository.destroyLoader( loader );
		}
	}

	_parseAndSetSrcsetAttributeOnImage( data, image, writer ) {
		// Srcset attribute for responsive images support.
		let maxWidth = 0;

		const srcsetAttribute = Object.keys( data )
		// Filter out keys that are not integers.
			.filter( key => {
				const width = parseInt( key, 10 );

				if ( !isNaN( width ) ) {
					maxWidth = Math.max( maxWidth, width );

					return true;
				}
			} )

			// Convert each key to srcset entry.
			.map( key => `${ data[ key ] } ${ key }w` )

			// Join all entries.
			.join( ', ' );

		if ( srcsetAttribute != '' ) {
			writer.setAttribute( 'srcset', {
				data: srcsetAttribute,
				width: maxWidth
			}, image );
		}
	}
}

export function isHtmlIncluded( dataTransfer ) {
	return Array.from( dataTransfer.types ).includes( 'text/html' ) && dataTransfer.getData( 'text/html' ) !== '';
}

function getImagesFromChangeItem( editor, item ) {
	return Array.from( editor.model.createRangeOn( item ) )
		.filter( value => value.item.is( 'image' ) )
		.map( value => value.item );
}
