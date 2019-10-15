import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileUploadUI from './fileupload/fileuploadui';
import FileUploadEditing from './fileupload/fileuploadediting';
import FileUploadProgress from './fileupload/fileuploadprogress';
import ImageLink from '../../ckeditor5-image/src/imagelink';

export default class FileUpload extends Plugin {
	static get pluginName() {
		return 'FileUpload';
	}

	static get requires() {
		return [
			FileUploadEditing,
			ImageLink,
			FileUploadUI,
			FileUploadProgress
		];
	}
}
