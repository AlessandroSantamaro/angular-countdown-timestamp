/**
 *  Angular directive to generate a countdown
 *
 *  @param {string}     countdown-date       (required)          value with the date for the countdown in timestamp format in milliseconds.
 *  @param {string}     today-date           (required)          value with the current date for the countdown in timestamp format
 *  @param {number}     countdown-interval   (default 1000 ms)   value of updating interval for the countdown in milliseconds.
 *  @param {boolean}    show-labels          (default true)      value to hide labels
 *  @param {boolean}    show-days            (default true)      value to hide days in the countdown
 *  @param {boolean}    show-hours           (default true)      value to hide hours in the countdown
 *  @param {boolean}    show-minutes         (default true)      value to hide minutes in the countdown
 *  @param {boolean}    show-seconds         (default true)      value to hide seconds in the countdown
 *
 *  @example <div countdown-timestamp="" countdown-date="date" today-date="today"></div>
 *  @example <div countdown-timestamp="" countdown-date="date" today-date="today" countdown-interval="1000"></div>
 *  @example <div countdown-timestamp="" countdown-date="date" today-date="today" show-labels="false"></div>
 *  @example <div countdown-timestamp="" countdown-date="date" today-date="today" show-seconds="false"></div>
 */
angular.module('alex88na.angular-countdown-timestamp', [])

    .directive('countdownTimestamp', ['$interval', function ($interval) {
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
            templateUrl: 'template.html',
            link: function (scope, elem, attrs) {
                if (scope.showDays === undefined) scope.showDays = true;
                if (scope.showHours === undefined) scope.showHours = true;
                if (scope.showMinutes === undefined) scope.showMinutes = true;
                if (scope.showSeconds === undefined) scope.showSeconds = true;
                if (scope.showLabels === undefined) scope.showLabels = true;


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