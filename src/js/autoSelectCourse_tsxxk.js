/**
 * 网上选课 -> 通识选修课
 * 在 http://jxgl.hdu.edu.cn/xf_xsqxxxk.aspx* 中注入本脚本
 */

'use strict';

// 禁用 alert 立即执行
(function () {
    injectAlertDisabler();
})();

// 入口
window.onload = async () => {
    const config = await readConfig();
    config.disableCaptcha && disableCaptcha();
    injectCourseList();
    injectAddToListButton();
    autoSelectCourseFunc();
};

/**
 * 注入选课列表
 */
function injectCourseList() {
    if (localStorage.getItem("courseListJson") === undefined) {
        localStorage.setItem("courseListJson", JSON.stringify(
            {}
        ));
    }
    addElement('fieldset', ``, {
        id: "courseList_fieldset"
    }, document.querySelector('.formbox'));
    addElement('script',
        `function removeCourse(courseID){
		var courseListJson = JSON.parse(localStorage.getItem("courseListJson"));
		delete courseListJson[courseID];
		localStorage.setItem("courseListJson",JSON.stringify(courseListJson));
		document.querySelectorAll('[type=checkbox]').forEach(item => {
			if(item.checked) {
				item.checked = false;
			}
		});
		document.querySelector('#Button1').click();
	}`, {
            id: "courseList_script"
        }, document.querySelector('#courseList_fieldset'));
    addElement('legend', `自动抢课-课程列表`, {
        id: "courseList_legend"
    }, document.querySelector('#courseList_fieldset'));
    addElement('table', ``, {
        id: "courseList_table",
        className: "datelist",
        cellpadding: "3",
        border: "0",
        style: "width:100%;border-collapse:collapse;"
    }, document.querySelector('#courseList_fieldset'));
    addElement('tbody', ``, {
        id: "courseList_tbody"
    }, document.querySelector('#courseList_table'));
    addElement('tr',
        `<td>课程名称</td>
	<td>课程代码</td>
	<td>教师姓名</td>
	<td>学分</td>
	<td>周学时</td>
	<td>起始结束周</td>
	<td>校区</td>
	<td>上课时间</td>
	<td>上课地点</td>
	<td>开课学院</td>
	<td>课程归属</td>
	<td>课程性质</td>
	<td>移出列表</td>`, {
            id: "courseList_tr",
            className: "datelisthead"
        }, document.querySelector('#courseList_tbody'));

    let courseListJson = JSON.parse(localStorage.getItem("courseListJson"));
    for (const i in courseListJson) {
        document.querySelector('#courseList_tbody').innerHTML += courseListJson[i];
    }
}

/**
 * 注入“添加至选课列表”按钮
 */
function injectAddToListButton() {
    addElement('button', `添加至选课列表`, {
        onclick: function () {
            document.querySelectorAll('[type=checkbox]').forEach(item => {
                if (item.checked) {
                    item.checked = false;
                    let courseListJson = JSON.parse(localStorage.getItem("courseListJson"));
                    courseListJson[item.parentElement.parentElement.children[3].innerText + item.parentElement.parentElement.children[4].innerText + item.parentElement.parentElement.children[5].innerText] = `<tr>
						<td>` + item.parentElement.parentElement.children[2].innerText + `</td>
						<td>` + item.parentElement.parentElement.children[3].innerText + `</td>
						<td>` + item.parentElement.parentElement.children[4].innerText + `</td>
						<td>` + item.parentElement.parentElement.children[7].innerText + `</td>
						<td>` + item.parentElement.parentElement.children[8].innerText + `</td>
						<td>` + item.parentElement.parentElement.children[9].innerText + `</td>
						<td>` + item.parentElement.parentElement.children[14].innerText + `</td>
						<td>` + item.parentElement.parentElement.children[5].innerText + `</td>
						<td>` + item.parentElement.parentElement.children[6].innerText + `</td>
						<td>` + item.parentElement.parentElement.children[15].innerText + `</td>
						<td>` + item.parentElement.parentElement.children[12].innerText + `</td>
						<td>` + item.parentElement.parentElement.children[13].innerText + `</td>
						<td>
							<a onclick="removeCourse('` + item.parentElement.parentElement.children[3].innerText +
                        item.parentElement.parentElement.children[4].innerText +
                        item.parentElement.parentElement.children[5].innerText + `')" href="javascript:void(0);"> 移除 
							</a>
						</td>
					</tr>`;
                    localStorage.setItem("courseListJson", JSON.stringify(courseListJson));
                }
            });
            submitForm();
        },
        id: "addToList_button"
    }, document.querySelector('.footbutton'));
}

/**
 * 自动选课函数
 */
function autoSelectCourseFunc() {
    if (localStorage.getItem("Selecting") !== "true") {
        //console.log("Not Enabled.");
    } else {
        //console.log("Enabled.");
        var courseListArray = document.querySelector('#courseList_tbody').childNodes;
        var checkBoxPatten = /kcmcGrid_ctl[0-9]{2,3}_xk/;
        document.querySelectorAll('[type=checkbox]').forEach(item => {
            if (checkBoxPatten.test(item.id)) {
                for (let i = 1; i < courseListArray.length; i++) {
                    if (
                        (item.parentElement.parentElement.children[2].innerText === courseListArray[i].querySelectorAll("td")[0].innerText) &&
                        (item.parentElement.parentElement.children[4].innerText === courseListArray[i].querySelectorAll("td")[2].innerText) &&
                        (item.parentElement.parentElement.children[5].innerText === courseListArray[i].querySelectorAll("td")[7].innerText)) {
                        item.checked = true;
                    }
                }
            }
        });
        submitForm();
    }
}

/**
 * 插入拦截Alert脚本
 */
function injectAlertDisabler() {
    if (document.documentElement === undefined) {
        return;
    }
    addElement('script', `
    window.original_alert = window.alert;
    window.alert = (text) => {
		console.log(text);
    };`, {
        className: "disableAlert_script"
    }, document.documentElement);
}

/**
 * 选中选课框
 */
function checkBox() {
    document.querySelector('#kcmcGrid').querySelector('input').checked = true;
}

/**
 * 提交选课
 */
function submitForm() {
    document.querySelector('#Button1').click();
}

/**
 * 添加 loading 条
 */
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

/**
 * 点击搜索按钮
 */
function searchClass() {
    document.querySelector('input#Button2').click();
}
