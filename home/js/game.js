var oDom, oGanzi, oShandow, maxLeft, oWidth, oHeight, isCatch = false,
    timerWawa;
var audo = document.getElementById('ng-m');
audo.play();
window.onload = function() {
    TDAPP.onEvent('首页访问', "访问");
    oDom = $(".pole");
    oGanzi = $(".ganzi");
    oShandow = $(".shandow-pole");
    maxLeft = $(".game-area").innerWidth() - oDom.innerWidth() * 1.05;
    oWidth = oDom.innerWidth();
    oHeight = oDom.innerHeight();
    //	console.log($(".game-area").width() + '------' + oDom.width() + '------' + maxLeft);
    // 首次进入页面随机展示一个娃娃机
    var totalIndex = parseInt(Math.random() * $(".shandow-wawa-box").length);
    console.log(totalIndex);
    console.log("----------hide wawa--------------")
    $(".shandow-wawa-box").hide().eq(totalIndex).show().addClass("act");
    $(".wawa-box").hide().eq(totalIndex).show().addClass("act");
    //设置默认的机器ID和机器花费
    localStorage.setItem("ufoId", $(".wawa-box").eq(totalIndex).attr("data-mcid"));
    localStorage.setItem("totalMcCost", $(".wawa-box").eq(totalIndex).attr("data-cost"));
    $(".once").text(parseInt(localStorage.getItem("totalMcCost")) + '/次');
    //第一次影子坐标
    var swBoxNow = $('.shandow-wawa-box:eq(' + totalIndex + ') .shandow-wawa');
	updatePositionArr(swBoxNow);
	catchDebugger('------positionArr-------',positionArr)
    //娃娃等待时候台词开始
    openStaySpeak();
};
var positionArr = [];
var keyMusic = true;

function playMusic() {
    console.log('audo start')
    var audo = document.getElementById('ng-m');
    if (keyMusic) {
        audo.pause();
        console.log("off")
    } else {
        audo.play();
        console.log("on")
    }
    keyMusic = !keyMusic
}
//不经意间的触碰
document.addEventListener('click', function() {
    function audioAutoPlay() {
        if (keyMusic) {
            var audio = document.getElementById('ng-m');
            audio.play();
        }

    }
    audioAutoPlay();
});

$(".catch").on("click", function() {
    if (!isCatch) {
        TDAPP.onEvent("抓取按钮", "点击");
        //不让移动了
        $(".control-mask").show();
        isCatch = true;
        var p = $(".shandow-pole").position();
        console.log(p);
        goto(p);
        clearInterval(timer);
        $(".daojishi").hide();
    }
});
var timer;
/**
 * @name 倒计时
 */
function daojishi() {
    $(".daojishi").show();
    timer = setInterval(function() {
        var num = parseInt($(".daojishi").text())
        num -= 1;

        $(".daojishi").text(num);
        if (num == 0) {
            clearInterval(timer);
            $(".daojishi").hide();
            //@TODO zhuqu 
            if (!isCatch) {
                isCatch = true;
                var p = $(".shandow-pole").position();
                console.log(p);
                goto(p);
            }
        }
    }, 1000)
}

$(".wawa").on("click", function() {
    console.log($(this).index())
        //	playMusic();
})

$(".move-left").on("touchstart", function(e) {
    TDAPP.onEvent("调节按钮-左", "点击");
    e.preventDefault();
    oPole.ml();
})
$(".move-left").on("touchend", function(e) {
    e.preventDefault();
    oPole.me('left');
})
$(".move-right").on("touchstart", function(e) {
    TDAPP.onEvent("调节按钮-右", "点击");
    e.preventDefault();
    oPole.mr();
})
$(".move-right").on("touchend", function(e) {
    e.preventDefault();
    oPole.me('right');
})
$(".move-top").on("touchstart", function(e) {
    TDAPP.onEvent("调节按钮-上", "点击");
    e.preventDefault();
    oPole.mt();
})
$(".move-top").on("touchend", function(e) {
    e.preventDefault();
    oPole.me('top');
})
$(".move-bottom").on("touchstart", function(e) {
    TDAPP.onEvent("调节按钮-下", "点击");
    e.preventDefault();
    oPole.mb();
})
$(".move-bottom").on("touchend", function(e) {
        e.preventDefault();
        oPole.me('bottom');
    })
    //alert(new Date())
var oPole = {
    init: function() {
        //侧边栏出现
        $(".mask-enter").animate({
                left: "0%"
            }, 300)
        //娃娃原地表情复位
        openStaySpeak();
        //不让他们动了
        $(".control-mask").hide();
        //倒计时复位
        $(".daojishi").text(30);
        //控制面板复位
        $(".play-box").removeClass('hide');
        $(".control-box").addClass('hide');
        //抓取按钮开关复位
        isCatch = false;
        //杆子复位
        oDom.css({
            'width': '34%',
            'height': '44%',
            'top': '0',
            'left': '0',
        });
        //杆子阴影复位
        oShandow.css({
            'width': '1.67rem',
            'height': '0.68rem',
            'top': '75%',
            'left': '0',
        });
        //娃娃复位
        var indexDom = $(".act .wawa");
        catchDebugger("12456789",indexDom)
        initWawaPosition(indexDom,getWawaPosition(indexDom))
        //娃娃阴影提示复位
        $(".shandow-wawa").removeClass("red");
    },
    ml: function() {
        timeOutEvent = setTimeout("longPress('left',0)", 200); //这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适   
        return false;
    },
    mr: function() {
        timeOutEvent = setTimeout("longPress('right',maxLeft)", 200); //这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适   
        return false;
    },
    mt: function() {
        timeOutEvent = setTimeout("longPress('top','67%')", 200); //这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适   
        return false;
    },
    mb: function() {
        timeOutEvent = setTimeout("longPress('bottom','90%')", 200); //这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适   
        return false;
    },
    me: function(param) {
        oDom.stop();
        oShandow.stop();
        bingoMove();
        var isLeftStop = $(".foot-box").hasClass("go-left");
        var isRightStop = $(".foot-box").hasClass("go-right");
        if (isLeftStop) {
            $(".foot-box").removeClass("go-left").addClass("go-right");
            setTimeout(function() {
                $(".foot-box").removeClass("go-right");
            }, 300)
        }
        if (isRightStop) {
            $(".foot-box").removeClass("go-right").addClass("go-left");
            setTimeout(function() {
                $(".foot-box").removeClass("go-left");
            }, 300)
        }
        clearTimeout(timeOutEvent); //清除定时器   
        oWidth = oDom.innerWidth();
        oHeight = oDom.innerHeight();
        if (timeOutEvent != 0) {
            var oLeft = oDom.position().left;
            var sLeft = oShandow.position().left;
            var sWidth = oShandow.width();
            var sHeight = oShandow.height();
            var sTop = oShandow.position().top;
            if (param == 'right') {
                oLeft += 3;
                if (oLeft > maxLeft) {
                    oLeft = maxLeft;
                }
                oDom.animate({
                    left: oLeft
                }, 300, function() {
                    bingoMove();
                    //@ TODO why left is more important for right
                    $(".foot-box").removeClass("go-left").addClass("go-right");
                    setTimeout(function() {
                        $(".foot-box").removeClass("go-right");
                    }, 300)
                });
                oShandow.animate({
                    left: oLeft
                }, 300, function() { bingoMove(); });
                $(".foot-box").addClass("go-left");
            }
            if (param == 'left') {
                oLeft -= 12;
                if (oLeft < 0) {
                    oLeft = 0
                }
                oDom.animate({
                    left: oLeft
                }, 300, function() {
                    bingoMove();
                    $(".foot-box").removeClass("go-right").addClass("go-left");
                    setTimeout(function() {
                        $(".foot-box").removeClass("go-left");
                    }, 300)
                });
                oShandow.animate({
                    left: oLeft
                }, 300, function() { bingoMove(); });
                $(".foot-box").addClass("go-right");
            }
            if (param == 'top') {
                //				console.log($(".game-area").height()*0.69);
                sTop -= 3;
                if (sTop <= $(".game-area").height() * 0.69) {
                    sTop = $(".game-area").height() * 0.69
                }
                oShandow.animate({
                    top: sTop,
                }, 300, function() { bingoMove(); });
                //				console.log(oWidth + ' ------' +  oHeight)
                oWidth -= 0.86
                if (oWidth < $(".game-area").innerWidth() * 0.25) {

                    oWidth = $(".game-area").innerWidth() * 0.25
                }
                oHeight -= 1
                if (oHeight < $(".game-area").innerHeight() * 0.4) {
                    oHeight = $(".game-area").innerHeight() * 0.4
                }
                //				console.log(oWidth + '- -----' +  oHeight)
                oDom.animate({
                        width: oWidth,
                        height: oHeight,
                        //					left:oLeft,
                    })
                    //				console.log("---------------")
                    //				console.log(oShandow.position())
                    //								if (sTop<=300) {
                    //									oShandow.animate({top: 300},300);
                    //								}
                    //								if (sTop>360) {
                    //									oShandow.animate({top: 360},300);
                    //								}
                    //对准位置后影子变亮
                    // bingoMove();
            }
            if (param == 'bottom') {
                //				console.log(sTop);
                sTop += 3;
                if (sTop >= $(".game-area").height() - oShandow.height() * 0.97) {
                    sTop = $(".game-area").height() - oShandow.height() * 0.97
                }
                //				console.log(sTop);
                oShandow.animate({
                    top: sTop
                }, 300, function() { bingoMove(); });
                //				console.log(oWidth + ' ------' +  oHeight)
                oWidth += 0.66
                if (oWidth > $(".game-area").width() * 0.38) {
                    oWidth = $(".game-area").width() * 0.38
                }
                oHeight += 1
                if (oHeight > $(".game-area").height() * 0.5) {
                    oHeight = $(".game-area").height() * 0.5
                }
                //				console.log(oWidth + '- -----' +  oHeight)
                oDom.animate({
                        width: oWidth,
                        height: oHeight,
                    })
                    //对准位置后影子变亮
                    // bingoMove();
            }

            return false;
        }
        return false;
    },
    emptym: function() {
        TDAPP.onEvent("空抓动作", "点击");
        //不同位置的娃娃  爪子动画效果不同
        var anih, deanih;
        deanih = $(".ganzi").height();
        var top = $(".shandow-pole").position().top;
        var fatherh = $(".game-area").innerHeight();
        if (top > 0.66 * fatherh && top < 0.73 * fatherh) {
            anih = fatherh * 0.35 * 1.1
        }
        if (top > 0.73 * fatherh && top < 0.81 * fatherh) {
            anih = fatherh * 0.38 * 1.3
        }
        if (top > 0.81 * fatherh && top < 0.9 * fatherh) {
            anih = fatherh * 0.4 * 1.5
        }
        //		console.log('爪子阴影高度：' +  top   + "-------" +$(".game-area").innerHeight()*0.67 )
        //爪子下去
        $(".ganzi").animate({ height: anih }, 2000, function() {
            //爪子闭合
            bihe();
            //爪子上来
            $(this).animate({ height: deanih }, 2000, function() {
                //爪子张开
                zhangkai();
                //爪子复位
                $(".pole").animate({ left: 0 }, 2000, function() {
                        toastMessage("对准一些 ，再接再厉~");
                        setTimeout(initGame, 2000);
                    })
                    //爪子阴影复位
                $(".shandow-pole").animate({ left: 0 }, 2000)
            })
        })
    },
    bingom: function(param,pStyle) {
        TDAPP.onEvent("成功抓取动作", "点击");
        //不同位置的娃娃  爪子动画效果不同
        var anih, deanih;
        deanih = $(".ganzi").height();
        var top = $(".shandow-pole").position().top;
        var fatherh = $(".game-area").innerHeight();
        if (top > 0.66 * fatherh && top < 0.73 * fatherh) {
        	//@TODO 不同尺寸娃娃 杆子动画参数不同  
            switch (pStyle){
            	case "1":
            		anih = fatherh * 0.35 * 1.1
            		break;
            	case "2":
            		anih = fatherh * 0.35 * 1.09
            		break;
            	case "3":
            		anih = fatherh * 0.35 * 0.96
            		break;
            	case "4":
            		anih = fatherh * 0.35 * 1.1
            		break;
            	default:
            		anih = fatherh * 0.35 * 1.1
            		break;
            }
        }
        if (top > 0.73 * fatherh && top < 0.81 * fatherh) {
            switch (pStyle){
            	case "1":
            		anih = fatherh * 0.38 * 1.3
            		break;
            	case "2":
            		anih = fatherh * 0.38 * 1.255
            		break;
            	case "3":
            		anih = fatherh * 0.38 * 1.15
            		break;
            	case "4":
            		anih = fatherh * 0.38 * 1.22
            		break;
            	default:
        		 	anih = fatherh * 0.38 * 1.3
            		break;
            }
        }
        if (top > 0.81 * fatherh && top < 0.9 * fatherh) {
            switch (pStyle){
            	case "1":
            		anih = fatherh * 0.4 * 1.5
            		break;
            	case "2":
            		anih = fatherh * 0.4 * 1.455
            		break;
            	case "3":
            		anih = fatherh * 0.4 * 1.35
            		break;
            	case "4":
            		anih = fatherh * 0.4 * 1.4
            		break;
            	default:
        		 	anih = fatherh * 0.4 * 1.5
            		break;
            }
        }
        var indexDom = $(".act .wawa:eq(" + param + ")");
        var y = anih - deanih;
        var wawadet = indexDom.position().top - y;
        var x = indexDom.position().left - $(".pole").position().left;
        var wawat = wawadet * 1.05;
        var wawaW = indexDom.width() * 1.25;
        var wawaH = indexDom.height() * 1.25;
        //爪子下去
        $(".ganzi").animate({ height: anih }, 2000, function() {
            //爪子闭合
            bihe();
            //爪子上来
            $(this).animate({ height: deanih }, 2000, function() {
                    //爪子复位
                    $(".pole").animate({ left: 0, width: "38%", height: "50%" }, 2000,function(){
                    	setTimeout(initGame, 2000); 
                    })
                        //爪子阴影复位
                    $(".shandow-pole").animate({ left: 0, top: "90%" }, 2000)
                })
                //娃娃上来
            $(".act .wawa:eq(" + param + ")").animate({ top: wawadet }, 2000, function() {
                //娃娃复位
                $(this).animate({ left: x, top: wawat, width: wawaW, height: wawaH }, 2000, function() {
                    //爪子松开
                    zhangkai();
                    //娃娃进洞
                    $(this).animate({ top: wawadet + 2 * y }, 1000, function() { 
                    	toastMessage("抓到" + (param + 1) + "号娃娃了~");
                        })
                })
            })
        })
    },
    failedm: function(param,pStyle) {
        TDAPP.onEvent("失败抓取动作", "点击");
        //不同位置的娃娃  爪子动画效果不同
        var anih, deanih;
        deanih = $(".ganzi").height();
        var top = $(".shandow-pole").position().top;
        var fatherh = $(".game-area").innerHeight();
        if (top > 0.66 * fatherh && top < 0.73 * fatherh) {
        	//@TODO 不同尺寸娃娃 杆子动画参数不同  
            switch (pStyle){
            	case "1":
            		anih = fatherh * 0.35 * 1.1
            		break;
            	case "2":
            		anih = fatherh * 0.35 * 1.09
            		break;
            	case "3":
            		anih = fatherh * 0.35 * 0.96
            		break;
            	case "4":
            		anih = fatherh * 0.35 * 1.1
            		break;
            	default:
            		anih = fatherh * 0.35 * 1.1
            		break;
            }
        }
        if (top > 0.73 * fatherh && top < 0.81 * fatherh) {
            switch (pStyle){
            	case "1":
            		anih = fatherh * 0.38 * 1.3
            		break;
            	case "2":
            		anih = fatherh * 0.38 * 1.255
            		break;
            	case "3":
            		anih = fatherh * 0.38 * 1.15
            		break;
            	case "4":
            		anih = fatherh * 0.38 * 1.22
            		break;
            	default:
        		 	anih = fatherh * 0.38 * 1.3
            		break;
            }
        }
        if (top > 0.81 * fatherh && top < 0.9 * fatherh) {
            switch (pStyle){
            	case "1":
            		anih = fatherh * 0.4 * 1.5
            		break;
            	case "2":
            		anih = fatherh * 0.4 * 1.455
            		break;
            	case "3":
            		anih = fatherh * 0.4 * 1.35
            		break;
            	case "4":
            		anih = fatherh * 0.4 * 1.4
            		break;
            	default:
        		 	anih = fatherh * 0.4 * 1.5
            		break;
            }
        }
        var indexDom = $(".act .wawa:eq(" + param + ")");
        var y = anih - deanih;
        var wawadet = indexDom.position().top - y;
        var x = indexDom.position().left - $(".pole").position().left;
        var wawat = wawadet * 1.05;
        var wawaW = indexDom.width() * 1.25;
        var wawaH = indexDom.height() * 1.25;
        var wawaT = indexDom.position().top;
        //爪子下去
        $(".ganzi").animate({ height: anih }, 2000, function() {
            //爪子闭合、
            bihe();
            //			alert("zhuazishanglaile")
            //			alert($(this))
            //爪子上来
            $(this).animate({ height: deanih }, 2000, function() {
                //爪子复位
                $(".pole").animate({ left: 0, width: "38%", height: "50%" }, 2000,function(){
                	setTimeout(initGame, 2000);
                })
                    //爪子阴影复位
                $(".shandow-pole").animate({ left: 0, top: "90%" }, 2000)
            });
            //被抓起时表情
            upFace(indexDom);
            //			alert("zhuazimeile")

            //			console.log("-----------45645645645646456-------------")
            //			console.log($(".act .wawa:eq(" + param + ")"))
            //			console.log(wawadet)
            //			console.log(wawaT)
            //			console.log('------------')
            //			console.log()
            var h1,h2,t1,t2,randomTh;
            randomTh = parseInt(Math.random()*3);
            switch (randomTh){// 娃娃掉落技巧   -----  0:上一点点就掉    1: 上一半掉   2:上去再掉
            	case 0:
            		h1 = wawaT-10;t1 = 600;h2 = wawaT;t2 = 200
            		break;
            	case 1:
            		h1 = wawadet*1.6;t1 = 1500;h2 = wawaT;t2 = 650
            		break;
            	case 2:
            		h1 = wawadet;t1 = 2000;h2 = wawaT;t2 = 1000
            		break;
            	default:
            		h1 = wawadet;t1 = 2000;h2 = wawaT;t2 = 1000
            		break;
            }
            //娃娃上来 || 娃娃上一半
//            indexDom.animate({ top: wawaT-10 }, 600,"linear", function() {  200 上一点点就掉
//          indexDom.animate({ top: wawadet*1.6 }, 1500, function() {  800 上一半掉
//          indexDom.animate({ top: wawadet }, 2000, function() { 1000 上去再掉
            indexDom.animate({ top: h1 }, t1, function() {
                //娃娃掉下去
                $(this).animate({ top: h2, }, t2, function() {
                    //face
                    downFace(indexDom);
                    //					爪子张开
                    zhangkai();
                    //toastMessage("没抓到，再接再厉。");
                    failedToast();
                    
                })
            })
        })
    },
};
//爪子合住
function bihe() {
    $(".foot").addClass("bihe");
}
//爪子张开
function zhangkai() {
    $(".foot").removeClass("bihe");
}
//真正长按后应该执行的内容   
function longPress(direction, cValue) {
    timeOutEvent = 0;
    //执行长按要执行的内容，如弹出菜单   
    //toastMessage("长按事件触发发");
    //对准位置后影子变亮
    // bingoMove();
    switch (direction) {
        case 'right':
            oDom.animate({
                left: cValue
            }, 2000, function() { bingoMove(); });
            oShandow.animate({
                left: cValue
            }, 2000, function() { bingoMove(); });
            $(".foot-box").addClass("go-left");
            break;
        case 'left':
            oDom.animate({
                left: cValue
            }, 2000, function() { bingoMove(); });
            oShandow.animate({
                left: cValue
            }, 2000, function() { bingoMove(); });
            $(".foot-box").addClass("go-right");
            break;
        case 'top':
            //			var sl = oShandow.position().left + 5 >= maxWidth ? maxWidth : l;
            oShandow.animate({
                top: cValue,
            }, 2000, function() { bingoMove(); });
            oDom.animate({
                width: "30%",
                height: "40%"
            }, 2000, function() { bingoMove(); })
            break;
        case 'bottom':
            //			var l = oShandow.position().left - 5 <= 0 ? 0 : l;
            //			oShandow.animate({
            //				top: 381,
            //				width: 85,
            //				height: 85,
            //				left: l
            //			}, 2000);
            oShandow.animate({
                top: cValue,
            }, 2000, function() { bingoMove(); });
            oDom.animate({
                width: "38%",
                height: "50%"
            }, 2000, function() { bingoMove(); })
            break;
        default:
            break;
    }

};
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按   
function gtouchmove() {
    clearTimeout(timeOutEvent); //清除定时器   
    timeOutEvent = 0;
};
/**
 * @name 初始化游戏
 */
function initGame() {
    //
    //	window.location.reload();
    oPole.init();
    //@TODO updata balance
    updateBalance();
};
/**
 * @name  通知服务端抓取结果
 * @param {Object} pStatus
 * @param {Object} pDom
 */
function returnResult(pStatus, pDom) {
    var url_, data_;
    switch (pStatus) {
        case 'bingo':
            data_ = {
                "user_id": localStorage.getItem("userId"),
                "ufo_id": localStorage.getItem("ufoId"),
                "prepareCatchId": localStorage.getItem("prepareCatchId"),
                "toyId": pDom.attr('data-id'),
            }
            url_ = domainurl + '/Catch/success'
            break;
        case 'empty':
            data_ = {
                "user_id": localStorage.getItem("userId"),
                "ufo_id": localStorage.getItem("ufoId"),
                "prepareCatchId": localStorage.getItem("prepareCatchId"),
            }
            url_ = domainurl + '/Catch/lost'
            break;
        case 'failed':
            data_ = {
                "user_id": localStorage.getItem("userId"),
                "ufo_id": localStorage.getItem("ufoId"),
                "prepareCatchId": localStorage.getItem("prepareCatchId"),
            }
            url_ = domainurl + '/Catch/failure'
            break;
    };
    console.log("returnResult---request:")
    console.log(data_)
    $.ajax({
        url: url_,
        method: "POST",
        data: data_,
        success: function(data) {
            console.log("returnResult---success:")
            console.log(JSON.parse(data))
            data = JSON.parse(data)
            if (data.error !== 0) {
                console.log(data.message)
                return;
            };
        },
        error: function(xhr) {
            // toastMessage("网络出错");
            console.log("returnResult---error:")
            console.log(xhr)
        },
        complete: function() {

        }
    });
}
/**
 * @name 抓取失败弹出消息
 */
function failedToast() {
    var bgName = 'faild' + Math.round(Math.random() * 9 + 1);
    console.log(bgName);
    $(".failedTips").attr("class", bgName + " failedTips");
    $(".failedTips").fadeIn(1600).fadeOut(1600);
}
/**
 * @name 开始原地表情
 */
function openStaySpeak() {
    //	timerWawa = setInterval(wawaSpeak,2500);
    speakKey = true;
}
/**
 * @name 停止原地表情
 */
function stopStaySpeak() {
    speakKey = false;
}
/**
 * @name 娃娃位置初始化
 * @param {Object} pDom
 * @param {Object} pPosition
 */
function initWawaPosition(pDom,pPosition){
	console.log('pDom.length : ' + pDom.length)
	for (var i = 0; i < pDom.length; i++) {
		 pDom.eq(i).css(pPosition[i])
	}
}
