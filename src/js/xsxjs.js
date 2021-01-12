/**
 * 网上选课 -> 选普通理论及实验课
 * 在 http://jxgl.hdu.edu.cn/xsxjs.aspx* 中注入本脚本
 */

'use strict';

const LESSON = {
    lessonNumber: "",
    capacityNumber: 0,
    takenNumber: 0,
    isAvailable: false
};

// 禁用 alert 立即执行
(function () {
    disableAlert();
})();

// 入口
window.onload = async () => {
    const config = await readConfig();
    config.disableCaptcha && disableCaptcha();
};

getLessonInfo();
repeat();

function getLessonInfo() {
    /*从用户点击里得到选课课号、容量及已选人数的信息 */
    document.addEventListener("click", function (tab) {
        /*判断用户是否点击的是选课按钮，选课按钮id通常为空*/
        if (tab.path[0].nodeName === "INPUT" && tab.path[0].id === '') {
            LESSON.lessonNumber = tab.path[0].value
            LESSON.capacityNumber = Number(tab.path[2].childNodes[23].innerHTML)
            LESSON.takenNumber = Number(tab.path[2].childNodes[29].innerHTML)
            if (LESSON.capacityNumber > LESSON.takenNumber) {
                console.log('the class is avalialble')
                LESSON.isAvailable = true
                pick();
            } else {
                console.log('capacity:' + LESSON.capacityNumber + ',taken:' + LESSON.takenNumber + 'the class is not avalialble, refreshing...')
                LESSON.isAvailable = false
                readConfig();
                setTimeout(function () {
                    chrome.storage.sync.set(LESSON);
                    window.location.hash = 'reload';
                    window.location.reload();
                }, 1500);
            }
        }

    }, false);
}

function repeat() {
    document.addEventListener("DOMContentLoaded", function () {
        if (window.location.hash === "#reload") {
            chrome.storage.sync.get(LESSON, function (lesson) {
                console.log('Value currently is ' + lesson.lessonNumber);
                document.querySelectorAll("input[value='" + lesson.lessonNumber + "']")[0].click()
            });
        } else {
            console.log("The page has a new hit!");
        }
    });

}

function pick() {
    /*默认点击“不选中教材”*/
    document.querySelector('input#RadioButtonList1_1').click();
    /*点击“选定”*/
    document.querySelector('input#btnSelect').click();
}
