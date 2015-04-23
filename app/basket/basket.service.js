(function () {
	'use strict';

	angular
		.module('app.basket')
		.service('BasketService', BasketService);

	BasketService.$inject = ['BasketResource'];

	function BasketService(BasketResource)
	{
		var _basket = [];
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
				.success(_.bind(_onAddProductSuccess, product))
				.error(_.bind(_onAddProductError, product));
		}

		function getTotalPrice() {
			return _totalPrice;
		}

		function removeProduct(productToRemove) {
			var userId = 1;
			var id = productToRemove.id + "_" + userId;

			// check if we have to remove the product or update it's quantity
			var newQuantity = _getQuantityInBasket(productToRemove.id) - productToRemove.quantity;

			if (newQuantity <= 0) {
				BasketResource.removeProduct(id)
					.success(_.bind(_onRemoveProductSuccess, productToRemove))
					.error(_.bind(_onRemoveProductError, productToRemove));
			} else {
				BasketResource.setQuantity(id, newQuantity)
					.success(_.bind(_onRemoveProductSuccess, productToRemove))
					.error(_.bind(_onRemoveProductError, productToRemove));
			}
		}

		function reloadBasket() {
			var userId = 1;
			BasketResource.getBasket(userId).success(_adaptBasket);
		}

		//// Private methods

		function _onAddProductSuccess() {
			var newProduct = this;
			var quantityInBasket = _getQuantityInBasket(newProduct.id);

			// check if the product is already in the basket
			if (quantityInBasket > 0) {
				// new product is already in the list - increment its quantity
				_updateQuantityInBasket(newProduct.id, newProduct.quantity, newProduct.price);
			} else {
				// new product is not in the basket yet - add it
				_pushToBasket(newProduct, newProduct.quantity);
			}
		}

		function _onAddProductError(data, status, headers, config) {
			console.log('error');
		}

		function _onRemoveProductSuccess() {
			var removedProduct = this;

			_updateQuantityInBasket(removedProduct.id, -removedProduct.quantity, -removedProduct.price);
		}

		function _onRemoveProductError() {

		}

		/**
		 * Returns the quantity of the product in the basket
		 *
		 * @param productId
		 * @returns int
		 * @private
		 */
		function _getQuantityInBasket(productId) {
			var item = _.find(_basket, function (item) {return item.id == productId});

			if (item) {
				return item.quantity;
			}

			return 0;
		}

		function _adaptBasket(products) {
			_.each(products, function (item) {
				_pushToBasket(item.product, item.quantity);
			});
		}

		function _pushToBasket(product, quantity) {
			_basket.push({
				product: product,
				quantity: quantity,
				id: product.id
			});

			_totalPrice += product.price * (quantity / product.quantity);
		}

		function _updateQuantityInBasket(productId, quantityDelta, priceDelta) {
			var item = _.find(_basket, function (item) {return item.id == productId});

			if (item) {
				item.quantity += quantityDelta;

				_totalPrice = Math.round(100 * (_totalPrice + priceDelta)) / 100;

				if (item.quantity <= 0) {
					// removing the last entry - remove the product from the basket
					_basket = _.filter(_basket, function (item) {return item.id !== productId});
				}
			}
		}
	}
})();