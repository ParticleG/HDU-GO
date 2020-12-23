/**
 * 网上选课 -> 选普通理论及实验课
 * 网上选课 -> 学生选课情况查询
 * 在 http://jxgl.hdu.edu.cn/xsxk.aspx* 中注入本脚本
 * 在 http://jxgl.hdu.edu.cn/xsxkqk.aspx* 中注入本脚本
 */

const TABLE_ID = {
    '/xsxk.aspx': 'kcmcgrid',
    '/xsxkqk.aspx': 'DBGrid',
};
const CREDIT_INDEX = {
    '/xsxk.aspx': 4,
    '/xsxkqk.aspx': 5,
};

// 入口
window.onload = async () => {
    const config = await readConfig();
    if (!config.countCredit) {
        return;
    }

    // 不同页面的表格 id 不同，学分所在的列也不同，自动适配下
    const tableId = TABLE_ID[location.pathname];
    const creditIndex = CREDIT_INDEX[location.pathname];

    const creditArr = Array.from(document.querySelector(`#${tableId}`).querySelectorAll('tr'))
        .map(item => item.querySelectorAll('td')[creditIndex])
        .map(item => parseFloat(item && item.innerHTML))
        .filter(item => !isNaN(item));
    const creditSum = sum(...creditArr);

    document.querySelector(`#${tableId}`)
        .querySelector('tr')
        .querySelectorAll('td')[creditIndex]
        .innerHTML += `<br /><br />合计: ${creditSum}`;
}


