angular.module('materializeApp')

.controller('navController', ['$route', '$scope', '$http', 'appService', '$rootScope', 'localStorageService', '$window', '$location', 'searchService', function($route, $scope, $http, appService, $rootScope, localStorageService, $window, $location, searchService) { //
	$scope.signOut = function() {
		delete $rootScope.loggedUser;
		localStorageService.remove('logged');
		var landingUrlUser = "http://" + $window.location.host + "/";
		$window.location.href = landingUrlUser;
	}

	$rootScope.search = {
		name: ""

	}


	$scope.reload = function() {

		$route.reload();



	}
	$scope.zoom = function(state) {

		angular.element('body').toggleClass('search-active');
		/*if (state == "open") {
			angular.element('.input-search').focus();
		}*/

	}


}]);
