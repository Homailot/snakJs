<!DOCTYPE html>
<html>
<head>
	<title>Leaderboard</title>
	<style type="text/css">
		*{
			font-family: 'Open Sans', sans-serif;
		}

		body, html {
			width:  100%;
  			height: 100%;
  			overflow: hidden;
			margin: 0;
			padding: 0;
			text-align: center;
		}

		thead{
			background-color: #0D4218;
		}

		td, th{
			padding: 10px;
		}

		tr:nth-child(even){
			background-color: #19822F;
		}

		table{
			margin: auto;
			margin-top: 10px;
			border-collapse: collapse;
			background-color: #146425;
			color: white;
			 
			width: 40%;
		}


		body{
			
		}

		a{
			background-size: 100% 100%;
			position: absolute;
			width: 400px;
			height: 100px;
			z-index: 2;
			display: block;
			cursor: pointer;
			margin: auto;
		}

		div.contain{
			margin: auto;
			text-align: center;
		}

		div.container{
			background-image: url("Media/Images/back.png");
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		#exit {
			background-image: url("Media/Images/Menu_exit.fw.png");	
			bottom: 10px;
		}
		#exit:hover {background-image: url("Media/Images/Menu_exit_select.fw.png");	}
	</style>
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans|Open+Sans" rel="stylesheet">
	<meta charset charset=UTF-8>
</head>
<body>
	<div class="container">
	<?php
		$mysql= new mysqli("localhost", "root", "", "snake");
		$query="SET NAMES utf8mb4";
		$statement= $mysql->prepare($query);

		$statement->execute();
		$statement->close();
	?>

	<table>
		<thead>
			<th>NOME</th>
			<th>SCORE</th>
		</thead>
	<?php
		$query="SELECT * FROM score ORDER BY scorePlayer DESC LIMIT 15";
		$statement= $mysql->prepare($query);

		$statement->bind_result($id, $nome, $score);
		$statement->execute();

		while($statement->fetch()) {
			echo "<tr>";
			echo "<td> ".$nome."</td>";
			echo "<td> ".$score."</td>";
			echo "</tr>";
		}

		$statement->close();

		$mysql->close();
	?>	
	</table>

	<div class="contain"><a href="index.html" id="exit"></a><div>
	</div>
	
</body>
</html>

