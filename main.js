/*var ctx=document.getElementById('canvas').getContext("2d");
var img= new Image();
img.onload = function() {
	ctx.drawImage(img, 0 ,0, 30, 30);
}
img.src="6da17dc320f06b1a191f6d3270ba8a4b--oreos-online-games.jpg";*/
var tamJogador = [];
var gridX=30;
var gridY=30;
var caudasNasc=0;
var c;
var origFrame;

function startup(){
	areaJogo.start();
}

//Faz um "onkeydown" na pagina e devolve um "e" para a funcao que acontece apos de pressionar numa tecla.
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

}, false)

		
function updateArea(){
	var py, px;
	var posX, posY;
	var sX, sy;

	areaJogo.canvas.width=Math.floor(window.innerWidth/gridX)*gridX;
	areaJogo.canvas.height=140+Math.floor((window.innerHeight-140)/gridY)*gridY;
	var cWidth=areaJogo.canvas.width;
	var cHeight=areaJogo.canvas.height;

	//Apaga o frame anterior
	areaJogo.clear();
	areaJogo.cntFrame++;

	//Fazer o background, e 140 pixeis para as tabelas em cima
	areaJogo.ctx.fillStyle= "#568929";
	areaJogo.ctx.fillRect(0, 0, cWidth,140);
	areaJogo.ctx.beginPath();
	areaJogo.ctx.moveTo(0, 140);
	areaJogo.ctx.lineTo(cWidth, 140);
	areaJogo.ctx.strokeStyle="black";
	areaJogo.ctx.stroke();


	//Criar a grelha de fundo de jogo... é um bocado complicado de explicar
	var rectColor="#47F73E";
	var lastRect="#47F73E";

	for(var i=0; i<Math.floor((window.innerHeight-140)/gridY); i++){
		if(lastRect==rectColor) rectColor=rectColor=="#47F73E"?"#40E537":"#47F73E";
		lastRect=rectColor;

		for(var j=0; j<Math.floor(window.innerWidth/gridX); j++){
			areaJogo.ctx.fillStyle=rectColor;
			areaJogo.ctx.fillRect(j*gridX, (i*gridY)+140, gridX, gridY);

			rectColor=rectColor=="#47F73E"?"#40E537":"#47F73E";
		}
	}

	Math.floor((Math.random()*3123123))

	//Cria a cabeça da cobra.
	if(areaJogo.cntFrame==1) {
		pY = Math.floor(Math.random()*Math.floor((window.innerHeight-140)/gridY));
		pX = Math.floor(Math.random()*Math.floor(window.innerWidth/gridX));

		tamJogador.push(new JogadorBloco((pX)*gridX, (pY)*gridY, "red", 0, 0));

		spawn("Ponto");
	}

	if(c!=undefined) {
		c.update();

		if(tamJogador[0].checkCollide(c)){
			origFrame=areaJogo.cntFrame;

			for(var i = 1; i<tamJogador.length; i++){
				tamJogador[i].stop();
			} 

			caudasNasc+=2;
			spawn("Ponto");
		}
	}
	
	if(caudasNasc>0){
		if(areaJogo.cntFrame-origFrame==8){
			caudasNasc--; origFrame=areaJogo.cntFrame;
			
			if(caudasNasc==0){
				for(var i = 1; i<tamJogador.length; i++) tamJogador[i].resume();
			}
		}

		if(areaJogo.cntFrame-origFrame==0 && caudasNasc!=0){
			sX=tamJogador[0].SpeedX;
			sY=tamJogador[0].SpeedY;

			tamJogador.splice(1, 0, new JogadorCauda(tamJogador[0].X, tamJogador[0].Y-140, "black", sX, sY));
			tamJogador[1].stop();
		}
	}


	tamJogador[0].novaPos();
		
	//Para a cauda seguir o jogador.
	for(var i = 1; i<tamJogador.length; i++) {
		if(tamJogador[i].X%(gridX)==0 && (tamJogador[i].Y-140)%(gridY)==0 && caudasNasc==0){
			tamJogador[i].OldSpeedX=tamJogador[i].SpeedX; tamJogador[i].OldSpeedY=tamJogador[i].SpeedY;

			tamJogador[i].SpeedX=tamJogador[i-1].OldSpeedX; 
			tamJogador[i].SpeedY=tamJogador[i-1].OldSpeedY;

		}

		//Update a posicao.
		tamJogador[i].novaPos();
	}

	//Update a imagem.
	for(var i = tamJogador.length-1 ; i>=0; i--){
		tamJogador[i].update();
	}
}

function checkTime(frameInt) {
	if(areaJogo.cntFrame%frameInt==0) return true;

	return false;
}

//Calculos matemeticos complicadíssimos para gerar a sorte um ponto a volta do jogador num range (so na largura) de 10 blocos da grelha.
//Uma nova maca e criada em cada 400 frames, defenidos no areaJogo.js, e devia de ser apagada apos 4 segundos mas nao esta a dar por alguma razao.
function spawn(type){
	var rangeX, rangeXMax;
	var pY, pX;
	var f=0;

	rangeX = tamJogador[0].X-gridX*10;
	rangeXMax= (tamJogador[0].X+gridX*10)-rangeX;

	rangeX=rangeX<0?0:rangeX;
	rangeXMax=rangeXMax>areaJogo.canvas.width-gridX?areaJogo.canvas.width-gridX:rangeXMax;

	while(f==0){
		pY = Math.floor(Math.random()*Math.floor((window.innerHeight-140)/gridY));
		pX = Math.floor(Math.random()*Math.floor(rangeXMax/gridX)+rangeX/gridX);

		f=1;
		for(i=0; i<tamJogador.length; i++){
			if(!(pY*gridY>=tamJogador[i].Y+tamJogador[i].Height || pY*gridY+gridY<=tamJogador[i].Y || pX*gridX>=tamJogador[i].X+tamJogador[i].Width || pX*gridX+gridX<=tamJogador[i].X)) f=0;
		}	
	}
	

	c = new Comestivel((pX)*gridX, (pY)*gridY, type);

}
