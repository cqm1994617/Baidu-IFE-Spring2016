(function init() {
	var map = document.getElementById('map');
	var boxArr = [];
	for (var i = 0; i < 100; i++) {
		boxArr.push('<div class="mapBox"></div>');
	}
	boxArr.push('<div id="mover" class="mover"></div>');
	map.innerHTML = boxArr.join('')
	mover.style.transform = "rotate(0deg)";
	mover.style.left = "160px";
	mover.style.top = "160px";
})();

(function() {
	var mover = document.getElementById('mover');
	var btn = document.getElementById('btn');
	var input = document.getElementById('input');

	var myMove = {
		face: 0,
		turnLeft: function() {
			--this.face;
			mover.style.transform = "rotate(" + this.face * 90 + "deg)";
		},
		turnRight: function() {
			++this.face;
			mover.style.transform = "rotate(" + this.face * 90 + "deg)";
		},
		turnBack: function() {
			this.face = this.face + 2;
			mover.style.transform = "rotate(" + this.face * 90 + "deg)";
		},
		go: function() {
			if (this.face % 4 == 3 || this.face % 4 == -1) {
				//朝左
				if (parseInt(mover.style.left) > 0) {
					mover.style.left = (parseInt(mover.style.left) - 40) + 'px';
				}
			}
			if (this.face % 4 == 2 || this.face % 4 == -2) {
				//朝下
				if (parseInt(mover.style.top) < 360) {
					mover.style.top = (parseInt(mover.style.top) + 40) + 'px';
				}
			}
			if (this.face % 4 == 1 || this.face % 4 == -3) {
				//朝右
				if (parseInt(mover.style.left) < 360) {
					mover.style.left = (parseInt(mover.style.left) + 40) + 'px';
				}
			}
			if (this.face % 4 == 0) {
				//朝上
				if (parseInt(mover.style.top) > 0) {
					mover.style.top = (parseInt(mover.style.top) - 40) + 'px';
				}
			}
		},
		goLeft: function() {
			if (parseInt(mover.style.left) > 0) {
				mover.style.left = (parseInt(mover.style.left) - 40) + 'px';
			}
		},
		goRight: function() {
			if (parseInt(mover.style.left) < 360) {
				mover.style.left = (parseInt(mover.style.left) + 40) + 'px';
			}
		},
		goTop: function() {
			if (parseInt(mover.style.top) > 0) {
				mover.style.top = (parseInt(mover.style.top) - 40) + 'px';
			}
		},
		goBack: function() {
			if (parseInt(mover.style.top) < 360) {
				mover.style.top = (parseInt(mover.style.top) + 40) + 'px';
			}
		},
		movLeft: function() {
			mover.style.transform = "rotate(-90deg)";
			this.goLeft();
		},
		movRight: function() {
			mover.style.transform = "rotate(90deg)";
			this.goRight();
		},
		movTop: function() {
			mover.style.transform = "rotate(0deg)";
			this.goTop();
		},
		movBottom: function() {
			mover.style.transform = "rotate(180deg)";
			this.goBack();
		}
	};

	function main() {
		var value = input.value;
		value = value.toLowerCase();
		if (value == "go") {
			myMove.go();
		} else if (value == "tun left") {
			myMove.turnLeft();
		} else if (value == "tun right") {
			myMove.turnRight();
		} else if (value == "tun back") {
			myMove.turnBack();
		} else if (value == "tra lef") {
			myMove.goLeft();
		} else if (value == "tra top") {
			myMove.goTop();
		} else if (value == "tra rig") {
			myMove.goRight();
		} else if (value == "tra bot") {
			myMove.goBack();
		} else if (value == "mov lef") {
			myMove.movLeft();
		} else if (value == "mov rig") {
			myMove.movRight();
		} else if (value=="mov top") {
			myMove.movTop();
		} else if (value == "mov bot") {
			myMove.movBottom();
		} else {
			alert("命令出错！");
		}
	}

	btn.addEventListener('click', main);

	document.addEventListener('keydown', function(e) {
		if (e.keyCode == 13 && input == document.activeElement) {
			main()
		}
	})

})()