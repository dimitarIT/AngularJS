var videoAppControllers = angular.module('videoAppControllers', []);

videoAppControllers.controller('videoController', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('videos/videos.json')
            .success(function (data) {
                $scope.videos = data;
            });

        $scope.orderProp = 'title';

        $scope.upVote = function (comment) {
            comment.likes++;
        };

        $scope.downVote = function (comment) {
            if (comment.likes > 0) {
                comment.likes--;
            }
        };
    }
]);

videoAppControllers.controller('newVideoController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.newVideo = {
            title: '',
            videoUrl: '',
            category: '',
            length: 0,
            subscribers: 0,
            date: new Date().toDateString(),
            haveSubtitles: false,
            comments: []
        };

        var newData = $scope.newVideo;

        $scope.addVideoEvent = function () {
            // get data from videos.json
            $http.get('videos/videos.json')
                .success(function (data) {
                    // push new video data to object and stringify it
                    data.push(newData);
                    var newObj = JSON.stringify(data);
                    //post new JSON object file to videos directory
                    $http.post('videos/videos', newObj)
                        .success(function () {
                            window.location.href = "#/videos";
                        });
                });
        };
    }
]);