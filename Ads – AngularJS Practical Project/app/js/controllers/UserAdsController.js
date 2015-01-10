'use strict';
// TODO: ADD Errors

var adsAppControllers = adsAppControllers || angular.module('adsAppControllers', []);

adsAppControllers.controller('UserAdsController',
    function UserAdsController($scope, $rootScope, $location, $timeout, $modal, adsData) {
        $scope.loading = true;
        $scope.noAdsToDisplay = false;

        var adStatus = $location.path().substr(10, $location.path().length);

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
                    $rootScope.$broadcast('alertMessage');
                }).finally(function () {
                    $scope.loading = false;
                });
        }

        /* open a modal dialog to ask user for confirmation of action
         -requests are executed in the modal controler */
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

        /* open a modal dialog for user to edit ad;
         -request is executed in the EditAdModal controler */
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
