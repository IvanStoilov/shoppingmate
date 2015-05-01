describe('BasketController', function(){

	var productsFixture;
	var basketFixture;

	var scope;
	var $rootScope;
	var ctrl;
	var BasketService;


	beforeEach(module('test.utils'));
	beforeEach(module('app.basket'));

	beforeEach(inject(function (_$rootScope_, $controller, TestUtils, Fixtures, _BasketService_) {
		productsFixture = Fixtures.products;
		basketFixture = Fixtures.basket;

		BasketService = _BasketService_;
		$rootScope = _$rootScope_;

		sinon.stub(BasketService, "addProduct", function () {
			return new TestUtils.SuccessHttpResponder();
		});
		sinon.stub(BasketService, "removeProduct", function () {
			return new TestUtils.SuccessHttpResponder();
		});

		sinon.stub(BasketService, "reloadBasket", function () {
			return new TestUtils.SuccessHttpResponder();
		});
		sinon.stub(BasketService, "getTotalPrice", function () {
			return 73;
		});
		sinon.stub(BasketService, "getSavedProducts", function () {
			return basketFixture;
		});
		sinon.stub(BasketService, "getNumberOfProducts", function () {
			return 5;
		});

		scope = $rootScope.$new();

		ctrl = $controller('BasketController as basket', {
			"$scope": scope,
			"BasketService": BasketService
		});
	}));

	it('should reload le basket', function () {
		expect(BasketService.reloadBasket.callCount).to.be.equal(1);

		expect(scope.basket).to.have.property('totalPrice').and.to.equals(0);
		expect(scope.basket).to.have.property('products').and.to.deep.equals([]);
	});

	it('should have the basket set after $apply', function () {
		$rootScope.$apply();

		expect(BasketService.getSavedProducts.callCount).to.be.equal(1);
		expect(BasketService.getTotalPrice.callCount).to.be.equal(1);

		expect(scope.basket).to.have.property('totalPrice').and.to.equals(73);
		expect(scope.basket).to.have.property('products').and.to.deep.equals(basketFixture);
	});

	it('should call BasketService::addProduct', function () {
		ctrl.addProduct(productsFixture);

		expect(BasketService.addProduct.callCount).to.be.equal(1);
		expect(BasketService.addProduct.calledWith(productsFixture)).to.be.true;
	});

	it('should call BasketService::removeProduct', function () {
		ctrl.removeProduct(productsFixture);

		expect(BasketService.removeProduct.callCount).to.be.equal(1);
		expect(BasketService.removeProduct.calledWith(productsFixture)).to.be.true;
	});
})