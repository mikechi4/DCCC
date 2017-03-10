angular.module('myApp')
  .controller('mainCtrl', ($scope, mainService) => {

    const getAverageSalary = (arr, total) => {
      var average = total / arr.length;
      return average;
    }

    const getTotalSalary = (apiData) => {
      const womenTotalSalary = [];
      const menTotalSalary = [];

      apiData.forEach((index) => {
        womenTotalSalary.push(index[1]);
        menTotalSalary.push(index[4]);
      })

      var womenSalSum = 0;
      var menSalSum = 0;
      womenSalSum = womenTotalSalary.reduce((womenSalSum, sal) => {
        return (womenSalSum + (sal * 1));
      }, 0);
      menSalSum = menTotalSalary.reduce((menSalSum, sal) => {
        return (menSalSum + (sal * 1));
      }, 0);

      var womenAvg = getAverageSalary(womenTotalSalary, womenSalSum);
      var menAvg = getAverageSalary(menTotalSalary, menSalSum);
    }
    $scope.getData = () => {
      mainService.getData().then((response) => {
        $scope.jobs = response;
        getTotalSalary(response);
      })
    }
    $scope.getData();

  $scope.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d){return d.label;},
        y: function(d){return d.value + (1e-10);},
        showValues: true,
        valueFormat: function(d){
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

    $scope.values = [
      {
        key: "Cumulative Return",
        values: [
          {
            "label" : "A" ,
            "value" : 29.765957771107
          } ,
          {
            "label" : "B" ,
            "value" : 12
          } ,
          {
            "label" : "C" ,
            "value" : 32.807804682612
          }
        ]
      }
    ]
  })
