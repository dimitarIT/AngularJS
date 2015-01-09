'use strict';

var adsApp = angular.module('adsApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'angularUtils.directives.dirPagination',
    'adsAppControllers'
]);

adsApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            }).
            when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            }).
            when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'RegisterController'
            }).
            when('/user/ads', {
                templateUrl: 'templates/user-home-ads.html',
                controller: 'UserAdsController'
            }).
            when('/user/ads/published', {
                templateUrl: 'templates/user-home-ads.html',
                controller: 'UserAdsController'
            }).
            when('/user/ads/waitingapproval', {
                templateUrl: 'templates/user-home-ads.html',
                controller: 'UserAdsController'
            }).
            when('/user/ads/inactive', {
                templateUrl: 'templates/user-home-ads.html',
                controller: 'UserAdsController'
            }).
            when('/user/ads/rejected', {
                templateUrl: 'templates/user-home-ads.html',
                controller: 'UserAdsController'
            }).
            when('/user/publish-new-add', {
                templateUrl: 'templates/user-publish-new-add.html',
                controller: 'UserPublishAdController'
            }).
            when('/user/profile', {
                templateUrl: 'templates/user-profile.html',
                controller: 'UserProfileController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }
]).constant('baseUrl', 'http://softuni-ads.azurewebsites.net/api/')