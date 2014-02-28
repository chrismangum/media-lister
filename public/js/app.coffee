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
    else
      $scope.$on 'data', ->
        $scope.updatePathVars $routeParams.dir
        $scope.$apply()
]

app.controller 'mainCtrl', ['$scope', '$httpBackend',
  ($scope, $httpBackend) ->
    $scope.target = ''
    $scope.data = ''
    $scope.files = ''
    $scope.currDir = ''
    $scope.breadcrumbs = []

    files = files[item].children for item in $scope.breadcrumbs

    $scope.updatePathVars = (reqPath) ->
      if reqPath
        $scope.currDir = '/' + reqPath
        $scope.breadcrumbs = reqPath.split '/'
      else
        $scope.breadcrumbs = []
        $scope.currDir = ''
      $scope.files = getTargetDirFiles $scope.data

    $httpBackend 'GET', '/dir', null, (status, data) ->
      data = angular.fromJson data
      $scope.data = data.files
      $scope.target = data.target.split('/').pop()
      $scope.$broadcast 'data'
]




