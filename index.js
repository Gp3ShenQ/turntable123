
//轉盤資料包
const data = [
	{'amount':'100.00', 'Currency':'BNB'},
	{'amount':'200.00', 'Currency':'BUSD'},
	{'amount':'300.00', 'Currency':'BTC'},
	{'amount':'400.00', 'Currency':'ETH'},
	{'amount':'500.00', 'Currency':'DOGE'},
	{'amount':'600.00', 'Currency':'SOL'},
	{'amount':'700.00', 'Currency':'AVAX'},
	{'amount':'800.00', 'Currency':'LUNA'},
	{'amount':'900.00', 'Currency':'SHIB'},
	{'amount':'1000.00', 'Currency':'ADA'},
];


var _createClass = (function () { 
	function defineProperties(target, props) { 
		for (var i = 0; i < props.length; i++) { 
			var descriptor = props[i]; 
			descriptor.enumerable = descriptor.enumerable || false; 
			descriptor.configurable = true; 
			if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); 
		} } return function (Constructor, protoProps, staticProps) { 
			if (protoProps) defineProperties(Constructor.prototype, protoProps); 
			if (staticProps) defineProperties(Constructor, staticProps); 
			return Constructor; 
		}; 
	})();
	

function _classCallCheck(instance, Constructor) { 
	if (!(instance instanceof Constructor)) { 
		throw new TypeError('Cannot call a class as a function'); 
	}}
	
	var aniLottery = anime({
		targets: '.lottery-wrap'
	});
	
	var Turntable = (function () {
		function Turntable(opts) {
			_classCallCheck(this, Turntable);
			this.opts = Object.assign({
				target: '.lottery-wrap', // 旋轉對象
				easing: 'easeInOutSine', // anime.js 動畫曲線
				isplay: false, // 動畫是否再撥放
				duration: 3000, // 動畫時長
				rotateNum: 5, // 旋轉圈數
				total: data.length, // 獎勵資料DATA
				offset: (dataLen === 6 ? -29 : 0) + (dataLen === 8 ? -22 : 0) + (dataLen === 10 ? -18 : 0)
			},
				opts);
			this.opts.angle = 360 / this.opts.total; // 旋轉角度
		}
		
		_createClass(Turntable, [{
			key: 'start',
			value: function start(index, cb) {
				this.opts.isplay = true;
				var self = this,
				opt = this.opts,
				angle = opt.angle,
				off = (opt.total - index) * angle - angle / 2 - opt.offset;
				aniLottery = anime({
					targets: this.opts.target,
					easing: this.opts.easing,
					autoplay: false,
					duration: this.opts.duration,
					rotate: opt.rotateNum * 360 + off,
					complete: function complete() {
						var targetElement = document.querySelector(self.opts.target);
						targetElement.style.webkitTransform = 'rotate(' + off + 'deg)';
						targetElement.style.transform = 'rotate(' + off + 'deg)';
						self.stop();
						cb && cb(index);
					}
				});
				aniLottery.restart();
			}
		}, {
			key: 'stop',
			value: function stop() {
				this.opts.isplay = false;
				aniLottery.pause();
			}
		}], [{
			key: 'create',
			value: function create(opts) {
				return new Turntable(opts);
			}
		}]);
	return Turntable;
})();


var wheelHtml = '';
var angle = 360 / data.length;
var lotteryWrap = document.querySelector('.lottery-wrap');
const dataLen = data.length;

// 创建包含背景图的容器
var container = document.createElement('div');
container.className = 'turntable-container';

let result;

for (var i = 0; i < data.length; i++) {
	var span = document.createElement('span');
	span.className = 'lottery-span' + (i + 1);
	span.style.transform = `rotate(${angle * i}deg)`
	
	var iElement = document.createElement('i');
	iElement.textContent = data[i].amount;
	span.appendChild(iElement);
	wheelHtml += span.outerHTML;
}

//重新渲染HTML畫面
container.innerHTML = wheelHtml;
// 设置背景图
getTurntableBg(dataLen, container);

// 将背景图容器和span元素添加到.lottery-wrap
lotteryWrap.appendChild(container);

// 设置背景图的函数
function getTurntableBg(dataLen, container) {
	console.log(dataLen, container)
	const background = document.createElement('div');
	background.className = 'turntableColor';
	console.log(background.style.backgroundImage)
	
	
	if (dataLen === 6) {
		background.style.backgroundImage = "url('./img/bg_lottery_6.png')";
	} else if (dataLen === 8) {
		background.style.backgroundImage = "url('./img/bg_lottery_8.png')";
	} else if (dataLen === 10) {
		background.style.backgroundImage = "url('./img/bg_lottery_10.png')";
	}
	// 将背景图容器添加到包含背景图的容器中
	container.appendChild(background);
}


var lotteryBtn = document.querySelector('.turntableButton');
var lotteryBtnImg = document.querySelector('.turntableButton img');
var lotteryWrap = document.querySelector('.lottery-wrap');
lotteryBtn.addEventListener('click', function() {
	//禁用按鈕
	lotteryBtnImg.style.pointerEvents = 'none';
	var num = Math.floor(Math.random() * dataLen);
	// 创建 Turntable 对象
	var Lottery = Turntable.create();
	
	// 启动抽奖
	Lottery.start(num, function(index) {
		// // 获取抽奖结果
		var resultElement = lotteryWrap.querySelectorAll('span')[index].querySelector('i');
		console.log(resultElement)

		resultElement.classList.add('scaleText');


		console.log(result)
		//添加箭頭動畫效果
		setTimeout(function() {
			document.querySelectorAll('.turntableArrow img').forEach(function(element) {
				element.classList.add('arrowEnd');
			});
		}, 0);
	});
});


window.addEventListener('DOMContentLoaded', function () {
	// 獲取元素
	var turntableAll = document.querySelector('.turntableAll');
	var turntableClose = document.querySelector('.turntableClose');
	var ticketQIcon = document.querySelector('.ticketQIcon');
	var questionMask = document.querySelector('.questionMask');
	var questionArea = document.querySelector('.questionArea');
	var goldClose = document.querySelector('.goldClose')
	// var amountMask = document.querySelector('.amountMask')
	// var amountArea = document.querySelector('.amountArea')

	// 添加點擊事件監聽器
	turntableClose.addEventListener('click',function(){
		turntableAll.style.display = 'none'
	})

	ticketQIcon.addEventListener('click', function () {
		questionMask.style.display = 'block';
		questionArea.style.display = 'block';
	});
	questionArea.addEventListener('click',function(){
		questionMask.style.display = 'none';
		questionArea.style.display = 'none';
	})

	goldClose.addEventListener('click',function(){
		turntableAll.style.display = 'none'
	})









});


