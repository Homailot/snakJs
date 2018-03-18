var RotatingEnum = {RIGHTBOTTOM: 1, LEFTBOTTOM:2, RIGHTTOP:3, LEFTTOP:4, NOT:5};

var speedValX=8;
var speedValY=8;

//Construtor Mãe, Um construtor cria objetos, objetos são basicamentes variáveis com muitas variaveis dentro algumas das quais podem ser funcoes.
function Entity(x, y){
	this.X = x;
	this.Y = y+(140);
	this.Width = gridX;
	this.Height = gridY;
	this.Color;
}

//A razao pela qual eu meto as funcoes nos prototypes dos construtores e nao nos construtores em si (posso te explicar dps mais tarde se quiseres) e pk
//se metesse no construtor ele estaria sempre a criar funcoes novas enquanto se meter no prototype (como o prototype de um construtor e "pai" dele (engloba-o))
//cria uma vez e nunca mais cria.
Entity.prototype.update = function(){
	if(this.X+this.Width>areaJogo.canvas.width) areaJogo.ctx.drawImage(this.Img, -1, this.Y-1, (this.X+this.Width)-areaJogo.canvas.width+1, this.Height+1);
	else if(this.X<0) areaJogo.ctx.drawImage(this.Img, areaJogo.canvas.width+this.X-1, this.Y-1, this.Width, this.Height+1);
	else if(this.Y+this.Height>areaJogo.canvas.height) areaJogo.ctx.drawImage(this.Img, this.X-1, 139, this.Width+1, this.Y+this.Height-areaJogo.canvas.height+1);
	else if(this.Y<140) areaJogo.ctx.drawImage(this.Img, this.X-1, areaJogo.canvas.height+(this.Y-140)-1, this.Width+1, this.Height+1);
	
	areaJogo.ctx.drawImage(this.Img, this.X-1, this.Y-1, this.Width+1, this.Height+1);
};


function JogadorBloco(x, y, img, speedX, speedY, type){
	//Vai buscar o x, o y e o width do Entity, com o x, y defenidos NESTE CONSTRUTOR como PARAMETROS do construtor acima, para ele nos devolver as variaveis X, Y Width e Height
	Entity.call(this, x, y);

	this.OldSpeedX=speedX;
	this.speedMult=1;
	this.OldSpeedY=speedY;
	this.SpeedX=speedX;
	this.SpeedY=speedY;
	//this.Color = color;
	this.Img=img;
	this.BImg=img;
	this.TurnH = 0;
	this.TurnV = 0;
	this.Angle = 0;
	this.OldAngleMult;
	this.OldRotate = RotatingEnum.NOT;
	this.Type=type;
}
//Basicamente, o prototype(onde estão gravadas as funcoes e isso)do jogador bloco, sao feitas iguais aquelas do entity
JogadorBloco.prototype= Object.create(Entity.prototype);

//Faz com que o construtor usado quando fazemos new JogadorBloco(bla bla), use ESTE construtor e NAO o do ENTITY; (ou seja tem o color que nao existe no entity)
JogadorBloco.prototype.constructor=JogadorBloco;

JogadorBloco.prototype.turn = function(){
	if((this.Y-140)%(gridY)==0 && this.X%(gridX)==0){
		this.OldRotate = RotatingEnum.NOT;
		this.OldSpeedY = this.SpeedY; this.OldSpeedX=this.SpeedX;
		console.log("x:"+this.OldSpeedX); console.log("y:"+this.OldSpeedY);

		/*if((this.TurnH>0 && this.OldSpeedY>0) || (this.TurnV>0 && this.OldSpeedX>0)){
			this.OldRotate = RotatingEnum.RIGHTBOTTOM;
		} else if((this.TurnH>0 && this.OldSpeedY<0) || (this.TurnV<0 && this.OldSpeedX>0)) {
			this.OldRotate = RotatingEnum.RIGHTTOP;
		} else if((this.TurnH<0 && this.OldSpeedY>0) || (this.TurnV>0 && this.OldSpeedX<0)) {
			this.OldRotate= RotatingEnum.LEFTBOTTOM;
		} else if((this.TurnH<0 && this.OldSpeedY<0) || (this.TurnV<0 && this.OldSpeedX<0)) {
			this.OldRotate = RotatingEnum.LEFTTOP;
		}*/

		if(this.TurnH!=0){
			this.SpeedX=gridX*this.TurnH/speedValX; this.SpeedY=0;

			if(this.TurnH>0 && (this.OldSpeedX!=0 || this.OldSpeedY!=0)) {
				if(this.Type==1) this.Img=snake.cabecaR;
				else if(this.Type==2) this.Img=snake.cabecaR2;
				this.BImg=0;

				if(this.OldSpeedY>0){
					this.OldRotate = RotatingEnum.RIGHTBOTTOM; //Negativo
					this.Angle-=90;
					this.OldAngleMult=-1;
				} 
				else {
					this.OldRotate = RotatingEnum.RIGHTTOP; //Positivo
					this.OldAngleMult=1; this.Angle+=90;
				}	
			}
			
			else{
				if(this.Type==1) this.Img=snake.cabecaL;
				else if(this.Type==2) this.Img=snake.cabecaL2;
				this.BImg=1;

				if(this.OldSpeedY>0) {
					this.OldRotate= RotatingEnum.LEFTBOTTOM; //Positivo
					this.OldAngleMult=1;
				}
				else {
					this.OldRotate = RotatingEnum.LEFTTOP; //Negativo
					this.OldAngleMult=-1;
				}
			} 
			this.TurnH=0;
		}
		else if(this.TurnV!=0){
			this.SpeedY=gridY/speedValY*this.TurnV; this.SpeedX=0;

			if(this.TurnV>0&& (this.OldSpeedX!=0 || this.OldSpeedY!=0)) {
				if(this.Type==1) this.Img=snake.cabecaD;
				else if(this.Type==2) this.Img=snake.cabecaD2;
				this.BImg=2;

				if(this.OldSpeedX>0) {
					this.OldRotate= RotatingEnum.RIGHTBOTTOM; // Positivo
					this.OldAngleMult=1;
				}
				else {
					this.OldRotate = RotatingEnum.LEFTBOTTOM; //Negativo
					this.OldAngleMult=-1;
				} 
			}
			else {
				if(this.Type==1) this.Img=snake.cabecaU;
				else if(this.Type==2) this.Img=snake.cabecaU2;
				this.BImg=3;
			
				if(this.OldSpeedX>0) {
					this.OldRotate= RotatingEnum.RIGHTTOP; //Negativo
					this.OldAngleMult=-1;
				}
				else {
					this.OldRotate= RotatingEnum.LEFTTOP; //Positivo
					this.OldAngleMult=1;
				}
			}
			this.TurnV=0;
		}

		if(this.OldSpeedX==0 && this.OldSpeedY==0){
			this.OldSpeedX=this.SpeedX; this.OldSpeedY=this.SpeedY;
		}
	}
};

//Adiciona ao prototype do JogadorBloco a func novaPos, isto temos que meter DEPOIS do "JogadorBloco.prototype= Object.create(Entity.prototype);" porque se não
//ele faz overwrite das funcs todas!!
JogadorBloco.prototype.newPos = function(){
	this.X+=this.SpeedX*this.speedMult; this.Y+=this.SpeedY*this.speedMult;

	if(this.X<=0-gridX) this.X=areaJogo.canvas.width-gridX;
	else if(this.X>=areaJogo.canvas.width) this.X=0;
	else if(this.Y<=140-gridY) this.Y=areaJogo.canvas.height-gridY;
	else if(this.Y>=areaJogo.canvas.height) this.Y=140;
};

JogadorBloco.prototype.checkCollide = function(objeto){
	if(this.X>=objeto.X+objeto.Width || this.X+this.Width<=objeto.X || this.Y>=objeto.Y+objeto.Height || this.Y+this.Height<=objeto.Y) return false;
	else if(this.X+this.Width>areaJogo.canvas.width && this.X+this.Width-areaJogo.canvas.width<=objeto.X) return false;
	else if(this.X<0 && this.X+areaJogo.canvas.width>= objeto.X+objeto.Width) return false;
	else if(this.Y+this.Height>areaJogo.canvas.height && this.Y+this.Height-areaJogo.canvas.height+140<=objeto.Y) return false;
	else if(this.Y<140 && this.Y+areaJogo.canvas.height+140>= objeto.Y+objeto.Height) return false;
	return true;
};


function JogadorCauda(x, y,img, speedX, speedY, type, rotation, speedMult ){
	JogadorBloco.call(this, x, y, img, speedX, speedY, type);
	this.Img=img;
	this.StopSpeedX=0;
	this.StopSpeedY=0;
	this.speedMult=speedMult;
	this.OldY=this.Y;
	this.OldX=this.X;
	this.RotationOffsetX, this.RotationOffsetY;
	this.RotationCenterX, this.RotationCenterY;
	this.StopRotate;
	this.isRotating=rotation;
	this.AngleMult;
	this.Angle=0;

}

JogadorCauda.prototype= Object.create(JogadorBloco.prototype);
JogadorCauda.prototype.constructor = JogadorCauda;

JogadorCauda.prototype.stop = function(){
	this.StopSpeedX=this.SpeedX; this.StopSpeedY=this.SpeedY;
	this.StopRotate=this.isRotating;
	this.SpeedX=0; this.SpeedY=0;
	this.isRotating=RotatingEnum.NOT;
};

JogadorCauda.prototype.resume = function(){
	this.SpeedX=this.StopSpeedX; this.SpeedY=this.StopSpeedY;	
	this.isRotating=this.StopRotate;
};

JogadorCauda.prototype.newPos = function(){
	this.X+=this.SpeedX*this.speedMult; this.Y+=this.SpeedY*this.speedMult;

	if(this.X<=0-gridX) this.X=areaJogo.canvas.width-gridX;
	else if(this.X>=areaJogo.canvas.width) this.X=0;
	else if(this.Y<=140-gridY) this.Y=areaJogo.canvas.height-gridY;
	else if(this.Y>=areaJogo.canvas.height) this.Y=140;

	if(this.isRotating!=RotatingEnum.NOT){
		this.Angle+=(90/speedValX)*this.AngleMult*this.speedMult;

		if(this.isRotating==RotatingEnum.RIGHTBOTTOM){
			this.RotationCenterX=this.OldX+this.Width; this.RotationCenterY=this.OldY+this.Height;
			this.RotationOffsetX=this.Width; this.RotationOffsetY=this.Height;
		} else if(this.isRotating==RotatingEnum.RIGHTTOP){
			this.RotationCenterX=this.OldX+this.Width; this.RotationCenterY=this.OldY;
			this.RotationOffsetX=this.Width; this.RotationOffsetY=0;
		} else if(this.isRotating==RotatingEnum.LEFTBOTTOM){
			this.RotationCenterX=this.OldX; this.RotationCenterY=this.OldY+this.Height;
			this.RotationOffsetX=0; this.RotationOffsetY=this.Height;
		} else if(this.isRotating==RotatingEnum.LEFTTOP){
			this.RotationCenterX=this.OldX; this.RotationCenterY=this.OldY;
			this.RotationOffsetX=0; this.RotationOffsetY=0;
		}
	}else{
		this.RotationCenterX=this.X+this.Width/2; this.RotationCenterY=this.Y+this.Height/2;
		this.RotationOffsetX=this.Width/2; this.RotationOffsetY=this.Height/2;
	}
	
};

JogadorCauda.prototype.followLast = function(arr, pos){
	this.OldSpeedX=this.SpeedX; this.OldSpeedY=this.SpeedY;
	this.OldAngleMult=this.AngleMult;
	this.OldX=this.X; this.OldY = this.Y;
	this.Angle=0;
	this.OldRotate=this.isRotating;

	this.SpeedX=arr[pos-1].OldSpeedX; 
	this.SpeedY=arr[pos-1].OldSpeedY;
	this.AngleMult=arr[pos-1].OldAngleMult;
	this.isRotating=arr[pos-1].OldRotate;
	if(this.isRotating==RotatingEnum.NOT || this.OldRotate!=RotatingEnum.NOT) {
		//console.log(arr[pos-1].OldSpeedX);
		if(pos==arr.length-1){
			if(arr[pos-1].OldSpeedX>0) {
				if(this.Type==1) this.Img=snake.caudaR;
				else if(this.Type==2) this.Img=snake.caudaR2;
			}
			else if(arr[pos-1].OldSpeedX<0) {
				if(this.Type==1) this.Img=snake.caudaL;
				else if(this.Type==2) this.Img=snake.caudaL2;
			} 
			else if(arr[pos-1].OldSpeedY>0) {
				if(this.Type==1) this.Img=snake.caudaD;
				else if(this.Type==2) this.Img=snake.caudaD2;
			}
			else if(arr[pos-1].OldSpeedY<0) {
				if(this.Type==1) this.Img=snake.caudaU;
				else if(this.Type==2) this.Img=snake.caudaU2;
			}
		} else {
			if(arr[pos-1].OldSpeedX>0) {
				if(this.Type==1) this.Img=snake.corpoR;
				else if(this.Type==2) this.Img=snake.corpoR2;
			} 
			else if(arr[pos-1].OldSpeedX<0) {
				if(this.Type==1) this.Img=snake.corpoL;
				else if(this.Type==2) this.Img=snake.corpoL2;
			}
			else if(arr[pos-1].OldSpeedY>0) {
				if(this.Type==1) this.Img=snake.corpoD;
				else if(this.Type==2) this.Img=snake.corpoD2;
			}
			else if(arr[pos-1].OldSpeedY<0) {
				if(this.Type==1) this.Img=snake.corpoU;
				else if(this.Type==2) this.Img=snake.corpoU2;
			}; 
		}
		
	} 
};

JogadorCauda.prototype.update = function(){
	//if(this.isRotating!=RotatingEnum.NOT) {
	areaJogo.ctx.fillStyle=this.Color;
	if(this.OldX+this.Width>=areaJogo.canvas.width) {
		//areaJogo.ctx.fillRect(-1, this.Y-1, (this.X+this.Width)-areaJogo.canvas.width+1, this.Height+1);

		areaJogo.ctx.save();
		areaJogo.ctx.fillStyle=this.Color;
		areaJogo.ctx.translate(this.RotationCenterX-areaJogo.canvas.width, this.RotationCenterY);
		areaJogo.ctx.rotate(this.Angle * Math.PI / 180);
		areaJogo.ctx.translate(-this.RotationOffsetX, -this.RotationOffsetY);
		areaJogo.ctx.drawImage(this.Img, -1, -1, this.Width+1, this.Height+1);
		areaJogo.ctx.restore();
	} 
	else if(this.OldX<=0) {

		areaJogo.ctx.save();
		areaJogo.ctx.fillStyle=this.Color;
		areaJogo.ctx.translate(this.RotationCenterX+areaJogo.canvas.width, this.RotationCenterY);
		areaJogo.ctx.rotate(this.Angle * Math.PI / 180);
		areaJogo.ctx.translate(-this.RotationOffsetX, -this.RotationOffsetY);
		areaJogo.ctx.drawImage(this.Img, -1, -1, this.Width+1, this.Height+1);
		areaJogo.ctx.restore();
	}
	if(this.OldY+this.Height>=areaJogo.canvas.height) {
		//areaJogo.ctx.fillRect(this.X-1, 139, this.Width+1, this.Y+this.Height-areaJogo.canvas.height+1);

		areaJogo.ctx.save();
		areaJogo.ctx.fillStyle=this.Color;
		areaJogo.ctx.translate(this.RotationCenterX, this.RotationCenterY-areaJogo.canvas.height+140);
		areaJogo.ctx.rotate(this.Angle * Math.PI / 180);
		areaJogo.ctx.translate(-this.RotationOffsetX, -this.RotationOffsetY);
		areaJogo.ctx.drawImage(this.Img, -1, -1, this.Width+1, this.Height+1);
		areaJogo.ctx.restore();
	}
	else if(this.OldY<=140) {
		//areaJogo.ctx.fillRect(this.X-1, areaJogo.canvas.height+(this.Y-140)-1, this.Width+1, this.Height+1);

		areaJogo.ctx.save();
		areaJogo.ctx.fillStyle=this.Color;
		areaJogo.ctx.translate(this.RotationCenterX, this.RotationCenterY+areaJogo.canvas.height-140);
		areaJogo.ctx.rotate(this.Angle * Math.PI / 180);
		areaJogo.ctx.translate(-this.RotationOffsetX, -this.RotationOffsetY);
		areaJogo.ctx.drawImage(this.Img, -1, -1, this.Width+1, this.Height+1);
		areaJogo.ctx.restore();
	}

	areaJogo.ctx.save();
	areaJogo.ctx.fillStyle=this.Color;
	areaJogo.ctx.translate(this.RotationCenterX, this.RotationCenterY);
	areaJogo.ctx.rotate(this.Angle * Math.PI / 180);
	areaJogo.ctx.translate(-this.RotationOffsetX, -this.RotationOffsetY);
	areaJogo.ctx.drawImage(this.Img, -1, -1, this.Width+1, this.Height+1);
	areaJogo.ctx.restore();

	/*} else {
		this.OldX=this.X; this.OldY=this.Y;
		this.Angle=0;
		areaJogo.ctx.fillStyle=this.Color;
		areaJogo.ctx.fillRect(this.X-1, this.Y-1, this.Width+1, this.Height+1);
	}*/
};


function Edible(x, y, type){
	Entity.call(this, x, y);

	this.Type=type;
	if(this.Type==0) {
		this.Value=10;
		this.Img=snake.corpoR;
	} else if(this.Type==1){
		this.Img=snake.corpoL;
		this.Value=30;
	} else if(this.Type==2) {
		this.Color="#03E1DE";
		this.Value=30;
	}
}

Edible.prototype= Object.create(Entity.prototype);
Edible.prototype.constructor=Edible;

Edible.prototype.delete = function(){
	this.Type=null;
};

function Obstacle(x, y, width, height){
	Entity.call(this, x, y);

	this.Width=width;
	this.Height=height;
	this.SpeedX=0;
	this.Color="#0E4402";
	this.SpeedY=0;
}

Obstacle.prototype= Object.create(Entity.prototype);
Obstacle.prototype.constructor=Obstacle;

Obstacle.prototype.newPos = function(){
	this.X+=this.SpeedX; this.Y+=this.SpeedY;
};