app = angular.module 'app', ['ngRoute']

app.config ['$routeProvider', ($routeProvider) ->
  routeObj =
    templateUrl: '/static/template.html'
    controller: 'tmpCtrl'
  $routeProvider
    .when '/:dir*', routeObj
    .otherwise routeObj
]

app.controller 'tmpCtrl', ['$scope', ($scope) ->
  if $scope.data
    $scope.updatePathVars()
    $scope.files = $scope.parseData($scope.data)
]

app.controller 'mainCtrl', ['$scope', '$http', '$routeParams'
  ($scope, $http, $rp) ->

    $scope.parseData = (files) ->
      for item in $scope.breadcrumbs
        files = files[item].children
      files

    $scope.updatePathVars = ->
      $scope.breadcrumbs = if $rp.dir then $rp.dir.split '/' else []
      $scope.currDir = if $rp.dir then '/' + $rp.dir else ''

    $http.get('/dir').success (data) ->
      $scope.data = data.files
      $scope.target = data.target.split('/').pop()
      $scope.updatePathVars()
      $scope.files = $scope.parseData($scope.data)
]
