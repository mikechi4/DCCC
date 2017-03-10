angular.module('myApp')
  .directive('graphDirective', function() {
    return {
      restrict: 'E',
      templateUrl: './js/directives/graphDirective/graphDirective.html',
      scope:{
        job: '='
      },
      controller: ($scope) => {
        var ChartVal = function(label, value) {
          this.label = label;
          this.value = value;
        }


        $scope.$watch('job', () => {
          const thisWomenSalary = $scope.job[1] * 1;
          const thisMenSalary = $scope.job[4] * 1;
          const womenLabel = "Women Avg Salary";
          const menLabel = "Men Avg Salary";

          var womenSalary = new ChartVal(womenLabel, thisWomenSalary);
          $scope.values[0].values.push(womenSalary);
          var menSalary = new ChartVal(menLabel, thisMenSalary);
          $scope.values[0].values.push(menSalary);
        })
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
      }
    }
  })
