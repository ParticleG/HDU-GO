/**
 * 网上选课 -> 体育课
 * 在 http://jxgl.hdu.edu.cn/xstyk.aspx* 中注入本脚本
 */

'use strict';

// 禁用 alert 立即执行
(function () {
	disableAlert();
}) ();

var LESSON = {
    lessonNumber            :   "",
	capacityNumber			:	0,
	takenNumber				:	0,
	isAvaliable				:	false
};

// 入口
window.onload = async () => {
	const config = await readConfig();
	config.disableCaptcha && disableCaptcha();
};

blockPopup();
getLessonInfo();
repeat();

function blockPopup(){
	var actualCode = `window.open = null`;
	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
}

function getLessonInfo(){
/*从用户点击里得到选课课号、容量及已选人数的信息 */
	document.addEventListener("click", function(tab) {
		/*判断用户是否点击的是选课按钮，选课按钮id通常为空*/
		var reg ="‖\\d+‖\\d+‖"
		var tempInfo
		if(tab.path[0].value.length == 63){
			LESSON.lessonNumber = String(tab.path[0].value)
			console.log(LESSON.lessonNumber)
			tempInfo = String(tab.path[0].innerHTML.match(reg))
			LESSON.capacityNumber = Number(tempInfo.substring(1,3))
			LESSON.takenNumber = Number(tempInfo.substring(4,6))
			if(LESSON.capacityNumber > LESSON.takenNumber){
				console.log('the class is avalialble')
				LESSON.isAvaliable = true
				pick();
			}else{
				console.log('capacity:'+LESSON.capacityNumber+',taken:'+LESSON.takenNumber + '. the class is not avalialble, refreshing...')
				LESSON.isAvaliable = false
				setTimeout(function(){
					chrome.storage.sync.set(LESSON);
					document.querySelector('input#Button4').click();
				}, 1500);
			}
		}
	}, false);
}

function repeat(){
	document.addEventListener("DOMContentLoaded", function() { 
		chrome.storage.sync.get(LESSON, function(lesson){
			console.log('Value currently is ' + lesson.lessonNumber);
			document.querySelectorAll("option[value='"+lesson.lessonNumber+"']")[0].click()
		});
	});
}

function pick(){
	/*默认点击“不选中教材”*/
	document.querySelector('input#RadioButtonList1_1').click();
	/*点击“选定”*/
	document.querySelector('input#button3').click();
}