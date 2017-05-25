angular.module('authModule')
	.controller('adminController', ['$scope', '$http', 'adminService', '$routeParams', 'apps', '$timeout', '$route', function($scope, $http, adminService, $routeParams, apps, $timeout, $route) {

		$scope.cards = apps;


		$scope.deleteApp = function(elem) {

			console.log(elem);
			adminService.deleteApp(elem);
			$timeout(function() {
				$route.reload();
			}, 1000);
		}

	}]);
