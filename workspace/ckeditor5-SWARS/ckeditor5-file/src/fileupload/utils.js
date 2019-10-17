import extCDA from '../../theme/file-extensions/cda.png';
import extETC from '../../theme/file-extensions/etc.png';

export function getFileExtensionImage( fileName ) {
	const fileExt = getFileExtension( fileName );

	if ( fileExt === 'pdf' ) {
		return extCDA;
	} else {
		return extETC;
	}
}

function getFileExtension( fileName ) {
	return fileName.substring( fileName.lastIndexOf( '.' ) + 1, fileName.length ).toLowerCase();
}
