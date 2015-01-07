'use strict';

adsApp.factory('authorizationService',
    function authorization($window) {
        var headers;
        var userSession;
        var userData;
        var accessToken;
        var userObject;

        function setUserSession() {
            userSession = {
                accessToken: data.access_token,
                username: data.username
            };

            $window.sessionStorage["currentUser"] = JSON.stringify(userSession);
        }

        function getCurrentUser() {
            userData = sessionStorage['currentUser'];
            if (userData) {
                return JSON.parse(sessionStorage['currentUser']);
            }
        }

        function getUserName() {
            userData = sessionStorage['currentUser'];
            if (userData) {
                userObject = JSON.parse(sessionStorage['currentUser']);
                return userObject.userName;
            }
        }

        function getAccessToken() {
            userData = sessionStorage['currentUser'];
            if (userData) {
                userObject = JSON.parse(sessionStorage['currentUser']);
                return userObject.accessToken;
            }
        }

        function userIsLogged() {
            userData = sessionStorage['currentUser'];
            if (userData) {
                return true;
            } else {
                return false;
            }
        }

        function getAuthorizationHeaders() {
            accessToken = getAccessToken();
            if (accessToken) {
                angular.extend(headers, {Authorization: 'Bearer ' + accessToken});
            }
            return headers;
        }

        function deleteAuthorizationHeaders() {
            delete headers['Authorization'];
        }

        return {
            setUserSession: setUserSession,
            getCurrentUser: getCurrentUser,
            getUserName: getUserName,
            getAccessToken: getAccessToken,
            userIsLogged: userIsLogged,
            getAuthorizationHeaders: getAuthorizationHeaders,
            deleteAuthorizationHeaders: deleteAuthorizationHeaders
        }
    });










