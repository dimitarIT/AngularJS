'use strict';

adsApp.controller('MainController',
    function ($scope, $window, $location, $rootScope, $timeout,
              authenticationService, authorizationService) {



        $scope.loadHomePage = function () {
            $location.path('/home');
        };

        /* This event is sent by all other controllers for  error messages */
        $scope.$on('errorHandle', function (event, message) {
            $scope.alertDialog = true;
            $scope.alertMsg = message;
            $scope.alertType = 'danger';

            /* auto hide alert message */
            $timeout(function () {
                $("#current-alert").fadeTo(500, 0).slideUp(500, function () {
                    $scope.alertDialog = false;
                });
            }, 5000);
        });
    });