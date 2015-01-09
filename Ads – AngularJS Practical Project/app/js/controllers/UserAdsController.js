'use strict';
// TODO: ADD Errors
var adsAppControllers = adsAppControllers || angular.module('adsAppControllers', []);

adsAppControllers.controller('UserAdsController',
    function homeController($scope, $rootScope, $location,
                            $modal, $timeout, adsData) {

        $scope.loading = true;
        $scope.noAdsToDisplay = false;

        var adStatus = $location.path().substr(10, $location.path().length);

        var currentCategoryId = '',
            currentTownId = '',
            currentPage = 1;

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
                    $scope.totalAds = parseInt(data.numPages) * 3;
                    currentPage = pageNumber;
                }, function (error) {
                    $rootScope.$broadcast('errorHandle');
                }).finally(function () {
                    $scope.loading = false;
                });
        }


        categoriesData.getAll()
            .then(function (data) {
                $scope.categoriesData = data;
            }, function (error) {
                $rootScope.$broadcast('errorHandle');
            });

        townsData.getAll()
            .then(function (data) {
                $scope.townsData = data;
            }, function (error) {
                $scope.errorOccurred = true;
                $scope.alertMsg = '' ;
            });


        $scope.filterByCategory = function (categoryId, categoryName) {
            adsData.getByCategory(categoryId, currentTownId, currentPage)
                .then(function (data) {
                    $scope.noAdsToDisplay = false;
                    $scope.loading = true;
                    $scope.adsData = data;

                    if (data.ads.length === 0) {
                        $scope.noAdsToDisplay = true;
                    }

                    $scope.totalAds = parseInt(data.numPages) * 3;
                    $scope.categoryFilter = categoryName;
                    currentCategoryId = categoryId;
                }, function (error) {
                    $rootScope.$broadcast('errorHandle');
                }).finally(function () {
                    $scope.loading = false;
                });
        };

        $scope.filterByTown = function (townId, townName) {
            adsData.getByTown(townId, currentCategoryId, currentPage).then(function (data) {
                $scope.noAdsToDisplay = false;
                $scope.loading = true;
                $scope.adsData = data;

                if (data.ads.length === 0) {
                    $scope.noAdsToDisplay = true;
                }

                $scope.totalAds = parseInt(data.numPages) * 3;
                $scope.townFilter = townName;
                currentTownId = townId;
            }, function (error) {
                $rootScope.$broadcast('errorHandle');
            }).finally(function () {
                $scope.loading = false;
            });
        };
    });
