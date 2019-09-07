/**
 * 网上选课 -> 通识选修课
 * 在 http://jxgl.hdu.edu.cn/xf_xsqxxxk.aspx* 中注入本脚本
 */

'use strict';

// 禁用 alert 立即执行
(function () {
	disableAlert();
}) ();

// 入口
window.onload = async () => {
	disableCaptcha();
	renderForm();
	renderCtrlBtn();

	if (!ENABLE) {
		return;
	}

	if (document.querySelector('#kcmcGrid').innerHTML.length > 300) {
		checkBox();
		submitForm();
	} else {
		addLoadingBar();
		setTimeout(() => {
			searchClass();
		}, 1500);
	}
};

function renderForm() {
	document.querySelector('form[name="xsyxxxk_form"]').action += ENABLE ? '#enable' : '';
}

function renderCtrlBtn() {
	addElement('button', `${ENABLE ? '关闭' : '开启'}抢课模式`, {
		onclick: function (e) {
			// 阻止表单默认提交
			e.preventDefault();

			location.hash = ENABLE ? '' : '#enable';
			const form = document.querySelector('form[name="xsyxxxk_form"]');
			form.action = ENABLE ? form.action.replace('#enable', '') : `${form.action}#enable`;

			// 开启抢课模式自动再搜索一次课
			!ENABLE && searchClass();
		}
	}, document.querySelector('#Button2').parentElement);
}

function checkBox() {
	document.querySelector('#kcmcGrid').querySelector('input').checked = true;
}

function submitForm() {
	document.querySelector('#Button1').click();
}

function addLoadingBar() {
	addElement('style', `
		@keyframes loading {
			from { width: 0% } to { width: 100% };
		}
	`);
	addElement('div', '', {
		style: 'height: 5px; background: #cadaee; animation: loading 1.5s'
	});
}

function searchClass() {
	document.querySelector('input#Button2').click();
}
