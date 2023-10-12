;( function() {
	var ua = navigator.userAgent.toLowerCase();
	if( ua.indexOf( 'msie' ) != -1 || ua.indexOf( 'trident' ) != -1 ) {
		var version = 11;
		ua = /msie ([0-9]{1,}[\.0-9]{0,})/.exec( ua );
		if( ua )
		{
			version = parseInt( ua[ 1 ] );
		}
		var classNames = '';
		classNames += ' is-ie';
		classNames += ' ie' + version;
		for( var i = version + 1; i <= 11; i++ ) {
			classNames +=  ' lt-ie' + i;
		}
		document.getElementsByTagName( 'html' )[ 0 ].className += classNames;
	}
} )();