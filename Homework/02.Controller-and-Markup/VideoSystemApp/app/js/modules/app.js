var videoSystemApp = angular.module('videoSystemApp', [
    'ngSanitize',
    'ngRoute',
    'videoAppControllers',
    'videoFilters'
]);

videoSystemApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/videos', {
                templateUrl: 'templates/video-list.html',
                controller: 'videoController'
            }).
            when('/add-new-video', {
                //TODO
            }).
            otherwise({
                redirectTo: '/videos'
            });
    }
]);