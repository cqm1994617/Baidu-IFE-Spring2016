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
	var rowId = document.getElementById('rowId');
	var input = document.getElementById("area");
	var refresh = document.getElementById("refresh");

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
			this.face = 3;
		},
		movRight: function() {
			mover.style.transform = "rotate(90deg)";
			this.goRight();
			this.face = 1;
		},
		movTop: function() {
			mover.style.transform = "rotate(0deg)";
			this.goTop();
			this.face = 0
		},
		movBottom: function() {
			mover.style.transform = "rotate(180deg)";
			this.goBack();
			this.face = 2;
		}
	};

	input.addEventListener('keyup', function() {
		rowHasChange();
	})
	input.addEventListener('scroll', function() {
		var top = input.scrollTop;
		rowId.scrollTop = top;
	})

	function rowHasChange() {
		var value = input.value;
		var rows = value.split("\n");
		var arr = [];
		var top = input.scrollTop;
		for (var i = 0; i < rows.length; i++) {
			arr.push("<div class='error'>" + (i + 1) + "</div>");
		}
		rowId.innerHTML = arr.join("");
		rowId.scrollTop = top;
	}
	
	function nameCheck() {
		var value = input.value;
		value = value.toLowerCase();
		var arr = value.split("\n");
		var i = 1;	//命令条数
		command(arr[0], 0);
		var timer = setInterval(function(){
			if(i<arr.length){
				command(arr[i], i);	//执行指定命令条
				++i;
			} else {
				clearInterval(timer)
			}
		}, 500)
		
	}

	function command(cmd, i) {
		var arr = cmd.split(" ");
		var finalEle = arr[arr.length-1];
		if(!isNaN(finalEle)){	//最后一位是数字
			arr.pop();
			var currentCmd = arr.join(" ");
			main(currentCmd, finalEle, i);
		} else {
			var currentCmd = arr.join(" ");
			main(currentCmd, 1, i)
		}
	}
	
	function main(currentCmd, num, i){	//num代表命令执行次数，i代表这是第几条命令
		if (currentCmd == "go") {
			for(var i=0; i<num; i++){
				myMove.go();
			}
		} else if (currentCmd == "tun left") {
			for(var i=0; i<num; i++){
				myMove.turnLeft();
			}
		} else if (currentCmd == "tun right") {
			for(var i=0; i<num; i++){
				myMove.turnRight();
			}
		} else if (currentCmd == "tun back") {
			for(var i=0; i<num; i++){
				myMove.turnBack();
			}
		} else if (currentCmd == "tra lef") {
			for(var i=0; i<num; i++){
				myMove.goLeft();
			}
		} else if (currentCmd == "tra top") {
			for(var i=0; i<num; i++){
				myMove.goTop();
			}
		} else if (currentCmd == "tra rig") {
			for(var i=0; i<num; i++){
				myMove.goRight();
			}
		} else if (currentCmd == "tra bot") {
			for(var i=0; i<num; i++){
				myMove.goBack();
			}
		} else if (currentCmd == "mov lef") {
			for(var i=0; i<num; i++){
				myMove.movLeft();
			}
		} else if (currentCmd == "mov rig") {
			for(var i=0; i<num; i++){
				myMove.movRight();
			}
		} else if (currentCmd=="mov top") {
			for(var i=0; i<num; i++){
				myMove.movTop();
			}
		} else if (currentCmd == "mov bot") {
			for(var i=0; i<num; i++){
				myMove.movBottom();
			}
		} else {
			console.log(i)
			var err = rowId.getElementsByTagName('div');
			err[i].style.backgroundColor = "red";
		}
	}

	btn.addEventListener('click', nameCheck);
	refresh.addEventListener("click", function(){
		input.value="";
		rowId.innerHTML = ""
	})
})()