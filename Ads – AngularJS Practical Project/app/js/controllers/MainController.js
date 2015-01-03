'use strict';

adsApp.controller('MainController',
    function ($scope, $window, $location, $rootScope) {
        $scope.loadHomePage = function () {
            $location.path('/home');
        }
    });