var menu_1= new Image();
var bg= new Image();
var menu_1_s= new Image();
var scoreImg= new Image();
menu_1.src="menu_1.fw.png";
bg.src="naom_58b44e8732feb.jpg";
menu_1_s.src="Menu_1_select.fw.png";
scoreImg.src="score.fw.png";

var tamJogador = [];
var tamJogador2 = [];
var gridX=30;
var gridY=30;
var caudasNasc=0;
var curEdibles = [];
var cntComida=0;
var origFrame;
var score=0;
var speedFlag=0;
var myReq;

//Faz um "onkeydown" na pagina e devolve um "e" para a funcao que acontece apos de pressionar numa tecla.
function startup(type){	
	//buttons.push(new btns((innerWidth/2)-200, innerHeight-innerHeight/5, menu_1, menu_1_s, 400, 100));

	areaJogo.beginGame(type);

	var pY = Math.floor(Math.random()*Math.floor((window.innerHeight-140)/gridY));
	var pX = Math.floor(Math.random()*Math.floor(window.innerWidth/gridX));

	tamJogador.push(new JogadorBloco((pX)*gridX, (pY)*gridY, "blue", gridX/speedValX*speedMult, 0));
	tamJogador.push(new JogadorCauda((pX-1)*gridX,  (pY)*gridY, "black", tamJogador[0].SpeedX, tamJogador[0].SpeedY, tamJogador[0].OldRotate));

	spawn(0);

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

	if(type==2) {
		addEventListener("keydown", function(e) {
			var i;

			switch (e.keyCode) {
				case 87:
					if(tamJogador2[0].SpeedY==0) {
						tamJogador2[0].TurnV=-1; tamJogador2[0].TurnH=0;
					}

					break;
				case 83:
					if(tamJogador2[0].SpeedY==0) {
						tamJogador2[0].TurnV=1; tamJogador2[0].TurnH=0;
					}

					break;
				case 65:
					if(tamJogador2[0].SpeedX==0) {
						tamJogador2[0].TurnH=-1; tamJogador2[0].TurnV=0;
					}

					break;
				case 68:
					if(tamJogador2[0].SpeedX==0) {
						tamJogador2[0].TurnH=1; tamJogador2[0].TurnV=0;
					}

					break;
			}

		}, false);

		tamJogador2.push(new JogadorBloco((pX)*gridX, (pY+2)*gridY, "blue", gridX/speedValX*speedMult, 0));
		tamJogador2.push(new JogadorCauda((pX-1)*gridX,  (pY+2)*gridY, "black", tamJogador2[0].SpeedX, tamJogador2[0].SpeedY, tamJogador2[0].OldRotate));
	}
}


		
function updateArea(){
	var py, px;
	var posX, posY;
	var sX, sy;
	var i;

	areaJogo.canvas.width=Math.floor(window.innerWidth/gridX)*gridX;
	areaJogo.canvas.height=140+Math.floor((window.innerHeight-140)/gridY)*gridY;
	var cWidth=areaJogo.canvas.width;
	var cHeight=areaJogo.canvas.height;

	//Apaga o frame anterior
	areaJogo.clear();
	if(origFrame<speedValX/speedMult)origFrame++;


	/*areaJogo.ctx.beginPath();
	areaJogo.ctx.moveTo(0, 140);
	areaJogo.ctx.lineTo(cWidth, 140);
	areaJogo.ctx.strokeStyle="black";
	areaJogo.ctx.stroke();*/

	//Criar a grelha de fundo de jogo... é um bocado complicado de explicar
	var rectColor="#47F73E";
	var lastRect="#47F73E";

	for(i=0; i<Math.floor((window.innerHeight-140)/gridY); i++){
		if(lastRect==rectColor) rectColor=rectColor=="#47F73E"?"#40E537":"#47F73E";
		lastRect=rectColor;

		for(var j=0; j<Math.floor(window.innerWidth/gridX); j++){
			areaJogo.ctx.fillStyle=rectColor;
			areaJogo.ctx.fillRect(j*gridX, (i*gridY)+140, gridX, gridY);

			rectColor=rectColor=="#47F73E"?"#40E537":"#47F73E";
		}
	}

	//Cria a cabeça da cobra.
	if(areaJogo.cntFrame==1) {
		areaJogo.cntFrame++;
	}


	//Verificar se cobra comeu o ponto, e fazer spawn de outro ponto num sitio aleatorio
	if(curEdibles!=undefined) {
		for(i=0; i<curEdibles.length; i++){
			curEdibles[i].update();

			if(tamJogador[0].checkCollide(curEdibles[i])){
				score+=curEdibles[i].Value;

				if(curEdibles[i].Type==0) {
					//Verifica se o jogador ganhou.
					if(tamJogador.length+2>=Math.floor(areaJogo.canvas.width/gridX)*Math.floor((areaJogo.canvas.height-140)/gridY)) {
						return;
					}

					cntComida++;
					if(cntComida%4==0) {
						if(!curEdibles[1]) spawn(1);
						setTimeout(function() {curEdibles.splice(1, 1)}, 5000);
					}


					if(caudasNasc==0){
						origFrame=0;

						tamJogador[tamJogador.length-1].stop();
					}

					caudasNasc+=2;

					spawn(0);
				} else if(curEdibles[i].Type==1) {
					//tamJogador.splice(-1, 3);

					speedFlag=1;
					setTimeout(function() {speedFlag=0}, 4000)
					curEdibles.splice(1, 1);
				}
			}
		}
	}

	if(speedFlag==1 && tamJogador[0].X%(gridX)==0 && (tamJogador[0].Y-140)%(gridY)==0 && caudasNasc==0) {
		speedMult=1.6;
	} else if(speedFlag==0 && caudasNasc==0 && tamJogador[0].X%(gridX)==0 && (tamJogador[0].Y-140)%(gridY)==0) speedMult=1;

	//Faz a cauda crescer, depois espera oito frames para fazer crescer outra.
	if(caudasNasc>0){
		if(origFrame>=speedValX/speedMult ){
			caudasNasc--; origFrame=0;
			
			if(caudasNasc==0){
				tamJogador[tamJogador.length-1].resume();
			}
		}

		if(origFrame==0 && caudasNasc!=0){
			sX=tamJogador[tamJogador.length-1].StopSpeedX;
			sY=tamJogador[tamJogador.length-1].StopSpeedY;

			tamJogador.splice(tamJogador.length-1, 0, new JogadorCauda(tamJogador[tamJogador.length-1].X, tamJogador[tamJogador.length-1].Y-140, "black", sX, sY, tamJogador[tamJogador.length-1].OldRotate));
		}
	}

	//Update da posicao da cabeça, aplica as velocidades
	tamJogador[0].turn();
	tamJogador[0].newPos();

		
	//Para a cauda seguir o jogador.
	for(i = 1; i<tamJogador.length; i++) {
		if(tamJogador[i].X%(gridX)==0 && (tamJogador[i].Y-140)%(gridY)==0 && !(i==tamJogador.length-1 && tamJogador[tamJogador.length-1].SpeedX==0 && tamJogador[tamJogador.length-1].SpeedY==0) ){
			tamJogador[i].OldSpeedX=tamJogador[i].SpeedX; tamJogador[i].OldSpeedY=tamJogador[i].SpeedY;
			tamJogador[i].OldAngleMult=tamJogador[i].AngleMult;
			tamJogador[i].OldX=tamJogador[i].X; tamJogador[i].OldY=tamJogador[i].Y;
			tamJogador[i].Angle=0;
			tamJogador[i].OldRotate=tamJogador[i].isRotating;

			tamJogador[i].SpeedX=tamJogador[i-1].OldSpeedX; 
			tamJogador[i].SpeedY=tamJogador[i-1].OldSpeedY;
			tamJogador[i].AngleMult=tamJogador[i-1].OldAngleMult;
			tamJogador[i].isRotating=tamJogador[i-1].OldRotate;
		}
		
		//Update a posicao.
		tamJogador[i].newPos();
	}

	

	//Check colisões
	/*if(tamJogador[0].X+tamJogador[0].Width>areaJogo.canvas.width || tamJogador[0].X<0 || tamJogador[0].Y+tamJogador[0].Height>areaJogo.canvas.height ||tamJogador[0].Y<140){
		clearInterval(areaJogo.interval);
	}*/

	//Update a imagem.
	for(i = tamJogador.length-1 ; i>=0; i--){	
		tamJogador[i].update();
	}
	if(areaJogo.type==2) {
		for(i = tamJogador2.length-1 ; i>=0; i--){	
			tamJogador2[i].update();
			console.log(i);
		}
	}

	console.log(tamJogador2);


	//Fazer o background, e 140 pixeis para as tabelas em cima
	areaJogo.ctx.fillStyle= "#568929";
	areaJogo.ctx.fillRect(0, 0, cWidth,140);

	areaJogo.ctx.drawImage(scoreImg, areaJogo.canvas.width-300, 0);
	areaJogo.ctx.font= '52px arial';
	areaJogo.ctx.fontAlign="center";
	areaJogo.ctx.fillStyle="white";
	areaJogo.ctx.fillText(score, areaJogo.canvas.width-300+180, 140/2+19);
	
	myReq=window.requestAnimationFrame(updateArea);

	for(i=3; i<tamJogador.length; i++) {
		if(tamJogador[0].checkCollide(tamJogador[i])){
			cancelAnimationFrame(myReq);
		}
	}	

}
//Calculos matemeticos complicadíssimos para gerar a sorte um ponto a volta do jogador num range (so na largura) de 10 blocos da grelha.
//Uma nova maca e criada em cada 400 frames, defenidos no areaJogo.js, e devia de ser apagada apos 4 segundos mas nao esta a dar por alguma razao.
function spawn(type){
	var pY, pX;
	var right, left, down, up;
	var otherLeft, otherDown, otherUp, otherRight;
	var f=0;

	while(f==0){
		pY = Math.floor(Math.random()*Math.floor((areaJogo.canvas.height-140)/gridY));
		pX = Math.floor(Math.random()*(Math.floor(areaJogo.canvas.width/gridX)));
		right = pX*gridX+gridX; left = pX*gridX; down=pY*gridY+gridY + 140; up=pY*gridY + 140;

		f=1;
		for(var i=0; i<tamJogador.length; i++){
			otherRight = tamJogador[i].X+(tamJogador[i].Width);
			otherLeft = tamJogador[i].X;
			otherDown = tamJogador[i].Y+(tamJogador[i].Height);
			otherUp= tamJogador[i].Y;

			if(!(left>=otherRight || right<=otherLeft || up>=otherDown || down<=otherUp)) {
				f=0; 
				break;
			}
		}			
	}
	

	curEdibles[type] = new Edible((pX)*gridX, (pY)*gridY, type);
}
