(function () {
	'use strict';

	angular
		.module('app.auth')
		.config(['$httpProvider', function ($httpProvider) {
			$httpProvider.interceptors.push('UnauthorizedInterceptor');
		}]);
})();