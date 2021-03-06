/**
 * Set up application and load modules.
 */
var fastclick = require('fastclick')

/*jshint asi: true*/
'use strict';

window.app = angular.module('griot', ['ngRoute', 'segmentio']);

app.run(function() { fastclick(document.body) })

require('./routes')

require('./services/hintManager')

require('./config')

app.config(
  ['$httpProvider', function($httpProvider) {
    return delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]
)

app.run(['$rootScope', 'envConfig', 'miaMediaMetaAdapter', 'miaObjectMetaAdapter', 'miaThumbnailAdapter', '$location', 'hintManager', function( root, config, mediaMeta, objectMeta, objectThumb, $location, hintManager ) {
	root.cdn = config.cdn;
	var query = $location.search();

	// If adapters are enabled, retrieve and prepare alternate data
	if( config.miaMediaMetaActive ) {
		mediaMeta.build( config.miaMediaMetaSrc );
	}
	if( config.miaThumbnailActive ) {
		objectThumb.init( config.miaThumbnailSrc );
	}

	// hintManager.init();
	// Temporarily disable 'pinch to zoom' hints.

}])

require('./factories')
require('./adapters')

require('./controllers/object')
require('./controllers/story')
require('./controllers/notes')
require('./controllers/main')
require('./controllers/goldweights')

require('./directives/flatmap')
require('./directives/note')
require('./directives/vcenter')
require('./directives/ngPoster')
require('./directives/transparentize')
require('./directives/drawerify')
require('./directives/recalculateDrawerStates')
require('./directives/share')
require('./directives/videoHandler')
require('./directives/hint')
