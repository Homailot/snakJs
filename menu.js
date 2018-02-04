function show(el) {
	el.style.display = 'block';
}

function hide(el) {
	el.style.backgroundImage = "none";
	el.style.display = "hide";

	var subs= el.getElementsByClassName("sub");

	for(var i = 0; i < subs.length; i++)  {
		subs[i].style.display="none";
		//subs[i].style.backgroundImage = "none";
		subs[i].style.cursor= "auto";
	}
}

function openMenu() {
	show(document.getElementById('menu'));
	document.getElementById('menu').style.backgroundImage = "url(naom_58b44e8732feb.jpg)";
	startedGame=0;

	document.getElementById("butPlayer").addEventListener("click", startGame);
	document.getElementById("butMulti").addEventListener("click", startMulti);


	//document.getElementById("butPlayer").style.backgroundImage = "url(menu_1.fw.png)";
	//document.getElementById("butMulti").style.backgroundImage = "url(menu_2.fw.png)";

	
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

function startGame() {
	hide(document.getElementById("menu"));
	startup(1, 2);
}

function startMulti() {
	hide(document.getElementById("menu"));
	startup(2, 2);
}
