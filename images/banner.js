var slider_banner = null;
function fn_slider_banner() {
	if(slider_banner != null) {
		slider_banner.destroy(true, true);
		slider_banner = null;
		
		$(".bannerWrap .stop").off('click');
		$(".bannerWrap .play").off('click');
	}
	slider_banner = new Swiper('.bannerWrap .slider .swiper-container', {
		navigation: {
			prevEl: '.bannerWrap .prev',
			nextEl: '.bannerWrap .next'
		},
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false
		},
		on: {
			init:function() {
				$('.bannerWrap .swiper-container .swiper-slide *').on('focus', function() {
					if(is_event_keyboard) {
						if(!$('.bannerWrap').hasClass('view-all')) $('.bannerWrap').addClass('fix-scroll');
					} else {
						if(!$('.bannerWrap').hasClass('view-all')) $('.bannerWrap').removeClass('fix-scroll');
					}
				});
				$('.bannerWrap .goto-control').on('focus', function() {
					$('.bannerWrap').removeClass('fix-scroll');
				});
			}
		}
	});
	
	$(".bannerWrap .stop").click(function(){
		slider_banner.autoplay.stop();
		$(".bannerWrap .stop").hide();
		$(".bannerWrap .play").show().focus();
	});
	$(".bannerWrap .play").click(function(){
		slider_banner.autoplay.start();
		$(".bannerWrap .play").hide();
		$(".bannerWrap .stop").show().focus();
	});
}

// 배너 롤링 시작
fn_slider_banner();