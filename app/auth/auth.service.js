(function () {
	'use strict';

	angular
		.module('app.auth')
		.service('AuthService', AuthService);

	AuthService.$inject = ['$rootScope', 'AuthResource', 'localStorageService'];

	function AuthService($rootScope, AuthResource, localStorageService)
	{
		var _user = false;
		const LOGIN_CACHE_KEY = 'login';

		$rootScope.$on('auth:unauthorized', destroySession);

		return {
			login: login,
			isLoggedIn: isLoggedIn,
			getUser: getUser,
			getUserId: getUserId,
			logout: logout,
			destroySession: destroySession
		};

		///////////////////////////////////////////////////

		function login(credentials) {
			var rememberedUser = getRememberedLogin();
			if (rememberedUser) {
				onLoginSuccess(rememberedUser);
			}

			return AuthResource.login(credentials).success(onLoginSuccess);
		}

		function isLoggedIn() {
			return !!getUser();
		}

		function getUser() {
			if (_user !== false) {
				return _user;
			}

			return getRememberedLogin();
		}

		function getUserId() {
			return getUser().userId;
		}

		function getAccessToken() {
			return getUser().id;
		}

		function logout() {
			return AuthResource
				.logout(getAccessToken())
				.success(destroySession);
		}

		function destroySession() {
			removeRememberedLogin();
			_user = false;
			$rootScope.$emit('auth:logout');
		};

		///////////////////////////////////////////////////

		function onLoginSuccess(user) {
			_user = user;
			rememberLogin(user);
			$rootScope.$emit('auth:login', user);
		}

		function getRememberedLogin() {
			if (localStorageService.isSupported) {
				return localStorageService.get(LOGIN_CACHE_KEY);
			}

			return false;
		}

		function rememberLogin(user) {
			if (localStorageService.isSupported) {
				localStorageService.set(LOGIN_CACHE_KEY, user);
			}
		}

		function removeRememberedLogin() {
			if (localStorageService.isSupported) {
				localStorageService.remove(LOGIN_CACHE_KEY);
			}
		}
	}
})();