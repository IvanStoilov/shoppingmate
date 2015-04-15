(function () {
	'use strict';

	/**
	 * Test configs
	 */
	angular
		.module('app.config')
		.constant('Config', {
			apiRootUrl: 'http://127.0.0.1:3000/api'
		});
})();
