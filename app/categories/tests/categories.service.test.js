describe('CategoriesService', function(){

	var CategoriesService;

	beforeEach(module('app.categories'));

	beforeEach(inject(function (_CategoriesService_) {
		CategoriesService = _CategoriesService_;
	}));

	describe('#getAll()', function() {
		it('should return at least one result', function () {
			var categories = CategoriesService.getAll();
			expect(categories).to.have.length.at.least(1);
		});
	})
});

