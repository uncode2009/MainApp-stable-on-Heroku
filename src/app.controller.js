angular.module('materializeApp')

.controller('mainController', ['$scope', '$http', 'appService', 'apps','$rootScope','localStorageService', function($scope, $http, appService, apps,$rootScope,localStorageService) { //  ['$scope','apiService' - !!! для коректної мініфікації вик-ється як залежність

	$scope.cards = apps;
	$scope.currentPage = 1;
	$scope.pageSize = 12;




}]);
