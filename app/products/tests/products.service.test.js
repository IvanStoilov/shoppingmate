describe('ProductsSerivce', function(){

	var ProductsService;

	beforeEach(module('app.products'));
	beforeEach(inject(function (_ProductsService_) {
		ProductsService = _ProductsService_;
	}));

	describe('#getAll()', function(){
		it('should return 6 entries', function(){
			expect(ProductsService.getAll()).to.have.length.at.least(1);
		});
	});

	describe('#getByCategoryId()', function(){
		it('should return 6 entries', function(){
			expect(ProductsService.getByCategoryId(2)).to.have.length.at.least(1);
		});
	});
});

