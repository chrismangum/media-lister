app = angular.module 'app', ['ngRoute']

app.config ['$routeProvider', ($routeProvider) ->
  routeObj =
    templateUrl: '/static/template.html'
    controller: 'tmpCtrl'
  $routeProvider
    .when '/:dir*', routeObj
    .otherwise routeObj
]

app.controller 'tmpCtrl', ['$scope', '$routeParams',
  ($scope, $routeParams) ->
    if $scope.data
      $scope.updatePathVars $routeParams.dir
]

app.controller 'mainCtrl', ['$scope', '$http',
  ($scope, $http) ->
    $scope.target = ''
    $scope.data = ''
    $scope.files = ''
    $scope.currDir = ''
    $scope.breadcrumbs = []

    getTargetDirFiles = (files) ->
      for item in $scope.breadcrumbs
        files = files[item].children
      files

    $scope.updatePathVars = (reqPath) ->
      if reqPath
        $scope.currDir = '/' + reqPath
        $scope.breadcrumbs = reqPath.split '/'
      else
        $scope.breadcrumbs = []
        $scope.currDir = ''
      $scope.files = getTargetDirFiles $scope.data

    $http.get('/dir').success (data) ->
      $scope.data = data.files
      $scope.target = data.target.split('/').pop()
      $scope.updatePathVars $routeParams.dir
]
