describe('CategoriesService', function(){

	var CategoriesService;
	var CategoriesResource;
	var categoriesFixture;
	var $rootScope;

	beforeEach(module('test.utils'));
	beforeEach(module('app.categories'));

	beforeEach(inject(function (TestUtils, Fixtures, _CategoriesService_, _CategoriesResource_, _$rootScope_) {
		CategoriesService = _CategoriesService_;
		CategoriesResource = _CategoriesResource_;
		categoriesFixture = Fixtures.categories;
		$rootScope = _$rootScope_;

		sinon.stub(CategoriesResource, 'getAll', function () {
			return TestUtils.resolvedPromise(categoriesFixture);
		});
	}));

	describe('#getAll()', function() {
		it('should return at least one result', function (done) {
			CategoriesService.getAll().then(function (categories) {
				expect(categories).to.have.length(3);
				done();
			});

			$rootScope.$digest();
		});

		it('should cache results', function (done) {
			CategoriesService.getAll();
			CategoriesService.getAll();
			CategoriesService.getAll();
			CategoriesService.getAll();
			$rootScope.$digest();

			expect(CategoriesResource.getAll.callCount).to.equal(1);
		});
	})
});

