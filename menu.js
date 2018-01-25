var menu_1= new Image();
menu_1.src="menu_1.fw.png";
var selected;

function menu() {
	areaJogo.canvas.width=window.innerWidth;
	areaJogo.canvas.height=window.innerHeight;
	var cWidth=areaJogo.canvas.width;
	var cHeight=areaJogo.canvas.height;

	areaJogo.ctx.fillStyle="#042306";
	areaJogo.ctx.fillRect(0, 0, cWidth, cHeight);

	/*areaJogo.ctx.font= '52px arial';
	areaJogo.ctx.fontAlign="center";
	areaJogo.ctx.fillStyle="white";
	areaJogo.ctx.fillText("1 JOGADOR", cWidth/2, cHeight/2);*/
	areaJogo.ctx.drawImage(menu_1, (cWidth/2)-150, cHeight/2-50);
}