<%-- 
	Document   : index
	Created on : Feb 27, 2011, 7:13:48 PM
	Author     : madis
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Texas Hold 'em</title>
		<link rel="stylesheet" type="text/css" href="PokerTable.css" />
	</head>
	<body>
		<div class="pokerTable">
			<div id="dealer">Dealer</div>
			<div class="players">
				<div id="p1">Esimene</div>
				<div id="p2">Teine</div>
				<div id="p3">Kolmas</div>
				<div id="p4">Neljas</div>
				<div id="p5">Viies</div>
				<div id="p6">Kuues</div>
				<div id="p7">Seitsmes</div>
				<div id="p8">Kaheksas</div>
				<div id="p9">Üheksas</div>
				
			</div>
			
			<div id="chat">
			<textarea rows="4" cols="30">Chat</textarea>
			<input type="text" />
			</div>
			
			<div id="playerActions">
				Player actions:<br>
				<input class="playerAction" type="submit" value="Fold" />
				<input class="playerAction" type="submit" value="Bet" />
				<input class="playerAction" type="submit" value="Raise" />
			</div>
		</div>
	</body>
</html>
