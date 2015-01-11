'use strict';

var adsAppControllers = adsAppControllers || angular.module('adsAppControllers', []);

adsAppControllers.controller('RegisterController',
    function registerController($scope, $rootScope, townsData, $location,
                                authenticationService, authorizationService, notifyService) {
        $scope.registrationActive = true;

        townsData.getAll()
            .then(function (data) {
                $scope.townsData = data;
            }, function (error) {
                notifyService.showError("Cannot load Towns", error);
            });

        $scope.register = function (credentials, registerForm) {
            if (registerForm.$valid) {
                authenticationService.register(credentials)
                    .then(function (data) {
                        authorizationService.setUserSession(data);
                        $scope.registrationActive = false;
                        $location.path('/login');
                        notifyService.showError('User account created. Please login!');
                    }, function (error) {
                        notifyService.showError('Please fill correctly all inputs fields', error);
                    });
            }
        };
    });
