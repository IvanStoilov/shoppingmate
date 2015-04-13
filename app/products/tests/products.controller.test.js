describe('ProductsController', function(){

	var scope;
	var ctrl;
	var ProductsService;
	var BasketService;

	beforeEach(module('app.products'));

	beforeEach(inject(function ($rootScope, $controller, _ProductsService_, _BasketService_) {
		ProductsService = _ProductsService_;
		BasketService = _BasketService_;

		sinon.stub(ProductsService, "getByCategoryId", function () {});
		sinon.stub(BasketService, "addToBasket", function () {});

		scope = $rootScope.$new();

		ctrl = $controller('ProductsController', {
			"$scope": scope,
			"ProductsService": ProductsService,
			"$stateParams": {categoryId: 2}
		});
	}));

	it('should fetch all products', function () {
		expect(ProductsService.getByCategoryId.callCount).to.equal(1);
		expect(ProductsService.getByCategoryId.calledWith(2)).to.be.true;
	});

	it('should assign products scope param', function () {
		expect(ctrl).to.include.keys('products');
	});

	it('should add a product to basket', function () {
		var product = {id: 1, name: "test"};
		ctrl.addToBasket(product);
		expect(BasketService.addToBasket.callCount).to.equal(1);
		expect(BasketService.addToBasket.calledWith(product)).to.be.true;
	});
})