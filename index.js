

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
		}; })();

function _classCallCheck(instance, Constructor) { 
	if (!(instance instanceof Constructor)) { 
		throw new TypeError('Cannot call a class as a function'); 
	} }

// var aniLottery = anime({
//     targets: '.lottery-wrap'
// });

// var Turntable = (function () {
// 	function Turntable(opts) {
// 		_classCallCheck(this, Turntable);

	// this.opts = $.extend(true, {
	// 	target: '.lottery-wrap', // 旋转对象
	// 	easing: 'easeInOutSine', // anime.js 动画曲线
	// 	isplay: false, // 动画是否在播放
	// 	duration: 3000, // 动画时长
	// 	rotateNum: 10, // 旋转圈数
	// 	total: data.length, // 奖励个数
	// 	offset: 0 }, // 旋转偏移值
	// opts);

	// this.opts.angle = 360 / this.opts.total; // 旋转角度
	// }

// 	_createClass(Turntable, [{
// 		key: 'start',
// 		value: function start(index, cb) {
// 			this.opts.isplay = true;

// 			var self = this,
// 				opt = this.opts,
// 				angle = opt.angle,
// 				off = (opt.total - index) * angle - angle / 2 - opt.offset;

// 		aniLottery = anime({
// 			targets: this.opts.target,
// 			easing: this.opts.easing,
// 			autoplay: false,
// 			duration: this.opts.duration,
// 			rotate: opt.rotateNum * 360 + off,
// 			complete: function complete() {
// 				$(self.opts.target).css({
// 					'-webkit-transform': 'rotate(' + off + 'deg)',
// 					'transform': 'rotate(' + off + 'deg)'
// 				});
// 				self.stop();
// 				cb && cb(index);
// 				}
// 			});
// 			aniLottery.restart();
// 		}
// 	}, {
// 		key: 'stop',
// 		value: function stop() {
// 			this.opts.isplay = false;
// 			aniLottery.pause();
// 		}
// 	}], [{
// 		key: 'create',
// 		value: function create(opts) {
// 				return new Turntable(opts);
// 		}
// 	}]);

// 	return Turntable;
// })();

const data = [
	{amount:'100.00'},
	{amount:'200.00'},
	{amount:'300.00'},
	{amount:'400.00'},
	{amount:'500.00'},
	{amount:'600.00'},
	{amount:'700.00'},
	{amount:'800.00'},
	{amount:'900.00'},
	{amount:'1000.00'},
	// {amount:11},
	// {amount:12},
	// {amount:13},
	// {amount:14},
	// {amount:15},
	// {amount:16},
];

var wheelHtml = '';
var angle = 360 / data.length;
var lotteryWrap = document.querySelector('.lottery-wrap');

for (var i = 0; i < data.length; i++) {
	var span = document.createElement('span');
	span.className = 'lottery-span' + (i + 1);
	// span.setAttribute('data-id', i + 1);
	
	var iElement = document.createElement('i');
	iElement.textContent = data[i].amount;
	
	span.appendChild(iElement);
	
	wheelHtml += span.outerHTML;
}

// 將生成的內容插入轉盤
lotteryWrap.innerHTML = wheelHtml;

var lotteryBtn = document.querySelector('.turntableButton');
var lotteryWrap = document.querySelector('.lottery-wrap');

lotteryBtn.addEventListener('click', function() {
	var num = Math.floor(Math.random() * 8);
	// 创建 Turntable 对象
	var Lottery = Turntable.create();
	// 启动抽奖
	Lottery.start(num, function(index) {
		// 获取抽奖结果
		var result = lotteryWrap.querySelectorAll('span')[index].querySelector('i').textContent;
		// 弹出抽奖结果
		alert(result);
		console.log('index', index, 'lottery-span', 'lottery-span' + (index + 1));
	});
});
