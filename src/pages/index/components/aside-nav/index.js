import './aside-nav.css';
import { getJSON } from 'api/ajax';
import { menuURL } from 'api/URL';
import './seconditem'
import './menu'

import render from './item.art';

const aside_nav_ul = document.getElementById('aside_nav_ul');

getJSON(menuURL).then(response => {
    if (response.code !== 200) {
        throw new Error(`侧导航模块获取错误:${response.code}`)
    } else {
        aside_nav_ul.innerHTML = render({ items: response.data });
    }
}).catch(err => {
    alert(err)
})

// data: Array(6)
// 0:
// key: "hot"
// subTitles: (5) ["北京", "上海", "广深", "西南", "东北"]
// title: "热门出发地"
// __proto__: Object
// 1: {key: "hk", title: "港澳台", subTitles: Array(3)}
// 2: {key: "japan", title: "日本", subTitles: Array(5)}
// 3: {key: "asia", title: "东南亚 西亚", subTitles: Array(5)}
// 4: {key: "eu", title: "欧洲 美洲", subTitles: Array(4)}
// 5: {key: "au", title: "澳新 中东非", subTitles: Array(3)}