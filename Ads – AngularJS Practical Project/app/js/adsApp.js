'use strict';

var adsApp = angular.module('adsApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'adsAppControllers'
]);

adsApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
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