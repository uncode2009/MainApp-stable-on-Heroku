angular.module('searchModule')
  .factory('searchService', ['$http', 'config', function($http, config) {


    var publicMethod = {


      searchApp: function() {

        return $http.get(config.base + config.apps + config.key)

        .then(function(response) {
            return response.data;


          })
          .catch(function(err) {
            console.log(err);
            alert("Something goes wrong");
          });

      }

    };


    return publicMethod;


  }]);
