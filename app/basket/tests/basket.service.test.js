describe('BasketSerivce', function(){
	var product1 = {
		"id": 1,
		"name": "Apple",
		"category_id": 1,
		"quantity": 500,
		"unit": "g",
		"price": 10
	};
	var product2 = {
		"id": 2,
		"name": "Melon",
		"category_id": 1,
		"quantity": 2,
		"unit": "st",
		"price": 15
	};

	var BasketService;

	beforeEach(module('app.basket'));
	beforeEach(inject(function (_BasketService_) {
		BasketService = _BasketService_;
	}));

	describe('#getSavedProducts()', function(){
		it('should have 0 products initially', function(){
			expect(BasketService.getSavedProducts()).to.be.an('Array');
			expect(BasketService.getSavedProducts()).to.have.length(0);
		});

		describe("after adding one product", function () {
			beforeEach(function () {
				BasketService.addToBasket(product1);
			});

			it('should return a product with id 1', function () {
				var basket = BasketService.getSavedProducts();
				expect(basket).to.be.an('Array');
				expect(basket).to.have.length(1);
				expect(basket[0].id).to.equal(1);
			})
		});

		describe("after adding two products with the same id", function () {
			beforeEach(function () {
				BasketService.addToBasket(product1);
				BasketService.addToBasket(product1);
			});

			it('should return a product with double quantity', function () {
				var basket = BasketService.getSavedProducts();
				expect(basket).to.be.an('Array');
				expect(basket).to.have.length(1);
				expect(basket[0].quantity).to.equal(1000);
			});
		});

		describe("after adding two products with different ids", function () {
			beforeEach(function () {
				BasketService.addToBasket(product1);
				BasketService.addToBasket(product2);
			});
			it('should return two products with single quantity', function () {
				var basket = BasketService.getSavedProducts();
				expect(basket).to.be.an('Array');
				expect(basket).to.have.length(2);
				expect(basket[0].quantity).to.equal(500);
				expect(basket[1].quantity).to.equal(2);
			});
		});
	})
});

