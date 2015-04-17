describe('ProductsController', function(){

	var productsFixture;
	var categoriesFixtures;

	var scope;
	var $rootScope;
	var ctrl;
	var ProductsService;
	var BasketService;
	var CategoriesService;

	beforeEach(module('test.utils'));
	beforeEach(module('app.products'));

	beforeEach(inject(function ($q, _$rootScope_, $controller, TestUtil, Fixtures, _ProductsService_, _BasketService_, _CategoriesService_) {
		productsFixture = Fixtures.products;
		categoriesFixtures = Fixtures.categories;


		ProductsService = _ProductsService_;
		BasketService = _BasketService_;
		CategoriesService = _CategoriesService_;
		$rootScope = _$rootScope_;

		sinon.stub(ProductsService, "getByCategoryId", function () {
			return TestUtil.resolvedPromise(productsFixture);
		});
		sinon.stub(BasketService, "addProduct", function () {
			return TestUtil.resolvedPromise(true);
		});
		sinon.stub(CategoriesService, "getById", function (id) {
			//selected category
			return TestUtil.resolvedPromise(categoriesFixtures[id - 1]);
		});

		scope = $rootScope.$new();

		ctrl = $controller('ProductsController as products', {
			"$scope": scope,
			"$stateParams": {
				categoryId: 2
			},
			"ProductsService": ProductsService,
			"BasketService": BasketService,
			"CategoriesService": CategoriesService
		});

		$rootScope.$apply();
	}));

	it('should fetch all products', function () {
		expect(ProductsService.getByCategoryId.calledWith(2)).to.be.true;
		expect(scope.products).to.include.keys('products');
		expect(scope.products.products).to.have.length.at.least(1);
	});

	it('should fetch selected category', function () {
		expect(CategoriesService.getById.calledWith(1)).to.be.true;
		expect(CategoriesService.getById.calledWith(2)).to.be.true;
		expect(scope.products).to.include.keys('selectedCategory');
		expect(scope.products.selectedCategory).to.equal(categoriesFixtures[1]);
	});

	it('should add a product to basket', function () {
		scope.products.addProduct(productsFixture[0]);
		expect(BasketService.addProduct.callCount).to.equal(1);
		expect(BasketService.addProduct.calledWith(productsFixture[0])).to.be.true;
	});

	it('should set breadcrumbs', function () {
		expect(scope.products).to.include.keys('breadcrumbs');
		expect(scope.products.breadcrumbs).to.have.length(3);
	});
})