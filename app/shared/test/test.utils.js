angular.module('test.utils')
	.service('TestUtils', TestUtils);

TestUtils.$inject = ['$q'];

function TestUtils($q) {
	return {
		resolvedPromise: resolvedPromise,
		successHttpResponder: successHttpResponder,
		errorHttpResponder: errorHttpResponder
	};

	function resolvedPromise(value) {
		var deferred = $q.defer();
		deferred.resolve(value);
		return deferred.promise;
	}

	function successHttpResponder(context) {
		this.success = function (cb) {
			cb.apply(context, arguments);
			return this;
		}

		this.error = function (cb) {
			return this;
		}
	};

	function errorHttpResponder(context) {
		this.success = function (cb) {
			return this;
		}

		this.error = function (cb) {
			cb.apply(context, arguments);
			return this;
		}
	};
};