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
