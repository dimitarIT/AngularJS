'use strict';

var adsAppControllers = adsAppControllers || angular.module('adsAppControllers', []);

adsAppControllers.controller('UserAdsController',
    function userAdsController($scope, $rootScope, $location,
                               $timeout, $modal, adsData, notifyService) {
        $scope.loading = true;
        $scope.noAdsToDisplay = false;

        var adStatus = $location.path().substr(10, $location.path().length);

        // Pagination
        var currentPage = 1;
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
            adsData.getUserAds(pageNumber, adStatus)
                .then(function (data) {
                    if (data.ads.length === 0) {
                        $scope.noAdsToDisplay = true;
                    } else {
                        $scope.loading = true;
                        $scope.userAdsData = data;
                        $scope.totalAds = parseInt(data.numItems);
                        currentPage = pageNumber;
                    }
                }, function (error) {
                    notifyService.showError("Cannot load ads", error);
                }).finally(function () {
                    $scope.loading = false;
                });
        }

        // Open a modal dialog to ask user for confirmation of action -
        // requests are executed in the ModalController
        $scope.openModal = function (id, action) {
            var modalInstance = $modal.open({
                templateUrl: './templates/partials/editAd-modal.html',
                controller: 'ModalController',
                backdrop: false,
                keyboard: false,
                resolve: {
                    id: function () {
                        return id;
                    },
                    action: function () {
                        return action;
                    }
                }
            });
        };

        // Open a modal dialog for user to edit ad -
        // request is executed in the EditAdModal controller
        $scope.openEditModal = function (id) {
            var modalInstance = $modal.open({
                templateUrl: './templates/partials/editAd-modal.html',
                controller: 'EditAdModalController',
                backdrop: false,
                keyboard: false,
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
        };
    });
