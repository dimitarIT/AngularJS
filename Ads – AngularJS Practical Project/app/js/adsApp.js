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
            otherwise({
                redirectTo: '/home'
            });
    }
]).constant('baseUrl', 'http://softuni-ads.azurewebsites.net/api/')