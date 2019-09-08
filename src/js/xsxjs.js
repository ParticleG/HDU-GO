/**
 * 网上选课 -> 选普通理论及实验课
 * 在 http://jxgl.hdu.edu.cn/xsxjs.aspx* 中注入本脚本
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
	getLessonInfo();
	if(!LESSON.isAvaliable){
		repeat();
	}else{
		pick();
	}
};

function getLessonInfo(){

}

function repeat(){

}

function pick(){
	
}