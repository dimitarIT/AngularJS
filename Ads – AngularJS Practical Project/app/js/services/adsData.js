'use strict';

adsApp.factory('adsData', function adsData($http, $q, baseUrl) { // TODO add authorization

    function getAllAds(pageNumber, townId, categoryId) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/ads?pagesize=5&startpage=' + pageNumber + '&TownId=' + townId + '&CategoryId=' + categoryId
        })
            .success(function (data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    function getAllAdsByCategories() {

    }

    function getAllAdsByTown() {

    }

    return {
        getAll: getAllAds,
        getByCategories: getAllAdsByCategories,
        getByTown: getAllAdsByTown
    };
});
