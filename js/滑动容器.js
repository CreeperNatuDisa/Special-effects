// 获取所有滑动项和滑动容器
let item = document.querySelectorAll('.slide .item');
let point = document.querySelectorAll('.point-cont .point');
let slide = document.querySelector('.slide');

item.forEach(item => item.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`)

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
    // 开始触摸
    flag = true;
    // 去除过渡效果
    this.style.transition = "none";
    // 记录触摸起始位置
    startX = e.changedTouches[0].clientX;
})

// 监听鼠标点击
slide.addEventListener('mousedown', function (e) {
    console.log(e)
    // 开始
    flag = true;
    // 去除过渡效果
    this.style.transition = "none";
    // 记录起始位置
    startX = e.clientX;
})

// 触摸移动事件监听
slide.addEventListener('touchmove', function (e) {
    // 判断是否可以开始滑动
    if (!flag) return;
    // 获取滑动容器的transform值
    const boxTrams = this.style.transform;
    // 获取滑动容器的translateX值
    const nowTransNum = Number(boxTrams.substring(11, boxTrams.length - 3));
    // 计算手指滑动的距离
    let moveVlu = e.changedTouches[0].clientX - startX;
    slide.style.transform = `translateX(${moveVlu - itemWidth * nowIndex}px)`;
})

// 监听鼠标移动事件
slide.addEventListener('mousemove', function (e) {
    // 判断是否可以开始滑动
    if (!flag) return;
    // 获取滑动容器的transform值
    const boxTrams = this.style.transform;
    // 获取滑动容器的translateX值
    const nowTransNum = Number(boxTrams.substring(11, boxTrams.length - 3));
    // 计算鼠标滑动的距离
    let moveVlu = e.clientX - startX;
    slide.style.transform = `translateX(${moveVlu - itemWidth * nowIndex}px)`;
})

// 触摸结束事件监听
slide.addEventListener('touchend', function (e) {
    // 初始化最小距离为正无穷大
    let minDistance = Infinity;
    // 添加过渡效果
    this.style.transition = ".5s";
    // 获取滑动容器的transform值
    const boxTrams = this.style.transform;
    // 获取滑动容器的translateX值
    const nowTransNum = Number(boxTrams.substring(11, boxTrams.length - 3));
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
    // 将最近的项显示
    slide.style.transform = `translateX(${-nowIndex * itemWidth}px)`
    // 给当前显示项的对应指示点添加类名
    point[nowIndex].classList.add('active')
    // 关闭触摸
    flag = false;
})

// 监听鼠标起立事件
slide.addEventListener('mouseup', function (e) {
    // 初始化最小距离为正无穷大
    let minDistance = Infinity;
    // 添加过渡效果
    this.style.transition = ".5s";
    // 获取滑动容器的transform值
    const boxTrams = this.style.transform;
    // 获取滑动容器的translateX值
    const nowTransNum = Number(boxTrams.substring(11, boxTrams.length - 3));
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
    // 将最近的项显示
    slide.style.transform = `translateX(${-nowIndex * itemWidth}px)`
    // 给当前显示项的对应指示点添加类名
    point[nowIndex].classList.add('active')
    // 关闭触摸
    flag = false;
})