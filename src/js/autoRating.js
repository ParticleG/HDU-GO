/**
 * 理论教学质量评价 -> 理论教学质量评价
 * 在 http://jxgl.hdu.edu.cn/xs_main.aspx?xh=* 中注入本脚本
 * 由于 iframe 页面的 hash 与主页面不同，因此无法使用 hash 存储功能开启状态
 * 通过 Local Storage 进行功能状态的存储
 */

'use strict';

// 禁用 alert 立即执行
(function() {
    injectAlertDisabler();
})();

// 入口
window.onload = async () => {
	const config = await readConfig();
    if(!config.autoRate)
    {
        return;
    }
    renderCtrlBtn();
    if(localStorage.getItem("Rating") == "true" && (document.querySelectorAll("select").length > 1)) {
        iFrameRating();
    }
    else if (localStorage.getItem("Rating") == "last" && (document.querySelectorAll("select").length > 1)) {
        iFrameSubmit();
    }
};
/**
 * 插入拦截Alert脚本
 */
function injectAlertDisabler() {
    if(document.documentElement == undefined)
    {
        return;
    }
    addElement('script',`
    window.original_alert = window.alert;
    window.alert = (text) => {
        console.log(text);
    };`, {
        className:"disableAlert_script"
	}, document.documentElement);
}
/**
 * 渲染控制按钮
 */
function renderCtrlBtn() {
    if(document.querySelector('.nav') == undefined) {
        return;
    }
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
            if(localStorage.getItem("Rating") != "true" && (document.querySelector("#iframeautoheight").contentDocument.children[0].children[2].querySelectorAll("select").length > 1)) {
                localStorage.setItem("Rating", "true");
                mainPageRating();
            }
            else {
                alert("请先进入“理论教学质量评价”页面再点击此按钮哦！");
            }
        },
        id:"autoRating_span"
	}, document.querySelector('#autoRating_a'));
}
/**
 * 自动评价实现函数
 */
function mainPageRating() {
    for (var index = 1; index < document.querySelector("#iframeautoheight").contentDocument.children[0].children[2].querySelectorAll("select").length; index++) {
        document.querySelector("#iframeautoheight").contentDocument.children[0].children[2].querySelectorAll("select")[index].selectedIndex = Math.ceil(Math.random()*3);
    }
    document.querySelector("#iframeautoheight").contentDocument.children[0].children[2].querySelector("#Button1").click();
}
function iFrameRating() {
    if(document.querySelectorAll("select")[0].selectedIndex == document.querySelectorAll("select")[0].length - 1) {
        localStorage.setItem("Rating", "last");
    }
    for (var index = 1; index < document.querySelectorAll("select").length; index++) {
        document.querySelectorAll("select")[index].selectedIndex = Math.ceil(Math.random()*3);
    }
    document.querySelector("#Button1").click();
}
function iFrameSubmit() {
    localStorage.setItem("Rating", "false");
    var confirmed = window.confirm("评价已经全部完成！是否直接提交？");
    if(confirmed) {
        document.querySelector("#Button2").click();
        //console.log("Confirmed.");
    }
}