angular.module('authModule')
	.controller('userController', ['$scope', '$http', 'adminService', '$routeParams', 'apps', '$timeout', '$route', function($scope, $http, adminService, $routeParams, apps, $timeout, $route) {

		$scope.cards = apps;


	

	}]);
