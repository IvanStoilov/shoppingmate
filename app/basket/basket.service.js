(function () {
	angular
		.module('app.basket')
		.service('BasketService', BasketService);

	function BasketService()
	{
		var _products = [
		];
		var _totalPrice = 0;

		var service = {
			getSavedProducts: getSavedProducts,
			addToBasket: addToBasket,
			getTotalPrice: getTotalPrice
		};

		return service;

		function getSavedProducts() {
			return _products;
		}

		function addToBasket(newProduct) {
			// check if the product is already in the basket
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

			_totalPrice += newProduct.price;
		}

		function getTotalPrice() {
			return _totalPrice;
		}
	}
})();