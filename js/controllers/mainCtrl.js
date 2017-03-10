angular.module('myApp')
  .controller('mainCtrl', ($scope, mainService) => {
    $scope.getData = function(){
      mainService.getData().then(function(response){
        $scope.jobs = response;
        console.log($scope.data)
      })
    }
    $scope.getData();
  })
