// 初始获取和配置
let item = document.querySelectorAll('.slide .item');
let pointCont = document.querySelector('.point-cont');
// 为每个项随机添加背景色和添加指示点
item.forEach((item, index) => {
    item.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    const point = document.createElement('div');
    !index ? point.classList.add('point', 'active') : point.classList.add('point');
    pointCont.appendChild(point);
})
let point = document.querySelectorAll('.point-cont .point');
let slide = document.querySelector('.slide');

// 设置和监听滑动容器的宽度为所有项的总宽度
slide.style.width = item.length + "00%";

// 获取单个项的宽度
let itemWidth = item[0].offsetWidth;
// 标志变量，用于控制触摸状态
let flag = false;
// 触摸起始位置
let startX = 0;
// 当前显示项的索引
let nowIndex = 0;

// 触摸事件开始监听
slide.addEventListener('touchstart', function (e) {
    down(e, this);
})
// 监听鼠标点击
slide.addEventListener('mousedown', function (e) {
    down(e, this);
})
// 触摸移动事件监听
slide.addEventListener('touchmove', function (e) {
    move(e, this);
})
// 监听鼠标移动事件
slide.addEventListener('mousemove', function (e) {
    move(e, this);
})
// 触摸结束事件监听
slide.addEventListener('touchend', function (e) {
    up(this);
})
// 监听鼠标起立事件
slide.addEventListener('mouseup', function (e) {
    up(this);
})
function down(e, that) {
    // 开始触摸
    flag = true;
    // 去除过渡效果
    that.style.transition = "none";
    // 记录触摸起始位置 判断是手指还是电脑
    startX = e.touches ? e.touches[0].clientX : e.clientX;
}
function move(e, that) {
    // 判断是否可以开始滑动
    if (!flag) return;
    // 计算手指滑动的距离 判断是手指还是电脑0
    let moveVlu = e.touches ? e.touches[0].clientX - startX : e.clientX - startX;
    slide.style.transform = `translateX(${moveVlu - itemWidth * nowIndex}px)`;
}
function up(that) {
    // 初始化最小距离为正无穷大
    let minDistance = Infinity;
    // 遍历所有项获取最接近视窗左边的项
    item.forEach((item, index) => {
        // 获取项的左侧视窗偏移值
        let itemTransX = Math.abs(item.getBoundingClientRect().left);
        // 给每个项移除选中的类名
        point[index].classList.remove('active');
        // 比较并更新最小距离和当前项的索引
        if (itemTransX < minDistance) {
            // 更新最小值
            minDistance = Math.abs(itemTransX);
            // 更新当前索引项
            nowIndex = index;
        }
    })
    // 添加过渡效果
    that.style.transition = ".5s";
    // 将最近的项显示
    slide.style.transform = `translateX(${-nowIndex * itemWidth}px)`;
    // 给当前显示项的对应指示点添加类名
    point[nowIndex].classList.add('active');
    // 关闭触摸
    flag = false;
}
// 调用轮播
slider(3000)
// 轮播函数
function slider(time) {
    // 定时器
    setInterval(() => {
        // 判断当前显示的项并添加过渡动画
        if (nowIndex >= item.length - 1) {
            nowIndex = 0;
            slide.style.transition = "none";
        } else {
            nowIndex++;
            slide.style.transition = ".5s";
        }
        // 给每个项移除选中的类名
        point.forEach(item => {
            item.classList.remove('active');
        })
        // 给当前显示项的对应指示点添加类名
        point[nowIndex].classList.add('active');
        // 显示当前nowIndex的项
        slide.style.transform = `translateX(${-nowIndex * itemWidth}px)`;
    }, time)
}