(function () {
	angular
		.module('app.basket')
		.service('BasketResource', BasketResource);

	BasketResource.$inject = ['$http', 'Config'];

	function BasketResource($http, Config)
	{
		var resource = {
			addProduct: addProduct,
			removeProduct: removeProduct,
			setQuantity: setQuantity
		};

		return resource;

		function addProduct(product) {
			return $http.put(Config.apiRootUrl + '/basket', product);
		}

		function removeProduct(productId) {
			return $http.delete(Config.apiRootUrl + '/basket/' + productId);
		}

		function setQuantity(productId, quantity) {
			return $http.put(Config.apiRootUrl + '/basket/' + productId, {quantity: quantity});
		}
	}
})();