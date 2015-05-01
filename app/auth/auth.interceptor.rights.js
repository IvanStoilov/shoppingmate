(function () {
	'use strict';

	angular
		.module('app.auth')
		.run(AuthRightsInterceptor);

	AuthRightsInterceptor.$inject = ['$rootScope', '$state', '$log', 'AuthService'];

	function AuthRightsInterceptor($rootScope, $state, $log, AuthService) {
		$rootScope.$on('$stateChangeStart', function (event, to, toArgs) {
			if (to.data.requireLogin && !AuthService.isLoggedIn()) {
				$log.debug('Auth Rights Interceptor: trying to access protected area without authentication :)');
				event.preventDefault();
				$state.go('guest.login');
			} else if ((to.name === 'guest.login' || to.name === 'guest.register') && AuthService.isLoggedIn()) {
				$state.go('main.categories')
			}
		});
	}
})();