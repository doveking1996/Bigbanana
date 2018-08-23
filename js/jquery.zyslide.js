(function($) {

    // 本函数每次调用只负责一个轮播图的功能
    // 也就说只会产生一个轮播图，这个函数的作用域只能分配一个轮播图
    // 所以要求在调用本函数的时候务必把当前轮播图的跟标签传递过来。
    // 这里的形参 ele 就是某个轮播的根标签
    // ele轮播图标签
    var slide = function(ele, options) {
            // 转化为 jquery 标签对象
            var $ele = $(ele);
            // 规定一些默认的设置
            var settings = {
                    // 轮播图炸开的时间
                    delay: 1000,
                    // 轮播图轮播的速度
                    speed: 1000

                }
                // 合并对象
            $.extend(true, settings, options);
            console.log(settings);


            // 规定好每张图片处于的位置和状态
            var states = [
                { ZIndex: 1, width: 120, height: 150, top: 69, left: 134, ZOpacity: 0.2 },
                { ZIndex: 2, width: 130, height: 170, top: 59, left: 0, ZOpacity: 0.5 },
                { ZIndex: 3, width: 170, height: 218, top: 35, left: 110, ZOpacity: 0.7 },
                { ZIndex: 4, width: 224, height: 288, top: 0, left: 263, ZOpacity: 1 },
                { ZIndex: 3, width: 170, height: 218, top: 35, left: 470, ZOpacity: 0.7 },
                { ZIndex: 2, width: 130, height: 170, top: 59, left: 620, ZOpacity: 0.5 },
                { ZIndex: 1, width: 120, height: 150, top: 69, left: 500, ZOpacity: 0.2 }
            ];
            var lis = $ele.find("li");
            // 让所有li展开(让每个 li 对应上面 states 的每个状态)
            function move() {
                lis.each(function(index, ele) {
                    var state = states[index];
                    $(ele).css("zIndex", state.ZIndex)
                        .finish().animate(state, settings.delay)
                        .find("img").css("opacity", state.ZOpacity);
                });

            }
            move();
            // 上一张
            function pre() {
                // 把数组第一个对象放到数组末尾去
                // var r = states.shift()删除第一个元素，并返回这个元素(r)
                // states.push(r)把第一个元素再放入数组末尾
                states.push(states.shift());
                move();
            }
            // 下一张
            function next() {
                // 把数组最后一个元素移到数组的第一位
                states.unshift(states.pop());
                move();
            }
            $ele.find(".pre").click(pre);
            $ele.find(".next").click(next);
            //保存定时器
            var interval = null;
            // 自动播放函数
            function autoPlay() {
                interval = setInterval(next, settings.speed);
            }
            // 调用自动播放
            autoPlay();
            // 监听hover事件
            // 当鼠标在两个按钮和图片上，清除定时器，不会自动轮播
            // 当鼠标移出时，再次调用自动播放函数，让轮播图再次自动播放
            $ele.find("section,li").hover(function() {
                clearInterval(interval);
            }, autoPlay);
        }
        // slide($("#box"));
        // $.fn = $.prototype
    $.fn.ZySlide = function(options) {
            console.log(this);
            $(this).each(function(i, ele) {
                slide(ele, options);
            });
            return this;
        }
        // console.log($.fn);
})(jQuery);
// 用 jQuery 封装插件的几种写法：
// 用插件类：
// $.fn.slide = function () {  }
// 使用sldie使用：$(".slide").slide()

// 工具类：
// $.slide = function () {  }
// 使用： $.slide();