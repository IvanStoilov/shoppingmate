(function () {
	angular
		.module('app.basket')
		.service('BasketService', BasketService);

	function BasketService()
	{
		var _products = [
		];

		var service = {
			getSavedProducts: getSavedProducts,
			addToBasket: addToBasket
		};

		return service;

		function getSavedProducts() {
			return _products;
		}

		function addToBasket(newProduct)
		{
			var existingIndex = _.findIndex(_products, function (product) {
				return product.id === newProduct.id;
			});

			if (existingIndex !== -1) {
				// new product is already in the list - increment its quantity
				_products[existingIndex].quantity += newProduct.quantity;
			} else {
				// new product is not in the basket yet - add it
				_products.push(_.clone(newProduct));
			}
		}
	}
})();