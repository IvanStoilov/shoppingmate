angular.module('test.utils')
	.service('TestUtils', TestUtils);

TestUtils.$inject = ['$q'];

function TestUtils($q) {
	return {
		resolvedPromise: resolvedPromise,
		SuccessHttpResponder: SuccessHttpResponder,
		ErrorHttpResponder: ErrorHttpResponder
	};

	function resolvedPromise(value) {
		var deferred = $q.defer();
		deferred.resolve(value);
		return deferred.promise;
	}

	function SuccessHttpResponder(context) {
		this.success = function (cb) {
			cb.apply(context, arguments);
			return this;
		}

		this.error = function (cb) {
			return this;
		}
	};

	function ErrorHttpResponder(context) {
		this.success = function (cb) {
			return this;
		}

		this.error = function (cb) {
			cb.apply(context, arguments);
			return this;
		}
	};
};