'use strict';

var adsAppControllers = adsAppControllers || angular.module('adsAppControllers', []);

adsAppControllers.controller('HomeController',
    function homeController($scope, $http, $rootScope,
                            adsData, categoriesData, townsData, notifyService) {
        $scope.loading = true;
        $scope.noAdsToDisplay = false;

        $scope.errorOccured = false;
        $scope.alertMsg = '';

        // Buttons value
        $scope.townFilter = 'Town';
        $scope.categoryFilter = 'Category';

        var currentCategoryId = '',
            currentTownId = '',
            currentPage = 1;

        // Pagination
        $scope.totalAds = 0;
        $scope.adsPerPage = 3;
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
                    $scope.loading = true;
                    $scope.adsData = data;
                    $scope.totalAds = parseInt(data.numItems);
                    currentPage = pageNumber;
                }, function (error) {
                    notifyService.showError("Cannot load ads", error);
                }).finally(function () {
                    $scope.loading = false;
                });
        }

        categoriesData.getAll()
            .then(function (data) {
                $scope.categoriesData = data;
            }, function (error) {
                notifyService.showError("Cannot load Categories", error);
            });

        townsData.getAll()
            .then(function (data) {
                $scope.townsData = data;
            }, function (error) {
                $scope.errorOccurred = true;
                notifyService.showError("Cannot load Towns", error);
            });

        // Filter by Category
        $scope.filterByCategory = function (categoryId, categoryName) {
            adsData.getByCategory(categoryId, currentTownId, currentPage)
                .then(function (data) {
                    $scope.noAdsToDisplay = false;
                    $scope.loading = true;
                    $scope.adsData = data;

                    if (data.ads.length === 0) {
                        $scope.noAdsToDisplay = true;
                    }

                    $scope.totalAds = parseInt(data.numItems);
                    $scope.categoryFilter = categoryName;
                    currentCategoryId = categoryId;
                }, function (error) {
                    notifyService.showError("Cannot filtered by category", error);
                }).finally(function () {
                    $scope.loading = false;
                });
        };

        // Filter by Town
        $scope.filterByTown = function (townId, townName) {
            adsData.getByTown(townId, currentCategoryId, currentPage).then(function (data) {
                $scope.noAdsToDisplay = false;
                $scope.loading = true;
                $scope.adsData = data;

                if (data.ads.length === 0) {
                    $scope.noAdsToDisplay = true;
                }

                $scope.totalAds = parseInt(data.numItems);
                $scope.townFilter = townName;
                currentTownId = townId;
            }, function (error) {
                notifyService.showError("Cannot filtered by town", error);
            }).finally(function () {
                $scope.loading = false;
            });
        };
    });
