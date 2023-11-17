function initSakanaWidget() {
    new SakanaWidget({ autoFit: true }).mount("#sakana-widget-chisato");
    new SakanaWidget({ character: 'takina', autoFit: true }).mount("#sakana-widget-takina");
}
const vm = new Vue({
    el: '#box',
    data: {
        fileList: ['下雪', '价钱选择', '价钱选择突出显示', '嘉城快乐修机小训练', '圆形进度条', '弹性扩展板', '彩色登录页', '手写签名', '文字上浮显示', '文字剪纸', '文字弹跳', '文字扩散', '旋转加载动画', '流星雨', '滑动跟踪导航栏', '粒子特效', '运动背景', '鼠标移入移出文字过渡效果']
    },
    created() {

    },
    methods: {

    },
})