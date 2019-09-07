(async function () {
	const config = await readConfig();

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
}) ();
