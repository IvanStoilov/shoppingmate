(function () {
	'use strict';

	angular
		.module('app.main-menu')
		.controller('MainMenuController', MainMenuController);

	MainMenuController.$inject = [];

	function MainMenuController() {
		var vm = this;
		vm.items = {
			"choose-products": 1,
			"basket": 1
		};
		activate();

		function activate()
		{
		}
	}
})();