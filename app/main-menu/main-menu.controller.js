(function () {
	'use strict';

	angular
		.module('app.main-menu')
		.controller('MainMenuController', MainMenuController);

	MainMenuController.$inject = ['AuthService'];

	function MainMenuController(AuthService) {
		var vm = this;
		vm.logout = AuthService.logout;
		vm.items = {
			"choose-products": 1,
			"basket": 1
		};
		activate();

		function activate()
		{
			vm.user = {
				name: AuthService.getUser().id
			}
		}
	}
})();