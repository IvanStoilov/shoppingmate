(function () {
	'use strict';

	angular
		.module('app')
		.config(Routes)
		.run(LoginRedirectInterceptor);

	Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

	function Routes($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'app/layout/default.html',
				abstract: true,
				data: {
					requireLogin: true
				}
			})
			.state('main.products', {
				url: 'products/:categoryId',
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
			})
			.state('main.subcategories', {
				url: 'categories/:selectedCategoryId',
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
			})
			.state('guest', {
				url: '/guest/',
				templateUrl: 'app/layout/guest.html',
				abstract: true,
				data: {
					requireLogin: false
				}
			})
			.state('guest.login', {
				url: 'login',
				templateUrl: "app/login/login.html",
				controller: 'LoginController',
				controllerAs: 'login'
			});

		$urlRouterProvider.otherwise("/categories");
	}

	LoginRedirectInterceptor.$inject = ['$rootScope', '$state', '$log'];

	function LoginRedirectInterceptor($rootScope, $state, $log) {
		$rootScope.$on('auth:login', function () {
			$log.debug('auth:login');
			$state.go('main.categories')
		});
		$rootScope.$on('auth:logout', function () {
			$log.debug('auth:logout');
			$state.go('guest.login')
		});
	}
})();
