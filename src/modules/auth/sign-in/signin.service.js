angular.module('authModule')
	.factory('signinService', ['$http', 'config', function($http, config) {


		var publicMethod = {

			signIn: function(login, pass) {
				return $http.get(config.base + config.users + config.login, {
					params: {
						q: {
							'userName': login,
							'password': pass
						}
					}
				})


				.then(function(response) {
						return response.data;


					})
					.catch(function(err) {
						console.log(err);
						alert("Something goes wrong");
					})

			}



		};

		return publicMethod;

	}]);
