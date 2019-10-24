import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import Command from '@ckeditor/ckeditor5-core/src/command';
import { insertImage, isImageAllowed } from '@ckeditor/ckeditor5-image/src/image/utils';

export default class ImageEditCommand extends Command {
	refresh() {
		this.isEnabled = isImageAllowed( this.editor.model );
	}

	execute( options ) {
		const editor = this.editor;
		const model = editor.model;

		const fileRepository = editor.plugins.get( FileRepository );

		const filesToUpload = Array.isArray( options.file ) ? options.file : [ options.file ];
		for ( const file of filesToUpload ) {
			uploadImage( model, fileRepository, file );
		}
	}
}

function uploadImage( model, fileRepository, file ) {
	const loader = fileRepository.createLoader( file );

	if ( !loader ) {
		return;
	}

	loader._adapter.exchangeImage().then( newFile => {
		fileRepository.destroyLoader( loader );
		if ( newFile === null ) {
			return;
		}
		const newLoader = fileRepository.createLoader( newFile );
		model.change( writer => {
			insertImage( writer, model, { uploadId: newLoader.id } );
		} );
	} );
}
