angular.module('test.utils')
	.service('TestUtil', TestUtil);

TestUtil.$inject = ['$q'];

function TestUtil($q) {
	return {
		resolvedPromise: resolvedPromise
	};

	function resolvedPromise(value) {
		var deferred = $q.defer();
		deferred.resolve(value);
		return deferred.promise;
	}
};