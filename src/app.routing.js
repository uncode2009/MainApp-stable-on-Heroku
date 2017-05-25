angular.module('materializeApp')
    .config(['$routeProvider','$locationProvider','localStorageServiceProvider', function($routeProvider, $locationProvider, localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('around')
            .setStorageType('localStorage')
            .setNotify(true, true);
        $locationProvider.hashPrefix('');
        $routeProvider
            .when("/", {
                templateUrl: "./views/main/main.html",
                controller: "mainController",
                resolve: {
                    apps: function(appService) {
                        return appService.getApps();

                    }
                }
            })


        .when('/category/:name', {
                templateUrl: "./views/category/category.html",
                controller: "categoryController",
                resolve: {
                    category: function($routeParams) {
                        console.log("cat", $routeParams);
                        return $routeParams;


                    }
                }

            })
            .when("/addpost/add", {
                templateUrl: "./views/addpost/addpost.html",
                controller: "addpostController"

            })
            .when("/id/:postId", {
                templateUrl: "./views/post/post.html",
                controller: "postCtrl",
                resolve: {
                    post: function($route, idService) {
                        var id = $route.current.params.postId;
                        console.log(id);
                        return idService.getApps(id);

                    }
                }
            })
            .when("/admin", {
                templateUrl: "./views/auth/adminpage/adminpage.html",
                controller: "adminController",
                resolve: {
                    apps: function(adminService) {
                        return adminService.getApps();

                    },
                    checkPermission: function($location, $rootScope) {

                        if (!$rootScope.loggedUser || $rootScope.loggedUser[0].role !== "superuser") {
                            $location.path("/restricted");

                        }


                    }
                }

            })
            .when("/user", {
                templateUrl: "./views/auth/userpage/userpage.html",
                controller: "userController",
                resolve: {
                    apps: function(userService) {
                        return userService.getApps();

                    }
                }

            })
            .when("/restricted", {
                templateUrl: "./views/auth/restricted/restricted.html",


            })
         .when("/search", {
                templateUrl: "./views/search/search.html",
                controller: "searchController",

                resolve:{
                  search:function(searchService){
                     return searchService.searchApp(); 
                  }  
                }

            })





    }]);
