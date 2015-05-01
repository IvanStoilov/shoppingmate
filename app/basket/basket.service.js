(function () {
	'use strict';

	angular
		.module('app.basket')
		.service('BasketService', BasketService);

	BasketService.$inject = ['BasketResource', 'AuthService'];

	function BasketService(BasketResource, AuthService)
	{
		var _basket = [];
		var _totalPrice = 0;
		var _numProductsInBasket = 0;

		var service = {
			getSavedProducts: getSavedProducts,
			addProduct: addProduct,
			getTotalPrice: getTotalPrice,
			removeProduct: removeProduct,
			reloadBasket: reloadBasket,
			getNumberOfProducts: getNumberOfProducts
		};

		return service;

		function getSavedProducts() {
			return _basket;
		}

		function addProduct(product) {
			var quantityInBasket = _getQuantityInBasket(product.id);

			var basketEntry = {
				id: product.id + "_" + userId,
				product_id: product.id,
				user_id: AuthService.getUserId(),
				quantity: quantityInBasket + product.quantity
			};

			return BasketResource.addProduct(basketEntry)
				.success(_.bind(_onAddProductSuccess, product))
				.error(_.bind(_onAddProductError, product));
		}

		function getTotalPrice() {
			return _totalPrice;
		}

		function removeProduct(productToRemove) {
			var userId = AuthService.getUserId();
			var id = productToRemove.id + "_" + userId;

			// check if we have to remove the product or update it's quantity
			var newQuantity = _getQuantityInBasket(productToRemove.id) - productToRemove.quantity;

			var promise;
			if (newQuantity <= 0) {
				promise = BasketResource.removeProduct(id);
			} else {
				promise = BasketResource.setQuantity(id, newQuantity);
			}

			return promise
				.success(_.bind(_onRemoveProductSuccess, productToRemove))
				.error(_.bind(_onRemoveProductError, productToRemove));
		}

		function reloadBasket() {
			var userId = AuthService.getUserId();
			BasketResource.getBasket(userId).success(_onBasketArrived);
		}

		function getNumberOfProducts() {
			return _numProductsInBasket;
		}

		//// Private methods

		function _onAddProductSuccess() {
			return _updateQuantityInBasket(this, true);
		}

		function _onAddProductError(data, status, headers, config) {
			console.log('error');
		}

		function _onRemoveProductSuccess() {
			return _updateQuantityInBasket(this, false);
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

		function _onBasketArrived(products) {
			_basket = [];
			_totalPrice = 0;
			_numProductsInBasket = 0;

			_.each(products, function (item) {
				_pushToBasket(item.product, item.quantity);
			});
		}

		function _pushToBasket(product, quantity) {
			_totalPrice += product.price * (quantity / product.quantity);
			_numProductsInBasket += 1;
			_basket.push({
				product: product,
				quantity: quantity,
				id: product.id
			});
		}

		function _updateQuantityInBasket(updatedProduct, isAdding) {
			var item = _.find(_basket, function (item) {return item.id == updatedProduct.id});

			if (item) {
				item.quantity += updatedProduct.quantity * (isAdding ? 1 : -1);

				// alternators change every time a product is added to/removed from the basket, except the first time
				if (isAdding) {
					item.addedClassAlternator = !item.addedClassAlternator;
				} else {
					item.removedClassAlternator = !item.removedClassAlternator;
				}

				_numProductsInBasket +=

				_totalPrice = Math.round(100 * (_totalPrice + updatedProduct.price * (isAdding ? 1 : -1))) / 100;

				if (item.quantity <= 0) {
					// removing the last entry - remove the product from the basket
					_basket = _.filter(_basket, function (item) {return item.id !== updatedProduct.id});
				}
			} else {
				_pushToBasket(updatedProduct, updatedProduct.quantity);
			}

			return updatedProduct;
		}
	}
})();