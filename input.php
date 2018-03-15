<?php
	$mysql= new mysqli("localhost", "root", "", "snake");
	$query="SET NAMES utf8mb4";
	$statement= $mysql->prepare($query);

	$statement->execute();
	$statement->close();

	if(isset($_POST["subt"])) {
		$query="INSERT INTO score(nomePlayer, scorePlayer) VALUES(?, ?)";
		$statement= $mysql->prepare($query);
		$statement->bind_param("si", $_POST["nome"], $_POST["score"]);
		$statement->execute();
		$statement->close();
	}

	$mysql->close();

	header("Location: http://localhost/snak/snakjs/score.php");
?>