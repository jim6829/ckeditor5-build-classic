export function upcastLink() {
	return dispatcher => {
		dispatcher.on( 'element:a', ( evt, data, conversionApi ) => {
			const viewLink = data.viewItem;
			const imageInLink = Array.from( viewLink.getChildren() )
				.find( child => child.name === 'img' || child.name === 'figure' );

			if ( imageInLink ) {
				const consumableAttributes = { attributes: [ 'href' ] };

				if ( !conversionApi.consumable.test( viewLink, consumableAttributes ) ) {
					return;
				}
				conversionApi.consumable.consume( viewLink, consumableAttributes );
			}
		}, { priority: 'high' } );
	};
}

export function upcastImageLink( elementName ) {
	return dispatcher => {
		dispatcher.on( `element:${ elementName }`, ( evt, data, conversionApi ) => {
			const viewImage = data.viewItem;
			const parent = viewImage.parent;

			if ( parent.name === 'a' ) {
				const modelImage = Array.from( data.modelRange.getItems() ).find( item => item.is( 'image' ) );
				const linkHref = parent.getAttribute( 'href' );

				if ( modelImage && linkHref ) {
					conversionApi.writer.setAttribute( 'href', linkHref, modelImage );
				}
			}
		}, { priority: 'normal' } );
	};
}
