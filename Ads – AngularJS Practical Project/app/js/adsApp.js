'use strict';

var adsApp = angular.module('adsApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'adsAppControllers'
]);

adsApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'templates/login.html'
            }).
            when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'RegisterController'
            }).
            when('/home', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }
])
    .constant('baseUrl', 'http://softuni-ads.azurewebsites.net/api');