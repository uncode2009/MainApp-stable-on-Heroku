angular.module('authModule')
	.factory('signupService', ['$http', 'config', function($http, config) {
		
		
		var publicMethod = {
			signUp: function(newUser) {
				return $http.post(config.base + config.users + config.key, newUser)
					.then(function(response) {
						return response;
				

					})
					.catch(function(err) {
						console.log(err);
						alert("Something goes wrong");
					})

			}

		};

		return publicMethod;

	}]);
