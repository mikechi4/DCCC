'use strict';

angular.module('myApp', ['nvd3']);
'use strict';

angular.module('myApp').controller('mainCtrl', function ($scope, mainService) {

  var getAverageSalary = function getAverageSalary(arr, total) {
    var average = total / arr.length;
    return average;
  };

  var getTotalSalary = function getTotalSalary(apiData) {
    var womenTotalSalary = [];
    var menTotalSalary = [];

    apiData.forEach(function (index) {
      womenTotalSalary.push(index[1]);
      menTotalSalary.push(index[4]);
    });

    var womenSalSum = 0;
    var menSalSum = 0;
    womenSalSum = womenTotalSalary.reduce(function (womenSalSum, sal) {
      return womenSalSum + sal * 1;
    }, 0);
    menSalSum = menTotalSalary.reduce(function (menSalSum, sal) {
      return menSalSum + sal * 1;
    }, 0);

    var womenAvg = getAverageSalary(womenTotalSalary, womenSalSum);
    var menAvg = getAverageSalary(menTotalSalary, menSalSum);
  };
  $scope.getData = function () {
    mainService.getData().then(function (response) {
      $scope.jobs = response;
      getTotalSalary(response);
    });
  };
  $scope.getData();

  $scope.options = {
    chart: {
      type: 'discreteBarChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 50,
        left: 55
      },
      x: function x(d) {
        return d.label;
      },
      y: function y(d) {
        return d.value + 1e-10;
      },
      showValues: true,
      valueFormat: function valueFormat(d) {
        return d3.format(',.4f')(d);
      },
      duration: 500,
      xAxis: {
        axisLabel: 'X Axis'
      },
      yAxis: {
        axisLabel: 'Y Axis',
        axisLabelDistance: 0
      }
    }
  };

  $scope.values = [{
    key: "Cumulative Return",
    values: [{
      "label": "A",
      "value": 29.765957771107
    }, {
      "label": "B",
      "value": 12
    }, {
      "label": "C",
      "value": 32.807804682612
    }]
  }];
});
'use strict';

angular.module('myApp').service('mainService', function ($http, $q) {
  var apiUrl = 'https://data.seattle.gov/api/views/cf52-s8er/rows.json';
  var startingIndex = 8;
  this.getData = function () {
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: apiUrl
    }).then(function (response) {
      var apiData = response.data.data;
      var condensedData = [];

      // condense the data from the API so we get a smaller array with the info we want
      apiData.forEach(function (index) {
        var indexData = [];
        for (var i = 8; i < index.length; i++) {
          indexData.push(index[i]);
        }
        condensedData.push(indexData);
      });

      deferred.resolve(condensedData);
    });

    return deferred.promise;
  };
});