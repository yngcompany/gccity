/*!
 * YHDCalendar v1.0
 * Docs & License: http://www.yhdatabase.com/
 * (c) 2016 Sonys & Leejr
 */

/* <캘린더 초기화>
 *
 * 	ex)
 *
	<head>
		<script type="text/javascript" src="/common/yhdcalendar-1.0/yhdcalendar.lib.js"></script>
		<script type="text/javascript" src="/common/yhdcalendar-1.0/yhdcalendar.js"></script>

		<script>
			$(document).ready(function(){
				//데이타 조회 주소
				YHDCalendar.url   = "/tour/geumocamp/reservation/countJsonData.do";
				//오늘날짜 매핑
				YHDCalendar.today = "${'2016-07-11'}";
				//캘린더 초기화
				$("#yhdsample").yhdCalendar();
			});
		</script>
	</head>

	<body>
		<h4>일정</h4>
		<div id="yhdsample"></div>
	</body>
 *
 */
$.fn.yhdCalendar = function(option) {

	//캘린더 객체에 현재 DIV 담기
	YHDCalendar.calendar = this;

	//옵션초기화
	YHDCalendar.initOptions(option);

	//캘린더 생성
	YHDCalendar.initalRender(YHDCalendar.options.today);

//	//데이타 조회
	YHDCalendar.search(YHDCalendar.options.today);

	return YHDCalendar;
};



//캘린더 기본옵션
var YHDCalendar = {

	options: {
		url: null,
		json: [],

		today: new Date().format("yyyy-MM-dd"),

		title: new Date().format("yyyy. MM"),
		btnPrev: "이전 월",
		btnNext: "다음 월",
		btnToday: "오늘",
		dayName: "SUN,MON,TUE,WED,THU,FRI,SAT",

		iconPrev: "",
		iconNext: "",
		iconToay: "",

		headClass: "btn_calendar",
		calendarClass: "calendar",
		todayClass: "todayTitle",
		holidayClass: "holidayTitle",
		scheduleClass: "task",
		btnPrevClass: "btn_prev",
		btnNextClass: "btn_next",
		btnTodayClass: "today",

		dayClick: null,
		scheduleClick: null
	},
	initOptions: function(option) {
		$.extend(YHDCalendar.options, option);
	},
	btnFocus: "btnToday",
	addStylesheet: function() {

	},
	list: null,

	search: function(paramDate) {
		if (YHDCalendar.options.url === null) {
			return;
		}

		//조회할 날짜생성
		var ym = new Date(paramDate).format("yyyy-MM-");
		var start = ym + "01";
		var end = ym + new Date(paramDate).getLastDate();

		$.ajax({
			url: YHDCalendar.options.url,
			cache: false,
			type: "get",
			data: { "eventStartDateStr": start, "eventEndDateStr": end, "pageSize" : 100 },
			success: function(rs) {

				var list = eval("[" + rs + "]")[0].result;
				var td = $("#yhd_calendar * td");

				// 기존 스케줄 삭제
				$("#yhd_calendar * td").each(function() {
					if ($(this).has("a").length > 0) { // 일정이 있는 경우
						var day_txt = $(this).has("a").text();
						if(moment().format("DD") != day_txt){
							$(this).children().remove();
							$(this).html("<span>" + day_txt + "<i class='txt-today blind'>오늘날짜</i> <i class='txt-selected blind'>선택됨</i></span>");
							$(this).removeClass(YHDCalendar.options.scheduleClass);
						}
						
					}
				});

				// 스케줄등록
				var schedule = "";
				if(list.length != 0){
					for (var i = 0; i < list.length; i++) {
						for (var j = 0; j < td.length; j++) {
							schedule = "";
							if (list[i].eventStartDate <= $(td[j]).attr("data-yhdc-data") && list[i].eventEndDate >= $(td[j]).attr("data-yhdc-data")) {
								$(td[j]).addClass(YHDCalendar.options.scheduleClass);
								var temp_date = ($(td[j]).attr("data-yhdc-data").substring(8, 10) * 1);
								schedule += '<a href="#" onclick="return false;">' + temp_date + '<i class="txt-today blind">오늘날짜</i> <i class="txt-selected blind">선택됨</i></a>';
								$(td[j]).html("");
								$(td[j]).append(schedule);
							}
						}
					} //end of for
				}else{
					//$("#eventCalendarTask").append('<ul id="event-calendar-task"><li>등록된 일정이 없습니다.</li></ul>');
				}
				


				//스케줄 클릭 이벤트
				$("#yhd_calendar td > a").click(function(e) {
					gc.list($(this).parent().attr("data-yhdc-data"));
					$(this).closest('table').find('td').removeClass('selected');
					$(this).closest('td').addClass('selected');
				});
			},
			error: function(e) {
				console.log(e);
			}
		});

	},

	//캘린더 생성
	initalRender: function(paramDate, dayResultRefresh) {
		
		// 기본 설정 내용 
		YHDCalendar.options.title = new Date(paramDate).format("yyyy. MM"); // 오늘의 날짜
		var nowDay = moment().format("YYYY-MM-DD");
		var cyear = paramDate.substring(0, 4);
		var cmonth = paramDate.substring(5, 7);
		// 선택날짜 조회
		var eventChoiceDay = $('#event-choice-day').text();
		// 기존 리스트 백업
		var eventCalendarTask = $('#event-calendar-task').html();
		
		// 기존 캘린더 백업
		var lastElementClone = $("#event_calendar").children().last().clone();
		
		// header 월 설정
		 $('#event-title').text(cyear + '년 ' + cmonth + '월');
		
		// 기존캘린더 삭제
		$(".body_calendar").children().remove(); 
		
		// 캘린더 추가할 타겟
		var calendarBodyTarget = $(".body_calendar");
		// 캘린더 영역 설정
		var yhdcalendar = $('<div>').addClass('event-calendar');

		/* ============================= 달력 초기화 ============================= */

		var cTable = $('<table id="yhd_calendar">');
		// 테이블 캡션
		$(cTable).append('<caption>' + moment().format("YYYY년 MM월") + ' 이달의 행사 일정을 일, 월, 화, 수, 목, 금, 토요일 별로 안내하는 표입니다.</caption>');
		// 테이블 헤더의 요일 설정 시작
		var cThead = $('<thead>');
		var cHtr = $('<tr>');
		var cHth = "";
		var dayname = YHDCalendar.options.dayName.split(",");
		for (var i = 0; i < dayname.length; i++) {
			if(i==0){
				cHth += '<th scope="col"><span class="red">' + dayname[i] + '</span></th>';
			}else if((dayname.length-1) == i){
				cHth += '<th scope="col"><span class="blue">' + dayname[i] + '</span></th>';
			}else{
				cHth += '<th scope="col">' + dayname[i] + '</th>';
			}
		}
		$(cHtr).append(cHth);
		$(cThead).append(cHtr);
		$(cTable).append(cThead);
		// 테이블 헤더의 요일 설정 종료
		
		// 테이블 날짜 설정 시작
		var cTbody = $('<tbody>');

		var y = new Date(paramDate).format("yyyy");
		var m = new Date(paramDate).format("MM");
		var d = new Date(paramDate).format("dd");

		var ym = y + "-" + m + "-"; // 년월
		var sDay = new Date(ym + "01").getDay(); // 요일 - 달의 1일의 요일 구하기
		var eNum = new Date(paramDate).getLastDate(); // 달의 마지막 일자 구하기
		var wNum = Math.ceil((sDay + eNum) / 7);

		var dnum = 1; // 달 생성
		var td;
		for (i = 1; i <= wNum; i++) {

			var cBtr = $('<tr>'); // 주 생성
			for (var j = 1; j <= 7; j++) {
				if (i == 1 && j <= sDay || dnum > eNum) {
					$(cBtr).append('<td>&nbsp;</td>');
				} else {
					var dayName;
					var calday;

					if (typeof eventDay[m + "-" + (dnum < 10 ? "0" + dnum : dnum)] != "undefined") { // 국가지정 공휴일과 일반휴일 입력
						dayName = eventDay[m + "-" + (dnum < 10 ? "0" + dnum : dnum)];
					} else {
						dayName = eventChangeDay[y + "-" + m + "-" + (dnum < 10 ? "0" + dnum :  dnum)];
					}

					calday = (ym + (dnum < 10 ? "0" + dnum : dnum));
					td = '<td id="yhdc-' + calday +
						'" data-yhdc-data="' + calday +
						'" class="yhdc-dayBox' + (nowDay == calday ? " selected today" : "") + '">';
					if (nowDay == calday) {
						td += '<a href="javascript:void(0);" title="'+calday+' 행사일정">'+ dnum + '</a>';
//						td += '<a href="#" onclick="$(\"#btnToday\").trigger(\"click\"); return false;" title="오늘 일정 검색">' + dnum + '</a>';
					} else {
						td += '<span>'+ dnum +'</span>';
					}
					td += '</td>';
					$(cBtr).append(td);
					dnum++;
				}
			} //end of for

			$(cTbody).append(cBtr);
		}
		$(cTable).append(cTbody);
		/// 테이블 날짜 설정 종료

		//캘린더에 calendar추가
		
		$(calendarBodyTarget).append(cTable);
		
		$("#btnPrevMonthLib,#btnNextMonthLib,#btnToday").off("click");
		//툴바버튼 이벤트
		$("#btnPrevMonthLib,#btnNextMonthLib,#btnToday").click(function() {
			var prev_idx = $(this).attr('id');
			var searchDate;
			switch (this.id) {

				//이전달
				case "btnPrevMonthLib":
					if (m == 1) {
						y = y * 1 - 1;
						m = 12;
					} else {
						m = m * 1 - 1;
						m = m < 10 ? "0" + m : m;
					}
					searchDate = y + "-" + m + "-" + d;
					break;

					//다음달
				case "btnNextMonthLib":
					if (m == 12) {
						y = y * 1 + 1;
						m = "01";
					} else {
						m = m * 1 + 1;
						m = m < 10 ? "0" + m : m;
					}
					searchDate = y + "-" + m + "-01";
					break;

					//이번달(오늘버튼)
				case "btnToday":
					//$('#eventCalendarLibrary').html('<span id="event-choice-day">' + y + "." + m + "." + d +'</span>' );
					//break;
				default:
					searchDate = YHDCalendar.options.today;
					$("#yhdc-" + moment().format("YYYY-MM-DD")).removeAttr("class");
					$("#yhdc-" + moment().format("YYYY-MM-DD")).addClass("yhdc-dayBox selected today");
					gc.list(moment().format("YYYY-MM-DD"));
			}

			YHDCalendar.btnFocus = this.id;
			YHDCalendar.initalRender(searchDate, false);
			YHDCalendar.search(searchDate, false);

			var cDayToken = moment().format().split("-");
			var dayToken = searchDate.split("-");

			if ((cDayToken[0] - dayToken[0]) > 0) { // 과거 연도
				$("#btnPrevMonth").hide();
			} else if (cDayToken[0] == dayToken[0]) { // 현재 연도
				if ((cDayToken[1] - dayToken[1]) >= 1) {
					$("#btnPrevMonth").hide();
				}
			}

			if($("#" + prev_idx).length == 0 && prev_idx == "btnPrevMonth") {
				prev_idx = "btnNextMonth";
			}
			$("#" + prev_idx).focus();
			$("#event_calendar > table > caption").text(dayToken[0] + "년 " + dayToken[1] + "월 이달의 행사 및 교육 일정을 일, 월, 화, 수, 목, 금, 토요일 별로 안내하는 표입니다.");
		});
	}
};
