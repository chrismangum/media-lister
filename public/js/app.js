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
  function getDirFiles(files) {
    _.each($scope.breadcrumbs, function (item, i) {
      files = files[item].children;
    });
    return files;
  }
  function updateDirFiles() {
    if ($routeParams.dir) {
      $scope.currDir += '/' + $routeParams.dir;
      $scope.breadcrumbs = $routeParams.dir.split('/');
    }
    $scope.dirFiles = getDirFiles($scope.files);
  }
  if ($scope.files) {
    updateDirFiles();
  } else {
    $scope.$on('update', function () {
      updateDirFiles();
      $scope.$apply();
    });
  }
}]);

app.controller('mainCtrl', ['$scope', '$httpBackend', '$routeParams', function ($scope, $httpBackend, $routeParams) {
  $scope.target = '';
  $scope.files = '';
  $scope.dirFiles = '';
  $scope.currDir = '';
  $scope.breadcrumbs = [];

  $httpBackend('GET', '/dir', null, function (status, data) {
    data = angular.fromJson(data);
    $scope.files = data.files;
    $scope.target = data.target.split('/').pop();
    $scope.$broadcast('update');
  });
}]);
