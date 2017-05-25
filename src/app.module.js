angular.module('materializeApp', [
		'ngRoute',
		'ja.qr',
		'postModule',
		'categoryModule',
		'addpostModule',
		'authModule',
		'searchModule',
		'ui.materialize',
		'slick',
		'LocalStorageModule',
		'angularUtils.directives.dirPagination'


	])
	.run(function(localStorageService, $rootScope) {
		console.log(localStorageService);

		$rootScope.loggedUser = localStorageService.get('logged');
		console.log($rootScope.loggedUser);

	})
