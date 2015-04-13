(function () {
	'use strict';

	angular
		.module('app.shared')
		.directive('smPrice', SmPriceDirective);

	SmPriceDirective.$inject = [];

	function SmPriceDirective() {
		return {
			restrict: 'EA',
			templateUrl: "app/shared/directives/price/price.directive.html",
			scope: {
				price: '@'
			},
			link: link
		};
	}

	function link($scope, element, attributes) {
		$scope.$watch('price', _calculateParts);

		function _calculateParts(price) {
			var _defaultSign = '€';
			var _whole = Math.floor(price);
			var _cent = Math.round((price - _whole) * 100);

			$scope.parts = {
				signFront: _defaultSign,
				signBack: '',
				whole: _whole,
				cent: (_cent < 10 ? '0' + _cent : _cent)
			};
		}
	}
})();