(function () {
	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'app/layout/default.html',
				abstract: true
			})
			.state('main.products', {
				url: 'category/:categoryId',
				views: {
					content: {
						templateUrl: 'app/products/products.html',
						controller: 'ProductsController',
						controllerAs: 'products'
					},
					sidebar: {
						templateUrl: "app/basket/basket.html",
						controller: 'BasketController',
						controllerAs: 'basket'
					}
				}
			})
			.state('main.categories', {
				url: 'categories',
				views: {
					content: {
						templateUrl: "app/categories/categories.html",
						controller: 'CategoriesController',
						controllerAs: 'categories'
					},
					sidebar: {
						templateUrl: "app/basket/basket.html",
						controller: 'BasketController',
						controllerAs: 'basket'
					}
				}
			});

		$urlRouterProvider.otherwise("/categories");
	}


})();

