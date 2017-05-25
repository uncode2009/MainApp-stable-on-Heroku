angular.module('materializeApp')
    .factory('appService', ['$http', 'config', function($http, config) {

        var publicMethod = {
            getApps: function() {

                return $http.get(config.base + config.apps + config.key)
                    .then(function(response) {
                        console.log(response);
                        return response.data;

                    })
                    .catch(function(err) {
                        console.log(err);
                    })

            }

        };
        return publicMethod;
    }]);
