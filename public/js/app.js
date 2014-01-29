var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
    var routeObj = {
      templateUrl: '/static/template.html',
      controller: 'tmpCtrl'
    };
    $routeProvider
      .when('/:dir*', routeObj)
      .otherwise(routeObj);
  }
]);

app.controller('tmpCtrl', ['$scope', '$routeParams',
  function ($scope, $routeParams) {
    if ($scope.data) {
      $scope.updatePathVars($routeParams.dir);
    } else {
      $scope.$on('data', function () {
        $scope.updatePathVars($routeParams.dir);
        $scope.$apply();
      });
    }
  }
]);

app.controller('mainCtrl', ['$scope', '_', '$httpBackend',
  function ($scope, _, $httpBackend) {
    $scope.target = '';
    $scope.data = '';
    $scope.files = '';
    $scope.currDir = '';
    $scope.breadcrumbs = [];

    function getTargetDirFiles(files) {
      _.each($scope.breadcrumbs, function (item) {
        files = files[item].children;
      });
      return files;
    }

    $scope.updatePathVars = function (reqPath) {
      if (reqPath) {
        $scope.currDir = '/' + reqPath;
        $scope.breadcrumbs = reqPath.split('/');
      } else {
        $scope.breadcrumbs = [];
        $scope.currDir = '';
      }
      $scope.files = getTargetDirFiles($scope.data);
    }

    $httpBackend('GET', '/dir', null, function (status, data) {
      data = angular.fromJson(data);
      $scope.data = data.files;
      $scope.target = data.target.split('/').pop();
      $scope.$broadcast('data');
    });
  }
]);

app.factory('_', function() {
  return _;
});
