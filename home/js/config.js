//获取所有娃娃基本配置相关信息
var newToys,formatedUfoToys,timerDanmu, danmuArr,
domainurl, timerIconDanmu, ufoCatchers, toys, ufoCostMap, formatedUfoCatchers,danmuArr = [],speakKey = true,datetime,year,month,date,
dateformat,topDanmuTimer;
//测试服 || 正式服 domainURL
domainurl = 'http://h5test02.zhuoyi.com:18808/ufo_catcher/index.php/Home'
// domainurl = 'http://money.zhuoyi.com/ufo_catcher/index.php/Home'
ufoCatchers = wawaMcid;
toys = wawasId;
datetime = new Date();
year = datetime.getFullYear(); //获取完整的年份(4位,1970)  
month = datetime.getMonth() + 1; //获取月份(0-11,0代表1月,用的时候记得加上1)  
if(month <= 9) {
	month = "0" + month;
}
date = datetime.getDate(); //获取日(1-31)  
if(date <= 9) {
	date = "0" + date;
}
dateformat = year + "-" + month + "-" + date;  
//娃娃原地表情
wawaSpeak();
//绘制换机器列表
changeMc();
//顶部弹幕轮播  
topDanmuTimer = setInterval(function() {
	var arr = ['原来一次中就是捡了别人的漏啊', '抓了很多次别放弃！下一次中奖就是你！', '所有娃娃都是有限量的！想要的趁早了！', '别人抓了很多次，中奖概率会大幅提高！', '超过五天未发货将会获赔我们的神秘娃娃！', ];
	var total = parseInt(Math.random() * arr.length);
	$(".top-text").text(arr[total]);
}, 3000)
/**
 * [Loading页面加载-----resLoader]
 * @return {[type]} [description]
 */
;(function() {
    var loader = new resLoader({
        resources: [
            '../../../../{$Think.const.SOURCE_PATH}/../../../../{$Think.const.SOURCE_PATH}/images/loader-bg.jpg',
            '../../../../{$Think.const.SOURCE_PATH}/../../../../{$Think.const.SOURCE_PATH}/images/ng-m.mp3',
            '../../../../{$Think.const.SOURCE_PATH}/images/loader-title.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/loader-avator.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/loader-notice.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/loading1.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/loading2.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/newhelp1.jpg',
            '../../../../{$Think.const.SOURCE_PATH}/images/newhelp2.jpg',
            '../../../../{$Think.const.SOURCE_PATH}/images/newhelp3.jpg',
            '../../../../{$Think.const.SOURCE_PATH}/images/newhelp4.jpg',
            '../../../../{$Think.const.SOURCE_PATH}/images/newhelp5.jpg',
            '../../../../{$Think.const.SOURCE_PATH}/images/newhelp6.jpg',
            '../../../../{$Think.const.SOURCE_PATH}/images/newhelp7.jpg',
            '../../../../{$Think.const.SOURCE_PATH}/images/newhelpbutton.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/ban.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/bars.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/board-bg.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/opacity-corner.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/btn-catch.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/btn-change.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/btn-direction.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/chongzhibg.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/del.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/gaizi.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/gamebg.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/ganzi.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/icon-package.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/icon-recharge.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/icon-set.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/icon-share.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/line.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/loader-avator.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/loader-notice.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/loader-title.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/money-bg.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/money-noce.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/move-bottom.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/move-left.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/move-right.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/move-top.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/mywa.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/mywaoff.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/next.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/package-bg.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/paws-l.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/paws-r.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/pics.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/recharge-b.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/recharge-btn1.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/recharge-btn2.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/recharge-btn3.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/recharge-btn4.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/recharge-icon1.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/recharge-icon2.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/recharge-icon3.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/recharge-icon4.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/shandow-pole.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/shandow-wawa.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/start.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/submit.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/tiqu.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/tiquoff.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/tiquwawa.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/wawa.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/wheel-mid.png',
            '../../../../{$Think.const.SOURCE_PATH}/images/ww-mainbg.png',
        ],
        onStart: function(total) {
            console.log('start:' + total);
        },
        onProgress: function(current, total) {
            // console.log(current+'/'+total);
            var percent = current / total * 100;
            $('.progressbar').css('width', percent + '%');
            //					$('.progresstext .current').text(current);
            //					$('.progresstext .total').text(total);
        },
        onComplete: function(total) {
            setTimeout(function() { $(".loaders").fadeOut(); }, 1500)
        }
    });
    loader.start();
}())		


/**
 * [formatedUfoToys description]
 * [ufoCostMap description]
 * 
 * [{ufo_id =>[{ufo}]}, ]
 * [{uc_cost =>[{ufo}]}, ]
 * 
 * @type {Dictionary}
 */
;(function() {
    ufoCostMap = new Dictionary();
    formatedUfoCatchers = new Dictionary();
    for (var i in ufoCatchers) {
        ufoCostMap.put(parseInt(ufoCatchers[i]['uc_id']), ufoCatchers[i]['uc_cost']);
        formatedUfoCatchers.put(parseInt(ufoCatchers[i]['uc_id']), ufoCatchers[i]);
    };
}());

/**
 * [newToys & formatedUfoToys description]
 * 
 * [{toy_id =>{toy}}, ]
 * [{ufo_id =>[{toy}]}, ]
 * 
 * @type {Dictionary}
 */
;(function() {
    formatedUfoToys = new Dictionary();
    newToys = new Dictionary();
    for (var i in toys) {
        var ufoId = parseInt(toys[i]['uc_id']);
        var tmpFormatedToy = [];

        if (typeof tmpFormatedToy[ufoId] == 'undefined') {
            tmpFormatedToy[ufoId] = [];
        }

        if (formatedUfoToys.has(ufoId)) {
            tmpFormatedToy[ufoId] = formatedUfoToys.get(ufoId);
        }

        tmpFormatedToy[ufoId][i] = toys[i];
        formatedUfoToys.put(ufoId, tmpFormatedToy[ufoId]);

        newToys.put(parseInt(toys[i]['ut_id']), toys[i]);
    }
    wawasId = formatedUfoToys;
}());
/**
 * [绘制娃娃机 & 娃娃们 & 换机器列表]
 * @return {[type]} [description]
 */
;(function() {
    var wawaHtml = '',
        shandowHtml = '',
        changeHtml = '';
    for (var i = 0; i < wawaMcid.length; i++) {
        wawaHtml += "<div class='wawa-box' data-mcid='" + wawaMcid[i].uc_id + "' data-cost='" + wawaMcid[i].uc_cost + "' data-sty='" + wawaMcid[i].uc_category + "'>";
        shandowHtml += "<div class='shandow-wawa-box' data-mcid='" + wawaMcid[i].uc_id + "'>";
        changeHtml += '<div class="change-m-wawa" data-mcid="' + wawaMcid[i].uc_id + '" data-cost="' + wawaMcid[i].uc_cost + '">' +
            '<div class="change-wawa-icon" style="background-image:url(' + wawaMcid[i].uc_icon + ')"></div>' +
            '<div class="change-wawa-text">' + wawaMcid[i].uc_title +
            '<br /><i class="change-wawa-num">' + parseInt(wawaMcid[i].uc_cost) + '/次</i>&nbsp;&nbsp;&nbsp;<i class="change-wawa-size">约' + parseInt(wawaMcid[i].uc_size) + '厘米</i>' +
            '</div>' +
            '<div class="hot-icon" style="background-image:url(' + wawaMcid[i].uc_hot_icon + ')"></div>' +
            '</div>';
        var count = 0;
        for (var z = 0; z < 7; z++) {
            if (count > wawaMcid[i].uc_toys_count - 1 ) {
                break;
            }
            for (var j in wawasId.get(wawaMcid[i].uc_id)) {
                if (count > wawaMcid[i].uc_toys_count  - 1) {
                    break;
                }
                wawaHtml += "<div class='wawa sty-" + wawaMcid[i].uc_category +"' style='background-image:url(" + wawasId.get(wawaMcid[i].uc_id)[j].ut_icon + ")'  data-id=" + wawasId.get(wawaMcid[i].uc_id)[j].ut_id + " data-mcid=" + wawasId.get(wawaMcid[i].uc_id)[j].uc_id + "></div>";
                shandowHtml += "<div class='shandow-wawa sty-s-" + wawaMcid[i].uc_category +"' ></div>";
                count++;
            }
        }
        wawaHtml += "</div>";
        shandowHtml += "</div>";
    }
    $(".game-area").append(shandowHtml);
    $(".game-area").append(wawaHtml);
    $(".change-content").append(changeHtml);
}());
/**
 * @name 开始公告
 */
;(function openAnnounce() {
    $.ajax({
        url: domainurl + "/Message/getAll",
        method: "POST",
        data: {
            //							"id": 0,
        },
        success: function(data) {
            data = JSON.parse(data);
            if (data.error !== 0) {
                toastMessage(data.message)
                return;
            };
            console.log("---------公告获取-----------")
            console.log(data)
            var result = data.list;
            var html = "";
            if (result.length != 0) {
                for (var i = 0; i < result.length; i++) {
                    html +=
                        '<div class="announce-content">' +
                        '<div class="announce-title">' + result[i].msg_title + '</div>' +
                        '<div class="announce-desc">' + result[i].msg_desc.replace(/\r\n/g, "<br>") + '</div>' +
                        '</div>';
                }
                $(".announce-content-box").html(html);
            }
        },
        error: function() {
            toastMessage("网络出错");
        }
    });
    $(".mask").show();
    $(".announce-box").show();
}());
/**
 * [isHelpShow 祛除新手引导]
 * @return {Boolean} [description]
 */
;(function isHelpShow() {
    var isHelp = localStorage.getItem("isHelpTips") || '';
    if (isHelp === "ok") {
        $(".yindao-box").remove();
    }
}());
/**
 * @name 签到部分弹框
 */
;(function() {
	$.ajax({
		url: domainurl + "/Checkin/history",
		method: "POST",
		data: {
			"user_id": localStorage.getItem("user_id")
		},
		success: function(data) {
//			console.log("---------签到列表result(未解析）-----------")
//			console.log(data)
			data = JSON.parse(data);
			if(data.error !== 0) {
				toastMessage(data.message)
				return;
			};
			console.log("---------签到列表result-----------")
			console.log(data)
			var checkinResult = data.result.tasks;
			var checkinUserResult = data.result.user_checkins;
			console.log(checkinUserResult)
			var checkinHtml = '';
			//第一层for循环，遍历所有任务的列表。（不分状态）
			outer: for(var i = 0; i < checkinResult.length; i++) {
				checkinHtml +=
					'<div class="checkin-content" data-gsid="' + checkinResult[i].gs_id + '">' +
					'<div class="mask-icon" style="background-image:url(' + checkinResult[i].gs_gift_icon + ')"></div>' +
					'<div class="mask-text">' +
					'<div class="mask-title">' + checkinResult[i].gs_gift_name + '</div>' +
					'<span class="mask-score">奖励：金币X' + parseInt(checkinResult[i].gs_bonus_coin) + ' </span>' +
					'</div>'
				// 第二层for循环，遍历用户已签到任务的列表。 （status：     0 未领取    1 已领取）
				inner: for(var j in checkinUserResult) {
					if(checkinUserResult[j].ucgl_gift_id == checkinResult[i].gs_id) {
						if(checkinUserResult[j].ucgl_status == 0) {
							checkinHtml +=
								'<div class="mask-btn checkin-status0" data-ucglid="' + checkinUserResult[j].ucgl_id + '" data-userid="' + checkinUserResult[j].ucgl_user_id + '"></div>' +
								'</div>'
							$(".checkin-all").show();
							continue outer
						} else {
							checkinHtml +=
								'<div class="mask-btn checkin-status1"></div>' +
								'</div>'
							continue outer
						}
					} 
				}
				checkinHtml +=
					'<div class="mask-btn">未达成</div>' +
					'</div>'
			}
			//绘制所有任务列表 （默认都是未达成的状态）
			$(".checkin-content-box").append(checkinHtml);
		},
		complete: function() {
			$(".del-checkin").bind("click", function() {
				$(".checkin-all").hide();
			})
			//领取签到奖励
			$(".checkin-status0").one("click", function() {
				TDAPP.onEvent("签到部分【领取】", "点击");
				var _this = $(this);
				getCheckinBonus(_this);
			})
		},
		error: function() {
			toastMessage("网络出错");
		}
	});
}());
/**
 * @判断用户是否已首充
 */
;(function(){
	$.ajax({
			url: domainurl +"/NormalMission/getRechargedTasks",
			method: "POST",
			data: {
				"user_id": localStorage.getItem("user_id"),
			},
			success: function(data) {
				data = JSON.parse(data);
				if (data.error !== 0) {
					toastMessage(data.message)
					return;
				};
				console.log("---------判断用户是否首充result-----------")
				console.log(data)
				//@TODO 判断用户显隐
			},
			error:function(){
				toastMessage("网络出错");
			}
	});
}());
