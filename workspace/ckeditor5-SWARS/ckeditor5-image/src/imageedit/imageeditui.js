import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview';
import imageIcon from '../../theme/icons/image.svg';
import { isImageType } from '@ckeditor/ckeditor5-image/src/imageupload/utils';

export default class ImageEditUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( 'imageEdit', locale => {
			const view = new FileDialogButtonView( locale );
			const command = editor.commands.get( 'imageEdit' );

			view.set( {
				acceptedType: 'image/*',
				allowMultipleFiles: false
			} );

			view.buttonView.set( {
				label: t( 'Insert and edit image' ),
				icon: imageIcon,
				tooltip: true
			} );

			view.buttonView.bind( 'isEnabled' ).to( command );

			view.on( 'done', ( evt, files ) => {
				const imagesToUpload = Array.from( files ).filter( isImageType );

				if ( imagesToUpload.length ) {
					editor.execute( 'imageEdit', { file: imagesToUpload } );
				}
			} );

			return view;
		} );
	}
}
