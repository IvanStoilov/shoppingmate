(function () {
	angular
		.module('app.shared')
		.directive('smPrice', SmPriceDirective);

	SmPriceDirective.$inject = [];

	function SmPriceDirective() {
		return {
			restrict: 'EA',
			templateUrl: "app/shared/directives/price/price.directive.html",
			scope: {
				price: '='
			},
			controller: PriceDirectiveController,
			controllerAs: 'price',
			bindToController: true
		};
	}

	PriceDirectiveController.$inject = [];

	function PriceDirectiveController()
	{
		var _defaultSign = '€';
		var _cent = this.price - Math.ceil(this.price);
		var vm = this;

		vm.signFront = _defaultSign;
		vm.signBack = '';
		vm.whole = Math.ceil(this.price);
		vm.cent = (_cent < 10 ? '0' + _cent : _cent);
	}
})();