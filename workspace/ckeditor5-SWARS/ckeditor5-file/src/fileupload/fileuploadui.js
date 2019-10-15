import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview';
import fileIcon from '../../theme/icons/browse-files.svg';

export default class FileUploadUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( 'fileUpload', locale => {
			const view = new FileDialogButtonView( locale );
			const fileCommand = editor.commands.get( 'imageUpload' );

			view.set( {
				allowMultipleFiles: true
			} );

			view.buttonView.set( {
				label: t( 'Insert file' ),
				icon: fileIcon,
				tooltip: true
			} );

			view.buttonView.bind( 'isEnabled' ).to( fileCommand );

			view.on( 'done', ( evt, files ) => {
				const filesToUpload = Array.from( files );

				if ( filesToUpload.length ) {
					editor.execute( 'imageUpload', { file: filesToUpload } );
				}
			} );

			return view;
		} );
	}
}
