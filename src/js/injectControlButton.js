// 入口
window.onload = async () => {
    const config = await readConfig();
    localStorage.setItem("Selecting","false");
	renderCtrlBtn(config);
};

function renderCtrlBtn(config) {
	if(document.querySelector('.nav') == undefined) {
		return;
	}
	addElement('li', ``, {
		id:"hduGO_li",
		className:"top"
	}, document.querySelector('.nav'));
	addElement('a', ``, {
		href:"javascript:void(0);",
		id:"hduGO_a",
		className:"top_link"
	}, document.querySelector('#hduGO_li'));
	addElement('span', `HDU-GO`, {
		id: "hduGO_span",
		className: "down"
    }, document.querySelector('#hduGO_a'));
    
	addElement('ul', ``, {
		href:"javascript:void(0);",
		id:"hduGO_ul",
		className:"sub"
    }, document.querySelector('#hduGO_li'));
    if(config.disableCaptcha) {
        addElement('li', ``, {
            id:"autoSelectCourse_li",
            className:"top"
        }, document.querySelector('#hduGO_ul'));
        addElement('a', `自动抢课`, {
            href:"javascript:void(0);",
            onclick: function () {
                switch (document.querySelector("#dqwz").innerText) {
                    case "选普通理论及实验课":
                        if(localStorage.getItem("Selecting") != "true") {
                            localStorage.setItem("Selecting", "true");
                        } else {
                            alert('已经开始自动抢普通理论及实验课，请勿重复点击开始！');
                        }
                        break;
                    case "选体育课":
                        if(localStorage.getItem("Selecting") != "true") {
                            localStorage.setItem("Selecting", "true");
                        } else {
                            alert('已经开始自动抢体育课，请勿重复点击开始！');
                        }
                        break;
                    case "选实践课":
                        if(localStorage.getItem("Selecting") != "true") {
                            localStorage.setItem("Selecting", "true");
                        } else {
                            alert('已经开始自动抢实践课，请勿重复点击开始！');
                        }
                        break;
                    case "通识选修课":
                        if(localStorage.getItem("Selecting") != "true") {
                            if (window.confirm("确定要开始自动抢课吗？")) {
                                document.querySelector("#iframeautoheight").contentDocument.querySelector('[name=ddl_kcxz]').value = "";
                                document.querySelector("#iframeautoheight").contentDocument.querySelector('[name=ddl_ywyl]').value = "";
                                document.querySelector("#iframeautoheight").contentDocument.querySelector('[name=ddl_kcgs]').value = "";
                                document.querySelector("#iframeautoheight").contentDocument.querySelector('[name=ddl_sksj]').value = "";
                                document.querySelector("#iframeautoheight").contentDocument.querySelector('#TextBox1').value = "";
                                document.querySelector("#iframeautoheight").contentDocument.querySelector('#Button2').click();
                                localStorage.setItem("Selecting", "true");
                            }
                        } else {
                            if (window.confirm("确定要停止自动抢课吗？")) {
                                localStorage.setItem("Selecting", "false");
                            }
                        }
                        break;
                    default:
                        alert('请先进入任意选课页面再点击此按钮哦！');
                        break;
                }
            },
            id:"autoSelectCourse_a"
        }, document.querySelector('#autoSelectCourse_li'));
    }
    if(config.autoRate){
        addElement('li', ``, {
            id:"autoRating_li",
            className:"top"
        }, document.querySelector('#hduGO_ul'));
        addElement('a', `自动评价`, {
            href:"javascript:void(0);",
            onclick: function () {
                if(localStorage.getItem("Rating") != "true") {
                    localStorage.setItem("Rating", "true");
                    document.querySelector('[href="xsjxpj.aspx?xkkh=xsjxpj.aspx&xh=16051614&gnmkdm=N121401"]').click();
                } else {
                    alert('已经开始自动学评教，请勿重复点击开始！');
                }
            },
            id:"autoRating_a"
        }, document.querySelector('#autoRating_li'));
    }
}