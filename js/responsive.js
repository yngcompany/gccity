$(function () {
var windowWidth = $(window).width(),
    leftMenu = $("#header #nav .lnb_wrap .left_side"),
    menuBtn = $("#nav .right_side .site_map"),
    bg = $('<div class="bg"></div>'),
    mobileLi = $(".main_sns .slider .slider_wrap .slide"),
    quickControl= $(".board_wrap .quick_control ul.cf"),
    footerArrow = $("p.famList::after"),
    mainSns = $(".main_sns .slider .slider_wrap li"),
    potalSite= $("#gnb_wrap span.on"),
    mobilePotal= $("#gnb_wrap .pos_left dd a.hide"),
    mobilePotalBody=$("#gnb_wrap .pos_left dd ul"),
    siteMap = $("#nav .right_side .site_map");

if (windowWidth <= 1024) {
    $(".menu_depth1  .inner_menu").hide();
    potalSite.removeClass("on");   
    menuBtn.on("click", function () {
    leftMenu.addClass("show");
    if (leftMenu.hasClass("show")) {
        $("#lnb_wrap").append(bg);
        leftMenu.on("click",function(){
            leftMenu.removeClass("show");
            $("#lnb_wrap .bg").remove();
        })
    }
    });

    mobilePotal.on("click", function () {
        mobilePotalBody.toggleClass("on");
    });   

    bg.on("click", function () {
    leftMenu.removeClass("show");
    bg.remove();
    });

    quickControl.addClass("bxslider")
    quickControl.bxSlider({
        pager: false,
        minSlides: 1,
        maxSlides: 10,
        slideWidth:135,
        moveSlides:1,
        nextText: "<span>다음</span>",
        prevText: "<span>이전</span>",
        slideMargin:12,
        infiniteLoop:true
    })


}else if(windowWidth > 1024){
    quickControl.removeClass("bxslider");
    $('body').append("<a href='#' class='topBtn'><span>TOP</span></a>")

    siteMap.hover(
        function(){
            siteMap.addClass("on");
        },
        function(){
            siteMap.removeClass("on");
        }
    )
}
/* end--windowWidth < 1024 */


});


