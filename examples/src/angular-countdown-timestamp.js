var angularCountdownTimestampApp = angular.module("myApp", []);

angularCountdownTimestampApp.controller("CountdownController", function ($scope) {
    $scope.response = {
        date: "1496188800000", // Wed, 31 May 2017 00:00:00 GMT
        today: "1483228800000" // Sun, 01 Jan 2017 00:00:00 GMT
    };
});

angularCountdownTimestampApp.directive('countdownTimestamp', ['$interval', function ($interval) {
    return {
        restrict: 'EA',
        scope: {
            countdownDate: '=countdownDate',
            todayDate: '=todayDate',
            countdownInterval: '=countdownInterval',
            showDays: "=?showDays",
            showHours: "=?showHours",
            showMinutes: "=?showMinutes",
            showSeconds: "=?showSeconds",
            showLabels: "=?showLabels"
        },
        // templateUrl: 'template.html', // TODO Use templateUrl in production or in a server such as in dist folder
        template: '<div class="countdown-date">' +
        '<div class="countdown-block" ng-if="showDays">' +
        '<div class="countdown-item countdown-days">' +
        '<span>{{days}}</span>' +
        '</div>' +
        '<div ng-if="showLabels" class="countdown-label text-uppercase">' +
        '<span>DAYS</span>' +
        '</div>' +
        '</div>' +
        '<div class="countdown-block" ng-if="showHours">' +
        '<div class="countdown-item countdown-hours">' +
        '<span>{{hours}}</span>' +
        '</div>' +
        '<div ng-if="showLabels" class="countdown-label text-uppercase">' +
        '<span>HOURS</span>' +
        '</div>' +
        '</div>' +
        '<div class="countdown-block" ng-if="showMinutes">' +
        '<div class="countdown-item countdown-minutes">' +
        '<span>{{minutes}}</span>' +
        '</div>' +
        '<div ng-if="showLabels" class="countdown-label text-uppercase">' +
        '<span>MINUTES</span>' +
        '</div>' +
        '</div>' +
        '<div class="countdown-block" ng-if="showSeconds">' +
        '<div class="countdown-item countdown-seconds">' +
        '<span>{{seconds}}</span>' +
        '</div>' +
        '<div ng-if="showLabels" class="countdown-label text-uppercase">' +
        '<span>SECONDS</span>' +
        '</div>' +
        '</div>' +
        '</div>',
        link: function (scope, elem, attrs) {
            if(scope.showDays === undefined) scope.showDays = true;
            if(scope.showHours === undefined) scope.showHours = true;
            if(scope.showMinutes === undefined) scope.showMinutes = true;
            if(scope.showSeconds === undefined) scope.showSeconds = true;
            if(scope.showLabels === undefined) scope.showLabels = true;


            elem.ready(function () {
                const SECOND = 1000;
                const MINUTE = SECOND * 60;
                const HOUR = MINUTE * 60;
                const DAY = HOUR * 24;

                var dateDifference = scope.countdownDate - scope.todayDate;

                var countdownIntervalMillisecond = scope.countdownInterval;

                if (!countdownIntervalMillisecond) countdownIntervalMillisecond = 1000;

                if (dateDifference > 0) {
                    splitDate(dateDifference);

                    var updateCountdown = $interval(function () {
                        dateDifference -= countdownIntervalMillisecond;
                        if (dateDifference <= 0) {
                            stopCountDown();
                        }
                        splitDate(dateDifference);
                    }, countdownIntervalMillisecond, 0);

                    scope.$on('$destroy', function () {
                        stopCountDown();
                    });

                } else {
                    // Expired date
                    scope.days = 0;
                    scope.hours = 0;
                    scope.minutes = 0;
                    scope.seconds = 0;
                }

                function splitDate(dateDifference) {
                    scope.days = Math.floor(dateDifference / DAY);
                    scope.hours = Math.floor((dateDifference % DAY) / HOUR);
                    scope.minutes = Math.floor((dateDifference % HOUR) / MINUTE);
                    scope.seconds = Math.floor((dateDifference % MINUTE) / SECOND);
                }

                function stopCountDown() {
                    debugger;
                    $interval.cancel(updateCountdown);
                    updateCountdown = undefined;
                }
            });
        }
    }
}]);