describe('ProductsService', function(){

	var ProductsService;
	var ProductsResource;
	var productsFixture;
	var $rootScope;

	beforeEach(module('test.utils'));
	beforeEach(module('app.products'));
	beforeEach(inject(function (_ProductsService_, _ProductsResource_, _$rootScope_, Fixtures, TestUtil) {
		ProductsService = _ProductsService_;
		ProductsResource = _ProductsResource_;
		$rootScope = _$rootScope_;
		productsFixture = Fixtures.products;

		sinon.stub(ProductsResource, 'getByCategoryId', function () {
			return TestUtils.resolvedPromise(productsFixture);
		});
	}));

	describe('#getByCategoryId() when called once', function() {
		var returnedProducts;

		beforeEach(function (done) {
			ProductsService.getByCategoryId(2).then(function (products) {
				returnedProducts = products;
				done();
			});

			$rootScope.$apply();
		});

		it('should call the resource object', function () {
			expect(ProductsResource.getByCategoryId.callCount).to.equal(1);
		});

		it('should return 3 entries', function () {
			expect(returnedProducts).to.have.length.at.least(3);
		});

		describe('and then once more for the same category', function() {
			beforeEach(function (done) {
				ProductsService.getByCategoryId(2).then(function (products) {
					returnedProducts = products;
					done();
				});

				$rootScope.$apply();
			});

			it('should use cached value', function () {
				expect(ProductsResource.getByCategoryId.callCount).to.equal(1);
			});
		});

		describe('and then once more for another same category', function() {
			beforeEach(function (done) {
				ProductsService.getByCategoryId(1).then(function (products) {
					returnedProducts = products;
					done();
				});

				$rootScope.$apply();
			});

			it('should use cached value', function () {
				expect(ProductsResource.getByCategoryId.callCount).to.equal(2);
			});
		});
	});
});

