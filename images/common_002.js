//head 메뉴 컨트롤
function headMenuClear(menuSize) {
    for( var i=1; i<= menuSize; i++){
        document.getElementById("m0"+i+"00000000").className="off";
        document.getElementById("s0"+i+"00000000").className="lnb_box hidden";
    }
}
function headMenuControl(munuId, smenuId, state, menuSize){
	
	for( var i=1; i<= menuSize; i++){
		document.getElementById("m0"+i+"00000000").className="off";
		document.getElementById("s0"+i+"00000000").className="lnb_box hidden";
	}
    if(munuId != 'm' && smenuId != 's') {
        document.getElementById(smenuId).className = "lnb_box";
        document.getElementById(munuId).className="on";
    }
}

// IE 버전체크
function getInternetExplorerVersion()
//Returns the version of Windows Internet Explorer or a -1
//(indicating the use of another browser).
{
var rv = -1; // Return value assumes failure.
if (navigator.appName == 'Microsoft Internet Explorer')
{
   var ua = navigator.userAgent;
   var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
   if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
}
return rv;
}

/* 팝업불러오기형식 */
function popUP(winURL){
	window.open(winURL,"popup","width=1024,height=740,scrollbars=no,resizable=no,width=1024,height=740,left=0,top=0");
	}

window.onload = preLink;
function preLink(){
	var ver = getInternetExplorerVersion();
	var links = document.getElementsByTagName("a");
	for (var i=0 ; i< links.length ; i++ ){
		if ( ver == 7 ) {
			if(links[i].getAttribute("className")=="btn_ebook" || links[i].getAttribute("className")=="winpopup" ){
				links[i].onclick = function(){
					popUP(this.getAttribute("href"));
					return false;
				}
			}
		}else{
			if(links[i].getAttribute("class")=="btn_ebook" || links[i].getAttribute("class")=="winpopup" ){
				links[i].onclick = function(){
					popUP(this.getAttribute("href"));
					return false;
				}
			}
		}
	}
}

// 셀렉트 박스 선택 이동
function goSelect(target, param) {
	var myindex=document.getElementById("yearlist01").selectedIndex;
	myUri = document.getElementById("yearlist01").options[myindex].value;
	if(myUri!="") { window.open(myUri+"&mId="+param,target); }
}

// jump 메뉴 컨트롤
function jumpMenuGo(jmid, idx, size){
	for ( var i = 1; i<=size; i++){
		if( jmid != 'jpmn'+i){
			document.getElementById('jpmn'+i+'_dd').className="list0"+i+" hidden";	
			document.getElementById('jpmn'+i+'_dtclose').className="close0"+i+" hidden";
		}
	}
	
	document.getElementById(jmid+'_dd').className="list0"+idx;
	document.getElementById(jmid+'_dtclose').className="close0"+idx;
}

// jump 메뉴 닫기
function jumpMenuGoClose(jmid, idx){
	document.getElementById(jmid+'_dd').className="list0"+idx+" hidden";
	document.getElementById(jmid+'_dtclose').className="close0"+idx+" hidden";
}

function foreignSub(){
	if( document.getElementById('foreignHead').className == "lang_box hidden") {
		document.getElementById('foreignHead').className = "lang_box";
	}else{
		document.getElementById('foreignHead').className = "lang_box hidden";
	}
}

//메인화면 SNS 스위칭
function switchSNS(sns) {
	if(sns=='twitter') {
		document.getElementById('twitter').className = "btn02_on";
		document.getElementById('facebook').className = "btn01_off";
		
		document.getElementById('twitter_list').className = "list2";
		document.getElementById('facebook_list').className = "lisst1 hidden";
	}	
	else if(sns=='facebook') {
		document.getElementById('twitter').className = "btn02_off";
		document.getElementById('facebook').className = "btn01_on";
		
		document.getElementById('twitter_list').className = "list2 hidden";
		document.getElementById('facebook_list').className = "list1";
	}
}


//메인화면 메인탭 스위칭
function switchMainTab(tabNum) {
	document.getElementById('noticeMainTab1').className = "btn01_off";
	document.getElementById('noticeMainTab2').className = "btn02_off";
	document.getElementById('noticeMainTab3').className = "btn03_off";
	document.getElementById('noticeMainTab4').className = "btn04_off";
	document.getElementById('noticeMainTab5').className = "btn05_off";
	
	document.getElementById('noticeMainTabLayer1').className = "hidden";
	document.getElementById('noticeMainTabLayer2').className = "hidden";
	document.getElementById('noticeMainTabLayer3').className = "hidden";
	document.getElementById('noticeMainTabLayer4').className = "hidden";
	document.getElementById('noticeMainTabLayer5').className = "hidden";
	
	document.getElementById('noticeMainTab'+tabNum).className = "btn0"+tabNum+"_on";
	document.getElementById('noticeMainTabLayer'+tabNum).className = "";
	
	//$('#noticeMainTabLayer'+tabNum).hide();	
	//$('#noticeMainTabLayer'+tabNum).fadeIn('slow');	
}

//메인화면 메인탭 스위칭
function switchFavoritesTab(tabNum) {
	document.getElementById('favoritesTab1').className = "btn01_off";
	document.getElementById('favoritesTab2').className = "btn02_off";
	document.getElementById('favoritesTab3').className = "btn03_off";
	document.getElementById('favoritesTab4').className = "btn04_off";
	document.getElementById('favoritesTab5').className = "btn05_off";
	
	document.getElementById('favoritesTabLayer1').className = "list hidden";
	document.getElementById('favoritesTabLayer2').className = "list hidden";
	document.getElementById('favoritesTabLayer3').className = "list hidden";
	document.getElementById('favoritesTabLayer4').className = "list hidden";
	document.getElementById('favoritesTabLayer5').className = "list hidden";
	
	document.getElementById('favoritesTab'+tabNum).className = "btn0"+tabNum+"_on";
	document.getElementById('favoritesTabLayer'+tabNum).className = "list";
	
	$('#favoritesTabLayer'+tabNum).hide();	
	$('#favoritesTabLayer'+tabNum).fadeIn('slow');	
	
}



//부서별 메인화면 메인탭 스위칭
function switchDeptMainTab(tabNum) {
	document.getElementById('noticeDeptMainTab1').className = "off";
	document.getElementById('noticeDeptMainTab2').className = "off";
	document.getElementById('noticeDeptMainTab3').className = "off";
	document.getElementById('noticeDeptMainTab4').className = "off";	
	
	document.getElementById('noticeDeptMainTabLayer1').className = "hidden";
	document.getElementById('noticeDeptMainTabLayer2').className = "hidden";
	document.getElementById('noticeDeptMainTabLayer3').className = "hidden";
	document.getElementById('noticeDeptMainTabLayer4').className = "hidden";
	
	document.getElementById('noticeDeptMainTab'+tabNum).className = "on";
	document.getElementById('noticeDeptMainTabLayer'+tabNum).className = "list_box";
	
	//$('#noticeDeptMainTabLayer'+tabNum).hide();	
	//$('#noticeDeptMainTabLayer'+tabNum).fadeIn('slow');	
}

var curIdx = 1;
function toggleDlink(flag) {
	var objName = "ad_link";
	if(flag=='prev') {
		if(curIdx - 1 < 1) { curIdx=1; } //alert('처음 입니다.');}
		else { 
			curIdx = curIdx - 1;			
			$("#"+objName+(curIdx+1)).addClass("hidden");
			$("#"+objName+curIdx).removeClass("hidden");
		}
	} 
	else if(flag=='next') {
		if(curIdx + 1 > 2 ) { curIdx=2; } //alert('마지막 입니다.'); }
		else {				
			curIdx = curIdx + 1;
			$("#"+objName+(curIdx-1)).addClass("hidden");
			$("#"+objName+curIdx).removeClass("hidden");			
		}
	}
}



//좌측 메뉴 모두열기
function leftMenuOnOff(flag, curMenuId)
{		
	if(flag=='on') {
		$(".menu li ul").removeClass("hidden");		
	}
	else if(flag=='off') {
		$(".menu li ul").addClass("hidden");
		$("#"+curMenuId).removeClass("hidden");
	}	
}


//주소복사 기능
function copyUrl(url){
	var IE = (document.all) ? true : false;
    var URL = url;

    if (IE) {
         window.clipboardData.setData('Text', URL);
         alert('주소가 복사되었습니다. Ctrl+V로 붙여 넣기 하세요.');
    } else {
        temp = prompt("Ctrl+C를 눌러 클립보드로 복사하세요", URL );
    }
}

// 개인정보 필터링 장비에 검색되었을경우, 개인정보 필터링의 안내페이지를 출력
function responseDataCheck(response) {
    if(response.indexOf("개인정보") > -1) {
        document.write(response);
    }
}

function statsMainShow(id) {
    $(".tab_graph").children("ul").children("li").children("a").removeAttr("class");
    $(".tab_graph").children("ul").children("li").children("div").css("display","none");
    $("#btn"+id).attr("class","on");
    $("#statsMain"+id).css("display","block");
}


function weather()
{

	$.getJSON("/weather.json",{ajax: 'true'}, function(j){		
		if(j.none != 'none') {
			$("#temp").text(j.t1h + "℃");
			$("#txt_weather").text(j.sky);
			$("#wind").html("<span class=\"fb\">바람</span> : "+j.vec+" "+j.wsd+"m/s");
			$("#humidity").html("<span class=\"fb\">습도</span> : "+j.reh+"%");	
			$("#info_weather_day").text(j.day);
			$("#rain").html("<span class=\"fb\">강수형태</span> : "+j.pty);	
			if(j.pty == "없음")
				$("#icon_weather").html("<img alt=\""+j.sky+"\" src=\"/yangsan/img/ko/main/weather_"+j.weather+".png\" />");
			else
				$("#icon_weather").html("<img alt=\""+j.pty+"\" src=\"/yangsan/img/ko/main/weather_"+j.weather+".png\" />");
		}
		else {
			$("#temp").text("1℃");
			$("#txt_weather").text("맑음");
			$("#wind").html("<span class=\"fb\">바람</span> : 남풍 1m/s");
			$("#humidity").html("<span class=\"fb\">습도</span> : 40%");	
			$("#info_weather_day").text(j.day);
			$("#rain").html("<span class=\"fb\">강수형태</span> : 없음");	
			if(j.pty == "없음")
				$("#icon_weather").html("<img alt=\""+j.sky+"\" src=\"/yangsan/img/ko/main/weather_01.png\" />");
			else
				$("#icon_weather").html("<img alt=\""+j.pty+"\" src=\"/yangsan/img/ko/main/weather_01.png\" />");
		}
	})
}



var totalActive = false;
function TotalMenuOnOff(t){
	var tmp_index = 0;
	if( ( t == 1 ) && ( totalActive== false )){

		$('#main_popup_zone').cycle('pause');
		$('#main_popup_zone > span').each(function(index){
				tmp_index = $(this).css('z-index')*1 - 10;
				$(this).css({'z-index':tmp_index});
		});

		$('#total').show();
		totalActive== true; 
	}else{
		$('#main_popup_zone > span').each(function(index){
				tmp_index = $(this).css('z-index')*1 + 10;
				$(this).css({'z-index':tmp_index});
		});
		$('#main_popup_zone').cycle('resume');

		$('#total').hide();
		totalActive== false; 
	}
	return false;
}

