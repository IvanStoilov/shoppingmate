(function () {
	'use strict';

	var config = {
		apiRootUrl: 'http://127.0.0.1:3000/api'
	};

	angular
		.module('app')
		.value('Config', config);
})();
