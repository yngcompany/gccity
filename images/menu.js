/**
 * 메뉴 관련 스크립트
 *
 * @author 김선영, J.Ryeon Lee
 * @since 2019. 06. 27.
 */

var ori_height = 100;

String.prototype.rpad = function (padLength, padString) {
	var s = this;
	while (s.length < padLength) {
		s = s + padString;
	}
	return s;
}

$.fn.toggleMenu = function () {
	if ($(window).width() <= 1024 && $(this).parents("li").hasClass("active")) { // RESPONSIVE
		$("#lnbWrap .lnb_sub").removeClass("active");
		$("#lnb > li").removeClass("active");
	} else { // PC
		$("#lnbWrap .lnb_sub").removeClass("active");
		$(".lnb_sub").removeAttr("style"); /* 다른 메뉴 hover 시 클릭된 레이어 display:block 삭제 */
		$(this).next(".lnb_sub").addClass("active");
		$("#lnb > li").removeClass("active");
		$(this).parents("li").addClass("active");
	}
};

/** PC/MOBILE 내비게이션 영역 toggle 처리. */
function responsiveNavigation() {
	var $pcNav = $(".def_nav");
	var $mobNav = $(".def_nav, .mob_nav").last();
	if (!$pcNav.is($mobNav)) { // 빌트인 사이트라 모바일용 nav와 pc용 nav의 메뉴가 다른 경우에만 실행
		if ($(window).width() > 1024) {
			$pcNav.show();
			$mobNav.hide();
		} else {
			$pcNav.hide();
			$mobNav.show();
		}
	}
}

/** 선택된 메뉴 HEADER, LEFT 영역 활성화 처리 */
function activateSelectedMenu() {
	try {
		var builtIn = $(".mob_nav").length > 0;
		var $root = $("[data-menu-root-container]");
		if (yh.mId) {
			var menuIdTokens = yh.mId.split(/(?=(?:..)*$)/).filter(function (e, i) { return e != "00" && i < 4; });
			var $selected = null;
			var menuId = "";
			for (var i = 0; i < menuIdTokens.length; i++) {
				menuId += menuIdTokens[i];
				$selected = $root.find("[data-menu-id=" + menuId.rpad(5 * 2, "0") + "]");
				$selected.addClass("on");
				$selected.parents().first().addClass("on");
				$selected.filter(function () { return $(this).closest("[data-menu-root-container=left]").length > 0 }).next().show();
			}
		}
	} catch (e) { console.log("failed activationg menu"); }
}

(function ($) {
	window.onresize = function (event) {
		responsiveNavigation();
		if ($(window).width() > 1024) {
			$("#lnbWrap").removeAttr("style");
		}
		set_gnbLayout();

		ori_height = $('#lnbWrap').outerHeight();
	};

	$(document).ready(function () {
		responsiveNavigation(); // 빌트인 사이트의 경우 모바일 네비게이션을 대표 포털이 아닌 빌트인 사이트의 메뉴로 변경

		ori_height = $('#lnbWrap').outerHeight();

		$("#lnbWrap").css("height", $("#lnbWrap").prop("scrollHeight"));
		$("#lnb li ul").closest('li').addClass('has-sub-menu');

		$(".goto-lnb").on('focus', function() {
			$("#lnbWrap >.lnb").removeClass("active");
			$("#lnbWrap >.lnb").removeAttr("style");
			$("#lnbWrap .active").removeClass('active');
			$('body').removeClass('open-pc-lnb');
		});

		var $externalAnchors = $("a[data-menu-type=L]");
		$externalAnchors.each(function () {
			var target = $(this).data("menu-target");
			$(this).attr("href", $(this).data("menu-external-url"));
			$(this).attr("target", target);
			$(this).attr("title", target == "_blank" ? "새 창 열림" : "현재 창 이동");
		});

		// HEADER MENU CLICK
		$("#lnb a[data-menu-url]").click(function () {
			if ($(this).data("menu-type") != "L") {
				if ($(window).width() <= 1024 && $(this).closest("li").data("menu-first") == "y") { // RESPONSIVE FIRST MENU
					$(this).toggleMenu();
				} else {
					location.href = $(this).data("menu-url");
					return false;
				}
			}
		});


		activateSelectedMenu(); // 선택된 메뉴 활성화

		// LEFT MENU CLICK AND RENDER
		$("nav .snb > li > a[data-menu-url][target=_blank]").append("<img src='/common/img/common/ico_snb_blank.png' alt='새 창 열림' />");
		$("nav .snb a[data-menu-url]").click(function () {
			if ($(this).data("menu-type") != "L") {
				if ($(window).width() <= 1024 && $(this).closest("li").data("menu-first") == "y") { // RESPONSIVE FIRST MENU

				} else {
					location.href = $(this).data("menu-url");
					return false;
				}
			}
		});

		$("#lnb > li > a").each(function () {
			$(this).on("mouseenter focus", function () {
				if ($(window).width() > 1024) { // PC
					$("#lnbWrap > .layer").addClass("active");
					$("#lnbWrap > .layer").removeAttr("style");
					$(this).toggleMenu();
					$("#lnbWrap > .layer").attr("style", "height: " + ($(this).next().height() + ori_height) + "px");

					$('body').addClass('open-pc-lnb');
				}
			});
		});

		$("#lnbWrap >.lnb").on("mouseleave blur", function () {
			$("#lnbWrap >.lnb").removeClass("active");
			$("#lnbWrap >.lnb").removeAttr("style");

			$("#lnbWrap .active").removeClass('active');

			$('body').removeClass('open-pc-lnb');
		});

		$("#openSearch").click(function () {
			if ($(this).hasClass("close")) {
				$(this).removeClass("close");
				$("#openMenu").css("display", "block");
			} else {
				$(this).addClass("close");
				$("#openMenu").css("display", "none");
			}
		});

		$("#openMenu").click(function () {
			mobileNav.toggle();
			$(".sliding_popup a.btn_close").trigger("click");
			return false;
		});

		$(".btn_menu_close").click(function () {
			mobileNav.toggle();
			//$(".sliding_popup a.btn_close").trigger("click");
			return false;
		});

		// 모바일 메뉴 - 서브메뉴 존재 시 서브메뉴 보기 버튼 추가
		$('#m_menu .depth1 li').each(function() {
			if($(this).find('ul').length > 0) {
				// 하위 메뉴 확인
				var btn_submenu = $('<button type="button" class="open-sub-menu">서브메뉴 열기</button>');
				btn_submenu.on('click', function() {
					if($(this).closest('li').hasClass('open')) {
						$(this).closest('li').removeClass('open').find('.open').removeClass('open');
					} else {
						$('#m_menu').find('li.open').removeClass('open');
						$(this).parents('li').addClass('open');
					}

					if($('#m_menu .depth1 li.open').length == 0) {
						$('#m_menu .depth1 li.on').addClass('open');
					}
				});
				$(this).addClass('has-submenu').children('a').after(btn_submenu);
			}

		});
		if($('#m_menu .depth1 li.open').length == 0) {
			$('#m_menu .depth1 li.on').addClass('open');
		}


		set_gnbLayout();
	});
})(jQuery);

function set_gnbLayout() {

}

function LayoutShow(showpop) {
	var objDiv = document.getElementById(showpop);

	if (objDiv.style.display == "block") {
		objDiv.style.display = "none";
	} else {
		objDiv.style.display = "block";
	}
}

var mobileNav = (function () {
	var closed = true;
	return {
		toggle: function () {
			closed ? this.open() : this.close();
		},
		open: function () {
			//$("#mask_mn").fadeTo("fast", 1);
			//$("#lnbWrap").stop().animate({ left: "0" });
			//$("#openMenu").addClass("close");
			$("body").addClass("stop_scrolling");
			$("body").addClass("open-mo-lnb");
			closed = false;
		},
		close: function () {
			//$("#mask_mn").fadeTo("fast", 0);
			//$("#lnbWrap").stop().animate({ left: "-100%" });
			//$("#openMenu").removeAttr("class");
			$("body").removeClass("stop_scrolling");
			$("body").removeClass("open-mo-lnb");
			closed = true;
		}
	}
})(jQuery);