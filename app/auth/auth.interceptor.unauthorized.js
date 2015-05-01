(function () {
	'use strict';

	angular.module('app.auth')
		.factory('UnauthorizedInterceptor', UnauthorizedInterceptor);

	UnauthorizedInterceptor.$inject = ['$q', '$rootScope'];

	function UnauthorizedInterceptor($q, $rootScope) {
		return {
			responseError: responseError
		};

		function responseError(rejection) {
			if (rejection.status === 401) {
				$rootScope.$emit('auth:unauthorized');
			}

			return $q.reject(rejection);
		}
	}

})();
