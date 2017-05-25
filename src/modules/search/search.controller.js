angular.module('searchModule')

.controller('searchController', function($route, $scope, $rootScope, searchService, search) {


    for (i = 0; i < search.length; i++) {
        if (search[i].title.toLowerCase() == $rootScope.search.name.toLowerCase()) {
            $scope.card = search[i];

        }

    }
    $rootScope.searchResult = $rootScope.search.name;
    $rootScope.search.name = "";

});
