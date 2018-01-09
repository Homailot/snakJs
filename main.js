/*var ctx=document.getElementById('canvas').getContext("2d");
var img= new Image();
img.onload = function() {
	ctx.drawImage(img, 0 ,0, 30, 30);
}
img.src="6da17dc320f06b1a191f6d3270ba8a4b--oreos-online-games.jpg";*/
var tamJogador = [];
var gridX=30;
var gridY=30;
var c;

function startup(){
	areaJogo.start();
}

//Faz um "onkeydown" na pagina e devolve um "e" para a funcao que acontece apos de pressionar numa tecla.
addEventListener("keydown", function(e) {
	var i;

	if(e.keyCode==38) {
		if(tamJogador[0].moveV==false) tamJogador[0].SpeedY=-(gridY/8);
	}
	else if(e.keyCode==40){
		if(tamJogador[0].moveV==false) tamJogador[0].SpeedY=gridY/8;
	}
	else if(e.keyCode==37) {
		if(tamJogador[0].moveH==false) tamJogador[0].SpeedX=-(gridX/8);
	}
	else if(e.keyCode==39) {
		if(tamJogador[0].moveH==false) tamJogador[0].SpeedX=gridX/8;	
	}
}, false) e

		
function updateArea(){
	var py, px;

	areaJogo.canvas.width=Math.floor(window.innerWidth/gridX)*gridX;
	areaJogo.canvas.height=140+Math.floor((window.innerHeight-140)/gridY)*gridY;
	var cWidth=areaJogo.canvas.width;
	var cHeight=areaJogo.canvas.height;

	//Apaga o frame anterior
	areaJogo.clear();
	areaJogo.cntFrame++;

	//Fazer o background, deixando 85% (altura) do ecra livre para a cena de jogo, e 20 espacos para o jogador mover(4.25% de altura cada espaço).
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

	//Cria a cabeça da cobra.
	if(areaJogo.cntFrame==1) {
		pY = Math.floor(Math.random()*Math.floor((window.innerHeight-140)/gridY));
		pX = Math.floor(Math.random()*Math.floor(window.innerWidth/gridX));

		tamJogador.push(new JogadorBloco((pX)*gridX, (pY)*gridY, "black"));
	}

	//Calculos matemeticos complicadíssimos para gerar a sorte um ponto a volta do jogador num range (so na largura) de 10 blocos da grelha.
	//Uma nova maca e criada em cada 400 frames, defenidos no areaJogo.js, e devia de ser apagada apos 4 segundos mas nao esta a dar por alguma razao.
	if(checkTime(400) || areaJogo.cntFrame==1){
		var rangeX = tamJogador[0].X-gridX*10;
		var rangeXMax= (tamJogador[0].X+gridX*10)-rangeX;

		rangeX=rangeX<0?0:rangeX;
		rangeXMax=rangeXMax>areaJogo.canvas.width-gridX?areaJogo.canvas.width-gridX:rangeXMax;

		pY = Math.floor(Math.random()*Math.floor((window.innerHeight-140)/gridY));
		pX = Math.floor(Math.random()*Math.floor(rangeXMax/gridX)+rangeX/gridX);

		c = new Comestivel((pX)*gridX, (pY)*gridY, "Ponto");
		setTimeout(function(){c=undefined}, 4000);
		
		tamJogador.push(new JogadorBloco(tamJogador[tamJogador.length-1].X-tamJogador[tamJogador.length-1].Width, (tamJogador[tamJogador.length-1].Y)-140, "black"));

		console.log("Heya");
	}

	if(c!=undefined) c.update();
	
	for(var i = tamJogador.length-1; i>0; i--) {
		tamJogador[i].X=tamJogador[i-1].X;
		tamJogador[i].Y=tamJogador[i-1].Y;	
	}

	tamJogador[0].novaPos();
	

	for(var i = 0 ; i<tamJogador.length; i++){
		tamJogador[i].update();
	}
	
}

function checkTime(frameInt) {
	if(areaJogo.cntFrame%frameInt==0) return true;

	return false;
}
