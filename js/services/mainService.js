angular.module('myApp').service('mainService', function($http, $q){
    var apiUrl = 'https://data.seattle.gov/api/views/cf52-s8er/rows.json';
    var startingIndex = 8;
    this.getData = function(){
      var deferred = $q.defer();

      $http({
        method:'GET',
        url: apiUrl
      }).then((response) => {
        var apiData = response.data.data;
        var condensedData = [];

        // condense the data from the API so we get a smaller array with the info we want
        apiData.forEach((index) => {
          var indexData = [];
          for(var i = 8; i < index.length; i++) {
            indexData.push(index[i]);
          }
          condensedData.push(indexData)
        })

        deferred.resolve(condensedData);
      })

      return deferred.promise;
    }
  })
