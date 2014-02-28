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
    '$scope', '_', '$httpBackend', function($scope, _, $httpBackend) {
      var getTargetDirFiles;
      $scope.target = '';
      $scope.data = '';
      $scope.files = '';
      $scope.currDir = '';
      $scope.breadcrumbs = [];
      getTargetDirFiles = function(files) {
        _.each($scope.breadcrumbs, function(item) {
          return files = files[item].children;
        });
        return files;
      };
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

  app.factory('_', function() {
    return _;
  });

}).call(this);
