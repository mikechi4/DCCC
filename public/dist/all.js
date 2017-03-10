'use strict';

angular.module('myApp', ['nvd3', 'ui.bootstrap']).filter('startFrom', function () {
  return function (data, start) {
    if (!data || !data.length) {
      return;
    }
    start = +start; //parse to int
    return data.slice(start);
  };
});
'use strict';

angular.module('myApp').controller('mainCtrl', function ($scope, mainService) {
  // ------ Pagination Variables -----
  $scope.pageSize = 10;
  $scope.currentPage = 1;
  $scope.maxSize = 5;
  // ------ Pagination Variables -----

  var getAverageSalary = function getAverageSalary(arr, total) {
    var average = Math.round(total / arr.length * 100) / 100;
    return average;
  };

  var getTotalSalary = function getTotalSalary(apiData, gender) {
    var totalSalary = [];

    apiData.forEach(function (index) {
      if (gender === 'w') {
        totalSalary.push(index[1]);
      } else if (gender === 'm') {
        totalSalary.push(index[4]);
      } else {
        return 'error';
      }
    });

    var salarySum = 0;

    salarySum = totalSalary.reduce(function (salarySum, sal) {
      return salarySum + sal * 1;
    }, 0);

    var averageSal = getAverageSalary(totalSalary, salarySum);

    return averageSal;
  };
  $scope.getData = function () {
    mainService.getData().then(function (response) {
      $scope.jobs = response;
      $scope.womenAvgSal = getTotalSalary(response, 'w');
      $scope.menAvgSal = getTotalSalary(response, 'm');
      $scope.values[0].values.push({
        "label": 'Women Avg Salary',
        "value": $scope.womenAvgSal
      }, {
        "label": 'Men Avg Salary',
        "value": $scope.menAvgSal
      });
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
        left: 60
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
        axisLabel: 'Gender'
      },
      yAxis: {
        axisLabel: '$ per Hour',
        axisLabelDistance: 0
      }
    }
  };

  $scope.values = [{
    key: "Cumulative Return",
    values: []
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