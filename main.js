﻿var menu_1= new Image();
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
var caudasNasc= [0, 0];
var curEdibles = [];
var cntComida= [0, 0];
var origFrame = [];
var score=0;
var speedFlag= [0, 0];
var startedGame=0;
var loadedLvls = [];
var lvl; var win;
var p1SX, p1SY;
var p2SX, p2SY;

//Faz um "onkeydown" na pagina e devolve um "e" para a funcao que acontece apos de pressionar numa tecla.
function startup(type, l){	
	tamJogador = [];
	tamJogador2 = [];
	gridX=30;
	gridY=30;
	caudasNasc= [0, 0];
	curEdibles = [];
	cntComida= [0, 0];
	origFrame = [];
	score=0;
	speedFlag= [0, 0];
	loadedLvls = [];
	win = 0;

	areaJogo.beginGame(type);

	lvl=changeLvl(l);

	lvl.load(0, 0);
	lvl.resize();
	loadedLvls.push(lvl);

	startedGame=1;

	/*var pY = Math.floor(Math.random()*Math.floor((window.innerHeight-140)/gridY));
	var pX = Math.floor(Math.random()*Math.floor(window.innerWidth/gridX));*/

	tamJogador.push(new JogadorBloco(p1SX, p1SY, "blue", gridX/speedValX, 0));
	tamJogador.push(new JogadorCauda(p1SX-gridX,  p1SY, "black", tamJogador[0].SpeedX, tamJogador[0].SpeedY, tamJogador[0].OldRotate, tamJogador[0].speedMult));

	addEventListener("keydown", function(e) {
			var i;

			switch (e.keyCode) {
				case 87:
					if(tamJogador[0].SpeedY==0) {
						tamJogador[0].TurnV=-1; tamJogador[0].TurnH=0;
					}

					break;
				case 83:
					if(tamJogador[0].SpeedY==0) {
						tamJogador[0].TurnV=1; tamJogador[0].TurnH=0;
					}

					break;
				case 65:
					if(tamJogador[0].SpeedX==0) {
						tamJogador[0].TurnH=-1; tamJogador[0].TurnV=0;
					}

					break;
				case 68:
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
				case 38:
					if(tamJogador2[0].SpeedY==0) {
						tamJogador2[0].TurnV=-1; tamJogador2[0].TurnH=0;
					}

					break;
				case 40:
					if(tamJogador2[0].SpeedY==0) {
						tamJogador2[0].TurnV=1; tamJogador2[0].TurnH=0;
					}

					break;
				case 37:
					if(tamJogador2[0].SpeedX==0) {
						tamJogador2[0].TurnH=-1; tamJogador2[0].TurnV=0;
					}

					break;
				case 39:
					if(tamJogador2[0].SpeedX==0) {
						tamJogador2[0].TurnH=1; tamJogador2[0].TurnV=0;
					}

					break;
			}

		}, false);

		tamJogador2.push(new JogadorBloco(p2SX, p2SY, "blue", -gridX/speedValX, 0));
		tamJogador2.push(new JogadorCauda(p2SX+gridX,  p2SY, "black", tamJogador2[0].SpeedX, tamJogador2[0].SpeedY, tamJogador2[0].OldRotate, tamJogador2[0].speedMult));
	}


	spawn(0);
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
	if(origFrame[0]<speedValX/tamJogador[0].speedMult)origFrame[0]++;
	if(areaJogo.type==2 && origFrame[1]<speedValX/tamJogador2[0].speedMult) origFrame[1]++;

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
				eatFood(i, tamJogador, 0);
			}
			if(areaJogo.type==2 && curEdibles[i]!=null) {
				if(tamJogador2[0].checkCollide(curEdibles[i])){
					eatFood(i, tamJogador2, 1);
				}	
			}
		}
	}

	if(speedFlag[0]==1 && tamJogador[0].X%(gridX)==0 && (tamJogador[0].Y-140)%(gridY)==0 && caudasNasc[0]==0) {
		applySpeed(tamJogador, 1.6);
	} else if(speedFlag[0]==0 && caudasNasc[0]==0 && tamJogador[0].X%(gridX)==0 && (tamJogador[0].Y-140)%(gridY)==0) applySpeed(tamJogador, 1);

	if(areaJogo.type==2) {
		if(speedFlag[1]==1 && tamJogador2[0].X%(gridX)==0 && (tamJogador2[0].Y-140)%(gridY)==0 && caudasNasc[1]==0) {
			applySpeed(tamJogador2, 1.6);
		} else if(speedFlag[1]==0 && caudasNasc[1]==0 && tamJogador2[0].X%(gridX)==0 && (tamJogador2[0].Y-140)%(gridY)==0) applySpeed(tamJogador2, 1);
	}


	//Faz a cauda crescer, depois espera oito frames para fazer crescer outra.
	if(caudasNasc[0]>0){
		growTail(tamJogador, 0);
	}
	if(areaJogo.type==2 && caudasNasc[1]>0) {
		growTail(tamJogador2, 1);
	}

	//Update da posicao da cabeça, aplica as velocidades
	tamJogador[0].turn();
	tamJogador[0].newPos();

	if(areaJogo.type==2) {
		tamJogador2[0].turn();
		tamJogador2[0].newPos();
	}

		
	//Para a cauda seguir o jogador.
	for(i = 1; i<tamJogador.length; i++) {
		if(tamJogador[i].X%(gridX)==0 && (tamJogador[i].Y-140)%(gridY)==0 && !(i==tamJogador.length-1 && tamJogador[tamJogador.length-1].SpeedX==0 && tamJogador[tamJogador.length-1].SpeedY==0) ){
			tamJogador[i].followLast(tamJogador, i);
		}
		
		//Update a posicao.
		tamJogador[i].newPos();
	}
	if(areaJogo.type==2) {
		for(i = 1; i<tamJogador2.length; i++) {
			if(tamJogador2[i].X%(gridX)==0 && (tamJogador2[i].Y-140)%(gridY)==0 && !(i==tamJogador2.length-1 && tamJogador2[tamJogador2.length-1].SpeedX==0 && tamJogador2[tamJogador2.length-1].SpeedY==0) ){
				tamJogador2[i].followLast(tamJogador2, i);
			}
		
			//Update a posicao.
			tamJogador2[i].newPos();
		}
	}

	//Update a imagem.
	for(i = tamJogador.length-1 ; i>=0; i--){	
		tamJogador[i].update();
	}
	if(areaJogo.type==2) {
		for(i = tamJogador2.length-1 ; i>=0; i--){	
			tamJogador2[i].update();
		}
	}

	for(i=0; i<loadedLvls.length; i++) {
		if(loadedLvls[i].loaded) {
			loadedLvls[i].resize();
			loadedLvls[i].update();
		}
	}

	//Fazer o background, e 140 pixeis para as tabelas em cima
	areaJogo.ctx.fillStyle= "#568929";
	areaJogo.ctx.fillRect(0, 0, cWidth,140);

	areaJogo.ctx.drawImage(scoreImg, areaJogo.canvas.width-300, 0);
	areaJogo.ctx.font= '52px arial';
	//areaJogo.ctx.fontAlign="center";
	areaJogo.ctx.fillStyle="white";
	areaJogo.ctx.fillText(score, areaJogo.canvas.width-300+180, 140/2+19);

	areaJogo.myReq=requestAnimationFrame(updateArea);

	if(arrCollision(tamJogador[0], tamJogador, 3)){
		stop();

		if(areaJogo.type==2) win=2; 
		else win=-1;
	}

	if(arrCollision(tamJogador[0], loadedLvls[0].obstacles, 0)){
		stop();

		if(areaJogo.type==2) win=2; 
		else win=-1;
	}

	if(loadedLvls[0].borderRight!=false && tamJogador[0].checkCollide(loadedLvls[0].borderRight)) {stop(); win=2;}
	if(loadedLvls[0].borderLeft!=false && tamJogador[0].checkCollide(loadedLvls[0].borderLeft)) {stop(); win=2;}
	if(loadedLvls[0].borderTop!=false && tamJogador[0].checkCollide(loadedLvls[0].borderTop)) {stop(); win=2;}
	if(loadedLvls[0].borderBot!=false && tamJogador[0].checkCollide(loadedLvls[0].borderBot)) {stop(); win=2;}

	if(areaJogo.type==2) {
		if(arrCollision(tamJogador2[0], tamJogador2, 3)){
			stop(); win=1;
		}

		if(arrCollision(tamJogador2[0], tamJogador, 1)) {
			stop(); win=1;
		}

		if(arrCollision(tamJogador[0], tamJogador2, 1)) {
			stop(); win=2;
		}

		if(arrCollision(tamJogador2[0], loadedLvls[0].obstacles, 0)){
			stop(); win=1;
		}

		if(loadedLvls[0].borderRight!=false && tamJogador2[0].checkCollide(loadedLvls[0].borderRight)) {stop(); win=1;}
		if(loadedLvls[0].borderLeft!=false && tamJogador2[0].checkCollide(loadedLvls[0].borderLeft)) {stop(); win=1;}
		if(loadedLvls[0].borderTop!=false && tamJogador2[0].checkCollide(loadedLvls[0].borderTop)) {stop(); win=1;}
		if(loadedLvls[0].borderBot!=false && tamJogador2[0].checkCollide(loadedLvls[0].borderBot)) {stop(); win=1;}
	}

	if(startedGame==0) {
		var d = document.createElement("div");
		d.id='deathOverlay';
		d.style.width=areaJogo.canvas.width + "px";
		d.style.height=areaJogo.canvas.height + "px";d.style.display = 'block';

		document.getElementById('container').insertBefore(d, document.getElementById('container').childNodes[0]);

		if(win==-1) document.getElementById("deathOverlay").innerHTML="<h1 id='lvlShow'>Perdeste!</h1>"
		else document.getElementById("deathOverlay").innerHTML="<h1 id='lvlShow'>Ganhou o Jogador "+ win+ "!</h1>";
		

		document.getElementById("deathOverlay").innerHTML+="<span id='exit' onclick='openMenu();'></span>";
		document.getElementById("exit").style.left = areaJogo.canvas.width/2-200 + "px"; document.getElementById("exit").style.bottom = '10px'
	}
}
//Calculos matemeticos complicadíssimos para gerar a sorte um ponto a volta do jogador num range (so na largura) de 10 blocos da grelha.
//Uma nova maca e criada em cada 400 frames, defenidos no areaJogo.js, e devia de ser apagada apos 4 segundos mas nao esta a dar por alguma razao.
function spawn(type){
	var pY, pX;
	var right, left, down, up;
	var f=0; var i;

	while(f<=0){
		pY = Math.floor(Math.random()*Math.floor((areaJogo.canvas.height-140)/gridY));
		pX = Math.floor(Math.random()*(Math.floor(areaJogo.canvas.width/gridX)));
		right = pX*gridX+gridX; left = pX*gridX; down=pY*gridY+gridY + 140; up=pY*gridY + 140;

		f=1;

		for(i=0; i<tamJogador.length; i++) {
			f-=spawnCheck(right, left, down, up, tamJogador[i]);
		}
		
		for(i=0; i<tamJogador2.length; i++) {
			f-=spawnCheck(right, left, down, up, tamJogador2[i]);
		}

		for(i=0; i<loadedLvls[0].obstacles.length; i++) {
			f-=spawnCheck(right, left, down, up, loadedLvls[0].obstacles[i]);
		}


		if(loadedLvls[0].borderRight!=false) f-=spawnCheck(right, left, down, up, loadedLvls[0].borderRight);
		if(loadedLvls[0].borderLeft!=false) f-=spawnCheck(right, left, down, up, loadedLvls[0].borderLeft);
		if(loadedLvls[0].borderTop!=false) f-=spawnCheck(right, left, down, up, loadedLvls[0].borderTop);
		if(loadedLvls[0].borderBot!=false) f-=spawnCheck(right, left, down, up, loadedLvls[0].borderBot);
				
	}
	curEdibles[type] = new Edible((pX)*gridX, (pY)*gridY, type);
}

function eatFood(pos, player, num) {
	score+=curEdibles[pos].Value;

	if(curEdibles[pos].Type==0) {
		//Verifica se o jogador ganhou.
		if(player.length+2>=Math.floor(areaJogo.canvas.width/gridX)*Math.floor((areaJogo.canvas.height-140)/gridY)) {
			//MUDAR ISTO!!!!!!
		}

		cntComida[num]++;
		if(cntComida[num]%4==0) {
			if(!curEdibles[1]) spawn(1);
			setTimeout(function() {curEdibles.splice(1, 1)}, 5000);
		}


		if(caudasNasc[num]==0){
			origFrame[num]=0;

			player[player.length-1].stop();
		}

		caudasNasc[num]+=2;

		spawn(0);
	} else if(curEdibles[pos].Type==1) {
		//tamJogador.splice(-1, 3);

		speedFlag[num]=1;
		setTimeout(function() {speedFlag[num]=0}, 4000)
		curEdibles.splice(1, 1);
	}
}

function growTail(player, num) {
	if(origFrame[num]>=speedValX/player[0].speedMult){
		caudasNasc[num]--; origFrame[num]=0;
			
		if(caudasNasc[num]==0){
			player[player.length-1].resume();
		}
	}

	if(origFrame[num]==0 && caudasNasc[num]!=0){
		sX=player[player.length-1].StopSpeedX;
		sY=player[player.length-1].StopSpeedY;

		player.splice(player.length-1, 0, new JogadorCauda(player[player.length-1].X, player[player.length-1].Y-140, "black", sX, sY, player[player.length-1].OldRotate, player[player.length-1].speedMult));
	}
}

function applySpeed(player, speed) {
	var i;

	for(i=0; i<player.length; i++) {
		player[i].speedMult=speed;
	}
}

function stop() {
	cancelAnimationFrame(areaJogo.myReq);
	startedGame=0;
}

function arrCollision(obj, arr, startPos) {
	for(i=startPos; i<arr.length; i++) {
		if(obj.checkCollide(arr[i])) return true;
	}

	return false;
}

function spawnCheck(right, left, down, up, obj) {
	var otherRight = obj.X+(obj.Width);
	var otherLeft = obj.X;
	var otherDown = obj.Y+(obj.Height);
	var otherUp= obj.Y;

	if(!(left>=otherRight || right<=otherLeft || up>=otherDown || down<=otherUp)) {
		return 1;
	}

	return 0;		
}