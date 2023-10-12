// -------------------- 마우스 / 키보드 이벤트 구분 관련 스크립트
var is_event_mouse = false;
var is_event_keyboard = false;
$(function() {
	$(document).mousedown(function() {
		is_event_mouse=true;
		is_event_keyboard=false;
	});
	$(document).keydown(function() {
		is_event_mouse=false;
		is_event_keyboard=true;
	});

	var ori_font_size = 62.5;
	var now_font_size = 62.5;
	var set_zoom = 1;

	$('.zoom-control .zoom-in').on('click', function() {
		/*var temp_font_size = now_font_size + 2;
		if(temp_font_size > 72.5) {
			temp_font_size = 72.5;
		}
		now_font_size = temp_font_size;
		$('html').css('font-size', now_font_size + "%");*/

		var temp_set_zoom = set_zoom + .1;
		if(temp_set_zoom > 1.5) {
			temp_set_zoom = 1.5;
		}
		set_zoom = temp_set_zoom;
		$('body').css('zoom', set_zoom);
	});
	$('.zoom-control .zoom-out').on('click', function() {
		/*var temp_font_size = now_font_size - 2;
		if(temp_font_size < 57.5) {
			temp_font_size = 57.5;
		}
		now_font_size = temp_font_size;
		$('html').css('font-size', now_font_size + "%");*/

		var temp_set_zoom = set_zoom - .1;
		if(temp_set_zoom < .5) {
			temp_set_zoom = .5;
		}
		set_zoom = temp_set_zoom;
		$('body').css('zoom', set_zoom);
	});
});
//----------------------------------------------------

function goSite(obj, frm) {
	frm.action = obj.value;
	frm.submit();
}

// 검색 엔진
function searchEngine() {
	var speachText = $("#qt").val();
	if (speachText == "" || speachText == null || speachText == undefined) {
		alert("검색어를 입력해 주세요.");
		$("#qt").focus();
		return false;
	}

	return true;
}


// layout 팝업 컨트롤
function LayoutShow(showpop) {
	var objDiv = document.getElementById(showpop);

	if (objDiv.style.display == "block") {
		objDiv.style.display = "none";
	} else {
		objDiv.style.display = "block";
	}
}

function footerShow(showpop) {
	jQuery("#footer_link_box").children().each(function () {
		if (jQuery(this).children().filter("div").first().attr("id") == showpop) {
			if (jQuery(this).children().filter("div").first().css("display") == "none") {
				jQuery(this).children().filter("div").first().show();
			} else {
				jQuery(this).children().filter("div").first().hide();
			}
		} else {
			jQuery(this).children().filter("div").first().hide();
		}
	});
}

function goPopup(url, w, h, l, t, ScrollbarsYn, name) {
	if (ScrollbarsYn == 'Y') {
		ScrollbarsYn = "yes";
	} else {
		ScrollbarsYn = "no";
	}
	var x = (screen.availWidth - w) / 2;
	var y = (screen.availHeight - h) / 2;
	window.open(url, name, 'width=' + w + ', height=' + h + ', left=' + x + ', top=' + y + ', location=no ,scrollbars=' + ScrollbarsYn);
}


function goPopup2(url, w, h, l, t, ScrollbarsYn, resizable, name) {
	if (ScrollbarsYn == 'Y') {
		ScrollbarsYn = "yes";
	} else {
		ScrollbarsYn = "no";
	}
	var x = (screen.availWidth - w) / 2;
	var y = (screen.availHeight - h) / 2;
	window.open(url, name, 'width=' + w + ', height=' + h + ', left=' + x + ', top=' + y + ', resizable=' + resizable + ', location=no ,scrollbars=' + ScrollbarsYn);
}

// 포탈 메인 시계 표시
var dayNames = new Array("(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)");
function clock(dobj, tobj) {
	dt = new Date();
	// 시간과 관련된 정보를 저장한다.
	hours = dt.getHours();
	minutes = dt.getMinutes();
	seconds = dt.getSeconds();
	timeStr = hours;
	timeStr += ((minutes < 10) ? ":0" : ":") + minutes;
	timeStr += ((seconds < 10) ? ":0" : ":") + seconds;
	// 폼의 시간을 표시하는 입력란에 문자열을 출력한다.
	jQuery("#" + tobj).text(timeStr);
	// 일자와 관련된 정보를 저장한다.
	months = dt.getMonth() + 1;
	days = dt.getDate();
	years = dt.getFullYear();
	dateStr = years + "년 ";
	dateStr += ((months < 10) ? "0" : "") + months + "월 ";
	dateStr += ((days < 10) ? "0" : "") + days + "일" + dayNames[dt.getDay()];

	// 폼의 일자를 표시하는 입력란에 문자열을 출력한다.
	jQuery("#" + dobj).text(dateStr);
	// 1초마다 일자와 시간을 갱신한다.
	Timer = setTimeout("clock('" + dobj + "','" + tobj + "')", 1000);
}

function goFileOld(file, path) {
	//window.open(yh.contextPath + '/common/file_down.jsp?path=/portal/download' + path + "/&filename=" + file);
	window.open(yh.contextPath + '/download' + path + "/" + encodeURIComponent(file));
	//encodeURI(file)
}

function goFile(file, path) {
	//window.open(yh.contextPath + '/common/file_down.jsp?path=/portal/download' + path + "/&filename=" + file);
	window.open(yh.contextPath + '/FileDown_direct.do?path=' + path + "&file=" + encodeURIComponent(file));
	//encodeURI(file)
}

//사이트별팝업창 쿠키값 get 스크립트
function getCookie(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length) {
		var y = (x + nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie) {
			if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}
	return "";
}

function openWindow(url, lecName) {
	window.open(url, lecName, "width=800,height=600,resizable=yes,menubar=no,scrollbars=yes");
}

function openWindow2(url, lecName) {
	window.open(url, lecName, "width=1014,height=650,resizable=yes,menubar=no,scrollbars=yes");
}

/**
 * 오직 숫자만 입력이 가능함.
 * @param loc
 * @return
 */
function onlyNumber2(loc) {
	if (/[^0123456789]/g.test(loc.value)) {
		alert("숫자 이외의 문자는 입력할 수 없습니다.");
		loc.value = "";
		loc.focus();
	}
}

// scrollTop 버튼
$(window).scroll(function () {
	if ($(this).scrollTop() > 200) {
		$('.btn_scroll_top').fadeIn();
	} else {
		$('.btn_scroll_top').fadeOut();
	}
});

$('.btn_scroll_top').click(function () {
	$('html, body').animate({ scrollTop: 0 }, 400);
	return false;
});

// 플로우차트 높이
function set_flowchart() {
	$('.flow').each(function() {
		var max_tit_height = 0;
		var max_txt_height = 0;

		//console.log($(this).find('.cell').length);

		if($(this).find('.cell').length < 1) {
			$(this).find('.tit').wrapInner('<div class="cell"></div>');
			$(this).find('.txt').wrapInner('<div class="cell"></div>');
		}

		$(this).children('li').find('.tit').attr('style', '');
		$(this).children('li').find('.txt').attr('style', '');
		$(this).children('li').each(function(){
			max_tit_height = $(this).find('.tit').outerHeight() > max_tit_height ? $(this).find('.tit').outerHeight() : max_tit_height;
			max_txt_height = $(this).find('.txt').outerHeight() > max_txt_height ? $(this).find('.txt').outerHeight() : max_txt_height;
		});

		$(this).children('li').find('.tit').css('height', max_tit_height + 2);
		$(this).children('li').find('.txt').css('height', max_txt_height + 2);
	});

	$('.list-box .box').each(function() {
		var max_tit_height = 0;
		var max_txt_height = 0;

		$(this).children('li').find('.tit').attr('style', '');
		$(this).children('li').find('.txt').attr('style', '');
		$(this).children('li').each(function(){
			max_tit_height = $(this).find('.tit').outerHeight() > max_tit_height ? $(this).find('.tit').outerHeight() : max_tit_height;
			max_txt_height = $(this).find('.txt').outerHeight() > max_txt_height ? $(this).find('.txt').outerHeight() : max_txt_height;
		});

		$(this).children('li').find('.tit').css('height', max_tit_height + 2);
		$(this).children('li').find('.txt').css('height', max_txt_height + 2);
	});
}
$(function() {
	$(window).load(function() {
		set_flowchart();
	});

	var timer = setTimeout(set_flowchart, 1000);
	$(window).on('resize', function() {
		set_flowchart();
	});
	locationSave();

	$('#openSearch').on('click', function() {
		$('.headWrap').toggleClass('open-search-wrap');
	});
});

// 나만의 메뉴
function locationSave() {
	var mId = yh.mId; //mid
	var menuName = yh.menuName; //메뉴명
	var siteCode = yh.siteCode; //사이트 코드
	var jsonArray = new Array();
	var data = new Object();
	var history = JSON.parse(localStorage.getItem("visitHistory"));
	var historySize = 0;
	var overlabChk = true;
	if(siteCode == "portal" || siteCode == "dept" || siteCode == "reservation") {
		if(!(mId == "" || siteCode == "" || menuName == "" || mId == null || siteCode == null || menuName == null)) {
			data.mId = mId;
			data.siteCode = siteCode;
			data.menuName = menuName;

			if(history == null) { //접속기록이 없을경우
				jsonArray.push(data);
			} else {
				historySize = history.length;
				jsonArray = history;
				for(var index = 0; index < jsonArray.length; index++) {
					if(overlabChk) {
						if(jsonArray[index].mId == mId && jsonArray[index].menuName == menuName && jsonArray[index].siteCode == siteCode) {
							overlabChk = false;
						}
					}
				};
				if(overlabChk) { //10개 이하일경우 추가
					if(historySize < 10) {
						jsonArray.push(data);
					} else { //10개 이상일경우 마지막데이터 삭제후 추가
						jsonArray.splice(0, 1);
						jsonArray.push(data);
					}
				}
			}
			localStorage.setItem("visitHistory", JSON.stringify(jsonArray));
		}
	}
}

$(document).ready(function() {
	$('.justy-list').each(function(index) {
		var cnt = $(this).children().length;
		var ori_class = $(this).attr('class');
		if(cnt > 5) {
			// cnt 가 5개 초과일 경우
			var prev_per = Math.ceil(cnt/2);
			var per = cnt - prev_per;
			if(per > 1) {
				var cnt_1 = prev_per;
				var cnt_2 = per;
				var li_index = 0;
				var tag = $(this);
				tag = tag[0].tagName;

				var wrap = $("<div class='justy-wrap'></div>");
				var temp_ul_1 = $("<"+tag+" class='"+ori_class+"'></"+tag+">");
				var temp_ul_2 = $("<"+tag+" class='"+ori_class+"'></"+tag+">");
				for(var i=0; i < cnt_1; i++) {
					temp_ul_1.append($(this).children().eq(i).clone());
				}
				for(var j=0; j < cnt_2; j++) {
					temp_ul_2.append($(this).children().eq(i+j).clone());
				}
				wrap.append(temp_ul_1);
				wrap.append(temp_ul_2);

				$(this).after(wrap);
				$(this).addClass("justy-responsive-list");
			}
		}
	});
	
	$('.locationWrap').each(function() {
		var cnt = $(this).find('.skip').length;
		if(cnt < 1) {
			var $address_obj = $(this).find('.address');
			if(typeof(address_obj) == 'undefined') {
				$address_obj = $(this).next();
			}
			
			var idx = $address_obj.attr('id');
			if(typeof(idx) == 'undefined') {
				idx = "skip_target_address";
				$address_obj.attr('id', idx);
			}
			var skip_nav = $('<a href="#'+idx+'" class="skip">지도 건너뛰기</a>');
			$('.locationWrap').prepend(skip_nav);
		}
	});

	var timer = setTimeout(set_flowchart, 1000);

	$(window).on('resize', function() {
		set_flowchart();
	});
});
$(window).load(function() {
	set_flowchart();
});
