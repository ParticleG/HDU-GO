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

	// 检查更新
	checkUpdate();
	document.querySelector('#version').onclick = checkUpdate;
}) ();

async function getNotice() {
	const response = await fetch('https://gitee.com/HDU-STEA/HDU-GO/raw/master/docs/notice.json');
	console.log(response);
	return await response.json();
}

async function getLatestVersion() {
	const response = await fetch(`https://gitee.com/HDU-STEA/HDU-GO/raw/master/.version.json`);
	return await response.json();
}

async function checkUpdate() {
	const { version } = chrome.app.getDetails();
	const res = await getLatestVersion();
	const { version: latestVersion, log } = res;
	if (latestVersion && latestVersion !== version) {
		chrome.notifications.create(null,
			{
				type: 'basic',
				iconUrl: 'img/icon.png',
				title: `发现新版本${latestVersion}`,
				message: `更新日志：${log}`,
				buttons: [{title: '确定更新', iconUrl: ''}]
			},
			function () {
				chrome.notifications.onButtonClicked.addListener(function (notificationId) {
					window.open('https://gitee.com/HDU-STEA/HDU-GO/releases');
					chrome.notifications.clear(notificationId);
				});
			}
		);
	}
	else
	{
		mdui.snackbar("检查更新完毕，目前已是最新版");
	}
}