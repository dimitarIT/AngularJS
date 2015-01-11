'use strict';

var adsAppControllers = adsAppControllers || angular.module('adsAppControllers', []);

adsAppControllers.controller('UserPublishAdController',
    function userPublishAdController($scope, $rootScope, $timeout, adsData, townsData,
                                     categoriesData, authorizationService, notifyService) {
        $scope.nullValue = null;
        $scope.imageData = '';
        $scope.newAdData = {
            townId: null,
            categoryId: null
        };

        // Load towns for drop down
        townsData.getAll()
            .then(function (data) {
                $scope.townsData = data;
            }, function (error) {
                notifyService.showError('Cannot load towns', error);
            });

        // Load categories for drop down
        categoriesData.getAll()
            .then(function (data) {
                $scope.categoriesData = data;
            }, function (error) {
                notifyService.showError('Cannot load category', error);
            });

        // Get uploaded image
        $scope.fileSelected = function (fileInputField) {
            delete $scope.newAdData.imageDataUrl;
            var file = fileInputField.files[0];

            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();

                reader.onload = function () {
                    // Display uploaded image
                    $scope.newAdData.imageDataUrl = reader.result;
                    $('.ad-image').attr('src', reader.result);
                    $('.image-title').attr('value', file.name);
                };
                reader.readAsDataURL(file);
            } else {
                $scope.newAdData.imageDataUrl = null;
                $('.ad-image').attr('src', './img/no_image_available.svg');
                $('.image-title').attr('value', 'file format not supported');
            }
        };

        $scope.publishAd = function (newAdData, newAdForm) {
            if (newAdForm.$valid && authorizationService.userIsLogged()) {
                adsData.publishAd(newAdData)
                    .then(function (data) {
                        notifyService.showInfo
                        ('Advertisement submitted for approval. Once approved, it will be published!');

                        // Clean publish ad form
                        $('.ad-image').attr('src', './img/no_image_available.svg');
                        $('.image-title').attr('value', '');
                        $('#title').val('');
                        $('#text').val('');
                        $('#selectTown').val($scope.nullValue);
                        $('#selectCategory').val($scope.nullValue);
                    }, function (error) {
                        notifyService.showError('Please try again', error);
                    });
            }
        };
    });