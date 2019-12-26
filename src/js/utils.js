/**
 * 一些通用方法
 */

/**
 * 默认设置
 * （外部脚本请勿直接访问此变量，获取配置通过 const config = await readConfig(); 进行获取）
 */
const OPTION = {
	/* 抢课设置 */
	disableCaptcha: false,

	/* 自动计算学分设置 */
	countCredit: false,

	/* 自动计算学分设置 */
	autoRate: false,
}

/**
 * 屏蔽信息框，仅屏蔽忽略 tipList 中的提示，其他提示语按照 alert 弹出
 * 必须在 "run_at": "document_start" 时注入才能生效
 */
function disableAlert() {
	addElement(
		'script',
		`
			window._alert = window.alert;
			window.alert = (text) => {
				if (text.includes('验证码不正确')) {
					window._alert(text);
					window._alert('HDU-GO 提示：请退出数字杭电账号并重新启动浏览器，使验证码屏蔽功能生效。');
					return;
				}
				const tipList = ['人数超过限制'];
				if (!tipList.some(item => text.includes(item))) {
					window._alert(text);
					return;
				}
				window.onload = () => {
					const div = document.createElement('div');
					div.innerHTML = text;
					div.style = \`
						background: #fff;
						padding: 0 30px;
						height: 50px;
						line-height: 50px;
						border-radius: 4px;
						border: 2px solid #f00;
						text-align: center;
						position: fixed;
						top: 10px;
						right: 10px;
					\`;
					document.body.appendChild(div);
				}
			};
		`,
		{},
		document.documentElement
	);
}

/**
 * 屏蔽验证码图片
 */
function disableCaptcha() {
	const img = document.querySelector('img[src="CheckCode.aspx"]');
	img.removeAttribute('src');
	img.parentElement.innerHTML = 'HDU-GO 为您屏蔽了验证码，每次重新开启屏蔽验证码功能都请重新启动浏览器确保功能生效。';
}

/**
 * 向指定 父元素 中添加 子元素
 * @param {String} tagName 子元素标签名称
 * @param {String} innerHTML 子元素的内容
 * @param {Object} options 子元素的属性
 * @param {HTMLElement} fatherEl 父元素，默认为 body
 */
function addElement(tagName, innerHTML = '', options = {}, fatherEl = document.body) {
	const el = document.createElement(tagName);
	el.innerHTML = innerHTML;
	Object.assign(el, options);
	fatherEl.appendChild(el);
}

/**
 * 获取用户配置
 * 取消回调写法，调用使用 async/await
 */
function readConfig() {
	return new Promise(resolve => {
		chrome.storage.sync.get(OPTION, function (option) {
			// 获取到的 option 合并到内存里
			Object.assign(OPTION, option);
			resolve(option);
		});
	});
}

/**
 * 保存用户配置
 */
function saveConfig(config) {
	chrome.storage.sync.set(config);
}

/**
 * 计算数字和，用法：sum(1, 2, 3, ...)
 * @param  {...Number} num 待累加的数字
 */
function sum(...num) {
	return num.reduce(
		(a, b) => a + b,
		0
	);
}
