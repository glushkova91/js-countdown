
define(
	'modules/module.countdown',
	['jquery'],
	function ($) {
		return function () {
			var _private = {};

			var _public = {

				init: function (args) {

					_private.endDate = args.endDate;
					_private.leadingZero = args.leadingZero;
					_private.onlyHour = args.onlyHour;
					_private.weeksIs = args.weeks;
					_private.monthsIs = args.months;
					_private.seconds = args.seconds;
				},

				getDateObject: function () {

					var dateObject = {};
					var now = new Date();
					var end = _private.endDate;
					var diff = end - now;
					var days = Math.floor(Math.round(diff) / 86400000);
					var diffMonths = end.getMonth() - now.getMonth();
					var diffDays = end.getDate() - now.getDate();
					var diffYears = end.getFullYear() - now.getFullYear();
					var diffMonthsFull = diffMonths + diffYears * 12;

					// check finish date already came
					if (diff <= 0) return false;

					// check & calculate months
					if (_private.monthsIs && (
						((diffMonths == 1) && (diffDays > 0)) || (diffMonths > 1) || (diffYears > 0))) {

						dateObject.month = (diffDays > 0) ? diffMonthsFull : diffMonthsFull - 1;
						days = (diffDays > 0) ? diffDays : Math.floor(Math.round(end - new Date(end.getFullYear(), end.getMonth() - 1, now.getDate())) / 86400000);

					} else {
						dateObject.month = 0;
					}

					// check & calculate weeks
					if (_private.weeksIs) {

						dateObject.week = Math.floor(days / 7);
						dateObject.day = days % 7;
					} else {

						dateObject.week = 0;
						dateObject.day = (_private.onlyHour) ? 0 : days;
					}

					// calculate hours
					dateObject.hour = 24 - now.getHours() - 1 + ((_private.onlyHour) ? (days * 24) : 0);

					// calculate minutes & check seconds
					if (_private.seconds) {

						dateObject.minute = 60 - now.getMinutes() - 1;
						dateObject.second = 60 - now.getSeconds() - 1;

					} else {

						dateObject.minute = 60 - now.getMinutes();
						dateObject.second = 0;
					}

					// if necessary add zero
					if (_private.leadingZero) {

						for (var item in dateObject) {
							if (dateObject.hasOwnProperty(item)) {
								dateObject[item] = (dateObject[item] < 10) ? "0" + dateObject[item] : dateObject[item];
							}
						}
					}

					return dateObject;
				}
			};

			return _public;
		};
	}
);