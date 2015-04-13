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

	it('should fetch all categories', function () {
		expect(CategoriesService.getAll.callCount).to.equal(1);
	});

	it('should assign products scope param', function () {
		expect(ctrl).to.include.keys('categories');
	});
})