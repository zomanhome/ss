angular
  .module('myApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider.when('/table', {
      templateUrl: '/js/view/table.html'
    });
    $routeProvider.when('/form', {
      templateUrl: '/js/view/form.html'
    });
    $routeProvider.otherwise({
      templateUrl: '/js/view/table.html'
    });
  })
  .controller('test2Ctrl', function($scope, $location) {
    $location.path('/table');

    let id;

    $scope.create = function(employee) {
      employee.id = id++;
      $scope.employees.push(employee);
      $location.path('/table');
    };

    $scope.refresh = function() {
      $scope.employees = [
        {
          id: 0,
          name: 'Name 1',
          phone: '380000000001',
          email: 'name1@names.com',
          password: 'name1'
        },
        {
          id: 1,
          name: 'Name 2',
          phone: '380000000002',
          email: 'name2@names.com',
          password: 'name2'
        }
      ];
      id = $scope.employees.length;
    };

    $scope.update = function(employee) {
      for (let i = 0; i < $scope.employees.length; i++) {
        if ($scope.employees[i].id == employee.id) {
          $scope.employees[i] = employee;
          break;
        }
      }
      $location.path('/table');
    };

    $scope.delete = function(employee) {
      $scope.employees.splice($scope.employees.indexOf(employee), 1);
    };

    $scope.cancelEdit = function() {
      $scope.currentEmployee = {};
      $location.path('/table');
    };

    $scope.saveEdit = function(employee) {
      if (angular.isDefined(employee.id)) {
        $scope.update(employee);
      } else {
        $scope.create(employee);
      }
    };

    $scope.editOrCreate = function(employee) {
      $scope.currentEmployee = employee ? angular.copy(employee) : {};
      $location.path('/form');
    };

    $scope.refresh();
  });
