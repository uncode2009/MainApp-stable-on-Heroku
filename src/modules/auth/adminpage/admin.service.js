angular.module('authModule')
    .factory('adminService', ['$http', 'config', function($http, config) {

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

            },
            deleteApp: function(id) {

                return $http.delete(config.base+config.apps+id+config.key)
                 .then(function(response) {
                 return response.data;
                        
                  })
                  .catch(function(err) {
                        console.log(err);
                  })
            }

        };
        return publicMethod;
    }]);
