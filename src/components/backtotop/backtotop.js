/* 
 * 返回顶部特效
 * 姓名：李TSH
 * 日期：2020年11月29日
 */
(function () {
    var backToTop = document.getElementById('backToTop');

    var timer;
    // 按钮点击监听
    backToTop.onclick = function () {
        clearInterval(timer);
        // 定时器让scrollTop值步进减少，达到特效
        timer = setInterval(function () {
            document.documentElement.scrollTop -= 100;
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(timer);
            }
        }, 20);
    }

    // 页面卷动监听
    window.onscroll = function () {
        // 兼容性考虑
        var scrollTop = document.documentElement.scrollTop || window.scrollY;
        if (scrollTop == 0) {
            backToTop.style.display = 'none';
        } else {
            backToTop.style.display = 'block';
        }
    }

})()