describe('BasketService', function(){
	var BasketService;
	var BasketResource;
	var product1Mock, product2Mock;
	var basketFixture;
	var sandbox;
	var TestUtils;

	beforeEach(module('test.utils'));
	beforeEach(module('app.basket'));

	beforeEach(inject(function (_BasketService_, _BasketResource_, _TestUtils_, Fixtures) {
		product1Mock = Fixtures.products[0];
		product2Mock = Fixtures.products[1];
		basketFixture = Fixtures.basket;
		BasketService = _BasketService_;
		BasketResource = _BasketResource_;
		TestUtils = _TestUtils_;

		sandbox = sinon.sandbox.create();
	}));

	afterEach(function () {
		sandbox.restore();
	});

	describe('when basket is empty', function () {
		describe('#getSavedProducts()', function () {
			it('should fetch products in the basket initially', function(){
				var basket = BasketService.getSavedProducts();
				expect(basket).to.be.an('Object');
				expect(basket).to.deep.equal({});
			});
		});

		describe('#getTotalPrice()', function () {
			it('should be 0 initially', function () {
				expect(BasketService.getTotalPrice()).to.equal(0);
			})
		});
	});

	describe('when basket is not empty', function () {
		beforeEach(inject(function ($httpBackend) {
			$httpBackend.whenGET('http://example.com/api/users/1/basket?filter=%7B%22include%22%3A%5B%22product%22%5D%7D').respond(basketFixture);

			BasketService.reloadBasket();

			$httpBackend.flush();
		}));

		it('#getSavedProducts() should fetch products in the basket initially', function(){
			var basket = BasketService.getSavedProducts();

			expect(basket).to.be.an('Object');
			expect(basket).not.to.be.empty;
		});

		it('#getTotalPrice() should be greater than 0 initially', function () {
			expect(BasketService.getTotalPrice()).to.be.above(0);
		});
	});

	describe("after adding one product", function () {
		beforeEach(function () {
			sinon.stub(BasketResource, 'addProduct', function () {
				return new TestUtils.successHttpResponder();
			});

			BasketService.addProduct(product1Mock);
		});

		it('#getSavedProducts() should return a product with id 1', function () {
			var basket = BasketService.getSavedProducts();
			expect(basket).to.be.an('Object');
			expect(basket).to.include.property(product1Mock.id);
			expect(basket[product1Mock.id].quantity).to.equal(product1Mock.quantity);
		});

		it('#getTotalPrice() should be updated', function () {
			expect(BasketService.getTotalPrice()).to.equal(product1Mock.price);
		})
	});

	describe("after adding two products of the same kind", function () {
		beforeEach(inject(function ($httpBackend) {
			$httpBackend.whenPUT('http://example.com/api/basket').respond({});

			BasketService.addProduct(product1Mock);
			BasketService.addProduct(product1Mock);

			$httpBackend.flush();
		}));

		it('#getSavedProducts() should return a product with double quantity', function () {
			var basket = BasketService.getSavedProducts();
			expect(basket).to.be.an('Object');
			expect(basket).to.include.property(product1Mock.id);
			expect(basket[product1Mock.id].quantity).to.equal(2 * product1Mock.quantity);
		});

		it('#getTotalPrice() should be doubled', function () {
			expect(BasketService.getTotalPrice()).to.equal(2 * product1Mock.price);
		})
	});

	describe("after adding two products of different kind", function () {
		beforeEach(inject(function ($httpBackend) {
			$httpBackend.whenPUT('http://example.com/api/basket').respond({});

			BasketService.addProduct(product1Mock);
			BasketService.addProduct(product2Mock);

			$httpBackend.flush();
		}));

		it('#getSavedProducts() should return two products with single quantity', function () {
			var basket = BasketService.getSavedProducts();
			expect(basket).to.be.an('Object');
			expect(basket).to.include.property(product1Mock.id);
			expect(basket).to.include.property(product2Mock.id);
			expect(basket[product1Mock.id].quantity).to.equal(product1Mock.quantity);
			expect(basket[product2Mock.id].quantity).to.equal(product2Mock.quantity);
		});

		it('#getTotalPrice() should be summed', function () {
			expect(BasketService.getTotalPrice()).to.equal(product1Mock.price + product2Mock.price);
		})
	});
});

