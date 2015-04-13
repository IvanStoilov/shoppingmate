describe("smPrice Directive", function () {
	beforeEach(module('app.templates'));
	beforeEach(module('app.shared'));

	var element;
	var outerScope;
	var innerScope;

	beforeEach(inject(function($rootScope, $compile) {
		element = angular.element('<sm-price price="{{ price }}"></sm-price>');

		outerScope = $rootScope;
		outerScope.price = 3.05;
		$compile(element)(outerScope);

		innerScope = element.isolateScope();

		outerScope.$digest();
	}));

	describe('price', function() {
		it('should have class sm-price', function() {
			expect(element[0].children[0].className).to.contain('sm-price');
		});

		it('should have a euro value of 3', function () {
			expect(element[0].children[0].children[1].innerHTML).to.contain(3);
		});

		it('should have a cent value of 05', function () {
			expect(element[0].children[0].children[2].innerHTML).to.equal('05');
		})
	});
});