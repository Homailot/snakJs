
//Este é um objeto, uma variavel com muitas variaveis dentro dela, este objeto é mais para organizaçao. NO ENTANTO objetos sao muito importantes quando sao criados
//pelos constructors e teem MTA funcionalidade, existem constructors no InheritEntity.
var areaJogo = {
	//variavel: valor
	canvas: document.createElement("canvas"),
	beginGame: function() {
		this.canvas.width=Math.floor(window.innerWidth/gridX)*gridX;
		this.canvas.height=140+Math.floor((window.innerHeight-140)/gridY)*gridY;
		this.ctx=this.canvas.getContext("2d");

		addEventListener("keydown", function(e) {
			var i;

			switch (e.keyCode) {
				case 38:
					if(tamJogador[0].SpeedY==0) {
						tamJogador[0].TurnV=-1; tamJogador[0].TurnH=0;
					}

					break;
				case 40:
					if(tamJogador[0].SpeedY==0) {
						tamJogador[0].TurnV=1; tamJogador[0].TurnH=0;
					}

					break;
				case 37:
					if(tamJogador[0].SpeedX==0) {
						tamJogador[0].TurnH=-1; tamJogador[0].TurnV=0;
					}

					break;
				case 39:
					if(tamJogador[0].SpeedX==0) {
						tamJogador[0].TurnH=1; tamJogador[0].TurnV=0;
					}

					break;
			}

		}, false);
		this.cntFrame = 1;
		this.interval = setInterval(updateArea, 25);

	},
	start: function() {
		this.canvas.width=window.innerWidth;
		this.canvas.height=window.innerHeight;
		this.ctx=this.canvas.getContext("2d");
		document.getElementById("container").insertBefore(this.canvas, document.getElementById("container").childNodes[0]);
		addEventListener("keydown", function(e) {
			var i;

			switch(e.keyCode) {
				case 13: 
					clearInterval(areaJogo.interval);
					areaJogo.beginGame();
					break;
			}

		}, false);
		this.cntFrame = 1;
		this.interval = setInterval(menu, 40);
	},
	clear: function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
