import { ELEMENT_NODE_TYPE, ANIMATION_CLASS_NAME } from './constant';
import { DEFAULTS } from './defaultS';

class BaseSlider {
    constructor(el, option) {
        if (el.nodeType !== ELEMENT_NODE_TYPE) {
            throw new Error('实例化的时候请传入DOM元素')
        }

        // 处理传入参数及默认参数
        this.option = {
            ...DEFAULTS,
            ...option
        };
        // 获取DOM元素
        const sliderEl = el;
        const sliderContentEl = sliderEl.querySelector('.slider-content');
        const sliderItems = sliderContentEl.querySelectorAll('.slider-item');
        const circles = document.getElementById('circles');
        const circleList = circles.getElementsByTagName('li');
        // 绑定this属性
        this.sliderEl = sliderEl;
        this.sliderContentEl = sliderContentEl;
        this.sliderItems = sliderItems;
        this.minIndex = 0;
        this.maxIndex = sliderItems.length - 1;
        this.currentIndex = this.getIndex(this.option.initIndex);
        this.circles = circles;
        this.circleList = circleList;
        // 获取单张轮播图宽度
        // this.imgWidth = sliderItems[0].offsetWidth;
        this.imgWidth = 1 / this.sliderItems.length * 100;

        // 初始化
        this.init();
    }
    // 索引值修正
    getIndex(index) {
        if (index > this.maxIndex) return this.minIndex;
        if (index < this.minIndex) return this.maxIndex;
        return index;
    }
    // 初始化
    init() {
        // 设置每张图片宽度
        this.setItemWidth();
        // 设置content盒子总宽度
        this.setContentWidth();
        // 跳转到设定的初始索引
        this.move(this.currentIndex);
        // 判定动画
        this.setAnimation();
        // 判定是否自动轮播
        this.autoPlay();
    }
    // 设置每张图片宽度
    setItemWidth() {
        for (let item of this.sliderItems) {
            item.style.width = `${this.imgWidth}%`;
        }
    }
    // 设置content盒子总宽度
    setContentWidth() {
        this.sliderContentEl.style.width = `${this.sliderItems.length}00%`
    }
    // 无动画切换
    move(index) {
        index = this.getIndex(index);
        this.sliderContentEl.style.transform = `translateX(-${index * this.imgWidth}%)`;
        this.setCircles(index)
    }
    // 带动画移动
    moveWithAnimation(index) {
        index = this.getIndex(index);
        // 设置动画速度
        this.setAnimationSpeed();
        this.sliderContentEl.style.transform = `translateX(-${index * this.imgWidth}%)`;
        this.setCircles(index);
        // console.log(this.sliderContentEl.style)
        // 切换完关闭动画
        this.sliderContentEl.addEventListener('transitionend', () => {
            this.closeAnimation();
        }, false)
    }
    // 直达索引值位置
    to(index) {
        index = this.getIndex(index);
        // 判断是否有动画
        if (this.option.animation) {
            this.moveWithAnimation(index);
        } else {
            this.move(index);
        }
        this.setCircles(index);
        this.currentIndex = index;
        // console.log(this.currentIndex);
    }
    // 判断动画
    setAnimation() {
        if (this.option.animation) {
            this.sliderContentEl.classList.add(ANIMATION_CLASS_NAME);
        }
    }
    // 判断是否自动轮播
    autoPlay() {
        const { autoplay } = this.option;
        if (autoplay <= 0) return;
        this.cancelAutoplay();
        this.aotoplayTimer = setInterval(() => {
            this.next();
        }, autoplay)
    }
    cancelAutoplay() {
        clearInterval(this.aotoplayTimer)
    }
    // 切换下一张
    next() {
        this.to(this.currentIndex + 1);
    }
    // 切换上一张
    prev() {
        this.to(this.currentIndex - 1)
    }
    // 设置动画速度
    setAnimationSpeed(speed = this.option.speed) {
        this.sliderContentEl.style.transitionDuration = `${speed}ms`;
    }
    // 取消动画
    closeAnimation() {
        this.setAnimationSpeed(0);
    }
    // 设置圆点
    setCircles(index) {
        for (const item of this.circleList) {
            if (index == item.getAttribute('data-n')) {
                item.classList.add('current')
            } else {
                item.classList.remove('current')
            }
        }
    }
}

export default BaseSlider;