
$(function() {
	intro.init();
});

var intro = {
	siteCode : "",
	siteName : "",
	subList : "",
	prev_index : "",
	isSearch : true,
	init : function() {
		var settingData = JSON.parse(localStorage.getItem("introSetting"));
		intro.setFirstData(); //초기 메뉴셋팅
		intro.myMenuSelect(); //나만의 메뉴 선택
		$("#menuButton").click(function() { //검색기능
			intro.search();
		});
		$("#tab-select").on("change", function() { //사이트코드 선택
			$("#selectMenu1 div.list dl").hide();
			intro.menuList($(this).val());
			$("[data-name=" + $(this).val() + "List]").show();
		});
	},
	setFirstData : function() {
		$.getJSON("/portal/json/siteCodeList.do", "", function(data) {
			var tag = "#tab-select";
			var siteNameArray = new Array();
			$(data.list).each(function (index) {
				if (intro.isNotSiteCode(this.siteCode)) {
					var siteData = new Object();
					siteData.siteCode = this.siteCode;
					siteData.siteName = this.siteName;
					siteNameArray.push(siteData);
				}
			});
			intro.siteName = siteNameArray;
			intro.subList = data.subList;
			intro.getSettingData();
		});
	},
	searchSiteCodeList : function(searchMenu) {
		$.getJSON("/portal/json/siteCodeList.do", "", function(data) {
			var tag = "#tab-select";
			$("#selectMenu1 div.list").empty();
			if (data.totalCnt == 0) {
				var $option = $("<option>", {value : "", text : "없음"});
				$(tag).append($option);
			} else {
				$(data.list).each(function (index) {
					if (intro.isNotSiteCode(this.siteCode)) {
						var $dl = $("<dl>", {"data-name" : this.siteCode + "List"});
						var $option = $("<option>", {"value" : this.siteCode, "text" : this.siteName});
						$(tag).append($option);
						$("#menuSetting > div > .selectMenu").eq(0).append($dl);
						intro.depth1List(this.siteCode, searchMenu, "Y");
					}
				});
				$("#tab-select").empty();
				var $option = $("<option>", {"value" : "", "text" : "선택"});
				$(tag).append($option);
				$("#selectMenu1 > dl").show();
			}
		});
	},
	menuList : function(siteCode) {
		if(intro.isSearch) { //검색했을경우 다시 사이트리스트 호출
			$("#selectMenu1 div.list").empty();
			$.getJSON("/portal/json/siteCodeList.do", "", function(data) {
				var tag = "#tab-select";
				$(tag).find("option").remove();
				$(data.list).each(function (index) {
					if (intro.isNotSiteCode(this.siteCode)) {
						var $option = $("<option>", {"value" : this.siteCode, "text" : this.siteName});
						$(tag).append($option);
					}
				});
				intro.setSiteFirst(siteCode);
			});
		} else {
			if($("[data-name=" + siteCode + "List]").length == 0) {
				intro.setSiteFirst(siteCode);
			}
		}
	},
	setSiteFirst : function(siteCode) {
		intro.isSearch = false;
		//$("#selectMenu1 > dl").remove();

		intro.depth1List(siteCode, "", "N");

	},
	depth1List : function(siteCode, searchMenu, allYn) { //1뎁스 메뉴
		var tag = "#selectMenu1  div.list";
		var param = {"siteCode" : siteCode, "searchMenu" : searchMenu};
		$.getJSON("/main/json/menuList.do", param, function(data) {
			$(data.list).each(function (index) {
				if(this.depth2.length > 0) {
					var $dl = $("<dl>", {"data-name" : siteCode + "List"});
					var $dt = $("<dt>", {"text" : this.menuName, "data-idx" : this.idx});
					var $dd = $("<dd>");
					var $ul = $("<ul>", {"data-idx" : this.idx});
					$dd = $dd.append($ul);
					$dl = $dl.append($dt).append($dd);
					$(tag).append($dl);
					intro.depth2List(this.depth2, this.idx, this.siteCode, this.mId, this.menuName, this.menuType, this.linkUrl, searchMenu, allYn);
				}
			});
			if(allYn == "N") {
				$("[data-name=" + siteCode + "List]").show();
			}
		});
	},
	depth2List : function(data, idx, siteCode, mId, menuName, menuType, linkUrl, searchMenu, allYn) { //2뎁스 메뉴
		var tag = "[data-name=" + siteCode + "List] > dd > ul[data-idx=" + idx + "]";
		$(data).each(function (index) {
			var menuType = this.menuType;
			var linkUrl = "";
			if(menuType == "L") {
				linkUrl = this.linkUrl;
			}
			var $li = $("<li>");
			var $checkbox = $("<input>", {
				"type" : "checkbox",
				"id" : this.siteCode + "_" + this.idx,
				"data-menuname" : this.menuName,
				"data-sitecode" : this.siteCode,
				"data-sitename" : this.siteName,
				"data-mid" : this.mId,
				"data-menutype" : this.menuType,
				"data-linkurl" : linkUrl
			});
			var $label = $("<label>", {"for" : this.siteCode + "_" + this.idx}	).append(this.menuName);
			$li = $li.append($checkbox).append($label);
			$(tag).append($li);
			$(".selectMenu").find("input[type=checkbox]").click(function() {
				var cnt = $(".selectMenu").find("input[type=checkbox]:checked").length;
				if(cnt > 15) {
					alert("나만의 메뉴는 최대 15개까지 선택할수있습니다.");
					this.checked = false;
				}
			});
			//intro.getSettingData();
		});
	},
	visit : function() { //방문한 메뉴
		var history = JSON.parse(localStorage.getItem("visitHistory"));
		var tag = "#selectMenu2 div.list dl dd ul";
		$(tag).empty();
		if(history == null || history == ""){
			var $li = $("<li>", {class : "none", text : "방문 기록이 없습니다."});
			$(tag).append($li);
		} else {
			$(history).each(function (index) {
				var siteName = intro.siteNameData(intro.siteName, this.siteCode);
				var idNumber = index + 1;
				var $li = $("<li>");
				var $checkbox = $("<input>", {
					"type" : "checkbox",
					"id" : "record" + idNumber,
					"data-menuname" : this.menuName,
					"data-sitecode" : this.siteCode,
					"data-sitename" : siteName,
					"data-mid" : this.mId,
					"data-menutype" : "C",
					"data-linkurl" : ""
				});
				var $label = $("<label>", {
					"for" : "record" + idNumber,
					text : this.menuName
				});

				$li = $li.append($checkbox).append($label);
				$(tag).append($li);
			});
		}
		$("#selectMenu2 > dl").show();
	},
	getSettingData : function() { //나만의 메뉴
		var settingData = JSON.parse(localStorage.getItem("introSetting"));
		var size = 0;
		var tag = ".menuarea > ul";
		var li_index = 1;
		$(tag).children().remove();
		$(settingData).each(function (index) {
			var link = "/contents.do";
			var siteCode = this.siteCode;
			var href = "";
			if(this.menuType == "L") {
				href = this.linkUrl
			} else {
				href = "/" + siteCode + "" + link + "?mId=" + this.mId;
			}
			var $li = $("<li>", {
				"class" : "type-" + siteCode,
				"data-index" : li_index
			});
			var $openA = $("<a>", {
				"class" : "ico_link",
				"href" : href,
				"target" : "_blank"
			});
			var $closeA = $("<a>", {
				"href" : "#",
				"onclick" : "intro.deleteData(" + index + ", this); return false;",
				"class" : "close",
				text : "메뉴 제거"
			});
			var $span = $("<span>");
			var $em = $("<em>" , {text : this.siteName});
			var $strong = $("<strong>").append(this.menuName);
			$span = $span.append($em).append($strong);
			$openA = $openA.append($span);
			$li = $li.append($openA).append($closeA);
			$(tag).append($li);
			size++;
			li_index++;
		});

		while(size < 15) { //빈메뉴 출력
			var $noneLi = $("<li>", {
				"data-index" : li_index
			});
			var $noneA = $("<a>", {"class" : "ico_link", "href" : "#", "onclick" : "intro.open(this); return false;"});
			var $noneP = $("<p>", {text : "메뉴를선택하세요"});
			$noneA = $noneA.append($noneP);
			$noneLi = $noneLi.append($noneA);
			$(".menuarea > ul").append($noneLi);
			size++;
			li_index++;
		}
	},
	deleteData : function(i, obj) { //나만의 메뉴 삭제
		if($(".mysettingPopup.on").length > 0) {
			alert("자주찾는 메뉴를 닫아야 삭제 가능합니다.");
		} else {
			if(typeof(obj) != "undefined") {
				intro.prev_index = $(obj).closest('li').attr('data-index');
			}
			var settingData = JSON.parse(localStorage.getItem("introSetting"));
			var tempArray = new Array();
			$(settingData).each(function (index) {
				if(i != index) {
					var data = new Object();
					var menuType = this.menuType;
					data.menuName = this.menuName;
					data.siteCode = this.siteCode;
					data.siteName = this.siteName;
					data.menuType = menuType;
					if(menuType == "L") {
						data.linkUrl = this.linkUrl;
					}
					data.mId = this.mId;
					tempArray.push(data);
				}
			});
			localStorage.setItem("introSetting", JSON.stringify(tempArray));
			intro.getSettingData();
		}

		if(intro.prev_index) {
			$('.mysetting-menu .menuarea ul li[data-index="' + intro.prev_index + '"] a').focus();
		} else {
			$('.mysettingWrap > button').focus();
		}
	},
	close : function() { //홈화면 설정 닫기
		intro.myMenuSelect();
		$(".step02").hide();
		$(".step01").show();
		$(".depth2 > li > input[type=checkbox]").prop('checked', false);
		$("#visit > ul > li > input[type=checkbox]").prop("checked", false);

		if(intro.prev_index) {
			$('.mysetting-menu .menuarea ul li[data-index="' + intro.prev_index + '"] a').focus();
		} else {
			$('.mysettingWrap > button').focus();
		}
	},
	open : function(obj) { //메뉴 설정 열기

		if(typeof(obj) != "undefined") {
			intro.prev_index = $(obj).closest('li').attr('data-index');
		}
		intro.isSearch = true;
		$(".selectMenu > dl").hide();
		$("#searchMenu").val("");
		intro.menuList("portal");
		intro.myMenuSelect();
		intro.visit();
		$("#tab-select").val("portal");
		$("[data-name=portalList]").show();
		$(".step01").hide();
		$(".step02").show();
		$('#searchMenu').focus();
	},
	save: function() { //저장
		var jsonArray = new Array();
		$("input[type=checkbox][data-menuname]:checked").each(function (index, element) {
			var data = new Object();
			var menuType = $(element).data("menutype");
			data.menuName = $(element).data("menuname");
			data.siteCode = $(element).data("sitecode");
			data.siteName = $(element).data("sitename");
			data.menuType = menuType;
			if(menuType == "L") {
				data.linkUrl = $(element).data("linkurl");
			}
			data.mId = $(element).data("mid");
			jsonArray.push(data);
		});
		localStorage.setItem("introSetting", JSON.stringify(jsonArray));
		alert("저장이 완료되었습니다.");
		intro.getSettingData();
		intro.close();
	},
	myMenuSelect : function () { //나만의 메뉴 셋팅화면 출력
		var settingData = JSON.parse(localStorage.getItem("introSetting"));
		var tag = "#selectMenu3 div.list dl dd ul";
		$(tag).empty();
		if(settingData == null || settingData == ""){
			var $li = $("<li>", {class : "none", text : "선택된 값이 없습니다."});
			$(tag).append($li);
		} else {
			$(settingData).each(function (index) {
				var siteName = intro.siteNameData(intro.siteName, this.siteCode);
				if(siteName == "" || siteName == null) {
					siteName = this.siteName;
				}
				var idNumber = index + 1;
				var $li = $("<li>");
				var $checkbox = $("<input>", {
					"type" : "checkbox",
					"id" : "myMenu" + idNumber,
					"data-menuname" : this.menuName,
					"data-sitecode" : this.siteCode,
					"data-sitename" : siteName,
					"data-mid" : this.mId,
					"data-menutype" : "C",
					"data-linkurl" : "",
					"checked" : "checked"
				});
				var $label = $("<label>", {
					"for" : "myMenu" + idNumber
				}).append(this.menuName);

				$li = $li.append($checkbox).append($label);
				$(tag).append($li);
			});
		}
		$("#selectMenu3 > dl").show();
	},
	siteNameData : function (data, siteCode) { //사이트명 출력
		var siteName = "";
		$(intro.siteName).each(function (index) {
			if(siteCode == this.siteCode) {
				siteName = this.siteName;
			}
		});
		return siteName;
	},
	reset : function () {
		$("#tab-select").show();
		$("#searchMenu").val(null);
		intro.isSearch = true;
		intro.menuList("portal"); //사이트 코드 셋팅
		intro.myMenuSelect(); //나만의 메뉴 선택
	},
	search : function () {
		var searchMenu = $("#searchMenu").val();
		if(searchMenu == "" || searchMenu == null) {
			alert("검색어를 입력하세요");
			$("#searchMenu").focus();
		} else {
			$("#tab-select").hide();
			intro.isSearch = true;
			intro.searchSiteCodeList(searchMenu);
		}
	},
	enterkey : function () {
		if (window.event.keyCode == 13) {
			intro.search();
		}
	},
	isNotSiteCode : function (siteCode) {
		return !(siteCode == "gcapp"
			|| siteCode == "map"
			|| siteCode == "jungang"
			|| siteCode == "galhyeon"
			|| siteCode == "byeoryang"
			|| siteCode == "burim"
			|| siteCode == "gwacheon"
			|| siteCode == "munwon"
			|| siteCode == "gcyc"
		);
	}
}