/**
 * Footer 관리 js
 *
 * @author 김지원
 * @since 2020. 12. 09.
 * @version 1.0.0
 */

$(document).ready(function () {
	var html = ''

	$.ajax({
		url: yh.contextPath + "/footerMng/rem/getFooterList.do",
		data: {
			"siteCode": yh.siteCode,
		}, dataType: "json", method: "post", async: false,
		success: function (result) {
			var footer = ''
			var data = JSON.parse(result.footerList);
			var depth1List = data.filter(function (v) { return v.deptLevel == "1"; });
			var $newLi;
			var resultHTML = "";

			// 1 Depth
			$.each(depth1List, function(key, depth1){
				var depth2List = data.filter(function (v) { return v.parentIdx == depth1.categoryIdx; });
				var depth2HTML = "";

				if (depth2List.length) {
					var depth1Footer = document.querySelector("#depth1Footer").innerHTML;
					resultHTML += depth1Footer.replace(/{depth1Name}/g, depth1.categoryName);

					// 2 Depth
					$.each(depth2List, function(key, depth2){
						if (depth2.isChild != "0") {
							var footerLi = document.querySelector("#footerLi").innerHTML;

							// 2 depth 데이터 저장
							depth2HTML += footerLi.replace(/{footerUrl}/g, depth2.footerUrl ? depth2.footerUrl : "").replace(/{footerTarget}/g, depth2.footerTarget).replace(/{categoryName}/g, depth2.categoryName);
						} else {
							// 3 Depth
							var depth3List = data.filter(function (v) { return v.parentIdx == depth2.categoryIdx; });

							if (depth3List.length) {
								var depth2Footer = document.querySelector("#depth2Footer").innerHTML;
								var footerATag = document.querySelector("#footerATag").innerHTML;

								var depth3HTML = "";
								var depth2Name = "";

								// 2 depth에 URL 여부에 따라 a tag 사용
								if(depth2.footerUrl) {
									depth2Name = footerATag.replace(/{footerUrl}/g, depth2.footerUrl ? depth2.footerUrl : "").replace(/{footerTarget}/g, depth2.footerTarget).replace(/{categoryName}/g, depth2.categoryName);
								} else {
									depth2Name = depth2.categoryName;
								}

								// 3 depth에 데이터 저장
								$.each(depth3List, function(key, depth3) {
									var footerLi = document.querySelector("#footerLi").innerHTML;
									depth3HTML += footerLi.replace(/{footerUrl}/g, depth3.footerUrl ? depth3.footerUrl : "").replace(/{footerTarget}/g, depth3.footerTarget).replace(/{categoryName}/g, depth3.categoryName);
								});

								// 3 depth에 저장된 데이터 2 depth에 저장
								depth2HTML += depth2Footer.replace(/{depth3Footer}/g, depth3HTML).replace(/{depth2Name}/g, depth2Name);
							} else {
								var footerLi = document.querySelector("#footerLi").innerHTML;

								// 2 depth 데이터 저장
								depth2HTML += footerLi.replace(/{footerUrl}/g, depth2.footerUrl ? depth2.footerUrl : "").replace(/{footerTarget}/g, depth2.footerTarget).replace(/{categoryName}/g, depth2.categoryName);
							}
						}
					});

					// 2 depth 데이터 1 depth에 저장
					resultHTML = resultHTML.replace(/{depth2Footer}/g, depth2HTML);
				}
			});

			$(".familysite").append(resultHTML);
		}
	}).fail(function (e) { alert("서버와 통신 중 오류가 발생했습니다."); });

	$("[list-div]").each(function (index, value) {
		var depth2List = $(this).children("ul").children("li").children("ul");
		var depth3List = $(this).children("ul").children("li").children("ul").children("li").children("ul");

		// 3 Depth 이상
		if(depth3List.length > 0) {
			// 3 depth 정렬을 위한 class 설정
			this.setAttribute("class", "list3");

			$.each(depth2List.children("li"), function(index, value) {
				if ($(value).children().length == 1) {
					var text = $(value).children("a").children("span").text();
					var url = $(value).children("a").attr("href");
					var target = $(value).children("a").attr("target");

					$(value).children("a").wrap("<p></p>");
				}
			});

			// 2 depth 이름 format 변경 - 이름 -> [이름]
			var list3Title = $(this).children("ul").children("li").children("ul").children("li").children("p");
			$.each(list3Title, function (index, value) {
				if ($(value).children("a").length) {
					var text = $(value).children("a").text();
					$(value).children("a").text("[" + text + "]")
				} else {
					var text = $(value).text();
					$(value).text("[" + text + "]")
				}
			});

			// css 조건을 위해 ul, li 정리
			$(this).children("ul").children("li").remove();
			$(this).children("ul").append(depth2List.children());
		}
	});
});

$(function(){
	$(".familysite > li > a").on('click',function(){
		$(this).next("div").show();
		$(".familysite div").not($(this).next("div")).hide();
		return false;
	});
	$(".familysite .btn_close").click(function(){
		$(this).parent("div").hide();
		$(this).parent().parent().find("a").focus();
		return false;
	});
	$(".familysite .btn_close").focusout(function(){
		$(this).parent("div").hide();
	});
});

/* 유관기관 영역 높이 지정 */
$(window).load(function() {
	var familysite_height = $(".footer_wrap .familysite").outerHeight();
	$(".footer_wrap >.site_wrap").css("height", familysite_height +'px');
});

$(window).resize(function() {
	var familysite_height = $(".footer_wrap .familysite").outerHeight();
	$(".footer_wrap >.site_wrap").css("height", familysite_height +'px');
});