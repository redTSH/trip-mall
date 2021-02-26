(function () {
    var aside_nav_ul = document.getElementById('aside_nav_ul');
    var menus = document.querySelectorAll('.menu_box .menu');
    var aside_nav = document.getElementById('aside_nav');
    var menus_lis = aside_nav_ul.getElementsByTagName('li');

    aside_nav_ul.onmouseover = function (e) {
        // 鼠标进入时更新一下二级菜单的dom元素
        menus = document.querySelectorAll('.menu_box .menu');
        menus_lis = aside_nav_ul.getElementsByTagName('li');

        if (e.target.tagName.toLowerCase() == 'li') {
            var t = e.target.getAttribute('data-t');
            var themenu = document.querySelector('.menu_box .menu[data-t=' + t + ']');
            if (!themenu) {
                return;
            }
            // 清除其他li身上的current
            for (var i = 0; i < menus_lis.length; i++) {
                menus_lis[i].className = menus_lis[i].getAttribute('data-t');
                menus[i].className = 'menu';
            };
            // 让当前指着的li和他的子菜单得到current
            e.target.className += ' current';
            themenu.className = 'menu current';
        }
    }
    // 鼠标离开时，取消子菜单的弹出和li的高光
    aside_nav.onmouseleave = function () {
        // 遍历然后清除所有
        for (var i = 0; i < menus_lis.length; i++) {
            if (menus.length < menus_lis.length) {
                break;
            }
            menus_lis[i].className = menus_lis[i].getAttribute('data-t');
            menus[i].className = 'menu';
        }
    }
})()