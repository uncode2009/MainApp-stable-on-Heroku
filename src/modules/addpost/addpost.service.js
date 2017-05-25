angular.module('addpostModule')
    .factory('addpostService', ['$http', 'config', function($http, config) {
var publicMethod = {
            
            postApp: function(app) {
                return $http.post(config.base + config.apps + config.key, app)
                    .then(function(response) {
                        return response.data;
                        alert(succes);

                    })
                    .catch(function(err) {
                        console.log(err);
                        alert("Something goes wrong");
                    })

            }

        };
        return publicMethod;
    }]);
