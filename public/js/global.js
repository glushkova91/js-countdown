requirejs.config({
	"baseUrl": "/js",
	"paths": {
		"jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
	}
});

$(function () {
	requirejs(
		['modules/module.countdown', 'jquery'],
		function (Countdown, $) {

			var endDate = new Date(2016, 0, 1),
				fullCount = new Countdown(),
				simpleCount = new Countdown(),
				secondsCount = new Countdown(),
				daysCount = new Countdown(),
				weeksCount = new Countdown();

			fullCount.init({
				endDate: endDate,
				leadingZero: true,
				weeks: true,
				months: true,
				seconds: true
			});
			simpleCount.init({
				endDate: endDate,
				leadingZero: true,
				onlyHour: true
				//seconds: true
			});
			secondsCount.init({
				endDate: endDate,
				leadingZero: true,
				onlyHour: true,
				seconds: true
			});
			daysCount.init({
				endDate: endDate,
				leadingZero: true
			});
			weeksCount.init({
				endDate: endDate,
				leadingZero: true,
				weeks: true
			});

			var data = [
				{wrap: $('.item-full'), constructor: fullCount},
				{wrap: $('.item-simple'), constructor: simpleCount},
				{wrap: $('.item-seconds'), constructor: secondsCount},
				{wrap: $('.item-days'), constructor: daysCount},
				{wrap: $('.item-weeks'), constructor: weeksCount}
			];

			for (var k = 0; k < data.length; k++) {
				var wrap = data[k].wrap;
				var constructor = data[k].constructor;

				funcTimer(constructor, wrap);
			}

			function funcTimer(constructor, wrap) {

				setTimer(constructor, wrap);

				setInterval(function () {
					setTimer(constructor, wrap);
				}, 1000);
			}

			function setTimer(constructor, wrap) {

				var data = constructor.getDateObject();

				if (!data) $('.result', wrap).text('Лету конец');

				$('.day .value', wrap).html(data.day);
				$('.hour .value', wrap).html(data.hour);
				$('.minute .value', wrap).html(data.minute);
				$('.second .value', wrap).html(data.second);
				$('.months .value', wrap).html(data.month);
				$('.weeks .value', wrap).html(data.week);
			}
		}
	);
});