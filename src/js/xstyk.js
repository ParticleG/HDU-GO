/**
 * 网上选课 -> 体育课
 * 在 http://jxgl.hdu.edu.cn/xstyk.aspx* 中注入本脚本
 */

'use strict';

// 禁用 alert 立即执行
(function () {
	disableAlert();
}) ();

// 入口
window.onload = async () => {
	const config = await readConfig();
  config.disableCaptcha && disableCaptcha();

};
