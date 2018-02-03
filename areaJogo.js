
//Este é um objeto, uma variavel com muitas variaveis dentro dela, este objeto é mais para organizaçao. NO ENTANTO objetos sao muito importantes quando sao criados
//pelos constructors e teem MTA funcionalidade, existem constructors no InheritEntity.
//var buttons=[];

var areaJogo = {
	//variavel: valor
	beginGame: function(type) {
		this.canvas=document.createElement("canvas");
		document.getElementById("container").insertBefore(this.canvas, document.getElementById("container").childNodes[0]);
		this.canvas.width=Math.floor(window.innerWidth/gridX)*gridX;
		this.canvas.height=140+Math.floor((window.innerHeight-140)/gridY)*gridY;
		this.ctx=this.canvas.getContext("2d");
		this.cntFrame = 1;
		this.type=type;
		//this.interval = setInterval(updateArea, 25);
		this.myReq = requestAnimationFrame(updateArea);

	},
	/*start: function() {
		
		addEventListener("keydown", function a(e) {
			var i;

			switch(e.keyCode) {
				case 13: 
					//clearInterval(areaJogo.interval);
					removeEventListener("keydown", a);
					areaJogo.beginGame();
					break;
			}

		}, false);

		addEventListener("mousemove", function b(e) {
			this.mousePos=getMousePos(areaJogo.canvas, e);
		})
		this.cntFrame = 1;
		window.requestAnimationFrame(menu);
	},*/
	clear: function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

