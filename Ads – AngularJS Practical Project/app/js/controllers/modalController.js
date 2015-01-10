'use strict';

adsApp.controller('ModalController',
    function modalController($scope, $rootScope, $route, $modalInstance, adsData, id, action) {
        $scope.id = id;
        $scope.action = action;

        /* get selected ad */
        adsData.getAdById(id).then(function (data) {
            $scope.currentAd = data;
        }, function (error) {
            $rootScope.$broadcast('alertMessage');
        });

        //confirm CRUD operation on ad
        $scope.ok = function () {
            $modalInstance.close();
            /* perform CRUD opration on ad depending on  requested action and id sent by the 
             $modal reslove functions */
            switch (action) {
                case 'Deactivate':
                    adsData.deactivateAd(id).then(function (data) {
                        $route.reload();
                        $rootScope.$broadcast('alertMessage', data.message +
                        "It was moved into your Inactive Ads.");
                    }, function (error) {
                        $rootScope.$broadcast('alertMessage', ajaxErrorText);
                    });
                    break;
                case 'Delete':
                    adsData.deleteAd(id).then(function (data) {
                        $route.reload();
                        $rootScope.$broadcast('alertMessage', data.message);
                    }, function (error) {
                        $rootScope.$broadcast('alertMessage');
                    });
                    break;
                case 'Publish again':
                    adsData.publishAgainAd(id).then(function (data) {
                        $route.reload();
                        $rootScope.$broadcast('alertMessage', data.message +
                        "It was moved into your Waiting Approval Ads.");
                    }, function (error) {
                        $rootScope.$broadcast('alertMessage');
                    });
                    break;
                default:
                    break;
            }
        };

        /* close modal dialog */
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });