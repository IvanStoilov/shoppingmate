describe('ProductsController', function(){

	var scope;
	var ctrl;
	var ProductsService;

	beforeEach(module('app.products'));

	beforeEach(inject(function ($rootScope, $controller, _ProductsService_) {
		ProductsService = _ProductsService_;
		sinon.stub(ProductsService, "getAll", function () {});

		scope = $rootScope.$new();

		ctrl = $controller('ProductsController', {$scope: scope, "ProductsService": ProductsService});
	}));

	it('should fetch all products', function () {
		expect(ProductsService.getAll.callCount).to.equal(1);
	});

	it('should assign products scope param', function () {
		expect(ctrl).to.include.keys('products');
	});
})