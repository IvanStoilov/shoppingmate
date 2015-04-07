describe('ProductsSerivce', function(){

	var ProductsService;

	beforeEach(module('app.products'));
	beforeEach(inject(function (_ProductsService_) {
		ProductsService = _ProductsService_;
	}));

	describe('#getAll()', function(){
		it('should return 6 entries', function(){
			expect(ProductsService.getAll()).to.have.length(6);
		});
	})
});

