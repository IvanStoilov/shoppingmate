(function () {
	'use strict';

	angular
		.module('app.auth')
		.service('AuthResource', AuthResource);

	AuthResource.$inject = ['$http', 'Config'];

	function AuthResource($http, Config)
	{
		var baseUrl = Config.apiRootUrl + '/users/';

		var service = {
			login: login,
			logout: logout
		};

		return service;

		function login(credentials)
		{
			return $http.post(baseUrl + 'login', credentials);
		}

		function logout(accessToken)
		{
			return $http.get(baseUrl + 'logout?access_token=' + accessToken);
		}
	}

})();