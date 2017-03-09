angular.module('myApp',[]);

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

angular.module('myApp').service('mainService', function($http, $q){
    var apiUrl = 'https://data.seattle.gov/api/views/cf52-s8er/rows.json';

    this.getData = function(){
      var deferred = $q.defer();

      $http({
        method:'GET',
        url: apiUrl
      }).then(function(response){
        var data = response.data;
        deferred.resolve(data);
      })
      
      return deferred.promise;
    }
  })
