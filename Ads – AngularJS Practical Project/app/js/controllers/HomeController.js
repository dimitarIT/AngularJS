'use strict';

var adsAppControllers = angular.module('adsAppControllers', []);

adsAppControllers.controller('HomeController',
    function homeController($scope, $http, adsData, categoriesData) {
        // TODO Check for Errors
        $scope.errorOccured = false;
        $scope.alertMsg = '';
        var ajaxErrorText = 'Something went wrong, please try again or refresh the page.';

        $scope.closeAlert = function () {
            $scope.errorOccurred = false;
        };

        $scope.townFilter = 'Town';
        $scope.categoryFilter = 'Category';

        var currentCategoryId = '',
            currentTownId = '',
            currentPage = 1;

        adsData.getAll(1, currentTownId, currentCategoryId)
            .then(function (data) {
                $scope.adsData = data;
                $scope.totalAds = parseInt(data.numPages) * 5;
                currentPage = 1;
            }, function (error) {
                $scope.errorOccurred = true;
                $scope.alertMsg = ajaxErrorText;
            });

        categoriesData.getAll()
            .then(function (data) {
                $scope.categoriesData = data;
            }, function (error) {
                $scope.errorOccurred = true;
                $scope.alertMsg = ajaxErrorText;
            });
    });