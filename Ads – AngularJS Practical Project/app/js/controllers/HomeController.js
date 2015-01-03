'use strict';

var adsAppControllers = angular.module('adsAppControllers', []);

adsAppControllers.controller('HomeController',
    function homeController($scope, $http, adsData, categoriesData, townsData) {
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

        $scope.totalAds = 0;
        $scope.adsPerPage = 5;
        getResultsPage(1);

        $scope.pagination = {
            current: 1
        };

        $scope.pageChanged = function (newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(pageNumber) {
            adsData.getAll(pageNumber, currentTownId, currentCategoryId)
                .then(function (data) {
                    $scope.adsData = data;
                    $scope.totalAds = parseInt(data.numPages) * 5;
                    currentPage = pageNumber;
                }, function (error) {
                    $scope.errorOccurred = true;
                    $scope.alertMsg = ajaxErrorText;
                });

        }

        categoriesData.getAll()
            .then(function (data) {
                $scope.categoriesData = data;
            }, function (error) {
                $scope.errorOccurred = true;
                $scope.alertMsg = ajaxErrorText;
            });

        townsData.getAll()
            .then(function (data) {
                $scope.townsData = data;
            }, function (error) {
                $scope.errorOccurred = true;
                $scope.alertMsg = ajaxErrorText;
            });


        $scope.filterByCategory = function () {

        };

        $scope.filterByTown = function () {

        };

    });
