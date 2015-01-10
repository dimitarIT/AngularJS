'use strict';

adsApp.controller('ModalController',
    function modalController($scope, $rootScope, $route, $modalInstance,
                             adsData, id, action, notifyService) {
        $scope.id = id;
        $scope.action = action;

        // Get selected ad
        adsData.getAdById(id)
            .then(function (data) {
                $scope.currentAd = data;
            }, function (error) {
                notifyService.showError("Cannot load ads", error);
            });

        // Confirm ad editing - Deactivate, Delete, Publish again
        $scope.ok = function () {
            $modalInstance.close();

            // Check for action sent by $modal
            switch (action) {
                case 'Deactivate':
                    adsData.deactivateAd(id)
                        .then(function (data) {
                            $route.reload();
                            notifyService.showInfo('Ad deactivated', data.message);
                        }, function (error) {
                            notifyService.showError('Cannot deactivate ad', error);
                        });
                    break;

                case 'Delete':
                    adsData.deleteAd(id)
                        .then(function (data) {
                            $route.reload();
                            notifyService.showInfo('Ad deleted', data.message);
                        }, function (error) {
                            notifyService.showError('Cannot delete ad', error);
                        });
                    break;

                case 'Publish again':
                    adsData.publishAgainAd(id)
                        .then(function (data) {
                            $route.reload();
                            notifyService.showInfo('It was moved into your Waiting Approval Ads.', data.message);
                        }, function (error) {
                            notifyService.showError('Cannot edit ad', error);
                        });
                    break;

                default:
                    break;
            }
        };

        // Close modal dialog
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });