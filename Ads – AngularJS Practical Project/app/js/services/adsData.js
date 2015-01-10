'use strict';

adsApp.factory('adsData', function adsData($http, $q, baseUrl, authorizationService) {
    function adsRequester(method, url, data) {
        var deferred = $q.defer();

        var headers = authorizationService.getAuthorizationHeaders();
        $http({
            method: method,
            url: url,
            data: data,
            headers: headers
        })
            .success(function (data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    var getAllAds = function (pageNumber, townId, categoryId) {
        return adsRequester('GET', baseUrl + '/ads?pagesize=5&startpage=' + pageNumber +
        '&TownId=' + townId + '&CategoryId=' + categoryId, null);
    };

    var getAllAdsByTown = function (townId, categoryId, pageNumber) {
        return adsRequester('GET', baseUrl + '/ads?pagesize=5&TownId=' + townId +
        '&CategoryId=' + categoryId + '&startpage=' + pageNumber, null);
    };

    var getAllAdsByCategories = function (categoryId, townId, pageNumber) {
        return adsRequester('GET', baseUrl + '/ads?pagesize=5&CategoryId=' + categoryId +
        '&TownId=' + townId + '&startpage=' + pageNumber, null);
    };

    var getUserAds = function (pageNumber, adsWithStatus) {
        return adsRequester('GET', baseUrl + '/user/ads?pagesize=3&startpage=' +
        pageNumber + '&status=' + adsWithStatus, null);
    };

    var publishAd = function (newAdData) {
        return adsRequester('POST', baseUrl + '/user/ads', newAdData);
    };

    var deactivateAd = function (id) {
        return adsRequester('PUT', baseUrl + '/user/ads/deactivate/' + id, null);
    };

    var publishAgainAd = function (id) {
        return adsRequester('PUT', baseUrl + '/user/ads/publishagain/' + id, null);
    };

    var deleteAd = function (id) {
        return adsRequester('DELETE', baseUrl + '/user/ads/' + id, null);
    };

    var getAdById = function (id) {
        return adsRequester('GET', baseUrl + '/user/ads/' + id, null);
    };

    var editAd = function (id, editAdData) {
        return adsRequester('PUT', baseUrl + '/user/ads/' + id, editAdData);
    };

    return {
        getAll: getAllAds,
        getByTown: getAllAdsByTown,
        getByCategory: getAllAdsByCategories,
        getUserAds: getUserAds,
        publishAd: publishAd,
        deactivateAd: deactivateAd,
        publishAgainAd: publishAgainAd,
        deleteAd: deleteAd,
        getAdById: getAdById,
        editAd: editAd
    };
});
