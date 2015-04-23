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

		sandbox = sinon.sandbox.create();

		BasketService = _BasketService_;
		BasketResource = _BasketResource_;
		TestUtils = _TestUtils_;
	}));

	afterEach(function () {
		sandbox.restore();
	});

	describe('when basket is empty', function () {
		describe('#getSavedProducts()', function () {
			it('should fetch products in the basket initially', function(){
				var basket = BasketService.getSavedProducts();
				expect(basket).to.be.an('Array');
				expect(basket).to.deep.equal([]);
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
			expect(BasketService.getSavedProducts()).to.be.an('Array').and.not.to.be.empty;
		});

		it('#getTotalPrice() should be greater than 0 initially', function () {
			expect(BasketService.getTotalPrice()).to.equal(product1Mock.price * 2 + product2Mock.price);
		});
	});

	describe('after removing', function () {
		beforeEach(inject(function ($httpBackend) {
			$httpBackend.whenGET('http://example.com/api/users/1/basket?filter=%7B%22include%22%3A%5B%22product%22%5D%7D').respond(basketFixture);

			BasketService.reloadBasket();

			$httpBackend.flush();

			sinon.stub(BasketResource, 'removeProduct', function () {
				return new TestUtils.successHttpResponder();
			});
			sinon.stub(BasketResource, 'setQuantity', function () {
				return new TestUtils.successHttpResponder();
			});
		}));

		describe('the last product of a kind', function () {
			beforeEach(function () {
				BasketService.removeProduct(product2Mock);
			})

			it('should be removed from the basket', function () {
				expect(BasketService.getSavedProducts()).to.be.an('Array').and.have.length(1);
			});

			it('the total price should be decreased', function () {
				expect(BasketService.getTotalPrice()).to.equal(product1Mock.price * 2);
			});
		});

		describe('a product that is added multiple times', function () {
			beforeEach(function () {
				BasketService.removeProduct(product1Mock);
			})

			it('should still be in the basket', function () {
				expect(BasketService.getSavedProducts()).to.be.an('Array').and.have.length(2);
			});

			it('the total price should be decreased', function () {
				expect(BasketService.getTotalPrice()).to.equal(product1Mock.price + product2Mock.price);
			});
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
			expect(basket).to.be.an('Array');
			expect(basket[0].quantity).to.equal(product1Mock.quantity);
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
			expect(basket).to.be.an('Array');
			expect(basket).to.have.length(1);
			expect(basket[0].quantity).to.equal(2 * product1Mock.quantity);
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
			expect(basket).to.be.an('Array');
			expect(basket[0].quantity).to.equal(product1Mock.quantity);
			expect(basket[1].quantity).to.equal(product2Mock.quantity);
		});

		it('#getTotalPrice() should be summed', function () {
			expect(BasketService.getTotalPrice()).to.equal(product1Mock.price + product2Mock.price);
		})
	});
});

