(function () {
	'use strict';

	angular
		.module('app.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['AuthService'];

	function LoginController(AuthService) {
		var vm = this;
		vm.login = login;
		vm.logout = logout;

		activate();

		function activate() {
		}

		function login(credentials) {
			AuthService.login(credentials);
		}

		function logout() {
			AuthService.logout();
		}
	};
})();