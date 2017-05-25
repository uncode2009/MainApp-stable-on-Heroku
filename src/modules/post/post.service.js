angular.module('postModule')
    .factory('idService', ['$http','config', function($http,config) {

        var publicMethod = {
            getApps: function(id){

                 return $http.get(config.base+config.apps+id+config.key)
                 .then(function(response) {
                 return response.data;
                        
                  })
                  .catch(function(err) {
                        console.log(err);
                  })

            },

            updateApp: function(rateSum,rateCount,result,id) {

                return $http.put(config.base + config.apps + id + config.rate, 


                    {"$set" : {

                        'rateSum': rateSum,
                        'rateCount':rateCount,
                        'rateResult':result
                    }})
                    .then(function(response) {
                        return response;

                    })
                    .catch(function(err) {
                        console.log(err);
                    })
            }

            

        };
        return publicMethod;
    }]);
