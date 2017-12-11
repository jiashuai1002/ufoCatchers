//房间人数展示
getRoomOlines(localStorage.getItem("ufoId"))
//@TODO 设置storage里面的 userId 和 ufoId
$(".start").on("click",function(){
	TDAPP.onEvent("开始游戏", "点击");
	//@TODO 判断用户钱是否够
	if(isBalanceEnough()){
		var userId = localStorage.getItem("userId");
//		var userId  = 1;
		var ufoId = localStorage.getItem("ufoId");
//		var ufoId = 1;
		console.log('-------------------' + ufoId + '----' + userId)
		startGame(userId,ufoId);
	}else{
		toastMessage("金币不足，请先充值~")
		//@TODO 去充值
		var oDom = $(".recharge-box");
		openMaskLayer(oDom);
	}
})
//
$(".del").on("click",function(){
	TDAPP.onEvent("X掉按钮", "点击");
	var oDom = $(this);
	delMaskLayer(oDom);
})

$(".recharge").on("click",function(){
	TDAPP.onEvent("充值ICON", "点击");
	var oDom = $(".recharge-box");
	openMaskLayer(oDom);
})

$(".package").on("click",function(){
	TDAPP.onEvent("背包ICON", "点击");
	var oDom = $(".package-box");
	openMaskLayer(oDom);
	//绘制背包页面
    getPackageWawas(localStorage.getItem("userId"));
    getToyOrders(localStorage.getItem("userId"));
})

//提取按钮切换
$(".tiqu-btn").on("click",function(){
	TDAPP.onEvent("提取按钮", "点击");
	orderToggle();
})
//提交
$(".submit").on("click",function(){
	TDAPP.onEvent("提交按钮", "点击");
	var dataInfo = {
		"user_id" : localStorage.getItem("userId"), 
		"exchg_username" : $(".submit-name").val(), 
		"exchg_phone" : $(".submit-phone").val(), 
		"exchg_address" : $(".submit-address").val(), 
		"plist" : JSON.parse(localStorage.getItem("orderList")), 
	}
	console.log("--------提交请求参数--------")
	console.log(dataInfo);
	if (IsChinese($(".submit-name")[0]) && checkPhone($(".submit-phone")[0])) {
		orderSubmit(dataInfo);
	}
})
$(".package-del").on("click",function(){
	TDAPP.onEvent("背包框X按钮", "点击");
	initpackage();
})





$(".tiqujilu").on("click",function(){
	TDAPP.onEvent("提取记录按钮", "点击");
	var isClick = $(this).hasClass("tiqujilu-off");
	if (isClick) packgeToggle();
});
$(".mywawa").on("click",function(){
	TDAPP.onEvent("我的娃娃按钮", "点击");
	var isClick = $(this).hasClass("mywawa-off");
	if (isClick) packgeToggle();
});
$(".catch-records").on("click",function(){
	TDAPP.onEvent("抓取记录按钮", "点击");
	var isClick = $(this).hasClass("catch-records-off");
	if (isClick) wawamsgToggle();
});
$(".high-wawas").on("click",function(){
	TDAPP.onEvent("我的娃娃按钮", "点击");
	var isClick = $(this).hasClass("high-wawas-off");
	if (isClick) wawamsgToggle();
});
function initpackage(){
	$(".package-submit").addClass("hide");
	$(".submit").addClass("hide");
	$(".package-select").addClass("hide");
	$(".next-step").addClass("hide");
	$(".package-t").removeClass("hide");
	$(".package-m").addClass("hide");
	$(".package-m-2").removeClass("hide");
	$(".tiqu-btn").removeClass("hide");
	$(".tiqujilu").addClass("tiqujilu-off");
	$(".mywawa").removeClass("mywawa-off");
}
function nextToggle(){
	$(".package-submit").toggleClass("hide");
	$(".submit").toggleClass("hide");
	$(".package-select").toggleClass("hide");
	$(".next-step").toggleClass("hide");
};
function packgeToggle(){
	$(".mywawa").toggleClass("mywawa-off");
	$(".tiqujilu").toggleClass("tiqujilu-off");
	$(".tiqu-btn").toggleClass("hide");
	$(".package-m-2").toggleClass("hide");
	$(".package-m").toggleClass("hide");
};
function orderToggle(){
	$(".package-t").toggleClass("hide");
	$(".package-m-2").toggleClass("hide");
	$(".tiqu-btn").toggleClass("hide");
	$(".package-select").toggleClass("hide");
	$(".next-step").toggleClass("hide");
	console.log("111")
};
function wawamsgToggle(){
	$(".catch-records-box").toggleClass("hide");
	$(".high-wawas-box").toggleClass("hide");
	$(".catch-records").toggleClass("catch-records-off");
	$(".high-wawas").toggleClass("high-wawas-off");
}
function isBalanceEnough(){
	var result = false;
	var a = parseInt(localStorage.getItem("totalMcCost"));
	var b = parseInt(localStorage.getItem("userBalance"));
	if (b>=a) result = !result;
	return result;
}
/*
 * @name 关闭父级mask图层 
 * @param {Object} pDom
 */
function delMaskLayer(pDom){
	pDom.parents(".toast-box").hide();
	$(".mask").hide();
}
/**
 * @name  打开父级mask图层
 * @param {Object} pDom
 */
function openMaskLayer(pDom){
	$(".mask").show();
	pDom.show();
}
//
window.document.addEventListener('message', function (e) {
    var message = e.data;
    message = JSON.parse(message);
    console.log(message);
    var userId = message.data.userId,balance = message.data.balance;
    console.log("userId:" + userId + '-----------' +"balance:" + balance);
    localStorage.setItem("userId",userId);
    localStorage.setItem("userBalance",balance);
    //@TODO 更新用户余额
    $(".money").text(parseInt(balance));
//  $(".money").text(parseInt(localStorage.getItem("userBalance")));
    $(".name").text(message.data.nickname);
    //绘制背包页面
//  getPackageWawas(userId);
//  getToyOrders(userId);
	
});
//chongzhi   9.9
$(".recharge-btn1").on("click",function(){
	TDAPP.onEvent("充值按钮-1", "点击");
	var dataInfo = {
		source : "web_send",
		path : "purchase",
		data : {
			price: "990",
			goodsId: "1"
		}
	};
	dataInfo = JSON.stringify(dataInfo);
	window.postMessage(dataInfo);
});
$(".recharge-btn2").on("click",function(){
	TDAPP.onEvent("充值按钮-2", "点击");
	var dataInfo = {
		source : "web_send",
		path : "purchase",
		data : {
			price: "1990",
			goodsId: "2"
		}
	};
	dataInfo = JSON.stringify(dataInfo);
	window.postMessage(dataInfo);
});
$(".recharge-btn3").on("click",function(){
	TDAPP.onEvent("充值按钮-3", "点击");
	var dataInfo = {
		source : "web_send",
		path : "purchase",
		data : {
			price: "3990",
			goodsId: "3"
		}
	};
	dataInfo = JSON.stringify(dataInfo);
	window.postMessage(dataInfo);
});
$(".recharge-btn4").on("click",function(){
	TDAPP.onEvent("充值按钮-4", "点击");
	var dataInfo = {
		source : "web_send",
		path : "purchase",
		data : {
			price: "9990",
			goodsId: "4"
		}
	};
	dataInfo = JSON.stringify(dataInfo);
	window.postMessage(dataInfo);
});
$(".recharge-btn5").on("click",function(){
	TDAPP.onEvent("充值按钮-5", "点击");
	var dataInfo = {
		source : "web_send",
		path : "purchase",
		data : {
			price: "490",
			goodsId: "5"
		}
	};
	dataInfo = JSON.stringify(dataInfo);
	window.postMessage(dataInfo);
});
$(".recharge-btn6").on("click",function(){
	TDAPP.onEvent("充值按钮-6", "点击");
	var dataInfo = {
		source : "web_send",
		path : "purchase",
		data : {
			price: "990",
			goodsId: "6"
		}
	};
	dataInfo = JSON.stringify(dataInfo);
	window.postMessage(dataInfo);
});
//
$(".set").on("click",function(){
	TDAPP.onEvent("设置ICON", "点击");
	//推出登录
//	var dataInfo = {
//		source : "web_send",
//		path : "account",
//		action : "quit",
//	};
//	dataInfo = JSON.stringify(dataInfo);
//	window.postMessage(dataInfo);
	$(".set-box").removeClass("hide");
	$(".mask").show();
})
$(".del2").on("click",function(){
	$(".set-box").addClass("hide");
	$(".mask").hide();
})
$(".set-music").on("click",function(){
	TDAPP.onEvent("开关音乐按钮", "点击");
	$(this).toggleClass("set-music-off");
	playMusic();
})
$(".set-danmu").on("click",function(){
	TDAPP.onEvent("开关弹幕按钮", "点击");
	$(this).toggleClass("set-danmu-off");
	if ($(this).hasClass("set-danmu-off")) {
		clearInterval(timerDanmu);
	}else{
		timerDanmu = setInterval(function(){
				 	var param = danmuArr[Math.floor(Math.random()*(danmuArr.length-1))]
				 	insertDanmu(param);
		},950)
	}
})
$(".set-faqs").on("click",function(){
	TDAPP.onEvent("常见问题按钮", "点击");
	$(".set-box").addClass("hide");
	$(".faq-box").show();
	$(".mask").show();
})
$(".set-quit").on("click",function(){
	TDAPP.onEvent("推出登录按钮", "点击");
	//推出登录
	var dataInfo = {
		source : "web_send",
		path : "account",
		action : "quit",
	};
	dataInfo = JSON.stringify(dataInfo);
	window.postMessage(dataInfo);
})
//
$(".share").on("click",function(){
	TDAPP.onEvent("分享按钮", "点击");
	var dataInfo = {
		source : "web_send",
		path : "share",
		data : {
			"shareUrl": domainurl +"/UfoCatcher/share",
			"shareIcon":"http://money.zhuoyi.com/ufo_catcher/Public/home/images/wawaShareIcon.jpg",
			"shareTitle":"抓娃娃就上汤姆娃娃机，抓个娃娃还能寄回家",
			"shareContent":"做全国最好玩的线上娃娃机，随时随地享受抓娃娃的乐趣！",
		}
	};
	dataInfo = JSON.stringify(dataInfo);
	window.postMessage(dataInfo);
})
//换台
$(".change").on("click",function(){
	TDAPP.onEvent("换机器", "点击");
	$(".change-box").show();
	$(".mask").show();
	stopStaySpeak();
	//换机器。
	changeMc();
})
$(".change-m-wawa").on("click",function(){
	TDAPP.onEvent("换机器-选择机器", "点击");
	openStaySpeak();
	$(".change-box").hide();
	$(".mask").hide();
	var showDataId = $(this).attr("data-mcid");
	var showCost = $(this).attr("data-cost");
	
	console.log($(this));
	console.log(showDataId);
	$(".wawa-box[data-mcid=" + showDataId + "]").show().addClass("act").siblings(".wawa-box").hide().removeClass("act");
	$(".shandow-wawa-box[data-mcid=" + showDataId + "]").show().addClass("act").siblings(".shandow-wawa-box").hide().removeClass("act");
	oPole.init();	
	localStorage.setItem("ufoId",showDataId);
	localStorage.setItem("totalMcCost",showCost);
	$(".once").text(parseInt(localStorage.getItem("totalMcCost")) + '/次');
	//房间人数展示
	getRoomOlines(localStorage.getItem("ufoId"))
	//更新娃娃阴影位置数据
	var shandowWawaPosition = $(".shandow-wawa-box[data-mcid=" + showDataId + "] .shandow-wawa");
	updatePositionArr(shandowWawaPosition);
})

$(".change-btn").on("click",function(){
	TDAPP.onEvent("换一批按钮", "点击");
	changeMc();
})

$(".wawa-message-enter").on("click",function(){
	TDAPP.onEvent("娃娃信息按钮", "点击");
	$(".wawamsg-box").show();
	$(".mask").show();
	openWawaMsg(localStorage.getItem("ufoId"),1)
})
$(".task-btn").on("click",function(){
	TDAPP.onEvent("任务按钮", "点击");
	$(".mask-box").show();
	$(".mask").show();
	openDailyTask();
})
$(".new-btn").on("click",function(){
	TDAPP.onEvent("新手礼包ICON", "点击");
	var oDom = $(".recharge-box");
	openMaskLayer(oDom);
})
$(".complete-btn").one("click", function() {
	TDAPP.onEvent("炫耀一下按钮", "点击");
	var dataInfo = {
		source: "web_send",
		path: "share",
		data: {
			"shareUrl": domainurl + "/UfoCatcher/share",
			"shareIcon": "http://money.zhuoyi.com/ufo_catcher/Public/home/images/wawaShareIcon.jpg",
			"shareTitle": "抓娃娃就上汤姆娃娃机，抓个娃娃还能寄回家",
			"shareContent": "做全国最好玩的线上娃娃机，随时随地享受抓娃娃的乐趣！",
		}
	};
	dataInfo = JSON.stringify(dataInfo);
	window.postMessage(dataInfo);
	//@TODO updata balance
	updateBalance();
	//完成弹框 关闭
	$(".complete-box").hide();
	$(".mask").hide();
})

//下一步
$(".next-step").on("click",function(){
	TDAPP.onEvent("下一步按钮", "点击");
	var orderList = [];
	for (var i = 0;i < $(".value").length;i++) {
		var oList = {
			"ut_id":$(".value").eq(i).attr("data-id"), 
			"num":$(".value").eq(i).val(),
		}
		orderList.push(oList);
	}
	console.log(orderList);
	localStorage.setItem("orderList",JSON.stringify(orderList));	
	nextToggle();
})
//获取娃娃机ID及相关信息
//$.ajax({
//		url: domainurl +"/DailyMission/getUserMission",
//		method: "POST",
//		data: {
//			"user_id": localStorage.getItem("user_id"),
//			"date" : dateformat
//		},
//		success: function(data) {
//			data = JSON.parse(data);
//			if (data.error !== 0) {
//				toastMessage(data.message)
//				return;
//			};
//			console.log("---------任务列表result-----------")
//			console.log(data)
//		},
//		error:function(){
//			toastMessage("网络出错");
//		}
//});
/**
 * @name 打开娃娃信息列表
 * @param {Object} pUfoID
 * @param {Object} pPage
 */
function openWawaMsg(pUfoID,pPage){
	$.ajax({
		url: domainurl +"/ListCatched/pagination",
		method: "POST",
		data: {
			"ufo_id": pUfoID,
			"next" : pPage
		},
		success: function(data) {
			data = JSON.parse(data);
			if (data.error !== 0) {
				toastMessage(data.message)
				return;
			};
			console.log("---------抓中记录result-----------")
			console.log(data)
			
			var result = data.result.list,html = "",html1 = "",netTime = data.result.datetime;
			// 在这里设置相对时间
			var timeagoInstance = timeago(null, netTime);
			for (var i = 0,len = result.length;i<len;i++) {
				if (result[i].avtar == "/0" || result[i].avtar == "" || result[i].avtar == null) {
					result[i].avtar = "http://h5test02.zhuoyi.com:18808/ufo_catcher/Public/home/images/wechat-icon.png"
				}
				html += 
				'<div class="catch-records-content">' + 
						'<div class="catch-records-icon" style="background-image:url(' + result[i].avtar + ')"></div>' + 
						'<div class="catch-records-text">' + 
							'<div class="catch-records-nickname">' + result[i].nickname +'</div>' + 
							'<div class="zhuadao">抓到</div>' + 
							'<div class="catch-records-name">' + result[i].ut_name +'</div>' + 
						'</div>' + 
						'<div class="catch-records-time">' +  timeagoInstance.format(result[i].pc_finished_at,"zh_CN") + '</div>' + 
				'</div>';
			}
			for(var j in wawasId.get(pUfoID)){
				html1 += 
				'<div class="high-wawas-content">' + 
						'<div class="high-wawas-icon" style="background-image:url('  + wawasId.get(pUfoID)[j].ut_cover_img + ')"></div>' + 
						'<div>' + 
							'<div class="high-wawas-name">' + wawasId.get(pUfoID)[j].ut_name + '</div>' + 
							'<div class="high-wawas-size">约' + parseInt(formatedUfoCatchers.get(pUfoID).uc_size) + '厘米</div>' + 
//							'<div class="high-wawas-size">约25厘米</div>' + 
						'</div>' + 
				'</div>';
			}
//			console.log(wawasId.get(pUfoID))
			$(".catch-records-box").html(html);
			$(".high-wawas-box").html(html1);
			
		},
		error:function(){
			toastMessage("网络出错");
		}
	});
}
/**
 * @name 弹幕开始
 */
function danmuBegin(){
	$.ajax({
		url: domainurl +"/CatchDanmu/getCatched",
		method: "POST",
		data: {
			"id": 0,
		},
		success: function(data) {
			data = JSON.parse(data);
			if (data.error !== 0) {
				toastMessage(data.message)
				return;
			};
			console.log("---------弹幕获取-----------")
			console.log(data)
			danmus = data.list;
			for (var i = 0;i<danmus.length;i++) {
				danmuArr.push(danmus[i].slogan);
			}
			//发射弹幕
			timerDanmu = setInterval(function(){
				 	var param = danmuArr[Math.floor(Math.random()*(danmuArr.length-1))]
				 	insertDanmu(param);
				 },1300)
			setTimeout(function(){
				timerIconDanmu = setInterval(function(){
					$(".icon-danmu").show()
					var total = parseInt(Math.random()*danmus.length);
					$(".icon-danmu-ava").css("background-image","url(" +danmus[total].avtar +")")
					$(".icon-danmu-content").text(danmus[total].slogan);
					$(".icon-danmu").show();
					setTimeout(function(){
						$(".icon-danmu").hide();
					},5000)
				},8000)
			},5000)
		},
		error:function(){
			toastMessage("网络出错");
		}
	});
}
danmuBegin();
/**
 * @name 获取房间人数
 * @param {Object} param
 */
function getRoomOlines(param){
	$.ajax({
		url: domainurl +"/Online/getRoomUsers",
		method: "POST",
		data: {
			"ufo_id": param,
		},
		success: function(data) {
			data = JSON.parse(data);
			if (data.error !== 0) {
				toastMessage(data.message)
				return;
			};
			console.log("房间 人数--------------------")
			console.log(data)
			var result = data.result;
			$(".roomCounts-b").text('房间人数 ' + result.count);
			//从服务端返回数据中随机取五个不重复的
			var resultArr = randomArr(result.users,4)
//			console.log(resultArr)
			for (var i = 0;i < resultArr.length;i++) {
				if (resultArr[i].avtar == "/0") {
					resultArr[i].avtar = "http://h5test02.zhuoyi.com:18808/ufo_catcher/Public/home/images/wechat-icon.png"
				}
				$(".room-icon").eq(i).css("background-image","url(" + resultArr[i].avtar + ")")
			}
		},
		error:function(){
			toastMessage("网络出错");
		}
	});
}
/**
 * @name 从一个数组中随机获取不重复的N个元素组成新数组
 * @param {String} pArr
 * @param {Number} pLength
 */
function randomArr(pArr,pLength){
	if(typeof pArr != "object" || typeof pLength != "number"){
		return false;
	};
	var resultArr = [];
	var count = pArr.length;
	for (var i = 0; i < pLength; i++) {
	    var index = ~~(Math.random() * count) + i;
	    resultArr[i] = pArr[index];
	    pArr[index] = pArr[i];
	    count--;
	}
	return resultArr;
}

/**
 * @name 获取背包内的娃娃
 * @param {Object} param
 */
function getPackageWawas(param){
	$.ajax({
		url: domainurl +"/Backpack/getAll",
		method: "POST",
		data: {
			"user_id": param,
		},
		success: function(data) {
			data = JSON.parse(data);
			if (data.error !== 0) {
				toastMessage(data.message)
				return;
			};
			console.log("背包--------------------")
			console.log(data)
			result = data.result.list;
			console.log(result)
			var html = '',html1 = '';
			for (var i = 0;i<result.length;i++) {
				html += 
					'<div class="package-m-wawa">' + 
						'<div class="wawa-icon" style="background-image:url(' + result[i].ut_icon+ ')"></div>' + 
						'<div class="wawa-text">' 
						 	 + result[i].ut_name + '×' + 
							'<i class="wawa-num">' + result[i].pack_balance_num + '</i>' + 
						'</div>' + 
					'</div>';
				html1 +=
					'<div class="package-m-content height-33">' + 
						'<div style="width: 40%;">' + 
							'<div class="package-m-name">' + result[i].ut_name + '</div>' + 
						'</div>' + 
						'<input ontouchstart = "return false;" type="text" class="spinner" data-max="' + result[i].pack_balance_num + '" data-id="' + result[i].ut_id + '"/>' + 
					'</div>';
			}
			console.log(result.length);
			if (result.length == 0) {
				html='<div class="wawas-empty"></div><div class="package-m-title">还没有娃娃，继续努力</div>';
				$(".tiqu-btn").addClass("width-0");
			}else{
				$(".tiqu-btn").removeClass("width-0");
			}
			$(".package-m-2").html(html);
			console.log("----------ordersRecords-------------")
			console.log(html1)
			$(".tiqu-content").html(html1);
			var oDoo = $(".tiqu-content").html();
			console.log(oDoo);
			
			setTimeout(function(){
				$('.spinner').spinner();
				for (var i = 0;i<$(".value").length;i++) {
					$(".value").eq(i).val($(".value").eq(i).attr("data-max")).removeClass("passive");
				}
				
				$(".decrease").removeAttr("disabled")
				$(".increase").on("click",function(){
					TDAPP.onEvent("提取娃娃+按钮", "点击");
					var val = $(this).prev().val();
					var max = $(this).prev().attr("data-max")
					console.log(val)
					if (val > max) {
						val = max
					}
					$(this).prev().val(val);
				});
			},350)
		},
		error:function(){
			toastMessage("网络出错");
		}
	});
}
/**
 * @name  获取娃娃提取记录
 * @param {Object} param
 */
function getToyOrders(param){
	$.ajax({
		url: domainurl +"/ToyOrder/getAll",
		method: "POST",
		data: {
			"user_id": param,
		},
		success: function(data) {
			data = JSON.parse(data);
			if (data.error !== 0) {
				toastMessage(data.message)
				return;
			};
			console.log("提取记录--------------------")
			console.log(data)
			result = data.result.list;
			console.log(result)
			var html = '';
			for (var i = 0;i<result.length;i++) {
				html += 
					'<div class="package-m-content height-33">' + 
						'<div>' + 
							'<div class="package-m-name">' +
								result[i].ut_name + '×' + 
								'<i class="wawa-num">' + result[i].pod_toy_num + '</i>' + 
							'</div>' +
							'<div class="package-m-time">' + result[i].to_createtime + '</div>' +
						'</div>' + 
						'<div class="package-m-state">1-5天内发货</div>' + 
					'</div>';
			}
			if (result.length == 0) {
				$(".package-m").html('<div class="orders-empty"></div><div class="package-m-title">你还没有提取记录~</div>');
			}else{
				$(".package-m").html('<div class="package-m-contentBox">' + html +
					'</div><div class="package-m-content" style="position: absolute;bottom: 0;"><div class="package-m-title font-normal">加客服QQ:769449456<br />了解更多物流信息</div></div>'
				);
			}
			
		},
		error:function(){
			toastMessage("网络出错");
		}
	});
};
/**
 * @name  提交请求
 * @param {Object} param
 */
function orderSubmit(param){
	$.ajax({
		url: domainurl +'/Backpack/exchange.html',
		method: "POST",
		data:param,
		success: function(data) {
			data = JSON.parse(data);
			if (data.error !== 0) {
				toastMessage(data.message)
				return;
			};
			console.log("--------提交返回参数------------")
			console.log(data)
			initpackage();
			delMaskLayer($(".package-del"));
			//@TODO updata balance
			updateBalance();
			toastMessage("领取成功~")
		},
		error:function(){
			toastMessage("网络出错");
		}
	});
};
/**
 * @name [开始游戏]
 * @param {String} pUserid
 * @param {String} pUfoid
 */
function startGame(pUserid,pUfoid){
	$.ajax({
		url: domainurl +"/Catch/insertCoin",
		method: "POST",
		data: {
			"user_id": pUserid,
			"ufo_id": pUfoid,
		},
		success: function(data) {
			console.log(JSON.parse(data))
			data = JSON.parse(data)
			if(data.error !== 0) {
				toastMessage(data.message)
				return;
			};
			// 设置&更新 预抓取结果标志位 预抓取Id 
			localStorage.setItem("catchedToy", data.prize.catchedToy);
			localStorage.setItem("prepareCatchId", data.prize.prepareCatchId);
			$(".play-box").addClass('hide');
			// console.log($(".play-box").css());
			// console.log($(".control-box").css());
			$(".control-box").removeClass('hide');
			daojishi();
			//
			stopStaySpeak();
			$(".act .wawa").empty();
			//侧边栏隐藏
			$(".mask-enter").animate({
				left:"-15%"
			},300)
		},
		error: function() {
			toastMessage("网络出错");
		},
		complete: function() {
							
		}
	});
}

//绘制toast方法
function toastMessage(pMessage) {
	var box = document.createElement("div");
	box.setAttribute("class", "message_toast");
	box.innerHTML = pMessage;
	var box_f = document.getElementsByTagName("body")[0];
	box_f.appendChild(box);
	box.addEventListener("webkitAnimationEnd", function() {
		box_f.removeChild(box);
	})
}


//新手引导部分点击操作
$(".swiper-slide").on("click", function() {
	TDAPP.onEvent("新手操作点击", "点击");
	$(this).hide();
	var index_ = $(this).index();
	if(index_ == '6') {
		$(".yindao-box").fadeOut();
		localStorage.setItem("isHelpTips", "ok")
	};
});
$(".help-btn").on("click", function() {
	TDAPP.onEvent("推出引导按钮", "点击");
	$(".yindao-box").fadeOut();
	localStorage.setItem("isHelpTips", "ok")
});