var auxOb;
var auxBordL, auxBordR, auxBordB, auxBordT;


function Level(obstacles, borderTop, borderRight, borderBot, borderLeft, p1SX, p1SY, p2SX, p2SY) {
	this.obstacles=obstacles;

	if(borderTop) this.borderTop = new Obstacle(0, 0, 0, 30);
	else this.borderTop=false;

	if(borderRight) this.borderRight = new Obstacle(0, 0, 30, 0);
	else this.borderRight=false;

	if(borderBot) this.borderBot = new Obstacle(0, 0, 0, 30);
	else this.borderBot=false;

	if(borderLeft) this.borderLeft = new Obstacle(0, 0, 30, 0);
	else this.borderLeft=false;

	this.p1SX
	this.loaded=false;
}

Level.prototype.load = function(offsetX, offsetY){
	var i;

	if(this.obstacles!=false) {
		for(i=0; i<this.obstacles.length; i++) {
			this.obstacles[i].X-=offsetX;
			this.obstacles[i].Y-=offsetY;
		}
	}

	this.loaded=true;
	
};

Level.prototype.update = function(){
	var i;

	if(this.obstacles!=false) {
		for(i=0; i<this.obstacles.length; i++) {
			this.obstacles[i].update();
		}
	}
	
	if(this.borderTop!=false) this.borderTop.update();
	if(this.borderRight!=false) this.borderRight.update();
	if(this.borderBot!=false) this.borderBot.update();
	if(this.borderLeft!=false) this.borderLeft.update();
};

Level.prototype.resize = function(){
	if(this.borderTop!=false) {
		this.borderTop.Width=areaJogo.canvas.width;
		this.borderTop.Height=gridY;
	}
	if(this.borderBot!=false) {
		this.borderBot.Width=areaJogo.canvas.width;
		this.borderBot.Y=areaJogo.canvas.height-gridY;
	}
	if(this.borderLeft!=false) this.borderLeft.Height=areaJogo.canvas.height;
	
	if(this.borderRight!=false) {
		this.borderRight.Height=areaJogo.canvas.height;
		this.borderRight.Width = gridX;
		this.borderRight.X=areaJogo.canvas.width-gridX;
	}
};

function changeLvl(lvl) {
	switch (lvl){
		case 0:
			auxOb=false;
			auxBordT=false; auxBordR=false; auxBordB=false; auxBordL=false;
			p1SX=2*gridX; p1SY=Math.floor(Math.floor((areaJogo.canvas.height-140)/gridY)/2)*gridY
			p2SX=areaJogo.canvas.width-(2*gridX); p2SY=p1SY;
			return new Level(auxOb, auxBordT, auxBordR, auxBordB, auxBordL);
		case 1:
			auxOb=false;
			auxBordT=true; auxBordR=true; auxBordB=true; auxBordL=true;
			p1SX=3*gridX; p1SY=Math.floor(Math.floor((areaJogo.canvas.height-140)/gridY)/2)*gridY
			p2SX=areaJogo.canvas.width-(3*gridX); p2SY=p1SY;
			return new Level(auxOb, auxBordT, auxBordR, auxBordB, auxBordL);
		case 2:
			auxOb = []; auxOb.push(new Obstacle(Math.floor(Math.floor((areaJogo.canvas.width)/gridX)/2)*gridX, 0, gridX, areaJogo.canvas.height));
			auxBordT=true; auxBordR=false; auxBordB=true; auxBordL=false;
			p1SX=3*gridX; p1SY=Math.floor(Math.floor((areaJogo.canvas.height-140)/gridY)/2)*gridY
			p2SX=areaJogo.canvas.width-(3*gridX); p2SY=p1SY;
			return new Level(auxOb, auxBordT, auxBordR, auxBordB, auxBordL);
		case 3:
			auxOb= []; auxOb.push(new Obstacle(Math.floor(Math.floor((areaJogo.canvas.width)/gridX)/2)*gridX, 0, gridX, areaJogo.canvas.height));
			auxOb.push(new Obstacle(0, Math.floor(Math.floor((areaJogo.canvas.height-140)/gridY)/2)*gridY, areaJogo.canvas.width, gridY));
			auxBordT=false; auxBordR=false; auxBordB=false; auxBordL=false;
			p1SX=3*gridX; p1SY= ((areaJogo.canvas.height-140) - (2*gridY));
			console.log(p1SY)
			p2SX=areaJogo.canvas.width-(3*gridX); p2SY=0+2*gridX;
			return new Level(auxOb, auxBordT, auxBordR, auxBordB, auxBordL);
	}
}