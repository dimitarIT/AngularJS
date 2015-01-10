'use strict';

adsApp.controller('MainController',
    function ($scope, $window, $location, $rootScope, $timeout,
              authenticationService, authorizationService, notifyService) {

        $scope.loadHomePage = function () {
            $location.path('/home');
        };

        // Handle refreshing page to store services state and user data
        function init() {
            $scope.loading = true;
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.currentUser = authorizationService.getUsername();

                // show ads nav on refresh if clicked
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

            // This event is sent by LoginController when the user has logged
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
            notifyService.showInfo("Logout successful");
        };

        $scope.loadUserAds = function (adsWithStatus) {
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                if (adsWithStatus === '') {
                    $location.path('/user/ads');
                } else {
                    $location.path('/user/ads/' + adsWithStatus.toLowerCase());
                }
            }
        };
        $scope.clickedMyAds = true;

        // Redirect user to publish-new-add page
        $scope.publishNewAdd = function () {
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.clickedMyAds = false;
                $location.path('/user/publish-new-add');
            }
        };

        // Redirect user to edit-profile page
        $scope.editProfile = function () {
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.clickedMyAds = false;
                $location.path('/user/profile');
            }
        };

        // Activate clicked links on page refresh
        $scope.getClass = function (path) {
            if ($location.path() === path) {
                return "active";
            } else {
                return "";
            }
        };
    });