import { getJSON } from 'api/ajax';
import { menuURL } from 'api/URL';
import render from './seconditem.art';

const aside_nav = document.getElementById('aside_nav');
const menuBox = aside_nav.querySelector('.menu_box');

getJSON(menuURL).then(response => {
    if (response.code !== 200) {
        throw new Error(`侧导航模块获取错误:${response.code}`)
    } else {
        return response.data;
    }
}).then(data => {
    let html = '';
    let arr = [];
    for (const item of data) {
        let itemURL = `${menuURL}\/${item.key}`;
        arr.push(getJSON(itemURL).then(response => {
            if (response.code !== 200) {
                throw new Error(`侧导航二级模块获取错误:${response.code}`)
            } else {
                // console.log(html);
                html += render({ items: response.data, key: item.key });
            }
        }))
    }
    Promise.all(arr).then(() => {
        menuBox.innerHTML = html;
    });
}).catch(err => {
    alert(err)
})