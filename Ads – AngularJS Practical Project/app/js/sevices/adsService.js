'use strict';

adsApp.factory('adsData', function adsData($http, $q, baseUrl) {
    function getAllAdds(pageNumber, townId, categoryId) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/ads?pagesize=5&startpage=' + pageNumber + '&TownId=' + townId + '&CategoryId=' + categoryId
        })
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    function getAllAdsByTown(townId, categoryId, pageNumber) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/ads?pagesize=5&TownId=' + townId + '&CategoryId=' + categoryId + '&startpage=' + pageNumber
        })
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    function getAllAdsByCAtegory(categoryId, townId,  pageNumber) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/ads?pagesize=5&CategoryId=' + categoryId + '&TownId=' + townId + '&startpage=' + pageNumber
        })
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    return{
        getAll: getAllAdds,
        getByTown: getAllAdsByTown,
        getByCategory: getAllAdsByCAtegory
    };
});