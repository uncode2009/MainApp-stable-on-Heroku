angular.module('materializeApp', [
		'ngRoute',
		'ja.qr',
		'postModule',
		'categoryModule',
		'addpostModule',
		'authModule',
		'searchModule',
		'ui.materialize',
		'LocalStorageModule',
		'angularUtils.directives.dirPagination'


	])
	.run(function(localStorageService, $rootScope) {
		console.log(localStorageService);

		$rootScope.loggedUser = localStorageService.get('logged');
		console.log($rootScope.loggedUser);

	})

angular.module('addpostModule',[]);
angular.module('authModule',[]);
angular.module('categoryModule',[]);

angular.module('postModule',[]);
angular.module('searchModule',[]);
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

angular.module('materializeApp')
.constant('config',{
	key:'?apiKey=7-2eyq_ENmV7b4Q1x8hVZaZ9EEKxGfA0',
	base:'https://api.mlab.com/api/1/databases/appfree/collections/',
	apps:'apps/',
	users:'users/',
	login:'?f={"userName": 1, "password": 1, "role":1}&apiKey=7-2eyq_ENmV7b4Q1x8hVZaZ9EEKxGfA0',
	rate:'?f={"rateSum": 1, "rateCount": 1, "rateResult":1}&apiKey=7-2eyq_ENmV7b4Q1x8hVZaZ9EEKxGfA0'

});
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

angular.module('categoryModule')

    .factory('categoryService', ['$http','config', function($http,config) {

        var publicMethod = {
            getApps: function(){

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

angular.module('authModule')
    .factory('userService', ['$http', 'config', function($http, config) {

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

angular.module('materializeApp')

.controller('mainController', ['$scope', '$http', 'appService', 'apps','$rootScope','localStorageService', function($scope, $http, appService, apps,$rootScope,localStorageService) { //  ['$scope','apiService' - !!! для коректної мініфікації вик-ється як залежність

	$scope.cards = apps;
	$scope.currentPage = 1;
	$scope.pageSize = 12;




}]);

angular.module('materializeApp')

.controller('navController', ['$route', '$scope', '$http', 'appService', '$rootScope', 'localStorageService', '$window', '$location', 'searchService', function($route, $scope, $http, appService, $rootScope, localStorageService, $window, $location, searchService) { //
	$scope.signOut = function() {
		delete $rootScope.loggedUser;
		localStorageService.remove('logged');
		var landingUrlUser = "http://" + $window.location.host + "/";
		$window.location.href = landingUrlUser;
	}

	$rootScope.search = {
		name: ""

	}


	$scope.reload = function() {

		$route.reload();



	}
	$scope.zoom = function(state) {

		angular.element('body').toggleClass('search-active');
		/*if (state == "open") {
			angular.element('.input-search').focus();
		}*/

	}


}]);

angular.module('addpostModule')
	.controller('addpostController', ['$scope', '$http', 'addpostService', '$routeParams', function($scope, $http, addpostService, $routeParams) { //  ['$scope','apiService' - !!! для коректної мініфікації вик-ється як залежність

		$scope.newCard = {


			title: "",
			description: "",
			img: "",
			back: "",
			source: "",
			category: "",
			version: ""
		}



		$scope.addApp = function() {
			console.log($scope.newCard);
			addpostService.postApp($scope.newCard);
			window.history.back();
		}

	}]);

angular.module('categoryModule')

.controller('categoryController', ['$scope', 'categoryService', 'category', function($scope, categoryService, category) { //  ['$scope','apiService' - !!! для коректної мініфікації вик-ється як залежність

  $scope.category = category.name;
  console.log($scope.category);

  getApp();

  function getApp() {
    categoryService.getApps()
      .then(function(res) {
        $scope.cards = res;
        for (i = 0; i < res.length; i++) {
          var rand = res[Math.floor(Math.random() * res.length)];
          $scope.catBack = rand.back;
        }

      })
      .catch(function(err) {
        console.log(err);
      })
  }




}]);

angular.module('postModule')

.controller('postCtrl', function($scope, $routeParams, post, idService) {

    $scope.post = post;

    $scope.size = 150;
    $scope.correctionLevel = '';
    $scope.typeNumber = 0;
    $scope.inputMode = '';
    $scope.image = true;
    $scope.qrstring = post.source;


    $scope.starArr = [{
            id: "star1",
            value: 1
        }, {
            id: "star2",
            value: 2
        }, {
            id: "star3",
            value: 3
        }, {
            id: "star4",
            value: 4
        }, {
            id: "star5",
            value: 5
        }

    ]



    $scope.doTheBack = function() {
        window.history.back();
    };

    $scope.rate = function(elem) {

        console.log(elem.value);

        var rateSum = post.rateSum;
        var rateCount = post.rateCount;
        var rateWidth = post.rateResult;

        console.log(rateSum, rateCount, rateWidth);

        var itemVal = elem.value;
        console.log("value:", itemVal);
        rateSum += +itemVal;
        console.log("rateSum:", rateSum);
        rateCount++;
        console.log("rateCount:", rateCount);
        rateWidth = +rateSum / rateCount;
        console.log("length:", length);
        var result = rateWidth * 20 + "%";
        console.log("result:", result);

        idService.updateApp(rateSum,rateCount,result,post._id.$oid);

    }


});

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

angular.module('authModule')
	.controller('adminController', ['$scope', '$http', 'adminService', '$routeParams', 'apps', '$timeout', '$route', function($scope, $http, adminService, $routeParams, apps, $timeout, $route) {

		$scope.cards = apps;


		$scope.deleteApp = function(elem) {

			console.log(elem);
			adminService.deleteApp(elem);
			$timeout(function() {
				$route.reload();
			}, 1000);
		}

	}]);

angular.module('authModule')
  .controller('signinController', ['$scope', '$http', 'signinService', '$rootScope', '$location', '$window', '$timeout', 'localStorageService', function($scope, $http, signinService, $rootScope, $location, $window, $timeout, localStorageService) {



    $scope.loginUser = {

      userName: "",
      password: ""

    }

    $scope.login = function() {
      console.log($scope.loginUser);
      signinService.signIn($scope.loginUser.userName, $scope.loginUser.password)
        .then(function(user) {

          console.log($rootScope.loggedUser);

          if (!user.length) {
            console.log('no such user');

            $scope.warning = 'Incorrect user name or password';
            $timeout(function() {
              $scope.warning = "";
            }, 3000);

          } else if ($scope.loginUser.userName == user[0].userName && $scope.loginUser.password == user[0].password) {
            $rootScope.loggedUser = user;
            localStorageService.set('logged', user);
            var landingUrlUser = "http://" + $window.location.host + "/#user";
            $window.location.href = landingUrlUser;
            $rootScope.userLocation = landingUrlUser;
            angular.element('#login-modal').modal('close');
            $scope.loginUser = {

              userName: "",
              password: ""

            }
            if (user[0].role === 'superuser') {
              var landingUrlAdmin = "http://" + $window.location.host + "/#admin";
              $window.location.href = landingUrlAdmin;
              return;
            }

          }

        })
    };

  }]);

angular.module('authModule')
  .controller('signupController', ['$scope', '$http', 'signupService', function($scope, $http, signupService) { //  ['$scope','apiService' - !!! для коректної мініфікації вик-ється як залежність  


    $scope.newUser = {


      firstName: "",
      lastName: "",
      userName: "",
      password: ""

    }





    $scope.signUpUser = function() {
      console.log($scope.newUser);
      signupService.signUp($scope.newUser);
      alert('signed up succesfully');

      angular.element('#signup-modal').modal('close');

      $scope.newUser = {


        firstName: "",
        lastName: "",
        userName: "",
        password: ""

      }
    }







  }]);

angular.module('authModule')
	.controller('userController', ['$scope', '$http', 'adminService', '$routeParams', 'apps', '$timeout', '$route', function($scope, $http, adminService, $routeParams, apps, $timeout, $route) {

		$scope.cards = apps;


	

	}]);
