'use strict';

var adsAppControllers = adsAppControllers || angular.module('adsAppControllers', []);

adsAppControllers.controller('LoginController',
    function loginController ($scope, $rootScope, $location,
                              authenticationService, authorizationService ) {
        $scope.login = function (credentials, loginForm) {
            if (loginForm.$valid) {
                authenticationService.login(credentials)
                    .then(function (data) {
                    authorizationService.setUserSession(data);
                    $rootScope.$broadcast('userHasLogged');
                    $location.path('/home');
                }, function (error) {
                    $scope.errorOccurred = true;
                    if (error.error_description) {
                        $rootScope.$broadcast('errorHandle', error.error_description);
                    } else {
                        $rootScope.$broadcast('errorHandle');
                    }
                });
            }
        }
});
