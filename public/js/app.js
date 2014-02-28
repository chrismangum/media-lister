(function() {
  var app;

  app = angular.module('app', ['ngRoute']);

  app.config([
    '$routeProvider', function($routeProvider) {
      var routeObj;
      routeObj = {
        templateUrl: '/static/template.html',
        controller: 'tmpCtrl'
      };
      return $routeProvider.when('/:dir*', routeObj).otherwise(routeObj);
    }
  ]);

  app.controller('tmpCtrl', [
    '$scope', '$routeParams', function($scope, $routeParams) {
      if ($scope.data) {
        return $scope.updatePathVars($routeParams.dir);
      } else {
        return $scope.$on('data', function() {
          $scope.updatePathVars($routeParams.dir);
          return $scope.$apply();
        });
      }
    }
  ]);

  app.controller('mainCtrl', [
    '$scope', '$httpBackend', function($scope, $httpBackend) {
      var files, item, _i, _len, _ref;
      $scope.target = '';
      $scope.data = '';
      $scope.files = '';
      $scope.currDir = '';
      $scope.breadcrumbs = [];
      _ref = $scope.breadcrumbs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        files = files[item].children;
      }
      $scope.updatePathVars = function(reqPath) {
        if (reqPath) {
          $scope.currDir = '/' + reqPath;
          $scope.breadcrumbs = reqPath.split('/');
        } else {
          $scope.breadcrumbs = [];
          $scope.currDir = '';
        }
        return $scope.files = getTargetDirFiles($scope.data);
      };
      return $httpBackend('GET', '/dir', null, function(status, data) {
        data = angular.fromJson(data);
        $scope.data = data.files;
        $scope.target = data.target.split('/').pop();
        return $scope.$broadcast('data');
      });
    }
  ]);

}).call(this);
