app = angular.module 'app', ['ngRoute']

app.config ($routeProvider) ->
  routeObj =
    template: '<ul ng-include="\'item.html\'"></ul>'
    controller: 'tmpCtrl'
  $routeProvider.when('/:dir*', routeObj).otherwise routeObj

app.controller 'tmpCtrl', ($scope) ->
  $scope.updatePathVars()
  if $scope.data
    $scope.files = $scope.getFiles()

app.controller 'mainCtrl', ($scope, $http, $routeParams) ->
  $rp = $routeParams
  $scope.getFiles = ->
    _.reduce $scope.breadcrumbs, ((files, name) ->
      _.findWhere(files, name: name).children
    ), $scope.data

  $scope.updatePathVars = ->
    $scope.breadcrumbs = if $rp.dir then $rp.dir.split '/' else []
    $scope.currDir = if $rp.dir then '/' + $rp.dir else ''

  $http.get('/dir').then (res) ->
    $scope.target = res.data.target.split('/').pop()
    $scope.data = res.data.files
    $scope.files = $scope.getFiles()
