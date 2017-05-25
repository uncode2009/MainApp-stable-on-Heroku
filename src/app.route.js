angular.module('materializeApp')
    .config(function($routeProvider, $locationProvider, localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('around')
            .setStorageType('localStorage')
            .setNotify(true, true);
        $locationProvider.hashPrefix('');
        $routeProvider
            .when("/", {
                templateUrl: "./main.html",
                controller: "mainController",
                resolve: {
                    apps: function(appService) {
                        return appService.getApps();

                    }
                }
            })


        .when('/category/:name', {
                templateUrl: "./modules/category/category.html",
                controller: "categoryController",
                resolve: {
                    category: function($routeParams) {
                        console.log("cat", $routeParams);
                        return $routeParams;


                    }
                }

            })
            .when("/addpost/add", {
                templateUrl: "./modules/addpost/addpost.html",
                controller: "addpostController"

            })
            .when("/id/:postId", {
                templateUrl: "./modules/post/post.html",
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
                templateUrl: "./modules/auth/adminpage/adminpage.html",
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
                templateUrl: "./modules/auth/userpage/userpage.html",
                controller: "userController",
                resolve: {
                    apps: function(userService) {
                        return userService.getApps();

                    }
                }

            })
            .when("/restricted", {
                templateUrl: "./modules/auth/restricted/restricted.html",


            })
         .when("/search", {
                templateUrl: "./modules/search/search.html",
                controller: "searchController",

                resolve:{
                  search:function(searchService){
                     return searchService.searchApp(); 
                  }  
                }

            })





    });
