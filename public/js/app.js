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

app.controller('tmpCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  var url = '/dir';
  $scope.currDir = '';
  $scope.breadcrumbs = '';
  if ($routeParams.dir) {
    url += '/' + $routeParams.dir;
    $scope.currDir += '/' + $routeParams.dir;
    $scope.breadcrumbs = $routeParams.dir.split('/');
  }
  $http.get(url).success(function (data) {
    $scope.files = data.files;
    $scope.target = data.target.split('/').pop();
  });
}]);

app.controller('mainCtrl', function () {});
