/*
 * @Author: blank 1653571991@qq.com
 * @Date: 2024-09-04 10:07:33
 * @LastEditors: blank 1653571991@qq.com
 * @LastEditTime: 2024-09-04 10:35:15
 * @FilePath: \h5\statics\js\PostCSS.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
window.onresize = function() {
    setFontSizeBasedOnWidth();
}

function setFontSizeBasedOnWidth() {
    const width = window.innerWidth || document.documentElement.clientWidth;
    const fontSize = width / 375; // 假设100px屏幕宽度对应1rem
    document.documentElement.style.fontSize = `${fontSize}px`;
}
setFontSizeBasedOnWidth();