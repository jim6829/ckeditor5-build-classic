import Position from '@ckeditor/ckeditor5-engine/src/view/position';
import Range from '@ckeditor/ckeditor5-engine/src/view/range';

export function downcastImageLink() {
	return dispatcher => {
		dispatcher.on( 'attribute:href:image', ( evt, data, conversionApi ) => {
			const href = data.attributeNewValue;
			const viewImage = conversionApi.mapper.toViewElement( data.item );
			const linkElement = conversionApi.writer.createContainerElement( 'a', { href } );

			conversionApi.writer.insert( Position._createBefore( viewImage ), linkElement );
			conversionApi.writer.move( Range._createOn( viewImage ), new Position( linkElement, 0 ) );
		}, { priority: 'normal' } );
	};
}
