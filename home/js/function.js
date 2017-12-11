<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title></title>
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<script src="http://sdk.talkingdata.com/app/h5/v1?appid=3D078E3B8EC249328B060FE931C68A7A&amp;vn=浅言文集&amp;vc=1.0.1"></script>
		<style>
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				list-style: none;
				text-decoration: none;
			}
			
			html,
			body {
				width: 100%;
				height: 100%;
			}
			
			.main-container {
				width: 100%;
				height: 100%;
				/*background-image: url('img/25.png');*/
				background-size: 100% 100%;
				padding: 3% 4%;
				font-size: 3.8vw;
				position: relative;
			}
			
			.name,
			.address,
			.date {
			    width: 65%;
			    height: 11vw;
			    line-height: 11vw;
			    border-bottom: 1px #dcdcdc solid;
			    white-space: nowrap;
			    text-overflow: ellipsis;
    			overflow: hidden;
			}
			
			.content {
				width: 100%;
				line-height: 2;
				margin-top: 25px;
			}
			
			.from {
				width: 100%;
				text-align: -webkit-right;
				margin-top: 15px;
			}
			
			.bottom {
				position: fixed;
				bottom: 0;
				background: white;
				width: 100%;
				height: 8%;
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
			
			.icon {
			    width: 8.78vw;
			    height: 8.78vw;
			    background-image: url(http://qycdn.zhuoyoutech.com/h5share/android/logo.png);
			    background-size: 100% 100%;
			}
			
			.desc {
			    font-size: 3.78vw;
    			color: #9b9b9b;
			}
			
			.button {
			    width: 14vw;
			    height: 7vw;
			    border: 1px #4a90e2 solid;
			    border-radius: 5px;
			    text-align: center;
			    line-height: 7vw;
			    font-size: 3.8vw;
			    color: #4a90e2;
			}
			
			.image {
				width: 8em;
				height: 8em;
				/*background: red;*/
				position: absolute;
				right: 4%;
				top: 3%;
				background-size: 100% 100%;
			}
			
			.tips1 {
				background-image: url(img/label_send_to@3x.png);
				background-size: 100% 100%;
				width: 8em;
				height: 6.36em;
				position: absolute;
				top: 38%;
				left: 30%;
			}
			
			.tips2 {
				background-image: url(img/label_send@3x.png);
				background-size: 100% 100%;
				width: 5em;
				height: 3.97em;
				position: absolute;
				top: 17%;
				left: 58%;
			}
			
			.message_toast {
				opacity: 0;
				color: white;
				background: #000001;
				font-size: 23px;
				position: fixed;
				z-index: 9999;
				display: block;
				width: 75%;
				height: 3.68em;
				text-align: center;
				line-height: 3.68em;
				border: 0.01rem #eee solid;
				border-radius: 1.1em;
				margin: auto;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				animation: fadeMess 3s linear;
				-webkit-animation: fadeMess 3s linear;
			}
			
			@keyframes fadeMess {
				25% {
					opacity: 1;
				}
				75% {
					opacity: 1;
				}
				100% {
					opacity: 0;
				}
			}
			
			@-webkit-keyframes fadeMess {
				25% {
					opacity: 1;
				}
				75% {
					opacity: 1;
				}
				100% {
					opacity: 0;
				}
			}
		</style>
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<script src="http://sdk.talkingdata.com/app/h5/v1?appid=3D078E3B8EC249328B060FE931C68A7A&amp;vn=浅言文集&amp;vc=1.0.1"></script>
	</head>

	<body>
		<div class="main-container">
			<div class="image"></div>
			<div class="tips1"></div>
			<div class="tips2"></div>
			<div class="name">TO：老腊肉学姐</div>
			<div class="address">收件地址：</div>
			<div class="date">收件日期：2017-10-25</div>
			<div class="content">作品阐述了地球人类文明和三体文明的信息交流<br>生死搏杀及两个文明在宇宙中<br>兴衰历程<br><br><br>其第一部。。<br>123 <br>456</div>
			<div class="from">From:老腊肉学姐</div>
		</div>
		<div class="bottom">
			<div class="icon"></div>
			<div class="desc">浅言，用细节把日子串成诗</div>
			<div class="button">打开</div>
		</div>
		<script src="https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
		<script type="text/javascript">
			TDAPP.onEvent('明信片分享页面访问', "访问");
			var jsonpUrl;
//			jsonpUrl = "http://61.152.66.114:2003/api/postcardp/" + GetQueryString("p_id") + "/" + GetQueryString("user_id");
			jsonpUrl = "http://business.qianyan.zhuoyoutech.com:2003/api/postcardp/" + GetQueryString("p_id") + "/" + GetQueryString("user_id");
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				jsonp: 'callback',
				url: jsonpUrl,
				success: function(data) {
					console.log(data);
					if(data.return_code !== 1) {
						toastMessage("网络异常，请重试！");
						return;
					};
					var result = data.postcard;
					$(".name").text("TO：" + result.send_to);
					$(".address").text("收件地址：" + result.send_email);
					$(".date").text("收件日期：" + result.send_time);
					$(".content").text(result.content);
					$(".from").text("From:" + result.send_from);
					$(".main-container").css({
						backgroundImage: 'url(' + result.postcard.img + ")",
					});
					$(".image").css({
						backgroundImage: 'url(' + result.stamp.img + ")",
					});
					var tipsStatus = result.status;
					console.log(tipsStatus)
					if(tipsStatus == 0) {
						$(".tips1").hide();
						$(".tips2").hide();
					} else if(tipsStatus == 0) {
						$(".tips1").hide();
					} else if(tipsStatus == 2) {

					}
					//缓存微信分享参数
					localStorage.setItem("shareTitle", "Hi～我给你寄了一张明信片");
					localStorage.setItem("shareDesc", "自从遇见了浅言 我用细节把生活串成了诗~");
					localStorage.setItem("shareIcon", "http://qycdn.zhuoyoutech.com/h5share/android/logo.png");
				},
				complete: function() {
					wechatShare();
				},
				error: function() {
					toastMessage("网络异常，请重试！");
				}
			});
			$(".button").on("click", function() {
				TDAPP.onEvent('明信片分享页面下方【打开】按钮', "点击");
				window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.zhy.qianyan";
			})
			//解析URL参数
			function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}

			//绘制toast弹窗消息
			function toastMessage(pMessage) {
				var box = document.createElement("div");
				box.setAttribute("class", "message_toast");
				box.innerHTML = pMessage;
				var box_f = document.getElementsByTagName("body")[0];
				box_f.appendChild(box);
				box.addEventListener("webkitAnimationEnd", function() {
					box_f.removeChild(box)
				})
			}

//			function wechatShare() {
//				if(window.location.href.indexOf("&nsukey") > 0) {
//					window.location.href = window.location.href.split("&nsukey")[0];
//				}
//				var shareCommonUrl, shareTitle, shareDesc, shareIcon;
//				//	shareCommonUrl = window.location.href.split("&")[0];
//				shareCommonUrl = encodeURIComponent(window.location.href);
//				shareTitle = localStorage.getItem("shareTitle");
//				shareDesc = localStorage.getItem("shareDesc");
//				shareIcon = localStorage.getItem("shareIcon");
////				console.log('http://61.152.66.114:2003/api/wxconfigp?url=' + shareCommonUrl.split("&")[0]);
//				//JSONP请求获取微信分享相关的参数
//				$.ajax({
//					type: "GET",
//					dataType: "jsonp",
//					jsonp: 'callback',
////					url: 'http://61.152.66.114:2003/api/wxconfigp?url=' + shareCommonUrl,
//					url: 'http://business.qianyan.zhuoyoutech.com:2003/api/wxconfigp?url=' + shareCommonUrl,
//					success: function(data) {
//						console.log(data);
//						wx.config({
//							debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//							appId: 'wxa854ecf801209b51', // 必填，公众号的唯一标识
//							timestamp: data.timestamp, // 必填，生成签名的时间戳
//							nonceStr: data.noncestr, // 必填，生成签名的随机串
//							signature: data.signature, // 必填，签名，见附录1
//							jsApiList: [
//								'onMenuShareTimeline',
//								'onMenuShareAppMessage'
//								//		    	'onMenuShareQQ',
//								//		    	'onMenuShareQZone'
//							] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//						});
//						wx.ready(function() {
//							// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
//
//							//分享到朋友圈
//							wx.onMenuShareTimeline({
//								title: shareTitle, // 分享标题
//								link: shareCommonUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//								imgUrl: shareIcon, // 分享图标
//								success: function() {
//									// 用户确认分享后执行的回调函数
//								},
//								cancel: function() {
//									// 用户取消分享后执行的回调函数
//								}
//							});
//							//分享给朋友
//							wx.onMenuShareAppMessage({
//								title: shareTitle, // 分享标题
//								desc: shareDesc, // 分享描述
//								link: shareCommonUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//								imgUrl: shareIcon, // 分享图标
//								type: '', // 分享类型,music、video或link，不填默认为link
//								dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//								success: function() {
//									// 用户确认分享后执行的回调函数
//								},
//								cancel: function() {
//									// 用户取消分享后执行的回调函数
//								}
//							});
//							//分享到QQ
//							//			wx.onMenuShareQQ({
//							//			    title: shareTitle, // 分享标题
//							//			    desc: shareDesc, // 分享描述
//							//			    link: shareCommonUrl, // 分享链接
//							//			    imgUrl: shareIcon, // 分享图标
//							//			    success: function () { 
//							//			       // 用户确认分享后执行的回调函数
//							//			    },
//							//			    cancel: function () { 
//							//			       // 用户取消分享后执行的回调函数
//							//			    }
//							//			});
//							//分享到QQ空间
//							//			wx.onMenuShareQZone({
//							//			    title: shareTitle, // 分享标题
//							//			    desc: shareDesc, // 分享描述
//							//			    link: shareCommonUrl, // 分享链接
//							//			    imgUrl: shareIcon, // 分享图标
//							//			    success: function () { 
//							//			       // 用户确认分享后执行的回调函数
//							//			    },
//							//			    cancel: function () { 
//							//			        // 用户取消分享后执行的回调函数
//							//			    }
//							//			});
//						});
//					},
//					complete: function() {
//
//					},
//					error: function() {
//						//		toastMessage("网络异常，请重试！");
//					}
//				});
//			}
		</script>
		<script src="js/wechat1.js" type="text/javascript" charset="utf-8"></script>
	</body>

</html>