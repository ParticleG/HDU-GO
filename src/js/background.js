/**
 * 在这里阻止请求验证码图片
 * PS：这里蹭了一个教务系统的漏洞，只要拦截验证码的请求，就可以不用提交验证码
 * Google 文档：https://developer.chrome.com/extensions/webRequest#examples
 */
(async function () {
  const config = await readConfig();
  if (!config.disableCaptcha) {
    return;
  }

  chrome.webRequest.onBeforeRequest.addListener(
    function () {
      return { cancel: true };
    },
    { urls: ['*://jxgl.hdu.edu.cn/CheckCode.aspx', '*://jxglteacher.hdu.edu.cn/CheckCode.aspx'] },
    ['blocking']
  );
}) ();
