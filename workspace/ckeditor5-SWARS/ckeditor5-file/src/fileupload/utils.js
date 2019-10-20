import extAIF from '../../theme/file-extensions/audio/aif.svg';
import extAIFF from '../../theme/file-extensions/audio/aiff.svg';
import extM4A from '../../theme/file-extensions/audio/m4a.svg';
import extMP3 from '../../theme/file-extensions/audio/mp3.svg';
import extMPA from '../../theme/file-extensions/audio/mpa.svg';
import extOGG from '../../theme/file-extensions/audio/ogg.svg';
import extWAV from '../../theme/file-extensions/audio/wav.svg';
import extWMA from '../../theme/file-extensions/audio/wma.svg';

import ext7Z from '../../theme/file-extensions/compressed-file/7z.svg';
import extGZ from '../../theme/file-extensions/compressed-file/gz.svg';
import extPKG from '../../theme/file-extensions/compressed-file/pkg.svg';
import extRAR from '../../theme/file-extensions/compressed-file/rar.svg';
import extTAR from '../../theme/file-extensions/compressed-file/tar.svg';
import extZ from '../../theme/file-extensions/compressed-file/z.svg';
import extZIP from '../../theme/file-extensions/compressed-file/zip.svg';

import extACCDB from '../../theme/file-extensions/database/accdb.svg';
import extDAT from '../../theme/file-extensions/database/dat.svg';
import extLOG from '../../theme/file-extensions/database/log.svg';
import extMDB from '../../theme/file-extensions/database/mdb.svg';
import extSQL from '../../theme/file-extensions/database/sql.svg';

import extAPK from '../../theme/file-extensions/executable-file/apk.svg';
import extBAT from '../../theme/file-extensions/executable-file/bat.svg';
import extBIN from '../../theme/file-extensions/executable-file/bin.svg';
import extDMG from '../../theme/file-extensions/executable-file/dmg.svg';
import extEXE from '../../theme/file-extensions/executable-file/exe.svg';
import extISO from '../../theme/file-extensions/executable-file/iso.svg';
import extJAR from '../../theme/file-extensions/executable-file/jar.svg';

import extOTF from '../../theme/file-extensions/font/otf.svg';
import extTTF from '../../theme/file-extensions/font/ttf.svg';

import extAI from '../../theme/file-extensions/graphic/ai.svg';
import extICO from '../../theme/file-extensions/graphic/ico.svg';
import extPSD from '../../theme/file-extensions/graphic/psd.svg';
import extSVG from '../../theme/file-extensions/graphic/svg.svg';
import extTIF from '../../theme/file-extensions/graphic/tif.svg';
import extTIFF from '../../theme/file-extensions/graphic/tiff.svg';

import extC from '../../theme/file-extensions/language/c.svg';
import extCGI from '../../theme/file-extensions/language/cgi.svg';
import extCPP from '../../theme/file-extensions/language/cpp.svg';
import extCSS from '../../theme/file-extensions/language/css.svg';
import extH from '../../theme/file-extensions/language/h.svg';
import extHTML from '../../theme/file-extensions/language/html.svg';
import extJAVA from '../../theme/file-extensions/language/java.svg';
import extJS from '../../theme/file-extensions/language/js.svg';
import extJSON from '../../theme/file-extensions/language/json.svg';
import extPHP from '../../theme/file-extensions/language/php.svg';
import extPL from '../../theme/file-extensions/language/pl.svg';
import extPY from '../../theme/file-extensions/language/py.svg';
import extRSS from '../../theme/file-extensions/language/rss.svg';
import extSH from '../../theme/file-extensions/language/sh.svg';
import extXML from '../../theme/file-extensions/language/xml.svg';

import extKEY from '../../theme/file-extensions/presentation/key.svg';
import extPPS from '../../theme/file-extensions/presentation/pps.svg';
import extPPSX from '../../theme/file-extensions/presentation/ppsx.svg';
import extPPT from '../../theme/file-extensions/presentation/ppt.svg';
import extPPTX from '../../theme/file-extensions/presentation/pptx.svg';
import extSHOW from '../../theme/file-extensions/presentation/show.svg';

import extCELL from '../../theme/file-extensions/spreadsheet/cell.svg';
import extCSV from '../../theme/file-extensions/spreadsheet/csv.svg';
import extNUMBERS from '../../theme/file-extensions/spreadsheet/numbers.svg';
import extODS from '../../theme/file-extensions/spreadsheet/ods.svg';
import extXLS from '../../theme/file-extensions/spreadsheet/xls.svg';
import extXLSX from '../../theme/file-extensions/spreadsheet/xlsx.svg';

import extAVI from '../../theme/file-extensions/video/avi.svg';
import extFLV from '../../theme/file-extensions/video/flv.svg';
import extM4V from '../../theme/file-extensions/video/m4v.svg';
import extMKV from '../../theme/file-extensions/video/mkv.svg';
import extMOV from '../../theme/file-extensions/video/mov.svg';
import extMP4 from '../../theme/file-extensions/video/mp4.svg';
import extMPEG from '../../theme/file-extensions/video/mpeg.svg';
import extMPG from '../../theme/file-extensions/video/mpg.svg';
import extWMV from '../../theme/file-extensions/video/wmv.svg';

import extDOC from '../../theme/file-extensions/word-processor/doc.svg';
import extDOCX from '../../theme/file-extensions/word-processor/docx.svg';
import extHWP from '../../theme/file-extensions/word-processor/hwp.svg';
import extODT from '../../theme/file-extensions/word-processor/odt.svg';
import extPAGES from '../../theme/file-extensions/word-processor/pages.svg';
import extPDF from '../../theme/file-extensions/word-processor/pdf.svg';
import extRTF from '../../theme/file-extensions/word-processor/rtf.svg';
import extTEX from '../../theme/file-extensions/word-processor/tex.svg';
import extTXT from '../../theme/file-extensions/word-processor/txt.svg';
import extWKS from '../../theme/file-extensions/word-processor/wks.svg';

import extETC from '../../theme/file-extensions/etc.svg';

export function getFileExtensionImage( fileName ) {
	const fileExt = getFileExtension( fileName );
	const svgImage = getSVG( fileExt );

	return 'data:image/svg+xml;utf8,' + encodeURIComponent( svgImage );
}

function getFileExtension( fileName ) {
	return fileName.substring( fileName.lastIndexOf( '.' ) + 1, fileName.length ).toLowerCase();
}

function getSVG( fileExt ) {
	switch ( fileExt ) {
		case 'aif':
			return extAIF;
		case 'aiff':
			return extAIFF;
		case 'm4a':
			return extM4A;
		case 'mp3':
			return extMP3;
		case 'mpa':
			return extMPA;
		case 'ogg':
			return extOGG;
		case 'wav':
			return extWAV;
		case 'wma':
			return extWMA;
		case '7z':
			return ext7Z;
		case 'gz':
			return extGZ;
		case 'pkg':
			return extPKG;
		case 'rar':
			return extRAR;
		case 'tar':
			return extTAR;
		case 'z':
			return extZ;
		case 'zip':
			return extZIP;
		case 'accdb':
			return extACCDB;
		case 'dat':
			return extDAT;
		case 'log':
			return extLOG;
		case 'mdb':
			return extMDB;
		case 'sql':
			return extSQL;
		case 'apk':
			return extAPK;
		case 'bat':
			return extBAT;
		case 'bin':
			return extBIN;
		case 'dmg':
			return extDMG;
		case 'exe':
			return extEXE;
		case 'iso':
			return extISO;
		case 'jar':
			return extJAR;
		case 'otf':
			return extOTF;
		case 'ttf':
			return extTTF;
		case 'ai':
			return extAI;
		case 'ico':
			return extICO;
		case 'psd':
			return extPSD;
		case 'svg':
			return extSVG;
		case 'tif':
			return extTIF;
		case 'tiff':
			return extTIFF;
		case 'c':
			return extC;
		case 'cgi':
			return extCGI;
		case 'cpp':
			return extCPP;
		case 'css':
			return extCSS;
		case 'h':
			return extH;
		case 'html':
			return extHTML;
		case 'java':
			return extJAVA;
		case 'js':
			return extJS;
		case 'json':
			return extJSON;
		case 'php':
			return extPHP;
		case 'pl':
			return extPL;
		case 'py':
			return extPY;
		case 'rss':
			return extRSS;
		case 'sh':
			return extSH;
		case 'xml':
			return extXML;
		case 'key':
			return extKEY;
		case 'pps':
			return extPPS;
		case 'ppsx':
			return extPPSX;
		case 'ppt':
			return extPPT;
		case 'pptx':
			return extPPTX;
		case 'show':
			return extSHOW;
		case 'cell':
			return extCELL;
		case 'csv':
			return extCSV;
		case 'numbers':
			return extNUMBERS;
		case 'ods':
			return extODS;
		case 'xls':
			return extXLS;
		case 'xlsx':
			return extXLSX;
		case 'avi':
			return extAVI;
		case 'flv':
			return extFLV;
		case 'm4v':
			return extM4V;
		case 'mkv':
			return extMKV;
		case 'mov':
			return extMOV;
		case 'mp4':
			return extMP4;
		case 'mpeg':
			return extMPEG;
		case 'mpg':
			return extMPG;
		case 'wmv':
			return extWMV;
		case 'doc':
			return extDOC;
		case 'docx':
			return extDOCX;
		case 'hwp':
			return extHWP;
		case 'odt':
			return extODT;
		case 'pages':
			return extPAGES;
		case 'pdf':
			return extPDF;
		case 'rtf':
			return extRTF;
		case 'tex':
			return extTEX;
		case 'txt':
			return extTXT;
		case 'wks':
			return extWKS;
		default:
			return extETC;
	}
}
