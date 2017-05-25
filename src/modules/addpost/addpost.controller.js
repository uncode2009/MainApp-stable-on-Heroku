angular.module('addpostModule')
	.controller('addpostController', ['$scope', '$http', 'addpostService', '$routeParams', function($scope, $http, addpostService, $routeParams) { //  ['$scope','apiService' - !!! для коректної мініфікації вик-ється як залежність

		$scope.newCard = {


			title: "",
			description: "",
			img: "",
			back: "",
			source: "",
			category: "",
			version: ""
		}



		$scope.addApp = function() {
			console.log($scope.newCard);
			addpostService.postApp($scope.newCard);
			window.history.back();
		}

	}]);
