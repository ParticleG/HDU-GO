/**
 * 理论教学质量评价 -> 理论教学质量评价
 * 在 http://jxgl.hdu.edu.cn/xs_main.aspx?xh=* 中注入本脚本
 */

'use strict';

/**
 * 当前页面抢课功能是否启用
 * 通过 hash 进行标记
 */
//const ENABLE = location.hash.includes('enable');

// 禁用 alert 立即执行
(function() {
    window.original_alert = window.alert;
    window.alert = (text) => {
        console.log(text);
    };
    console.log("Alert disabled.");
})();

// 入口
window.onload = async () => {
	const config = await readConfig();
	//config.disableCaptcha && disableCaptcha();
	injectAlertDisabler();
    renderCtrlBtn();

    /*
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
    */
};

function injectAlertDisabler() {
    addElement('script',`
    window.original_alert = window.alert;
    window.alert = (text) => {
        console.log(text);
    };`, {
        className:"disableAlert_script"
	}, document.querySelector('.main_html'));
}
/**
 * 渲染控制按钮
 */
function renderCtrlBtn() {
    addElement('li', ``, {
        id:"autoRating_li",
        className:"top"
	}, document.querySelector('.nav'));
	addElement('a', ``, {
        href:"javascript:void(0);",
        id:"autoRating_a",
        className:"top_link"
    }, document.querySelector('#autoRating_li'));
    addElement('span', `自动评价`, {
        onclick: function () {
            repeatFunc();
        },
        id:"autoRating_span"
	}, document.querySelector('#autoRating_a'));
}
function repeatFunc() {
    for (var index = 0; index < document.querySelector("#iframeautoheight").contentDocument.children[0].children[1].querySelectorAll("select").length; index++) {
        document.querySelector("#iframeautoheight").contentDocument.children[0].children[1].querySelectorAll("select")[index].selectedIndex = Math.ceil(Math.random()*3)
    }
}