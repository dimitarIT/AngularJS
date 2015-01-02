'use strict';

adsApp.factory('categoriesData', function categoriesData($http, $q, baseUrl) {
    function getAllCategories(success, error) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + 'categories'
        })
            .success(function (data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    return {
        getAll: getAllCategories
    };
});