'use strict';

adsApp.factory('userProfile', function($http, $q, baseUrl, authorizationService) {
    function userRequester(method, url, data) {
        var deferred = $q.defer();
        var headers = authorizationService.getAuthorizationHeaders();

        $http({
            method: method,
            url: url,
            headers: headers,
            data: data
        })
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    var getProfile = function() {
        return userRequester('GET', baseUrl + '/user/profile', null);
    };

    var ediProfile = function(data) {
        return userRequester('PUT', baseUrl + '/user/profile', data);
    };

    var changePassword = function(data) {
        return userRequester('PUT', baseUrl + '/user/changePassword', data);
    };

    return {
        getProfile: getProfile,
        ediProfile: ediProfile,
        changePassword: changePassword
    };
});