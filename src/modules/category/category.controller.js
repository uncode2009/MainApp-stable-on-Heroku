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
