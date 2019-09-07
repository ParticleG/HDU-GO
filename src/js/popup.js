(async function () {
	const config = await readConfig();
	const manifest = chrome.app.getDetails();

	// 显示每个 input 的开关状态
	Object.keys(config).forEach(key => {
		const input = document.querySelector(`input[name="${key}"]`);
		if (input) {
			input.checked = config[key] || false;
		}
	});

	// TODO: 有待优化哦，挨个儿绑事件可以但没必要
	// 给 checkbox 绑定 change 事件
  document.querySelectorAll('input[name]').forEach(item => {
		item.onchange = function () {
			const { name, checked, title: message = '已开启' } = this;
			checked && mdui.snackbar({ message });
			config[name] = checked;
			// 保存配置
			saveConfig(config);
		}
	});

	// 填充版本号
	document.querySelector('#version').innerText = `版本：${manifest.version}`;

	// 公告板相关
	const noticeBoard = document.querySelector('#noticeBoard');
	const { date, content } = await getNotice();
	noticeBoard.querySelector('.mdui-card-header-subtitle').innerText = date;
	noticeBoard.querySelector('.mdui-card-content').innerHTML = content;
}) ();

async function getNotice() {
	const response = await fetch('https://www.alphanut.cn/HDU-GO/index.php?method=getNotice');
	return await response.json();
}
