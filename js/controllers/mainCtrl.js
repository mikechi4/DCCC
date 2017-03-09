angular.module('myApp')
  .controller('mainCtrl', function($scope, mainService){
    $scope.getData = function(){
      mainService.getData().then(function(response){
        $scope.data = response;
        console.log($scope.data)
      })
    }
    $scope.getData();
  })
