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
			console.log(this.face);
			mover.style.transform = "rotate(" + this.face * 90 + "deg)";
		},
		turnRight: function() {
			++this.face;
			console.log(this.face);
			mover.style.transform = "rotate(" + this.face * 90 + "deg)";
		},
		turnBack: function() {
			this.face = this.face + 2;
			console.log(this.face);
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
		}
	};

	btn.addEventListener('click', main)
	document.addEventListener('keydown', function(e) {
		if (e.keyCode == 13 && input == document.activeElement) {
			main()
		}
	})

	function main() {
		var value = input.value;
		value = value.toLowerCase();
		if (value == "go") {
			myMove.go();
		}
		if (value == "tun left") {
			myMove.turnLeft();
		}
		if (value == "tun right") {
			myMove.turnRight();
		}
		if (value == "tun back") {
			myMove.turnBack();
		}
	}
})()