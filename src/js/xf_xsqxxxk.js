/**
 * 网上选课 -> 通识选修课
 * 在 http://jxgl.hdu.edu.cn/xf_xsqxxxk.aspx* 中注入本脚本
 */

'use strict';

// 禁用 alert 立即执行
(function () {
	disableAlert();
}) ();

window.onload = async () => {
	disableCaptcha();
	renderCtrlBtn();

	if (!ENABLE) {
		return;
	}

	if (document.querySelector('#kcmcGrid').innerHTML.length > 300) {
		// 选中选课框
		document.querySelector('#kcmcGrid').querySelector('input').checked = true;
		// document.querySelector('#Button1').click();
	} else {
		// 1.5 秒后自动刷新
		addElement('style', `
			@keyframes loading {
				from { width: 0% } to { width: 100% };
			}
		`);
		addElement('div', '', {
			style: 'height: 5px; background: #cadaee; animation: loading 1.5s'
		});
		// setTimeout(() => {
		// 	searchClass();
		// }, 1500);
	}
};

function renderCtrlBtn() {
	addElement('button', `${ENABLE ? '关闭' : '开启'}抢课模式`, {
		onclick: function (e) {
			e.preventDefault();
			location.hash = ENABLE ? '' : '#enable';
			document.querySelector('form[name="xsyxxxk_form"]').action += ENABLE ? '' : '#enable';
			!ENABLE && searchClass();
		}
	}, document.querySelector('#Button2').parentElement);
}

function searchClass() {
	document.querySelector('input#Button2').click();
}
