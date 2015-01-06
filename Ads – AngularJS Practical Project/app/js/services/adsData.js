'use strict';

adsApp.factory('adsData', function adsData($http, $q, baseUrl) { // TODO add authorization

    function getAllAds(pageNumber, townId, categoryId) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/ads?pagesize=3&startpage=' + pageNumber + '&TownId=' + townId + '&CategoryId=' + categoryId
        })
            .success(function (data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    function getAllAdsByCategories(categoryId, townId, pageNumber) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/ads?pagesize=3&CategoryId=' + categoryId + '&TownId=' + townId + '&startpage=' + pageNumber
        })
            .success(function (data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    function getAllAdsByTown(townId, categoryId, pageNumber) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/ads?pagesize=3&TownId=' + townId + '&CategoryId=' + categoryId + '&startpage=' + pageNumber
        })
            .success(function (data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    function getUserAds() {
        // TODO
    }

    function publishAd() {
        // TODO
    }

    function deactivateAd() {
        // TODO
    }

    function deleteAd() {
        // TODO
    }

    function getAdById() {
        // TODO
    }

    function editAd() {
        // TODO
    }

    return {
        getAll: getAllAds,
        getByTown: getAllAdsByTown,
        getByCategory: getAllAdsByCategories
    };
});
