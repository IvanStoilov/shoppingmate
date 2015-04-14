(function () {
	angular
		.module('app.basket')
		.service('BasketService', BasketService);

	BasketService.$inject = ['BasketResource'];

	function BasketService(BasketResource)
	{
		var _basket = {};
		var _totalPrice = 0;

		var service = {
			getSavedProducts: getSavedProducts,
			addProduct: addProduct,
			getTotalPrice: getTotalPrice,
			removeProduct: removeProduct,
			reloadBasket: reloadBasket
		};

		return service;

		function getSavedProducts() {
			return _basket;
		}

		function addProduct(product) {
			var quantityInBasket = _getQuantityInBasket(product.id);

			var userId = 1;
			var basketEntry = {
				id: product.id + "_" + userId,
				product_id: product.id,
				user_id: userId,
				quantity: quantityInBasket + product.quantity
			};

			BasketResource.addProduct(basketEntry)
				.success(_.bind(onAddProductSuccess, product))
				.error(_.bind(onAddProductError, product));
		}

		function onAddProductSuccess(newProduct, status, headers, config) {
			var newProduct = this;

			// check if the product is already in the basket
			if (_basket[newProduct.id]) {
				// new product is already in the list - increment its quantity
				_basket[newProduct.id].quantity += newProduct.quantity;
			} else {
				// new product is not in the basket yet - add it
				_basket[newProduct.id] = {product: newProduct, quantity: 1};
			}

			_totalPrice += newProduct.price;
		}

		function onAddProductError(data, status, headers, config) {
			console.log('error');
		}

		function getTotalPrice() {
			return _totalPrice;
		}

		function removeProduct(productToRemove) {
			var userId = 1;
			var id = productToRemove.id + "_" + userId;

			// check if we have to remove the product or update it's quantity
			var newQuantity = _basket[productToRemove.id].quantity - productToRemove.quantity;

			if (newQuantity <= 0) {
				BasketResource.removeProduct(id)
					.success(_.bind(onRemoveProductSuccess, productToRemove))
					.error(_.bind(onRemoveProductError, productToRemove));
			} else {
				BasketResource.setQuantity(id, newQuantity)
					.success(_.bind(onRemoveProductSuccess, productToRemove))
					.error(_.bind(onRemoveProductError, productToRemove));
			}
		}

		function onRemoveProductSuccess() {
			var removedProduct = this;

			_basket[removedProduct.id].quantity -= removedProduct.quantity;

			if (_basket[removedProduct.id].quantity <= 0) {
				// if removing the last entry - remove the product from the basket
				delete _basket[removedProduct.id];
			}

			_totalPrice -= removedProduct.price;
		}

		function onRemoveProductError() {

		}

		function reloadBasket() {
			var userId = 1;
			BasketResource.getBasket(userId).success(_adaptBasket);
		}

		function _getQuantityInBasket(productId) {
			if (_basket[productId]) {
				return _basket[productId].quantity;
			}

			return 0;
		}

		function _adaptBasket(products) {
			_.each (products, function (item) {
				_basket[item.product_id] = {
					product: item.product,
					quantity: item.quantity
				};
			});
		}

	}
})();