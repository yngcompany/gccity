     /* main_slider */
     $(function () {
     $(".main_slider .slider .bxslider").bxSlider({
     auto: true,
     autoControls: true,
     pager: true,
     pagerType: "short",
     nextText: "<span>다음</span>",
     prevText: "<span>이전</span>",
     startText: "<span>재생</span>",
     stopText: "<span>정지</span>",
     });
     });

     /* sns_control slider */

     $(function () {
     $(".main_sns .slider .slider_wrap").bxSlider({
     minSlides: 1,
     maxSlides: 5,
     moveSlides: 1,
     slideWidth: 300,
     pager: true,
     pagerType: "full",
     autoStart: true,
     autoControls:true,
     auto: true,
     speed: 200,
     nextText: "다음",
     prevText: "이전",
     });
     });


     /* mainpop_slider */


     $(function(){
          $(".mainpop_slider_wrap").bxSlider({
               auto: true,
               autoControls: true,
               stopAutoOnClick: true,
               pager: true,
               pagerShortSeparator: '<span class="bar"></span>',
               pagerType:'short',
               slideWidth: 1400,
               nextText: "<span>다음</span>",
               prevText: "<span>이전</span>",
               minSlides: 1,
               maxSlides: 1,
               mode:'vertical'
          })

          var bannerPager=$(".mainpop_slider .bx-wrapper .bx-controls");
          var bannerBtn=$("<div class='mainpop_banner'><a href='#'><span>팝업전체보기</span></a></div>");

          bannerPager.append(bannerBtn);

     })

     /* main_quick */
     $(function () {
     $(".rollover").each(function () {
     var a = $(this);
     var img = a.find("img");
     var src_off = img.attr("src");
     var src_on = src_off.replace(/^(.+)_off(\.[^\.]+)$/, "$1_on$2");
     $("<img />").attr("src", src_on);
     a.bind("mouseenter focus", function () {
          img.attr("src", src_on);
     });
     a.bind("mouseleave blur", function () {
          img.attr("src", src_off);
     });
     });
     });

     /* banner_wrap */
     $(function () {
     $(".banner_wrap .banner_slider .swiper_wrap").bxSlider({
     auto: true,
     autoControls: false,
     stopAutoOnClick: true,
     pager: false,
     slideWidth: 240,
     nextText: "<span>다음</span>",
     prevText: "<span>이전</span>",
     minSlides:2,
     maxSlides:10,
     });
     });

/* #footer .site_wrap .familysite_list */
$(function(){
     $('.familysite_list').each(function(){
          
          $(".familysite_list").hover(
                    /* mouse enter */function(){
                         $(this).children(".list_2").css({display:"block"}).addClass("show");
                         if($(".list_2").hasClass("show")){
                              
                              
                              $(".more").on("click",function(){
                                   $(this).toggleClass("help");
                                   if($(".more").hasClass("help")){
                                        $(this).children("ul").css({display:"block"});
                                   }
                              })

                         }
                    },
                    /* mouse leave */function(){
                         $(".list_2").removeClass("show").css({display:"none"});
                         if($(".list_2").removeClass("show")){
                              $(".more").removeClass("help");
                              $(".more").children("ul").css({display:"none"});
                         }
                    }
               )
     })

}); /* end--familysite_list */



/* menu */
$(function(){
     var nav = $(".depth1_li"),
     bg = $('<div class="bg"></div>');
     var headerH = $('#header .container').height();
     var gnbH = $('#gnb_wrap').height();

     nav.hover(
     function () {
          $("#gnb_wrap").append(bg);
          bg.css({top:headerH+gnbH});
     },
     function () {
          bg.remove();
     }
     )

});

