/**
 * @name Rem布局
 */
;(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 720) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

/**
 * [toastMessage 绘制toast弹窗消息]
 * @param  {[type]} pMessage [description]
 * @return {[type]}          [description]
 */
function toastMessage(pMessage) {
    var box = document.createElement("div");
    box.setAttribute("class", "message_toast");
    box.innerHTML = pMessage;
    var box_f = document.getElementsByTagName("body")[0];
    box_f.appendChild(box);
    box.addEventListener("webkitAnimationEnd", function() {
        box_f.removeChild(box)
    })
};
/**
 * [debugger description]
 * @name []
 * @param  {[type]} title [description]
 * @param  {[type]} data  [description]
 * @return {[type]}       [description]
 */
function catchDebugger(pTitle, pData) {
    console.log("-----" + pTitle + " :START-----")
    console.log(pData);
    console.log("-----END-----")
};
/**
 * [toStringify description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function toStringify(data) {
    return JSON.stringify(data);
};
/**
 * [Dictionary description]
 */
function Dictionary() {
    this.data = [];

    /**
     * [put 加入]
     * @param  {[type]} key   [ufo id]
     * @param  {[type]} value [ufo cost]
     * @return {[type]}       [description]
     */
    this.put = function(key, value) {
        this.data[key] = value;
    };

    /**
     * [get description]
     * @param  {[type]} key [ufo id]
     * @return {[type]}     [description]
     */
    this.get = function(key) {
        return this.data[key];
    };

    this.remove = function(key) {
        this.data[key] = null;
    };

    this.isEmpty = function() {
        return this.data.length === 0;
    };

    this.has = function(key) {
        var v = this.get(key);
        return v !== undefined;
    };

    this.size = function() {
        return this.data.length;
    };
};
/**
 * [changeMc 随机显示四个换台机器列表里的机器]
 * @return {[type]} [description]
 */
function changeMc() {
    var changeStartNum = Math.floor(Math.random() * wawaMcid.length + 1);
    $(".change-m-wawa").hide();
    for (var i = changeStartNum; i < changeStartNum + 4; i++) {
        $(".change-m-wawa").eq(i % wawaMcid.length).show();
    }
};
/**
 * [insertDanmu 发射弹幕]
 * @param  {[type]} pMessage [description]
 * @return {[type]}          [description]
 */
function insertDanmu(pMessage) {
    var box_f = document.getElementsByClassName("danmu-content")[0];
    var box = document.createElement("div");
    var key = Math.ceil(Math.random() * 2)
    if (key == 1) {
        box.setAttribute("class", "danmu-move danmus");
    }
    if (key == 2) {
        box.setAttribute("class", "danmu-move danmus pink");
    }

    box.innerHTML = pMessage;
    var topNum = Math.floor(Math.random() * 75);
    box_f.appendChild(box);

    var oWidth = $(box).innerWidth();
    $(box).css({
        width: oWidth,
        top: topNum,
    })
    removeDanmuElmt()
    box.addEventListener("webkitAnimationEnd", function() {
        box_f.removeChild(box);
    })
}
/**
 * @name  弹幕超过8条就移除
 */
function removeDanmuElmt() {
    var elmts = $('.danmu-move');
    var needRemoveSize = elmts.length - 8;
    var i = 0;
    $(elmts).each(function() {
        i++;
        if (i > needRemoveSize) {
            return;
        }
        $(this).remove();
    });
};
/**
 * @name  判断对象是否为空 
 * @param {Object} e
 */
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}
/**
 * [openDailyTask 打开任务列表]
 * @return {[type]} [description]
 */
function openDailyTask() {
    $.ajax({
        url: domainurl + "/DailyMission/getUserMission",
        method: "POST",
        data: {
            "user_id": localStorage.getItem("userId"),
            "date": dateformat
        },
        success: function(data) {
            data = JSON.parse(data);
            if (data.error !== 0) {
                toastMessage(data.message)
                return;
            };
            console.log("---------任务列表result-----------")
            console.log(data)
            //设置顶部积分进度条相关
            $(".mask-bar").animate({
                left: (data.list.userDailyScore - 100) + "%"
            }, 300)
            $(".bar-score").text(data.list.userDailyScore + "/100")
            var resultFd = data.list.finished;
            var resultUfd = data.list.unfinished;
            var resultFdHtml = '',
                resultFd1Html = '',
                resultUfdHtml = '';
            var f1 = [],
                f2 = [],
                f3 = [],
                fa = [];
            //绘制已完成任务resultFd
            if (!isEmptyObject(resultFd)) {
                for (var i in resultFd) {
                    if (resultFd[i].utl_status == 0) {
                        fa.push(resultFd[i])
                        for (var j in fa) {
                            if (fa[j].utl_cat_id == 1) {
                                f1.push(fa[j])
                            }
                            if (fa[j].utl_cat_id == 2) {
                                f2.push(fa[j])
                            }
                            if (fa[j].utl_cat_id == 3) {
                                f3.push(fa[j])
                            }
                        }
                    } else if (resultFd[i].utl_status == 1) {
                    	resultFd[i].userDailyRecharge     = data.list.userDailyRecharge;
						resultFd[i].userDailyCatchedTimes = data.list.userDailyCatchedTimes;
						resultFd[i].userDailyCatchTimes   = data.list.userDailyCatchTimes;
						
                        resultFd1Html +=
                            '<div class="mask-content">' +
                            '<div class="mask-icon" style="background-image:url(' + resultFd[i].task_icon + ')"></div>' +
                            '<div class="mask-text">' +
                            '<div class="mask-title">' + resultFd[i].task_title + '(<span class="lawngreen">' + getDailyMissionFinishNumeric(resultFd[i]) +'</span>)</div>' +
                            '<span class="mask-score">奖励：金币X' + resultFd[i].task_bonus_score +'任务积分：X' +resultFd[i].task_bonus_coin +  ' </span>' +
                            '</div>' +
                            '<div class="mask-btn mask-status1"></div>' +
                            '</div>';
                    }
                }
            }
            var u1 = [],
                u2 = [],
                u3 = [];
            //绘制未完成任务resultUfd
            for (var i = 0, len = resultUfd.length; i < len; i++) {
                if (resultUfd[i].task_cat_id == "1") {
                    u1.push(resultUfd[i])
                }
                if (resultUfd[i].task_cat_id == "2") {
                    u2.push(resultUfd[i])
                }
                if (resultUfd[i].task_cat_id == "3") {
                    u3.push(resultUfd[i])
                }
            }
            
//          resultUfdHtml = getUnfinishedList(u1.shift()) + getUnfinishedList(u2.shift()) + getUnfinishedList(u3.shift())
            resultUfdHtml = getUnfinishedListWithTaskProcess(u1.shift(), data.list) 
				            + getUnfinishedListWithTaskProcess(u2.shift(), data.list) 
				            + getUnfinishedListWithTaskProcess(u3.shift(), data.list);
            
            resultFdHtml = getfinishedList(f1.shift(), data.list) 
        					+ getfinishedList(f2.shift(), data.list) 
            				+ getfinishedList(f3.shift(), data.list)
            console.log(f1.shift());
            console.log(f2.shift());
            console.log(f3.shift());
            console.log(fa)
            $(".mask-content-box").empty();
            $(".mask-content-box").append(resultFdHtml);
            //							console.log("--------resultFdHtml----------------")
            //							console.log(resultFdHtml)
            $(".mask-content-box").append(resultUfdHtml);
            $(".mask-content-box").append(resultFd1Html);
        },
        complete: function() {
            $(".mask-status0").on("click", function() {
                TDAPP.onEvent("任务部分【领取】", "点击");
                $.ajax({
                    url: domainurl + "/DailyMission/receiveBonus",
                    method: "POST",
                    data: {
                        "user_id": $(this).attr("data-userid"),
                        "task_id": $(this).attr("data-taskid"),
                        "category_id": $(this).attr("data-catid")
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        if (data.error !== 0) {
                            toastMessage(data.message)
                            return;
                        };
                        console.log("---------领取任务result-----------")
                        console.log(data)
                        openDailyTask();
                        if (data.mission.toyId != 0) {
                            getCompleteToast(data.mission.toyId)
                            $(".mask-box").hide();
                        }
                    },
                    complete: function() {
                        //@TODO updata balance
                        updateBalance();
                    },
                    error: function() {
                        toastMessage("网络出错");
                    }
                });
            })
        },
        error: function() {
            toastMessage("网络出错");
        }
    });
}
/**
 * [insertDanmu 发射弹幕]
 * @param  {[type]} pMessage [description]
 * @return {[type]}          [description]
 */
function insertDanmu(pMessage) {
    var box_f = document.getElementsByClassName("danmu-content")[0];
    var box = document.createElement("div");
    var key = Math.ceil(Math.random() * 2)
    if (key == 1) {
        box.setAttribute("class", "danmu-move danmus");
    }
    if (key == 2) {
        box.setAttribute("class", "danmu-move danmus pink");
    }

    box.innerHTML = pMessage;
    var topNum = Math.floor(Math.random() * 75);
    box_f.appendChild(box);

    var oWidth = $(box).innerWidth();
    $(box).css({
        width: oWidth,
        top: topNum,
    })
    removeDanmuElmt()
    box.addEventListener("webkitAnimationEnd", function () {
        box_f.removeChild(box);
    })
}
/**
 * @name  弹幕超过8条就移除
 */
function removeDanmuElmt() {
    var elmts = $('.danmu-move');
    var needRemoveSize = elmts.length - 8;
    var i = 0;
    $(elmts).each(function () {
        i++;
        if (i > needRemoveSize) {
            return;
        }
        $(this).remove();
    });
}
/**
 * @name 开启公告
 */
function wawaSpeak() {
	var oDom = $(".act .wawa");
	if(speakKey) {
		var total = parseInt(Math.random() * 9);
		var total1 = parseInt(Math.random() * $(".act .wawa").length);
		var ospeak = document.createElement("div");
		$(ospeak).addClass("speak-pop stay" + total);
		oDom.eq(total1).append(ospeak);
		setTimeout(function() {
			$(ospeak).remove();
		}, 3500)
	}
	var timerWawa = setTimeout(wawaSpeak, 4000);
}
/**
 * @name 娃娃被抓起
 * @param {Object} pDom
 */
function upFace(pDom) {
	var total = parseInt(Math.random() * 4) + 1;
	var ospeak = document.createElement("div");
	$(ospeak).addClass("speak-pop upface" + total);
	console.log($(ospeak).attr("class"))
	pDom.append(ospeak);
	setTimeout(function() {
		pDom.empty();
	}, 1800)
}
/**
 * @name 娃娃掉下
 * @param {Object} pDom
 */
function downFace(pDom) {
	var total = parseInt(Math.random() * 4) + 1;
	var ospeak = document.createElement("div");
	$(ospeak).addClass("speak-pop downface" + total);
	console.log($(ospeak).attr("class"))
	pDom.append(ospeak);
	setTimeout(function() {
		pDom.empty();
	}, 2000)
}

/**
 * isFloat 判断是否为 浮点数
 * 
 * @param  numeric|string numeric 
 * 
 * @return bool
 */
function isFloat(numeric)
{	
	numeric = '' + numeric;	
	return numeric.indexOf('.') >= 0;
}

/**
 * getMin
 * 
 * @param numeric|string numeric
 * @param numeric|string numeric2
 * 
 * return numeric
 */
function getMin(numeric, numeric2)
{
	numeric  = isFloat(numeric) ? parseFloat(numeric) : parseInt(numeric);
	numeric2 = isFloat(numeric2) ? parseFloat(numeric2) : parseInt(numeric2);	
	num = numeric >= numeric2 ? numeric2 : numeric;
	
	return num <= 0 ? 0 : num;
}

/**
 * getDailyMissionProcessContent 获取每日任务完成进度显示内容
 * 
 * @param int              taskCategory        任务类型
 * @param float|int|string taskFinishedNumeric 已经完成的进度
 * @param float|int|string sourceNumeric       当前任务总进度
 * 
 * 
 */
function getDailyMissionProcessContent(taskCategory, taskFinishedNumeric, sourceNumeric)
{
	taskCategory = parseInt(taskCategory);	
	return getMin(taskFinishedNumeric, sourceNumeric) + "/" + sourceNumeric;
}

function getTaskCategory(task)
{	
	return task.task_cat_id === undefined ? parseInt(task.utl_cat_id) : parseInt(task.task_cat_id);
}

/**
 * getDailyMissionFinishNumeric
 * 
 * @param {Object} task 当前已完成或未完成任务
 * 
 * return string (0/5) | (9.9 / 19.9)
 */
function getDailyMissionFinishNumeric(task)
{	
	taskCategory = getTaskCategory(task);
	
	var result = {
		"fenzi": 0,
		"fenmu": 0,
	}
	
	if (taskCategory == 3) {
		result.fenzi = task.userDailyRecharge;
		result.fenmu = task.task_need_recharge_money;
		
	} else if(taskCategory == 2) {
		result.fenzi = task.userDailyCatchedTimes;
		result.fenmu = task.task_need_catch_times;
		
	} else {
		result.fenzi = task.userDailyCatchTimes;
		result.fenmu = task.task_need_catch_times;	
		
	}	
	
	return getDailyMissionProcessContent(taskCategory, result.fenzi, result.fenmu);
}

/**
 * @name 获取未完成任务列表
 * @param {Object} param
 */
function getUnfinishedListWithTaskProcess(param, list) {
	var html = '',fenzi,fenmu;
	if(param != undefined) {
		
		param.userDailyRecharge     = list.userDailyRecharge;
		param.userDailyCatchedTimes = list.userDailyCatchedTimes;
		param.userDailyCatchTimes   = list.userDailyCatchTimes;
		
		html +=
			'<div class="mask-content">' +
			'<div class="mask-icon" style="background-image:url(' + param.task_icon + ')"></div>' +
			'<div class="mask-text">' +
			'<div class="mask-title">' + param.task_title + '(<span class="lawngreen">' + getDailyMissionFinishNumeric(param) + '</span>)</div>' +
			'<span class="mask-score">奖励：金币X' + param.task_bonus_score + '任务积分：X' + param.task_bonus_coin  + ' </span>' +
			'</div>' +
			'<div class="mask-btn">未达成</div>' +
			'</div>'
	} else {
		html = '';
	}
	return html
}

/**
 * @name 获取已完成（未领取）任务列表
 * @param {Object} param
 */
function getfinishedList(param, list) {
	var html = '';
	if(param != undefined) {
		
		param.userDailyRecharge     = list.userDailyRecharge;
		param.userDailyCatchedTimes = list.userDailyCatchedTimes;
		param.userDailyCatchTimes   = list.userDailyCatchTimes;
		
		html +=
			'<div class="mask-content">' +
			'<div class="mask-icon" style="background-image:url(' + param.task_icon + ')"></div>' +
			'<div class="mask-text">' +
			'<div class="mask-title">' + param.task_title +'(<span class="lawngreen">' + getDailyMissionFinishNumeric(param) + '</span>)</div>' +
			'<span class="mask-score">奖励：金币X' + param.task_bonus_score + '任务积分：X' + param.task_bonus_coin +  ' </span>' +
			'</div>' +
			'<div class="mask-btn mask-status0" data-taskid="' + param.task_id + '" data-catid="' + param.utl_cat_id + '" data-userid="' + param.utl_user_id + '"></div>' +
			'</div>';
	} else {
		html = '';
	}
	return html
}
//			alert(JSON.stringify(wawasId.get(9)))
//			alert(JSON.stringify(wawasId.get(9).ut_name))
//			alert(JSON.stringify(wawasId.get(9).ut_cover_img))
/**
 * @name 每日任务积分完成
 * @param {Object} pId
 */
function getCompleteToast(pId) {
	var oMessage = newToys.get(pId);
	console.log("+---------omessage-----")
	console.log(oMessage)
	$(".complete-icon").css("background-image", "url(" + oMessage.ut_cover_img + ")");
	$(".complete-text").text("恭喜您获得一个" + oMessage.ut_name + '，已经放进您的背包。');
	$(".mask").show();
	$(".complete-box").show();
}
;(function ($) {
  $.fn.spinner = function (opts) {
    return this.each(function () {
      var defaults = {value:0, min:0}
      var options = $.extend(defaults, opts)
      var keyCodes = {up:38, down:40}
      var container = $('<div></div>')
      container.addClass('spinner')
      var textField = $(this).addClass('value').attr('maxlength', '2').val(options.value)
        .bind('keyup paste change', function (e) {
          var field = $(this)
          if (e.keyCode == keyCodes.up) changeValue(1)
          else if (e.keyCode == keyCodes.down) changeValue(-1)
          else if (getValue(field) != container.data('lastValidValue')) validateAndTrigger(field)
        })
      textField.wrap(container)

      var increaseButton = $('<button class="increase">+</button>').click(function () { changeValue(1);TDAPP.onEvent("+按钮", "点击"); })
      var decreaseButton = $('<button class="decrease">-</button>').click(function () { changeValue(-1);TDAPP.onEvent("-按钮", "点击"); })

      validate(textField)
      container.data('lastValidValue', options.value)
      textField.before(decreaseButton)
      textField.after(increaseButton)

      function changeValue(delta) {
        textField.val(getValue() + delta)
        validateAndTrigger(textField)
      }

      function validateAndTrigger(field) {
        clearTimeout(container.data('timeout'))
        var value = validate(field)
        if (!isInvalid(value)) {
          textField.trigger('update', [field, value])
        }
      }

      function validate(field) {
        var value = getValue()
        if (value <= options.min) decreaseButton.attr('disabled', 'disabled')
        else decreaseButton.removeAttr('disabled')
        field.toggleClass('invalid', isInvalid(value)).toggleClass('passive', value === 0)

        if (isInvalid(value)) {
          var timeout = setTimeout(function () {
            textField.val(container.data('lastValidValue'))
            validate(field)
          }, 500)
          container.data('timeout', timeout)
        } else {
          container.data('lastValidValue', value)
        }
        return value
      }

      function isInvalid(value) { return isNaN(+value) || value < options.min; }

      function getValue(field) {
        field = field || textField;
        return parseInt(field.val() || 0, 10)
      }
    })
  }
})(jQuery)

/**
 * [checkPhone 用户输入手机号码正则验证]
 * @param 	
 * @return  boolean      [description]
*/
function checkPhone(pDom){ 			 		
	    var phone = pDom.value;
	    if(!(/^1[34578]\d{9}$/.test(phone))){ 
	        toastMessage("手机号码有误，请重填");  
	        return false; 
		  }else{
		  	return true
		  }
}
/**
 * [IsChinese 用户输入姓名正则验证]
 * @param 	
 * @return  boolean      [description]
*/
function IsChinese(pDom){       
        var str =  pDom.value;     
        reg=/^([\u4e00-\u9fa5]){2,7}$/;       //只能是中文，长度为2-7位
        if(!reg.test(str)){  
        	toastMessage("请输入正确的姓名");  
       		return false;
	    }else{
	    	return true;
	    }
}
/**
 * @name 更新用户余额
 */
function updateBalance() {
	//@TODO updata balance
	var updateDataInfo = {
		source: "web_send",
		path: "balance",
	};
	dataInfo = JSON.stringify(updateDataInfo);
	setTimeout(function() {
		window.postMessage(dataInfo);
	}, 119)
}
/**
 * @name 娃娃阴影是否亮灯
 */
function bingoMove() {
    var p = $(".shandow-pole").position();
    var index = goto(p, true);
    if (index == undefined) {
        $(".act .shandow-wawa").removeClass("red");
    } else {
        $(".act .shandow-wawa:eq(" + index + ")").addClass("red").siblings().removeClass("red");
    }
}
/**
 * @name 判断爪子是否对准娃娃
 * @param {Object} pPosition{爪子位置}
 * @return {String} {返回目标娃娃的编号}
 */
function goto(pPosition, pIsmove) {
    if (typeof pIsmove == undefined) {
        pIsmove = false;
    }
    var result;
    for (var i = 0; i < positionArr.length; i++) {
        var pl = pPosition.left,
            pt = pPosition.top,
            wl = positionArr[i].left,
            wt = positionArr[i].top;
        //		console.log('pl:' + pl + '----pt:' + pt + '-----wl:' + wl + '----wt:' + wt)
        //		console.log(Math.abs(pl - wl));
        if (Math.abs(pl - wl) < 12 && Math.abs(pt - wt) < 6) {
            result = i;
        }
    }
//  console.log("---  对准娃娃阴影位置----------")
//  console.log(result)
//  console.log(positionArr)
//  console.log($(".wawa").length)
//	var actStyle = $(".act").attr("data-sty");
//
	var actStyle = $(".wawa-box.act").attr("data-sty");
    catchDebugger('actStyle',actStyle);
    isCatch = !isCatch;
    if (!pIsmove) {
        if (result === undefined) {
            console.log("没对准娃娃")
            oPole.emptym();
            returnResult('empty');
        } else {
            var isCatch = localStorage.getItem("catchedToy");
            console.log($(".act .wawa:eq(" + result + ")").attr("data-id"))
            if (isCatch == "true") {
                console.log("对准娃娃了 成功")
                console.log(result)
                oPole.bingom(result,actStyle);
                returnResult('bingo', $(".act .wawa:eq(" + result + ")"));
            } else {
                console.log("对准娃娃了 失败")

                console.log(result)
                oPole.failedm(result,actStyle);
                returnResult('failed');
            }
        }
    }
    return result;
}
/**
 * @name 获得娃娃位置
 * @param {Object} pDom
 */
function getWawaPosition(pDom){
	var wawaPositionArr = [];
	if (pDom.hasClass("sty-1")) {
    wawaPositionArr = [
    		{'width': '1.25rem', 'height': '1.63rem', 'top': '52%', 'left': '11%'},
			{'width': '1.25rem', 'height': '1.63rem','left': '41%'},
			{'width': '1.25rem', 'height': '1.63rem','left': '72%'},
			{'width': '1.25rem', 'height': '1.63rem','left': '25%', 'top': '64%'},
			{'width': '1.25rem', 'height': '1.63rem','left': '61%', 'top': '64%'},
			{'width': '1.25rem', 'height': '1.63rem','left': '37%', 'top': '76%'},
			{'width': '1.25rem', 'height': '1.63rem','left': '67%', 'top': '76%'}
    	]
    }
    else if (pDom.hasClass("sty-2")) {
    		console.log("its sty2------------------")
    		wawaPositionArr = [
    		{'width': '1.62rem', 'height': '1.76rem', 'top': '51%', 'left': '9%'},
			{'width': '1.62rem', 'height': '1.76rem','left': '39%'},
			{'width': '1.62rem', 'height': '1.76rem','left': '70%'},
			{'width': '1.62rem', 'height': '1.76rem','left': '23%', 'top': '62%'},
			{'width': '1.62rem', 'height': '1.76rem','left': '58%', 'top': '62%'},
			{'width': '1.62rem', 'height': '1.76rem','left': '35%', 'top': '74%'},
			{'width': '1.62rem', 'height': '1.76rem','left': '66%', 'top': '74%'}
    	]
    }
	else if (pDom.hasClass("sty-3")) {
    	wawaPositionArr = [
    		{'width': '1.55rem', 'height': '2.3rem', 'top': '47%', 'left': '8%'},
			{'width': '1.55rem', 'height': '2.3rem', 'left': '40%'},
			{'width': '1.55rem', 'height': '2.3rem', 'left': '72%'},
			{'width': '1.55rem', 'height': '2.3rem', 'left': '25%', 'top': '58%'},
			{'width': '1.55rem', 'height': '2.3rem', 'left': '58%', 'top': '58%'},
			{'width': '1.55rem', 'height': '2.3rem', 'left': '35%', 'top': '70%'},
			{'width': '1.55rem', 'height': '2.3rem', 'left': '66%', 'top': '70%'}
    	]
    }
    else if (pDom.hasClass("sty-4")) {
    	wawaPositionArr = [
    		{'width': '1.6rem', 'height': '2rem', 'top': '49%', 'left': '9%'},
			{'width': '1.6rem', 'height': '2rem', 'left': '49%'},
			{'width': '1.6rem', 'height': '2rem', 'left': '23%', 'top': '59%'},
			{'width': '1.6rem', 'height': '2rem', 'left': '67%', 'top': '59%'},
			{'width': '1.6rem', 'height': '2rem', 'left': '51%', 'top': '69%'}
    	]
    }
    else{
    	toastMessage("网络出错啦，请退出重试~")
    }
    return wawaPositionArr;
}
/**
 * @name 更新娃娃阴影位置
 * @param {Object} pDom
 */
function updatePositionArr(pDom){
	//清空上一个娃娃机的阴影顺序
	positionArr = []
	for (var i = 0; i < pDom.length; i++ ) {
		positionArr.push(pDom.eq(i).position())
	}
	catchDebugger('娃娃机的阴影顺序',positionArr)
}
function getCheckinBonus(pDom){
	$.ajax({
        url: domainurl + "/Checkin/getBonus",
        method: "POST",
        data: {
            "user_id": pDom.attr("data-userid"),
            "user_checkin_id": pDom.attr("data-ucglid")
        },
        success: function(data) {
            data = JSON.parse(data);
            if (data.error !== 0) {
                toastMessage(data.message)
                return;
            };
        },
        complete: function() {
        	pDom.addClass("checkin-status1");
        },
        error: function() {
            toastMessage("网络出错");
        }
    });
}
