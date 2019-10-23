import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageEditUI from './imageedit/imageeditui';
import ImageEditEditing from './imageedit/imageeditediting';

export default class ImageEdit extends Plugin {
	static get pluginName() {
		return 'ImageEdit';
	}

	static get requires() {
		return [
			ImageEditEditing,
			ImageEditUI
		];
	}
}
