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
