angular.module('myApp')
  .controller('mainCtrl', function($scope, mainService){
    $scope.getData = mainService.getData().then(function(response){
      $scope.data = data;
      console.log(data)
    })
    $scope.getData();
  })
