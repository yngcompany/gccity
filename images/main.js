/**
 * 대표 포털 메인 스크립트
 *
 *
 * @author HyeonJeong Park
 * @since 2021.05.13 *
 */

$(function() {
	fn_slider_quick();
	// fn_slider_visual();
	// fn_slider_popup();
	// fn_slider_sns();
	// fn_slider_board();

	$(window).on('resize', function() {
		//fn_slider_board();
	});

	$('.scrollbar-rail').each(function() {
		$(this).scrollbar();
	});

	// 인기검색어
	search();
	// 과천소식 초기 데이터 세팅
	setMainBbs(5, "111", "0301010000", "", 1, "N");
	// 비주얼존, 팝업존
	setPromotion("visual");
	setPromotion("popup");
	// 사진자료실
	setGallery(1, null, "0302000000", 0, "N", "N");
	// 시정소식지
	setNewsletter();
	// SNS 데이터
	setSnsData();
	// 코로나 현황
	setCorona();
});

var slider_visual = null;
function fn_slider_visual() {
	if(slider_visual != null) {
		slider_visual.destroy(true, true);
		slider_visual = null;

		$(".mainVisual .stop").off('click');
		$(".mainVisual .play").off('click');
	}
	slider_visual = new Swiper('.mainVisual .slider .swiper-container', {
		navigation: {
			prevEl: '.mainVisual .prev',
			nextEl: '.mainVisual .next'
		},
		pagination: {
			el: '.mainVisual .pager',
			type: 'custom',
		    renderCustom: function (swiper, current, total) {
		        return "<em>" + current + '</em><i></i><em>' + total + "</em>";
		    }
		},
		loop : true,
		loopAdditionalSlides : 1,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		on: {
			init:function() {
				$('.mainVisual .swiper-container .swiper-slide *').on('focus', function() {
					if(is_event_keyboard) {
						if(!$('.mainVisual').hasClass('view-all')) $('.mainVisual').addClass('fix-scroll');
					} else {
						if(!$('.mainVisual').hasClass('view-all')) $('.mainVisual').removeClass('fix-scroll');
					}
				});
				$('.mainVisual .goto-control').on('focus', function() {
					$('.mainVisual').removeClass('fix-scroll');
				});
				$(".mainVisual .control *").on('focus', function() {
					$('.mainVisual').removeClass('fix-scroll');
				});
			}
		}
	});

	$(".mainVisual .stop").click(function(){
		slider_visual.autoplay.stop();
		$(".mainVisual .stop").hide();
		$(".mainVisual .play").show().focus();
	});
	$(".mainVisual .play").click(function(){
		slider_visual.autoplay.start();
		$(".mainVisual .play").hide();
		$(".mainVisual .stop").show().focus();
	});
}

var slider_quick = null;
function fn_slider_quick() {
	slider_quick = new Swiper('.mainQuick .slider .swiper-container', {
		slidesPerView: 8,
		navigation: {
			prevEl: '.mainQuick .prev',
			nextEl: '.mainQuick .next'
		},
		breakpoints: {
			1024: {
				slidesPerView:'auto'
			}
		},
		on: {
			init:function() {
				$('.mainQuick .swiper-container .swiper-slide *').on('focus', function() {
					if(is_event_keyboard) {
						if(!$('.mainQuick').hasClass('view-all')) $('.mainQuick').addClass('fix-scroll');
					} else {
						if(!$('.mainQuick').hasClass('view-all')) $('.mainQuick').removeClass('fix-scroll');
					}
				});
				$('.mainQuick .goto-control').on('focus', function() {
					$('.mainQuick').removeClass('fix-scroll');
				});
				$(".mainQuick .control *").on('focus', function() {
					$('.mainQuick').removeClass('fix-scroll');
				});
			}
		}
	});
}

var slider_popup = null;
function fn_slider_popup() {
	if (slider_popup != null) {
		slider_popup.destroy(true, true);
		slider_popup = null;

		$(".mainPopup .stop").off('click');
		$(".mainPopup .play").off('click');
	}
	slider_popup = new Swiper('.mainPopup .slider .swiper-container', {
		direction: 'vertical',
		navigation: {
			prevEl: '.mainPopup .prev',
			nextEl: '.mainPopup .next'
		},
		pagination: {
			el: '.mainPopup .pager',
			type: 'custom',
		    renderCustom: function (swiper, current, total) {
		        return "<em>" + current + '</em><i></i><span>' + total + "</span>";
		    }
		},
		autoplay: {
			delay: 4000,
			disableOnInteraction: false
		},
		on: {
			init:function() {
				$('.mainPopup .swiper-container .swiper-slide *').on('focus', function() {
					if(is_event_keyboard) {
						if(!$('.mainPopup').hasClass('view-all')) $('.mainPopup').addClass('fix-scroll');
					} else {
						if(!$('.mainPopup').hasClass('view-all')) $('.mainPopup').removeClass('fix-scroll');
					}
				});
				$('.mainPopup .goto-control').on('focus', function() {
					$('.mainPopup').removeClass('fix-scroll');
				});
				$(".mainPopup .control *").on('focus', function() {
					$('.mainPopup').removeClass('fix-scroll');
				});
			}
		}
	});

	$(".mainPopup .stop").click(function(){
		slider_popup.autoplay.stop();
		$(".mainPopup .stop").hide();
		$(".mainPopup .play").show().focus();
	});
	$(".mainPopup .play").click(function(){
		slider_popup.autoplay.start();
		$(".mainPopup .play").hide();
		$(".mainPopup .stop").show().focus();
	});
}


var slider_sns = null;
function fn_slider_sns() {
	if(slider_sns != null) {
		slider_sns.destroy(true, true);
		slider_sns = null;

		$(".mainSNS .stop").off('click');
		$(".mainSNS .play").off('click');
	}
	slider_sns = new Swiper('.mainSNS .slider .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 0,
		breakpoints: {
			351: {
				slidesPerView: 1
			},
			431: {
				slidesPerView: 1.2
			},
			551: {
				slidesPerView: 1.5
			},
			841: {
				slidesPerView: 2
			}
		},
		navigation: {
			prevEl: '.mainSNS .prev',
			nextEl: '.mainSNS .next'
		},
		pagination: {
			el: '.mainSNS .pager',
			type: 'custom',
		    renderCustom: function (swiper, current, total) {
		        return "<em>" + current + '</em><i></i><em>' + total + "</em>";
		    }
		},
		scrollbar: {
			el: ".mainSNS .scrollbar",
	        hide: false,
		},
		autoplay: {
			delay: 4000,
			disableOnInteraction: false
		},
		on: {
			init:function() {
				$('.mainSNS .swiper-container .swiper-slide *').on('focus', function() {
					if(is_event_keyboard) {
						if(!$('.mainSNS').hasClass('view-all')) $('.mainSNS').addClass('fix-scroll');
					} else {
						if(!$('.mainSNS').hasClass('view-all')) $('.mainSNS').removeClass('fix-scroll');
					}
				});
				$('.mainSNS .goto-control').on('focus', function() {
					$('.mainSNS').removeClass('fix-scroll');
				});
				$(".mainSNS .control *").on('focus', function() {
					$('.mainSNS').removeClass('fix-scroll');
				});
			}
		}
	});

	$(".mainSNS .stop").click(function(){
		slider_sns.autoplay.stop();
		$(".mainSNS .stop").hide();
		$(".mainSNS .play").show().focus();
	});
	$(".mainSNS .play").click(function(){
		slider_sns.autoplay.start();
		$(".mainSNS .play").hide();
		$(".mainSNS .stop").show().focus();
	});
}

var first = {
	tab2 : false,
	tab3 : false,
	tab4 : false,
	tab5 : false,
	tab6 : false
}

function fn_tabs_list(obj) {
	var target = $(obj).attr('data-tab');
	var targetNum = $(obj).attr('data-tab-num');
	var parents = $(obj).closest('.tab-group');
	var now_list = $('.list[data-content="'+target+'"]', parents);

	parents.find('.on').removeClass('on');
	parents.find('.tab-active').removeClass('tab-active');
	$(obj).addClass('on').closest('li').addClass('tab-active');
	now_list.addClass('on');

	// 탭 클릭시 해당 게시판의 게시물을 가지고온다.
	if (targetNum == "2") {
		if (!first.tab2) {
			setMainBbs(5, null, "0301030100", 4, 0, "N");
			first.tab2 = true;
		}
	} else if (targetNum == "3") {
		if (!first.tab3) {
			setMainBbs(5, null, "0301040000", 1, 0, "N");
			first.tab3 = true;
		}
	} else if (targetNum == "4") {
		if (!first.tab4) {
			setMainBbs(5, null, "0301060000", 2, 0, "N");
			first.tab4 = true;
		}
	} else if (targetNum == "5") {
		if (!first.tab5) {
			setMainBbs(5, "200", "0301070000", "", 1, "N");
			first.tab5 = true;
		}
	} else if (targetNum == "6") {
		if (!first.tab6) {
			setMainBbs(5, null, "0301050000", 3, 0, "N");
			first.tab6 = true;
		}
	}
}

//슬라이드 전체보기
function fn_popup_all_show(obj) {
	// 전체 팝업 영역 있는지 체크
	var popup = $(obj).closest('.pop-view-box').find('.popup-slide-view');
	if(popup.length > 0) {
		// 전체 팝업영역이 있을 경우
		var pannel = $(obj).closest('.pop-view-box');
		var list = pannel.find('.slider').find('ul').clone();
		var popup_list = popup.find('.list');

		// 클래스 및 스타일 먹혀 있는 것 모두 제거
		list.removeAttr('class').removeAttr('style').find('*').removeAttr('class').removeAttr('style');
		popup_list.empty().append(list);
		popup.attr('tabIndex', '0').show().focus();
	} else {
		alert("전체보기 영역을 찾을 수 없습니다.");
	}
}
//슬라이드 전체보기 닫기
function fn_popup_all_close(obj) {
	// 전체 팝업 영역 있는지 체크
	$(obj).closest('.pop-view-box').find('.popup-slide-view').hide();
	$(obj).closest('.pop-view-box').find('button.total').focus();
}

// 고시공고 및 게시판 데이터 세팅
function setMainBbs(limit, ptIdx, mId, code, type, notiYn) {
	var dataCallType = ["/portal/json/gosiData.do", "/portal/json/bbsData.do"];
	var param = [{"gosiCode" : code, "limit" : limit}, {"limit" : limit, "ptIdx" : ptIdx, "mId" : mId, "notiYn" : notiYn}];
	var arrAddr = ["/portal/saeol/gosi/view.do", "/portal/bbs/view.do"];
	var tagLoc = $(".board-list .on").find("ul");

	$.getJSON(dataCallType[type], param[type], function(data) {
		$(tagLoc).children().remove();
		if (data.totalCnt == 0) {
			var $li = $("<li>", {class : "no_data", text : "등록된 내용이 없습니다."});
			$(tagLoc).append($li);
		} else {
			$(data.list).each(function(index) {
				if (index < limit) {
					var hrefAddr = null;
					if (type === 0) {
						hrefAddr = arrAddr[0] + "?notAncmtMgtNo=" + this.idx;
					} else if (type === 1) {
						hrefAddr = arrAddr[1] + "?bIdx=" + this.idx + "&ptIdx=" + ptIdx;
					}
					// 새글표시
					if (this.newYn == "Y") {
						var $li = $("<li>", {class : "new"});
					} else {
						var $li = $("<li>");
					}
					var dtSplit = this.createDate.split('-');
					var $a = $("<a>", {href : hrefAddr + "&mId=" + mId});
					var $strong = $("<strong>", {class : "subj", text : this.title});
					var $span1 = $("<span>", {class : "con", text : this.content.replace("[[[", "").replace("]]]", "")});
					var $yearSpan = $("<span>", {text : dtSplit[0]});
					var $yearBlind = $("<i>", {class : "blind", text : "년"});
					var $monthSpan = $("<span>", {text : dtSplit[1]});
					var $monthBlind = $("<i>", {class : "blind", text : "월"});
					var $daySpan = $("<strong>", {text : dtSplit[2]});
					var $dayBlind = $("<i>", {class : "blind", text : "일"});
					var $span2 = $("<span>", {class : "date"});
					// category
					if (this.bCategory != '' || this.bCategory != null) {
						if (this.bCategory == '행정.공지') {
							var $spanCategory = $("<span>", {class : "name ty1", text : " 행정/공지 "});
						} else if (this.bCategory == '생활.교육.경제') {
							var $spanCategory = $("<span>", {class : "name ty2", text : " 생활/교육/경제 "});
						} else if (this.bCategory == '보건.복지') {
							var $spanCategory = $("<span>", {class : "name ty3", text : " 보건/복지 "});
						} else if (this.bCategory == '청년.청소년') {
							var $spanCategory = $("<span>", {class : "name ty4", text : " 청년/청소년 "});
						} else if (this.bCategory == '문화.행사') {
							var $spanCategory = $("<span>", {class : "name ty5", text : " 문화/행사 "});
						}
						$span2 = $span2.append($yearSpan).append($yearBlind).append(' ').append($monthSpan).append($monthBlind).append(' ').append($daySpan).append($dayBlind);
						$a = $a.append($strong).append($span1).append($spanCategory).append($span2);
						$li = $li.append($a);
						$(tagLoc).append($li);
					} else {
						$span2 = $span2.append($yearSpan).append($yearBlind).append(' ').append($monthSpan).append($monthBlind).append(' ').append($daySpan).append($dayBlind);
						$a = $a.append($strong).append($span1).append($span2);
						$li = $li.append($a);
						$(tagLoc).append($li);
					}
				}
			});
		}
	}).fail(function() {
		$(tagLoc).children().remove();
		var $li = $("<li>", {class : "no_data", text : "등록된 내용이 없습니다."});
		$(tagLoc).append($li);
	});
}

/**
 * 메인 프로모션기능들 호출
 */
function setPromotion(type) {
	var param = {"type" : type};
	$.getJSON("/portal/json/promotionData.do", param, function(data) {
		var tagLoc = "";
		if (type == "visual") {
			tagLoc = $(".mainVisual ul.swiper-wrapper");
			$(tagLoc).children().remove();
			if (data.totalCnt == 0) {
				var $li = $("<li>", {class: "swiper-slide"});
				var $img =  $("<img>", {src : "/common/img/board/sample_noimage.jpg", alt : "과천시 홈페이지에 오신 것을 환영합니다.", onerror : "this.src='/common/img/board/sample_noimage.jpg';"});
				$li = $li.append($img);
				$(tagLoc).append($li);
			} else {
				$(data.list).each(function (index) {
					var hrefAddr = "/common/imgView.do?attachId=" + this.attachId + "&fileSn=" + this.fileSn + "&mode=ratio";
					var $li = $("<li>", {class: "swiper-slide"});
					var $img =  $("<img>", {src : hrefAddr, alt : this.fileCn, onerror : "this.src='/common/img/board/sample_noimage.jpg';"});
					if (this.url === null || '' === this.url) {
						$li = $li.append($img);
					} else {
						var $a = $("<a></a>").attr({
							"href" : this.url === null || '' === this.url ? "#" : this.url,
							"target" : this.blankYn === null || '' === this.blankYn ? "_self" : (this.blankYn === "Y" ? "_blank" : "_self")
						});
						$a.append($img);
						$li = $li.append($a);
					}
					$(tagLoc).append($li);
				});
			}
		} else if (type == "popup") {
			tagLoc = $(".mainPopup ul.swiper-wrapper");
			$(tagLoc).children().remove();
			if (data.totalCnt == 0) {
				var $li = $("<li>", {class: "swiper-slide"});
				var $img =  $("<img>", {src : "/common/img/board/sample_noimage.jpg", alt : "과천시 홈페이지에 오신 것을 환영합니다.", onerror : "this.src='/common/img/board/sample_noimage.jpg';"});
				$li = $li.append($img);
				$(tagLoc).append($li);
			} else {
				$(data.list).each(function (index) {
					var hrefAddr = "/common/imgView.do?attachId=" + this.attachId + "&fileSn=" + this.fileSn + "&mode=ratio&width=500&height=500";
					var $li = $("<li>", {class: "swiper-slide"});
					var $img =  $("<img>", {src : hrefAddr, alt : this.fileCn, onerror : "this.src='/common/img/board/sample_noimage.jpg';"});
					if (this.url === null || '' === this.url) {
						$li = $li.append($img);
					} else {
						var $a = $("<a></a>").attr({
							"href" : this.url === null || '' === this.url ? "#" : this.url,
							"target" : this.blankYn === null || '' === this.blankYn ? "_self" : (this.blankYn === "Y" ? "_blank" : "_self")
						});
						$a.append($img);
						$li = $li.append($a);
					}
					$(tagLoc).append($li);
				});
			}
		}
	}).fail(function() {
		var visualTagLoc = $(".mainVisual ul.swiper-wrapper"); // 비주얼
		$(visualTagLoc).children().remove();
		var popupTagLoc = $(".mainPopup ul.swiper-wrapper"); // 팝업
		$(popupTagLoc).children().remove();
		var $li = $("<li>", {class: "swiper-slide"});
		var $img =  $("<img>", {src : "/common/img/board/sample_noimage.jpg", alt : "과천시 홈페이지에 오신 것을 환영합니다.", onerror : "this.src='/common/img/board/sample_noimage.jpg';"});
		$li = $li.append($img);
		// no-image 세팅
		$(visualTagLoc).append($li);
		$(popupTagLoc).append($li);
	}).always(function() {
		fn_slider_visual();
		fn_slider_popup();
	});
}

// 사진자료실
function setGallery(limit, ptIdx, mId, type, notiYn, imgYn) {
	var dataCallType = ["/portal/json/galleryDataList.do"];
	var param = [{"limit" : limit, "ptIdx" : ptIdx, "mId" : mId, "notiYn" : notiYn, "imgYn" : imgYn}];
	var arrAddr = ["/portal/gallery/view.do"];
	var tagLoc = $(".mainBroad .gallery .list");

	$.getJSON(dataCallType[type], param[type], function(data) {
		$(tagLoc).children().remove();
		if (data.totalCnt == 0) {
			var $a = $("<a>", {href : "#"});
			var $em = $("<em>");
			var $img = $("<img>", {src: "/common/img/board/sample_noimage.jpg", alt: "과천시 홈페이지에 오신 것을 환영합니다.", onerror: "this.src='/common/img/board/sample_noimage.jpg';"});
			var $span = $("<span>");
			var $strong = $("<strong>", {text: "등록된 내용이 없습니다."});
			$span = $span.append($strong);
			$em = $em.append($img);
			$a = $a.append($em).append($span);
			$(tagLoc).append($a);
		} else {
			$(data.list).each(function(index) {
				if (index < limit) {
					var hrefAddr = null;
					var imgAddr = "/common/img/board/sample_noimage.jpg";
					if (type === 0) {
						hrefAddr = arrAddr[0] + "?idx=" + this.idx;
					}
					var $a = $("<a>", {href : hrefAddr + "&mId=" + mId});
					var $em = $("<em>");
					var $img = $("<img>", {src: "/common/img/board/sample_noimage.jpg", alt: "과천시 홈페이지에 오신 것을 환영합니다.", onerror: "this.src='/common/img/board/sample_noimage.jpg';"});
					var $span = $("<span>");
					var $strong = $("<strong>", {text: this.title});
					var $i = $("<i>", {text : this.createDate});

					if (type == "0") {
						if (this.attachId === null || '' === this.attachId) {
							$em = $em.append($img);
						} else {
							imgAddr = "/common/imgView.do?attachId=" + this.attachId + "&fileSn=" + this.fileSn + "&mode=ratio";
							$img =  $("<img>", {src : imgAddr, alt : this.fileCn, onerror : "this.src='/common/img/board/sample_noimage.jpg';"});
							$em = $em.append($img);
						}
					}

					$span = $span.append($strong).append($i);
					$em = $em.append($img);
					$a = $a.append($em).append($span);
					$(tagLoc).append($a);
				}
			});
		}
	}).fail(function() {
		$(tagLoc).children().remove();
		var $a = $("<a>", {href : "#"});
		var $em = $("<em>");
		var $img = $("<img>", {src: "/common/img/board/sample_noimage.jpg", alt: "과천시 홈페이지에 오신 것을 환영합니다.", onerror: "this.src='/common/img/board/sample_noimage.jpg';"});
		var $span = $("<span>");
		var $strong = $("<strong>", {text: "등록된 내용이 없습니다."});
		$span = $span.append($strong);
		$em = $em.append($img);
		$a = $a.append($em).append($span);
		$(tagLoc).append($a);
	});
}

// 시정소식지
function setNewsletter() {
	var dataCallType = ["/portal/newsletter/json.do"];
	var tagLoc = $(".mainBroad .magazine");

	$.getJSON(dataCallType, function(data) {
		$(tagLoc).children().remove();
		if (data == null) {
			var $a = $("<a>", {href : "#"});
			var $em = $("<em>");
			var $img = $("<img>", {src: "/common/img/board/sample_noimage.jpg", alt: "과천시 홈페이지에 오신 것을 환영합니다.", onerror: "this.src='/common/img/board/sample_noimage.jpg';"});
			var $span = $("<span>", {text: "보러가기"});
			$em = $em.append($img);
			$a = $a.append($em).append($span);
			$(tagLoc).append($a);
		} else {
			var $a = $("<a>", {href : "/portal/contents.do?mId=0303010000"});
			var $img = $("<img>", {src: "/common/img/board/sample_noimage.jpg", alt: "과천시 홈페이지에 오신 것을 환영합니다.", onerror: "this.src='/common/img/board/sample_noimage.jpg';"});
			var $em = $("<em>");
			var imgAddr = "/common/img/board/sample_noimage.jpg";

			if (data.attachId === null || '' === data.attachId) {
				$em = $em.append($img);
			} else {
				imgAddr = "/common/imgView.do?attachId=" + data.attachId + "&fileSn=" + data.fileSn + "&mode=ratio";
				$img =  $("<img>", {src : imgAddr, alt : data.fileCn, onerror : "this.src='/common/img/board/sample_noimage.jpg';"});
				$em = $em.append($img);
			}
			var $span = $("<span>", {text : "보러가기"});
			$a = $a.append($em).append($span);
			$(tagLoc).append($a);
		}
	}).fail(function() {
		$(tagLoc).children().remove();
		var $a = $("<a>", {href : "#"});
		var $em = $("<em>");
		var $img = $("<img>", {src: "/common/img/board/sample_noimage.jpg", alt: "과천시 홈페이지에 오신 것을 환영합니다.", onerror: "this.src='/common/img/board/sample_noimage.jpg';"});
		var $span = $("<span>", {text: "보러가기"});
		$em = $em.append($img);
		$a = $a.append($em).append($span);
		$(tagLoc).append($a);
	});
}

// SNS 데이터 연동
function setSnsData() {
	var dataCall = "/sns/data/list.do";
	var tagLoc = $(".mainSNS .list .swiper-wrapper");

	$.getJSON(dataCall, function(data) {
		if (data.length > 0) {
			$(tagLoc).children().remove();
			$(data).each(function(index) {
				var $li = $("<li>", {class : "swiper-slide"});
				var $a = $("<a>", {href : this.colLink, target : "_blank"});
				$a.attr("data-cate", this.category);
				var $span = $("<div>", {class : "thumb"});
				// 네이버 블로그
				if (this.category == 'Naver Blog') {
					var $titleDiv = $("<div>", {class : "title"});
					var $p = $("<p>");
					var $emSpan = $("<span>", {text : "공식블로그"});
					var $em = $("<em>", {text : "과천시 "});
					var $strong = $("<strong>", {html : this.colTitle});

					$emSpan = $emSpan.prepend($em);
					$p = $p.append($emSpan).append($strong);
					$titleDiv = $titleDiv.append($p);
					$span = $span.append($titleDiv);

					var $cateDiv = $("<div>", {class : "cate", text : this.category});
					var $contents = $("<span>", {class : "con", html : this.colContents});

					$a = $a.append($span).append($cateDiv).append($contents);
					$li = $li.append($a);
					$(tagLoc).append($li);
				} else {
					var $img = $("<img>", {src : this.colImgPath, alt: this.colContents});
					$span = $span.append($img);
					var $div = $("<div>", {class : "cate", text : this.category});
					var $contents = $("<span>", {class : "con", html : this.colContents});
					$a = $a.append($span).append($div).append($contents);
					$li = $li.append($a);
					$(tagLoc).append($li);
				}
			});
		}
		// 데이터 호출 후 SNS 슬라이딩 처리
		fn_slider_sns();
	}).fail(function() {});
}

// 인기검색어
function search() {
	$.ajax({
		type: "GET",
		dataType: "xml",
		url: "/search/front/new_week.jsp",
		success: function(xml) {
			load(".mainSearch .papular dd", xml);
		}
	});
}

function load(selector, xml) {
	var xmlData = $(xml).find("list");
	var searcher = $(selector);
	var length = xmlData.length;
	if (!length) {
		return;
	}
	searcher.children().remove()
	var children = xmlData.children();
	var a, word;
	for (var i = 0; i < children.size(); i++) {
		if (i >= 5) {
			return;
		}
		word = $(children[i]).text().trim();
		if (!(word == null || word == "")) {
			a = $("<a>", { href: "/search/front/Search.jsp?qt=" + encodeURIComponent(word), "target": "blank" }).text(word).data({ word: word });
			searcher.append(a);
		}
	}
}

// 코로나 현황
function setCorona() {
	$.getJSON("/coronaInfo/intro.do", function(data) {
		var cnt1 = $.trim(data.tab1Cnt1) == "" ? 0 : Number(data.tab1Cnt1);	// 관내
		var cnt2 = $.trim(data.tab1Cnt2) == "" ? 0 : Number(data.tab1Cnt2);	// 관외
		var cnt3 = $.trim(data.tab1Cnt3) == "" ? 0 : Number(data.tab1Cnt3);	// 해제
		var cnt4 = $.trim(data.tab1Cnt4) == "" ? 0 : Number(data.tab1Cnt4);	// 격리
		var cnt = cnt1 + cnt2;
		$("#coronaCnt1").text(setComma(cnt) + "명");
		$("#coronaCnt2").text(setComma(cnt1) + "명/" + setComma(cnt2) + "명");
		$("#coronaCnt3").text(setComma(cnt3) + "명/" + setComma(cnt4) + "명");
	});
}

function setComma(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}