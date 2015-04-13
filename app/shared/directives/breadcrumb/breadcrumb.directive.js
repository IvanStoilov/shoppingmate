(function () {
	'use strict';

	angular
		.module('app.shared')
		.directive('smBreadcrumb', SmBreadcrumbDirective);

	SmBreadcrumbDirective.$inject = [];

	function SmBreadcrumbDirective() {
		return {
			restrict: 'E',
			templateUrl: "app/shared/directives/breadcrumb/breadcrumb.html",
			scope: {
				items: '='
			},
			controller: SmBreadcrumbController,
			controllerAs: 'breadcrumb',
			bindToController: true
		};
	}

	function SmBreadcrumbController() {
		}
})();