(function () {
	'use strict';

	angular
		.module('app.main-menu')
		.controller('MainMenuController', MainMenuController);

	MainMenuController.$inject = ['$route'];

	function MainMenuController($route) {
		var vm = this;
		vm.items = {
			"choose-products": 1,
			"basket": 1
		};
		activate();

		function activate()
		{
			// reload because the ui-view is included with ng-include
			$route.reload();
		}
	}
})();