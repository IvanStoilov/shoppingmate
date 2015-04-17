(function () {
	angular.module('test.utils')
		.value('Fixtures', {
			products: [
				{
					id: 1,
					name: "Apple",
					image: "",
					price: 0.89,
					quantity: 500,
					unit: "g",
					category_id: 3
				},
				{
					id: 2,
					name: "Melon",
					image: "",
					price: 0.89,
					quantity: 1,
					unit: "st",
					category_id: 3
				},
				{
					id: 1,
					name: "Twix",
					image: "",
					price: 1.49,
					quantity: 1,
					unit: "st",
					category_id: 2
				}
			],
			categories: [
				{
					id: 1,
					name: "Sweet",
					image: "",
					parent_id: null
				},
				{
					id: 2,
					name: "Chocolate",
					image: "",
					parent_id: 1
				},{
					id: 3,
					name: "Fruit",
					image: "",
					parent_id: 1
				}
			]
		});
})();