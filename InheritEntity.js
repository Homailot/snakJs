//Construtor Mãe, Um construtor cria objetos, objetos são basicamentes variáveis com muitas variaveis dentro algumas das quais podem ser funcoes.
function Entity(x, y){
	this.X = x;
	this.Y = y+(140);
	this.Width = gridX;
	this.Height = gridY;
}

//A razao pela qual eu meto as funcoes nos prototypes dos construtores e nao nos construtores em si (posso te explicar dps mais tarde se quiseres) e pk
//se metesse no construtor ele estaria sempre a criar funcoes novas enquanto se meter no prototype (como o prototype de um construtor e "pai" dele (engloba-o))
//cria uma vez e nunca mais cria.
Entity.prototype.update = function(){
	areaJogo.ctx.fillStyle = this.Color;	
	areaJogo.ctx.fillRect(this.X-1, this.Y-1, this.Width+1, this.Height+1); 
};


function JogadorBloco(x, y, color, speedX, speedY){
	//Vai buscar o x, o y e o width do Entity, com o x, y defenidos NESTE CONSTRUTOR como PARAMETROS do construtor acima, para ele nos devolver as variaveis X, Y Width e Height
	Entity.call(this, x, y);

	this.OldSpeedX=speedX;
	this.OldSpeedY=speedY;
	this.SpeedX=speedX;
	this.SpeedY=speedY;
	this.Color = color;
	this.TurnH = 0;
	this.TurnV = 0;
}
//Basicamente, o prototype(onde estão gravadas as funcoes e isso)do jogador bloco, sao feitas iguais aquelas do entity
JogadorBloco.prototype= Object.create(Entity.prototype);

//Faz com que o construtor usado quando fazemos new JogadorBloco(bla bla), use ESTE construtor e NAO o do ENTITY; (ou seja tem o color que nao existe no entity)
JogadorBloco.prototype.constructor=JogadorBloco;

//Adiciona ao prototype do JogadorBloco a func novaPos, isto temos que meter DEPOIS do "JogadorBloco.prototype= Object.create(Entity.prototype);" porque se não
//ele faz overwrite das funcs todas!!
JogadorBloco.prototype.novaPos = function(){

	if((this.Y-140)%(gridY)==0 && this.X%(gridX)==0){
		this.OldSpeedY=this.SpeedY; this.OldSpeedX=this.SpeedX;

		if(this.TurnH!=0){
			
			this.SpeedX=(gridX/8)*this.TurnH; this.SpeedY=0;

			this.TurnH=0;
		}
		else if(this.TurnV!=0){
			this.OldSpeedY=this.SpeedY; this.OldSpeedX=this.SpeedX;
			this.SpeedY=(gridY/8)*this.TurnV; this.SpeedX=0;

			this.TurnV=0;
		}
	}

		this.X+=this.SpeedX; this.Y+=this.SpeedY;
};


function JogadorCauda(x, y, color, speedX, speedY){
	JogadorBloco.call(this, x, y, speedX, speedY);

	this.OldSpeedX=speedX;
	this.OldSpeedY=speedY;
	this.StopSpeedX=0;
	this.StopSpeedY=0;
	this.SpeedX=speedX;
	this.SpeedY=speedY;
}

JogadorCauda.prototype= Object.create(JogadorBloco.prototype);
JogadorCauda.prototype.constructor = JogadorCauda;

JogadorCauda.prototype.novaPos = function(){
	this.X+=this.SpeedX; this.Y+=this.SpeedY;
};

function Comestivel(x, y, type){
	Entity.call(this, x, y);

	this.Type=type;
	if(this.Type=="Ponto") {
		this.Color="#FD1515";
	}
}

Comestivel.prototype= Object.create(Entity.prototype);
Comestivel.prototype.constructor=JogadorBloco;

Comestivel.prototype.delete = function(){
	this.Type=null;
};