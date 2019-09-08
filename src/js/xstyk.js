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
}

// 入口
window.onload = async () => {
	const config = await readConfig();
	config.disableCaptcha && disableCaptcha();
	getLessonInfo();
	if(!LESSON.isAvaliable){
		repeat();
	}else{
		pick();
	}
};

function getLessonInfo(){
/*从用户点击里得到选课课号、容量及已选人数的信息 */
	document.addEventListener("click", function(tab) {
		/*判断用户是否点击的是选课按钮，选课按钮id通常为空*/
		if(tab.path[0].value.length == 63){
			LESSON.lessonNumber = String(tab.path[0].value)
			console.log(LESSON.lessonNumber)
			tempInfo = String(tab.path[0].innerHTML.match(reg))
			LESSON.capacityNumber = Number(tempInfo.substring(1,3))
			LESSON.takenNumber = Number(tempInfo.substring(4,6))
			if(LESSON.capacityNumber > LESSON.takenNumber){
				console.log('the class is avalialble')
				LESSON.isAvaliable = true
			}else{
				console.log('capacity:'+LESSON.capacityNumber+',taken:'+LESSON.takenNumber + '. the class is not avalialble, refreshing...')
				LESSON.isAvaliable = false
				setTimeout(function(){
					chrome.storage.sync.set(LESSON);
					$('#Button4').eq(0).click();
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
	$("#RadioButtonList1_1").eq(0).click();
	/*点击“选定”*/
	$('#button3').eq(0).click();
}