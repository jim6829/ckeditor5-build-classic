import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import Notification from '@ckeditor/ckeditor5-ui/src/notification/notification';

import ImageEditCommand from './imageeditcommand';

export default class ImageEditEditing extends Plugin {
	static get requires() {
		return [ FileRepository, Notification ];
	}

	init() {
		const editor = this.editor;

		editor.commands.add( 'imageEdit', new ImageEditCommand( editor ) );
	}
}
