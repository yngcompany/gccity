/**
 * 사용자 접근 로그 기록 SCRIPT
 *
 * @author J.Ryeon Lee
 * @since 2020. 04. 06.
 */

(function ($) {
	$.ajax({
		data: { siteCode: yh.siteCode, mId: yh.mId }, dataType: "json", method: "post",
		url: yh.contextPath + "/common/access/log/saveProc.do",
		success: function (result) { if (!result.success) console.log("FAILED TO SAVE ACCESS LOG."); },
		fail: function (e) { console.log("FAILED TO SAVE ACCESS LOG."); }
	});
})(jQuery);