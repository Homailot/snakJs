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
	areaJogo.ctx.fillRect(this.X, this.Y, this.Width, this.Height); 
};


function JogadorBloco(x, y, color){
	//Vai buscar o x, o y e o width do Entity, com o x, y defenidos NESTE CONSTRUTOR como PARAMETROS do construtor acima, para ele nos devolver as variaveis X, Y Width e Height
	Entity.call(this, x, y);

	this.SpeedX=gridX/8;
	this.SpeedY=0;
	this.Color = color;
	this.moveH = true;
	this.moveV= false;
	this.ultimoMoveV = false;
	this.ultimoMoveH = true;
}
//Basicamente, o prototype(onde estão gravadas as funcoes e isso)do jogador bloco, sao feitas iguais aquelas do entity
JogadorBloco.prototype= Object.create(Entity.prototype);

//Faz com que o construtor usado quando fazemos new JogadorBloco(bla bla), use ESTE construtor e NAO o do ENTITY; (ou seja tem o color que nao existe no entity)
JogadorBloco.prototype.constructor=JogadorBloco;

//Adiciona ao prototype do JogadorBloco a func novaPos, isto temos que meter DEPOIS do "JogadorBloco.prototype= Object.create(Entity.prototype);" porque se não
//ele faz overwrite das funcs todas!!
JogadorBloco.prototype.novaPos = function(){
	this.ultimoMoveH=this.moveH; this.ultimoMoveV=this.moveV;
		if((this.moveV && (this.Y-140)%(gridY)==0 && this.SpeedX!=0)||this.moveH){
			this.X+=this.SpeedX;
			this.moveH=true; this.moveV=false;
			if(this.ultimoMoveV) this.SpeedY=0;
		}
		if((this.moveH && this.X%(gridX)==0 && this.SpeedY!=0)||this.moveV){
			this.Y+=this.SpeedY;
			this.moveH=false; this.moveV=true;
			if(this.ultimoMoveH) this.SpeedX=0;
		}
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
	console.log("g");
	this.Type=null;
};