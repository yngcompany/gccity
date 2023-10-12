$(function() {
	$.ajax({
		// async: false,
		cache: false,
		// crossDomain: true,
		// processData: true,
		type: "POST",
		data: { ajax: true },
		url: "/weather.json",
		dataType: "text",
		contentType: "application/json; charset=utf-8",
		success: function(data) {
			var j = JSON.parse(data);
			if (j.none != 'none') {
				var day = j.day;
				var weather = j.weather;
				// 날씨 설명
				var tempDesc = j.sky;
				// $("#weather_temp_ko").text(weather_icon_text(j.weather));
				$("#weather_icon").attr("src", "/common/img/weather/img_weather_" + weather_icon_number(j.weather) + ".png");
				$("#weather_icon").attr("alt", weather_icon_text(j.weather));

				// 기온
				var paren = parseFloat(j.t1h).toFixed(0);
				$("#weather_temp").find("span").text(paren);

				// 대기 환경 지수
				var isKhai = false;
				$.each(j, function(key, value) {
					// console.log(key, value);
					if (key == 'pollusionInfo') {
						isKhai = true;
					}
				});

				if (isKhai) {
					var khaiGradeHanValue = weather_khai_grade_ko(j.pollusionInfo.pm25Grade1h);
					if (j.pollusionInfo.khaiGrade != '') {
						$("#weather_air_level").text(khaiGradeHanValue);
					}
				}
				$("#weather_air_level").text(weather_khai_grade_ko(j.pollusionInfo.pm10Grade));
				$("#weather_air_level02").text(weather_khai_grade_ko(j.pollusionInfo.pm25Grade));
			} else {
				$("#weather_icon").attr("src", "/common/img/weather/img_weather_01.png");
				$("#weather_icon").attr("alt", weather_icon_text(j.weather));
				$("#weather_temp").find("span").text("?");
				$("#weather_temp").find("i").text("℃");
				$("#weather_air_level").text("측정중");
				$("#weather_air_level02").text("측정중");
			}
		},
		error: function(j) {
			console.log(j);
		}
	});
});

function weather_icon_number(value) {
	if (value == "01") { // 맑음
		return "01";
	} else if (value == "02") { // 구름 조금
		return "02";
	} else if (value == "03") { // 구름 많음
		return "03";
	} else if (value == "04") { // 흐림
		return "04";
	} else if (value == "05") { // 비
		return "05";
	} else if (value == "06") { // 눈비
		return "06";
	} else if (value == "07") { // 눈
		return "07";
	} else {
		return "01";
	}
}

function weather_icon_text(value) {
	if (value == "01") { // 맑음
		return "맑음";
	} else if (value == "02") { // 구름 조금
		return "구름 조금";
	} else if (value == "03") { // 구름 많음
		return "구름 많음";
	} else if (value == "04") { // 흐림
		return "흐림";
	} else if (value == "05") { // 비
		return "비";
	} else if (value == "06") { // 눈비
		return "눈비";
	} else if (value == "07") { // 눈
		return "눈";
	} else {
		return "맑음";
	}
}

function weather_khai_grade_ko(value) {
	if (value == "1") {
		return "좋음";
	} else if (value == "2") {
		return "보통";
	} else if (value == "3") {
		return "나쁨";
	} else if (value == "4") {
		return "매우나쁨";
	} else {
		return "측정중";
	}
}