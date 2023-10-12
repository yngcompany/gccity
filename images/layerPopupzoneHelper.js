/**
 * 레이어 팝업존 관련 스크립트
 *
 * @author J.Ryeon Lee
 * @since 2020. 04. 21. *
 */

var today = new Date();

$(document).ready(function() {
	clearExpiredLocalStorage();
	showLayerpopupzone();

	$("[type=checkbox][name^=nomoretoday]").click(function () {
		var $container = $(this).closest("[data-layer-index]");
		var index = $container.data("layer-index");
		var hiddenLayersInfo = localStorage.getItem("hiddenLayersInfo");
		if (hiddenLayersInfo) {
			hiddenLayersInfo = JSON.parse(hiddenLayersInfo);
			hiddenLayersInfo.push({ layerIdx: index, day: getDayKey(today) });
			localStorage.setItem("hiddenLayersInfo", JSON.stringify(hiddenLayersInfo));
		} else {
			localStorage.setItem("hiddenLayersInfo", JSON.stringify([{ layerIdx: index, day: getDayKey(today) }]));
		}

		// $container.hide(); // 21.08.09 웹접근성
	});
});

function clearExpiredLocalStorage() {
	var hiddenLayersInfo = localStorage.getItem("hiddenLayersInfo");
	if (hiddenLayersInfo) {
		hiddenLayersInfo = JSON.parse(hiddenLayersInfo);

		var notExpired = hiddenLayersInfo.filter(function (e, i) { return e.day == getDayKey(today) });
		if (notExpired != undefined && notExpired != null && notExpired.length > 0) {
			localStorage.setItem("hiddenLayersInfo", JSON.stringify(notExpired));
		} else {
			localStorage.removeItem("hiddenLayersInfo");
		}
	}
}

function showLayerpopupzone() {
	var hiddenLayersInfo = localStorage.getItem("hiddenLayersInfo");
	if (hiddenLayersInfo) {
		hiddenLayersInfo = JSON.parse(hiddenLayersInfo);
		if (hiddenLayersInfo) {
			var hiddenLayerIdxs = $(hiddenLayersInfo)
				.map(function () { return this.layerIdx; })
				.get();
			$("[id^=layerpopupzoneContainer]")
				.filter(function () {
					return hiddenLayerIdxs.indexOf($(this).data("layer-index")) == -1;
				})
				.show();
		} else {
			$("[id^=layerpopupzoneContainer]").show();
		}
	} else {
		$("[id^=layerpopupzoneContainer]").show();
	}
}

function getDayKey(day) {
	return day.getMonth() + "/" + day.getDate();
}
