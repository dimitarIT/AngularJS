'use strict';

var adsAppControllers = adsAppControllers || angular.module('adsAppControllers', []);

adsAppControllers.controller('UserProfileController',
    function userProfileController($scope, $rootScope, $route,
                                   userProfile, townsData, notifyService) {

        // Load towns for drop down
        townsData.getAll()
            .then(function (data) {
                $scope.townsData = data;
            }, function (error) {
                notifyService.showError('Cannot load towns', error);
            });

        userProfile.getProfile()
            .then(function (data) {
                $scope.currentuser = data;
                $scope.editProfileForm = {
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber ? data.phoneNumber : '',
                    townId: data.townId ? data.townId : null
                };
            }, function (error) {
                notifyService.showError('Cannot load user profile', error);
            });

        $scope.updateProfile = function (editProfileForm) {
            if (!editProfileForm.name || !editProfileForm.email || !editProfileForm.phoneNumber) {
                return;
            }

            userProfile.ediProfile(editProfileForm)
                .then(function (data) {
                    $route.reload();
                    notifyService.showInfo('Your profile is update', data.message);
                }, function (error) {
                    notifyService.showError('Cannot edit user profile', error);
                });
        };

        $scope.changePassword = function (credentials, changePasswordForm) {
            if (!credentials.newPassword || !credentials.confirmPassword || !credentials.oldPassword) {
                return;
            }

            userProfile.changePassword(credentials)
                .then(function (data) {
                    $route.reload();
                    notifyService.showInfo('Your password is changed', data.message);
                }, function (error) {
                    notifyService.showError('Cannot edit user password', error);
                });
        };
    });
