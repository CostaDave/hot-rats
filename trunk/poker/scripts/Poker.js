var PlayerNames = ['Aadu', 'Peeter', 'Rein', 
                   'Madis', 'Siim', 'Taavet',
                   'Mari', 'Liis', 'Teele'];

Player = function(name, money, seat) {
		this.BBSize = 2;
		this.name = name;
		this.money = money;
		this.seat = seat;
		this.button = false;
	};
	
Player.prototype = {
		constructor : this.Player,
		draw : function() {
			$('.playerMoney', this.seat).html(this.money);
			$('.playerName', this.seat).html(this.name);
		},
		postSB : function() {
			// TODO: it would be better to have TableManager responsible of carrying out this action
			money -= BBSize / 2;
			return BBSize / 2;
		},
		isDealer : function() {
			return button;
		}
	};

// There should be only 1 table manager per page
function TableManager() {
	this.players = new Array(); // Holds player objects
	this.allInPlayers = new Array(); // When a player is all in he would be taken out of this.players and be put here
	this.actions = new Array(); // Will hold an array of actions. All actions concerning the game and players should be defined as functions in TableManager.actions
	this.pot = 0; // Sum of all the bets thus far
	this.board = new Array(); // Array of cards. When table is being drawn or new cards dealt, this is where the cards are asked/put.
}

TableManager.prototype = {
		
		constructor : TableManager,
		initGame : function(){
			for(i=1;i<10;i++){	
				player = new Player(PlayerNames[i-1],1000,$('#p'+i));
				player.draw();
				this.players.push(player);
			}	
		},
		startGame : function() {
			positionDealerButton();
			
//			collectBlinds
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

TableManager.prototype.positionDealerButton = function() {
	// If someone already has the dealer button, move it forward
	for (player in this.players) {
		if (player.isDealer() == true) {
			player.button = false; // Take button from previous player
			nextPlayer(player).button = true; // Give it to next
			return 'Dealer button given to ' + nextPlayer.name;
		}
	}
	// If there is no previous dealer, give button to random player
	randomPlayer = Math.floor(Math.random()*this.players.length);
	this.players[randomPlayer].button = true;
	return 'Dealer button initially given to ' + this.players[randomPlayer];
};

$(document).ready(function(){
	$("#startGame").click(function(){
		geim = new TableManager();
		geim.initGame();
	});
});

