'use strict';

var adsAppControllers = adsAppControllers || new angular.module('adsAppControllers', []);

adsAppControllers.controller('LoginController',
    function loginController($scope, $rootScope, $location,
                             authenticationService, authorizationService, notifyService) {
        $scope.login = function (credentials, loginForm) {
            if (loginForm.$valid) {
                authenticationService.login(credentials)
                    .then(function (data) {
                        authorizationService.setUserSession(data);
                        $rootScope.$broadcast('userHasLogged');
                        $location.path('/home');
                    }, function (error) {
                        $scope.errorOccurred = true;
                        if (error) {
                            notifyService.showError("Login failed", error);
                        } else {
                            notifyService.showError("Login failed", error);
                        }
                    });
            }
        }
    });
