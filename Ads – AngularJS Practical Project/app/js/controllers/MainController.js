'use strict';

adsApp.controller('MainController',
    function ($scope, $window, $location, $rootScope, $timeout,
              authenticationService, authorizationService) {

        $scope.loadHomePage = function () {
            $location.path('/home');
        };

        function init() {
            $scope.loading = true;
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.currentUser = authorizationService.getUsername();

                // show my ads nav on refresh if clicked
                var currentUrl = $location.path();
                if (currentUrl === '/user/ads' || currentUrl === '/user/ads/published' ||
                    currentUrl === '/user/ads/waitingapproval' || currentUrl === '/user/ads/inactive' ||
                    currentUrl === '/user/ads/rejected') {
                    $scope.clickedMyAds = true;
                }
            } else {
                $scope.userIsLogged = false;
                $scope.clickedMyAdds = false;
            }

            /* This event is sent by LoginController when the user has logged
             to hide login/register buttons */
            $rootScope.$on("userHasLogged", function () {
                $scope.userIsLogged = true;
                $scope.currentUser = authorizationService.getUsername();
            });
        }

        init();

        $scope.logout = function () {
            authenticationService.logout();
            $scope.userIsLogged = false;
            $scope.clickedMyAds = false;
            $location.path('/home');

           // TODO: add alert message
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