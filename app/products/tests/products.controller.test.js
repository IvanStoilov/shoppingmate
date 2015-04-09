describe('ProductsController', function(){

	var scope;
	var ctrl;
	var ProductsService;

	beforeEach(module('app.products'));

	beforeEach(inject(function ($rootScope, $controller, _ProductsService_) {
		ProductsService = _ProductsService_;
		sinon.stub(ProductsService, "getByCategoryId", function () {});

		scope = $rootScope.$new();

		ctrl = $controller('ProductsController', {
			"$scope": scope,
			"ProductsService": ProductsService,
			"$routeParams": {categoryId: 2}
		});
	}));

	it('should fetch all products', function () {
		expect(ProductsService.getByCategoryId.callCount).to.equal(1);
		expect(ProductsService.getByCategoryId.calledWith(2)).to.be.true;
	});

	it('should assign products scope param', function () {
		expect(ctrl).to.include.keys('products');
	});
})