import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { upcastLink, upcastImageLink } from './converters/upcast';
import { downcastImageLink } from './converters/downcast';

export default class ImageLink extends Plugin {
	static get pluginName() {
		return 'ImageLink';
	}

	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const conversion = editor.conversion;

		schema.extend( 'image', {
			allowAttributes: [ 'href' ]
		} );

		conversion.for( 'upcast' ).add( upcastLink() );
		conversion.for( 'upcast' ).add( upcastImageLink( 'img' ) );
		conversion.for( 'upcast' ).add( upcastImageLink( 'figure' ) );
		conversion.for( 'downcast' ).add( downcastImageLink() );
	}
}
