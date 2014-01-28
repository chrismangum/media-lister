var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/:dir*', {
      templateUrl: '/static/template.html',
      controller: 'tmpCtrl'
    })
    .otherwise({
      templateUrl: '/static/template.html',
      controller: 'tmpCtrl'
    });
}]);

app.controller('tmpCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
  if ($scope.data) {
    $scope.updatePathVars($routeParams.dir);
  } else {
    $scope.$on('data', function () {
      $scope.updatePathVars($routeParams.dir);
      $scope.$apply();
    });
  }
}]);

app.controller('mainCtrl', ['$scope', '$httpBackend', function ($scope, $httpBackend) {
  $scope.target = '';
  $scope.data = '';
  $scope.files = '';
  $scope.currDir = '';
  $scope.breadcrumbs = [];

  function getFiles(files) {
    _.each($scope.breadcrumbs, function (item, i) {
      files = files[item].children;
    });
    return files;
  }

  $scope.updatePathVars = function (reqPath) {
    $scope.breadcrumbs = [];
    $scope.currDir = '';
    if (reqPath) {
      $scope.currDir = '/' + reqPath;
      $scope.breadcrumbs = reqPath.split('/');
    }
    $scope.files = getFiles($scope.data);
  }

  $httpBackend('GET', '/dir', null, function (status, data) {
    data = angular.fromJson(data);
    $scope.data = data.files;
    $scope.target = data.target.split('/').pop();
    $scope.$broadcast('data');
  });
}]);
