'use strict';

var adsAppControllers = adsAppControllers || angular.module('adsAppControllers', []);

adsAppControllers.controller('RegisterController',
    function registerController($scope, $rootScope, townsData,
                                authenticationService, authorizationService) {

        $scope.registrationActive = true;

        townsData.getAll()
            .then(function (data) {
                $scope.townsData = data;
            }, function (error) {
                $rootScope.$broadcast('errorHandle');
            });

        $scope.register = function (credentials, registerForm) {
            if (registerForm.$valid) {
                authenticationService.register(credentials)
                    .then(function (data) {
                        authorizationService.setUserSession(data);
                        $scope.registrationActive = false;
                        $rootScope.$broadcast('operatonSuccessfull', 'User account created.Please login');
                    }, function (error) {
                        // TODO;
                    });
            }
        };

        // TODO: handle errors with registration data
    });
