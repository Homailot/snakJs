var selectedLvl=0;

function show(el) {
	el.style.display = 'block';
}

function hide(el) {
	//el.style.backgroundImage = "none";
	el.style.display = "none";

	/*var subs= el.getElementsByClassName("sub");

	for(var i = 0; i < subs.length; i++)  {
		subs[i].style.display="none";
		//subs[i].style.backgroundImage = "none";
		subs[i].style.cursor= "auto";
	}

	document.get.style.display="none";*/
	el.innerHTML="";
}

function openMenu() {
	document.getElementById("container").innerHTML="";

	show(document.getElementById('menu'));
	startedGame=0;

	openBtns();
}

function openBtns() {
	//document.getElementById('menu').style.backgroundImage = "url(beautiful-snakes-wallpapers-%E2%80%AB5%E2%80%AC-%E2%80%AB%E2%80%AC-680x425.png)";

	document.getElementById("menu").innerHTML="<img src='Untitled-1.fw.png'>"
	document.getElementById("menu").innerHTML+="<span id='butPlayer' class='sub' onclick='startGame(1);'></span>"
	document.getElementById("menu").innerHTML+="<span id='butMulti' class='sub' onclick='startGame(2);'></span>"
	document.getElementById("menu").innerHTML+="<span id='lvl' onclick='openLvls();'></span>"
	
	var subs= document.getElementById("menu").getElementsByClassName("sub");

	for(var i = 0; i < subs.length; i++)  {
		subs[i].style.left=(window.innerWidth/2-200) + "px";
		subs[i].style.display = "block";
	}

	window.addEventListener("resize", function btns() {
		var subs= document.getElementById("menu").getElementsByClassName("sub");

		for(var i = 0; i < subs.length; i++)  {
			subs[i].style.left=(window.innerWidth/2-200) + "px";
		}
	})
}

function openLvls() {
	document.getElementById("menu").innerHTML="<span id='leftAr' onclick='switchLvl(1);'></span>";
	document.getElementById("menu").innerHTML+="<span id='rightAr' onclick='switchLvl(-1);'></span>";
	document.getElementById("menu").innerHTML+="<span id='exit' onclick='openBtns();'></span>";
	document.getElementById("menu").innerHTML+="<h1 id='lvlShow'></h1>"
	document.getElementById("lvlShow").innerHTML="Nivel: " + selectedLvl;
}

function switchLvl(l) {
	switch(l){
		case 1:
			selectedLvl=selectedLvl+1>3?0:selectedLvl+1;
			break;
		case -1:
			selectedLvl=selectedLvl-1<0?3:selectedLvl-1;
			break;
	}

	document.getElementById("lvlShow").innerHTML="Nivel: " + selectedLvl;
}

function startGame(type) {
	hide(document.getElementById("menu"));
	startup(type, selectedLvl);
}
