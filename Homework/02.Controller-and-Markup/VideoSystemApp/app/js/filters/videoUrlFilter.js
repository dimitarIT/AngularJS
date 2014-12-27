angular.module('videoFilters', []).filter('trusted', ['$sce',
    function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }
])
    .filter('checkmark', function () {
        return function (input) {
            return input ? '\u2713' : '\u2718';
        };
    });