var aniLottery = anime({
	targets: '.turntable'
});

var data = [
	{ amount: 10000 },
	{ amount: 50000 },
	{ amount: 7000 },
	{ amount: 50550 },
	{ amount: 509550 },
	{ amount: 5057750 },
	{ amount: 5750 },
	{ amount: 111550 },
	{ amount: 111550 },
	{ amount: 111550 },
	{ amount: 111550 },
];

var Lottery = Turntable.create();
document.querySelector('.turntableButton').addEventListener('click', function () {
	console.log('aaaasss')
	// var num = Math.floor(Math.random() * 8);
	// // Lottery.setColors(colors);
	// Lottery.start(num, function (index) {
	// 	alert('You won: ' + data[index].amount);
	// 	console.log('index', index, 'lottery-span', 'lottery-span' + (index + 1));
	});
// });


class Turntable {
	constructor(opts) {
			this.opts = Object.assign({
					target: '.turntable',
					easing: 'easeInOutSine',
					isplay: false,
					duration: 3000,
					rotateNum: 5,
					total: data.length,
					offset: 0
			}, opts);

			this.opts.angle = 360 / this.opts.total;
	}

	start(index, cb) {
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
					complete: function () {
							document.querySelector(self.opts.target).style.transform = 'rotate(' + off + 'deg)';
							self.stop();
							cb && cb(index);
					}
			});
			aniLottery.restart();
	}

	stop() {
			this.opts.isplay = false;
			aniLottery.pause();
	}

	setColors(colors) {
			var colorStops = '';
			var angle = 360 / colors.length;

			for (var i = 0; i < colors.length; i++) {
					colorStops += colors[i] + ' ' + i * angle + 'deg ' + (i + 1) * angle + 'deg';

					if (i < colors.length - 1) {
							colorStops += ', ';
					}
			}

			var gradient = 'conic-gradient(' + colorStops + ')';
			this.opts.target.style.background = gradient;
	}

	static create(opts) {
			return new Turntable(opts);
	}
}

var Lottery = Turntable.create({
	total: 8,
});

// 動態生成轉盤內容
var wheelHtml = '';
var angle = 360 / data.length;
var lotteryWrap = document.querySelector('.turntable');

for (var i = 0; i < data.length; i++) {
	var span = document.createElement('span');
	span.className = 'turntable-span' + (i + 1);
	span.setAttribute('data-id', i + 1);

	var iElement = document.createElement('i');
	iElement.textContent = data[i].amount;

	span.appendChild(iElement);

	wheelHtml += span.outerHTML;
}

// 將生成的內容插入轉盤
lotteryWrap.innerHTML = wheelHtml;