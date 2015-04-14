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
			setQuantity: setQuantity,
			getBasket: getBasket
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

		function getBasket(userId) {
			var filter = {"include": ["product"]};
			var filterString = JSON.stringify(filter);

			return $http.get(Config.apiRootUrl + '/users/' + userId + '/basket?filter=' + encodeURIComponent(filterString));
		}
	}
})();