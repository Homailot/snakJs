/*function btns(x, y, img1, selectImg, width, height) {
	this.x=x;
	this.y=y;
	this.img1=img1;
	this.selectImg=selectImg;
	this.width=width;
	this.height=height;
	this.img=this.img1;
}

btns.prototype.checkHover = function(mPos) {
	if(mPos.x>this.x && mPos.x<this.x+this.width && mPos.y>this.y && mPos.y<this.y+this.height) return 1;
	return -1;
};

btns.prototype.update = function() {
	areaJogo.ctx.drawImage(this.img, this.x, this.y);
};

function menu() {
	var i=0;

	areaJogo.canvas.width=window.innerWidth;
	areaJogo.canvas.height=window.innerHeight;
	var cWidth=areaJogo.canvas.width;
	var cHeight=areaJogo.canvas.height;

	areaJogo.ctx.fillStyle="#042306";
	areaJogo.ctx.drawImage(areaJogo.bg, 0, 0, cWidth, cHeight);

	for(i=0; i<buttons.length; i++) {
		buttons[i].update();
	}
	//areaJogo.ctx.drawImage(menu_1, (cWidth/2)-200, cHeight-cHeight/5);

	window.requestAnimationFrame(menu);
}*/

function show(el) {
	el.style.display = 'block';
}

function hide(el) {
	el.style.backgroundImage = "none";
	el.style.display = "hide";

	var subs= el.getElementsByClassName("sub");

	for(var i = 0; i < subs.length; i++)  {
		subs[i].style.display="none";
		//subs[i].style.backgroundImage = "none";
		subs[i].style.cursor= "auto";
	}
}

function openMenu() {
	show(document.getElementById('menu'));
	document.getElementById('menu').style.backgroundImage = "url(naom_58b44e8732feb.jpg)";
	startedGame=0;

	document.getElementById("butPlayer").addEventListener("click", function startGame() {
		hide(document.getElementById("menu"));
		startup(1);	
	})

	document.getElementById("butMulti").addEventListener("click", function startMulti() {
		hide(document.getElementById("menu"));
		startup(2);
	})

	//document.getElementById("butPlayer").style.backgroundImage = "url(menu_1.fw.png)";
	//document.getElementById("butMulti").style.backgroundImage = "url(menu_2.fw.png)";

	
	var subs= document.getElementById("menu").getElementsByClassName("sub");

	for(var i = 0; i < subs.length; i++)  {
		subs[i].style.left=(window.innerWidth/2-200) + "px";
		subs[i].style.display = "block";
	}

	window.addEventListener("resize", function btns() {
		var subs= document.getElementById("menu").getElementsByClassName("sub");

		for(var i = 0; i < subs.length; i++)  {
			subs[i].style.left=(window.innerWidth/2-200) + "px";
		}
	})
}

