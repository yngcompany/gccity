/**
 * YHCalendar Data Fetch script
 *
 * 2016.08.29 J.Ryeon Lee 마스터 테이블 연계 처리
 *
 * @author sonys
 * @since 2016.07.05
 */

var params = {
	dailyFetchUrl: "/map/schedule/all/mapData.do",
	monthlyFetchUrl: "/map/schedule/all/mapData.do",
	viewUrl: "/map/main.do?searchCategory=%EB%AC%B8%ED%99%94%ED%96%89%EC%82%AC"
};


var default_colSpan = 3;
var gc = {};
var rsv = {};

$(document).ready(function() {
	yhdc = $("#event_calendar").yhdCalendar({ // 캘린터 초기화
		url: params.monthlyFetchUrl,
		today: moment().format("YYYY-MM-DD"),
		scheduleClick: function(obj) {
			gc.list(obj.date);
		},
	});

	gc.list(moment().format("YYYY-MM-DD")); // 오늘 데이타 조회
});

gc.list = function(day) { //선택일 행사일정 조회
	$.ajax({ // 해당일 예약 데이타 조회
		url: params.dailyFetchUrl,
		data: {  "eventStartDateStr": day, "eventEndDateStr": day ,  "searchArea" : "시전체"},
		type: "get",
		success: function(rs) {
			rs = eval("[" + rs + "]")[0];
			rsv = rs;

			var temp = $('<ul id="evenschedule" class="schedule">');

			if (rs.result.length > 0) {
				for (var i = 0 ; i < rs.result.length; i++) {
					if(i == 100) { break; }
					var li = $('<li>')
					var a = $('<a>').attr('href', params.viewUrl + "&idx=" + rs.result[i].idx + "&searchYear=" + day.substring(0, 4) + "&searchMonth=" + day.substring(5, 7) );
					
					if(rs.result[i].eventType == 'EDU'){
						$(a).append('<span class="cate ty1">교육</span>');
					}else if(rs.result[i].eventType == 'EVENT'){
						$(a).append('<span class="cate ty2">행사</span>');
					}else if(rs.result[i].eventType == 'EXHIBITION'){
						$(a).append('<span class="cate ty3">전시</span>');
					}else if(rs.result[i].eventType == 'EXPERIENCE'){
						$(a).append('<span class="cate ty4">체험</span>');
					}else if(rs.result[i].eventType == 'FESTIVAL'){
						$(a).append('<span class="cate ty5">축제</span>');
					}else if(rs.result[i].eventType == 'OTHER'){
						$(a).append('<span class="cate ty6">기타</span>');
					}else if(rs.result[i].eventType == 'SHOW'){
						$(a).append('<span class="cate ty7">공연</span>');
					}else if(rs.result[i].eventType == 'WORK'){
						$(a).append('<span class="cate ty8">업무</span>');
					}				
					$(a).append('<strong class="subj">' + rs.result[i].title + '</strong>');
					$(a).append('<span class="name">' + rs.result[i].eventPlace + '</span>');
					$(li).append(a);
					$(temp).append(li);
				}
			} else {
				$(temp).append('<li>등록된 일정이 없습니다.</li>');
			}
			
			
			
			// 내용삭제
			$("#eventDayliListDiv").empty();
			// 날짜 표기
			var week = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
			var dayOfWeek = week[new Date(day).getDay()];

			$("#event-choice-day").html(dayOfWeek +'.<strong>'+day.substring(8, 10)+'.</strong>');
			$("#eventDayliListDiv").append(temp);
		}
	}).fail(function() {
		alert("행사/교육 일정 로딩 중 오류가 발생했습니다.");
	});

};
