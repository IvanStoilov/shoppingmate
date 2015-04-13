(function () {
	angular
		.module('app.categories')
		.service('CategoriesService', CategoriesService);

	CategoriesService.$inject = ['CategoriesResource', '$q'];

	function CategoriesService(CategoriesResource, $q)
	{
		var _categories = false;

		var service = {
			getAll: getAll,
			getTopCategories: getTopCategories,
			getSubCategories: getSubCategories,
			getById: getById
		}

		return service;

		function getAll() {
			if (_categories !== false) {
				return $q(function (resolve, reject) {
					resolve(_categories);
				});
			}

			return CategoriesResource.getAll().then(function (categories) {
				_categories = categories;
				return _categories;
			});
		}

		function getTopCategories() {
			return getAll().then(function (categories) {
				return _.filter(categories, function (category) {
					return category.parent_id === null;
				})
			});
		}

		function getSubCategories(parentId) {
			return getAll().then(function (categories) {
				return _.filter(categories, function (category) {
					return category.parent_id === parentId;
				})
			});
		}

		function getById(categoryId) {
			return getAll().then(function (categories) {
				return _.find(categories, function (category) {
					return category.id === categoryId;
				})
			});
		}
	}
})();