/**
 * 教务系统首页
 * 在 http://jxgl.hdu.edu.cn/xs_main.aspx* 中注入本脚本
 */

window.onload = async () => {
  const config = await readConfig();
  setName('config 里的 name');
}

function setName(name) {
  document.querySelector('#xhxm').innerHTML = name;
}
