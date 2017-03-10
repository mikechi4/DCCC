angular.module('myApp').controller('mainCtrl', function ($scope, mainService) {
  // ------ Pagination Variables -----
  $scope.pageSize = 10;
  $scope.currentPage = 1;
  $scope.maxSize = 5;
  // ------ Pagination Variables -----
  
  const getAverageSalary = function getAverageSalary(arr, total) {
    const average = Math.round(total / arr.length * 100) / 100;
    return average;
  };

  const getTotalSalary = function getTotalSalary(apiData, gender) {
    const totalSalary = [];

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

    const averageSal = getAverageSalary(totalSalary, salarySum);

    return averageSal;
  };
  $scope.getData = function () {
    mainService.getData().then(function (response) {
      $scope.jobs = response;
      $scope.womenAvgSal = getTotalSalary(response, 'w');
      $scope.menAvgSal = getTotalSalary(response, 'm');
      $scope.values[0].values.push({
        "label":'Women Avg Salary',
        "value": $scope.womenAvgSal
      },
      {
        "label":'Men Avg Salary',
        "value": $scope.menAvgSal
      })
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
