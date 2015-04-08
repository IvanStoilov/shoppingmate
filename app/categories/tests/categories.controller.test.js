describe('CategoriesController', function(){

	var scope;
	var ctrl;

	beforeEach(module('app.categories'));

	beforeEach(inject(function ($rootScope, $controller, _CategoriesService_) {
		CategoriesService = _CategoriesService_;
		sinon.stub(CategoriesService, "getAll", function () {});

		scope = $rootScope.$new();

		ctrl = $controller('CategoriesController', {$scope: scope, "CategoriesService": CategoriesService});
	}));
})