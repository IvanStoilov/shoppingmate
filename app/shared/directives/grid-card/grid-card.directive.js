(function () {
	angular
		.module('app.shared')
		.directive('smGridCard', SmGridCardDirective);

	SmGridCardDirective.$inject = [];

	function SmGridCardDirective() {
		return {
			restrict: 'E',
			templateUrl: "app/shared/directives/grid-card/grid-card.directive.html",
			scope: {
				image: '=',
				title: '=',
				price: '=',
				buttonText: '=',
				buttonLink: '=',
				imageLink: '='
			},
			require: 'smPrice',
			controller: GridCardDirectiveController,
			controllerAs: 'card',
			bindToController: true
		};
	}

	GridCardDirectiveController.$inject = [];

	function GridCardDirectiveController()
	{
	}
})();