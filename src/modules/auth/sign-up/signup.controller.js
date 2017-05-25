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
