/**
 * 
 */

var Poker = new function() { // Our namespace
	function Player(name, money, seat) {
		this.BBSize = 2;
		this.name = name;
		this.money = money;
		this.seat = seat;
	}

	Player.prototype = {
		constructor : Player,
		postSB : function() {
			// TODO: it would be better to have TableManager responsible of carrying out this action
			money -= BBSize / 2;
			return BBSize / 2;
		}
	};

	// There should be only 1 table manager per page
	function TableManager() {
		this.players = new Array(); // Holds player objects
		this.allInPlayers = new Array(); // When a player is all in he would be taken out of this.players and be put here
		this.actions = new Array(); // Will hold a array of actions. All actions concerning the game and players should be defined as functions in TableManager.actions
		this.pot = 0; // Sum of all the bets thus far
		this.board = new Array(); // Array of cards. When table is being drawn or new cards dealt, this is where the cards are asked/put.
		
	}
	
	function positionDealerButton() {
		alert('Positioning dealer button');
	}
	TableManager.prototype = {
		constructor : TableManager,
		startGame : function() {
			positionDealerButton();
//			collectBlinds();
//			dealHoleCards();
//			preFlopBetting();
//			dealFlop();
//			thirdStreetBetting();
//			dealTurn();
//			fourthStreetBetting();
//			dealRiver();
//			fifthStreetBetting();
//			payWinner();
		}
	};
};