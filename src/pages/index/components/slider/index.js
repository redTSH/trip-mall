import './slider.css';
import { bannerURL } from 'api/URL';
import render from './slider.art';
import BaseSlider from './module/baseslider';


// Ajax获取图片
import { getJSON } from 'api/ajax';

const layOut = document.getElementById('layout');
// const url = 'https://www.imooc.com/api/mall-PC/index/slider?icode=JC0398061C17A8687'
getJSON(bannerURL).then(response => {
    if (response.code !== 200) {
        throw new Error(`检验码不正确:${response.code}`)
    } else {
        layOut.innerHTML = render({
            items: response.data
        })
    }
    const left_btn = document.getElementById('left_btn');
    const right_btn = document.getElementById('right_btn');
    const banner = document.getElementById('banner');
    const circles = document.getElementById('circles');
    // const circleList = circles.getElementsByTagName('li');
    // 获取完Ajax数据再进行实例化
    const el = document.querySelector('.slider');
    const slider = new BaseSlider(el, {
        initIndex: 2,
        animation: true,
        speed: 300,
        autoplay: 1000
    })
    // 绑定按钮事件
    left_btn.addEventListener('click', () => {
        slider.prev();
    }, false)
    right_btn.addEventListener('click', () => {
        slider.next();
    }, false)
    // 绑定鼠标进出事件
    banner.addEventListener('mouseenter', () => {
        slider.cancelAutoplay();
    })
    banner.addEventListener('mouseleave', () => {
        slider.autoPlay();
    })
    // 小圆点点击事件
    circles.addEventListener('click', e => {
        if (e.target.tagName.toLowerCase() === 'li') {
            let n = Number(e.target.getAttribute('data-n'));
            slider.to(n);
        }
    }, false)
}).catch(err => {
    alert(err)
});



//实例化




