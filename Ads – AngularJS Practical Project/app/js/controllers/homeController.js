'use strict';

var adsAppControllers = angular.module('adsAppControllers', []);

adsAppControllers.controller('HomeController',
    function homeController($scope, $http, adsData, categoriesData) {

        var ajaxErrorText = 'Something went wrong, please try again or refresh the page.';

        var currentCategoryId = '',
            currentTownId = '',
            currentPage = 1;


        adsData.getAll(1, currentTownId, currentCategoryId)
            .then(function (data) {
                $scope.adsData = data;
                currentPage = 1;
            }, function (error) {
                $scope.alertMsg = ajaxErrorText;
            });

        categoriesData.getAll()
            .then(function(data) {
                $scope.categoriesData = data;
            }, function(error) {
                $scope.alertMsg = ajaxErrorText;
            });
    });