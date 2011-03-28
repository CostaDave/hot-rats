var PlayerNames = ['Aadu', 'Peeter', 'Rein', 
                   'Madis', 'Siim', 'Taavet',
                   'Mari', 'Liis', 'Teele'];

var SUITS = ['c','d','h','s'];
var RANKS = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
var CARDS_PATH = '../images/deck';
var CARD_IMAGES = {
	'Ad':'101.png',
	'2d':'102.png' // TODO: add other cards
}

Card = function(rank, suit) {
	this.rank = rank;
	this.suit = suit;
};

Card.prototype = {
	constructor : this.Card,
	cardKey : function() {
		return rank+suit;
	},
	htmlValue : function() {
		// TODO: should return HTML representation of itself
	}
};

Deck = function() {
	this.cards = new Array();
	for (rank in RANKS) {
		for (suit in SUITS) {
			console.log('suit : ' + RANKS[rank] + ' rank : ' + SUITS[suit]);
			this.cards.push(new Card(RANKS[rank], SUITS[suit]));
		}
	}
};

Deck.prototype = {
	constructor : this.Deck,
	shuffle : function() {
		deckSize = this.cards.length;
		for (i = 0; i < deckSize; i++) {
			card = this.cards[i]; // Take next card out of deck
			randIndex = Math.floor(Math.random()*deckSize); // Choose random position in deck
			randCard = this.cards[randIndex]; // Take card from there
			this.cards[i] = randCard; // Change their places
			this.cards[randIndex] = card;
		}
	},
	nextCard : function() {
		
	}
};

Player = function(name, money, seat) {
		this.name = name;
		this.money = money;
		this.seat = seat;
		this.hand = new Array();
		this.button = false;
		this.brain = undefined;
};

	
Player.prototype = {
		constructor : this.Player,
		draw : function() {
			$('.playerMoney', this.seat).html(this.money);
			$('.playerName', this.seat).html(this.name);
		},
		postBlind : function(blindSize) {
			money -= blindSize;
			return BBSize;
		},
		isDealer : function() {
			return button;
		},
		addCard : function(card) {
			this.hand.push(card);
		},
		getActionForTableInfo : function(tableInfo) {
			// In our quite primitive version tableInfo is just the size of the last bet
			// Will return a dictionary with info about the move player decided to make
			// action = this.brain(tableInfo);
			action = {'action':'fold'};
			return action;
		}
};

// There should be only 1 table manager per page
function TableManager() {
	this.BB = 2; // Size of the big blind. 
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
			collectBlinds();
			dealHoleCards();
			preFlopBetting();
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

TableManager.prototype.addToPot = function(amountAdded) {
	// TODO: update pot on poker table, add money to pot
	this.pot += amountAdded;
};

TableManager.prototype.nextPlayerAfter = function(currentPlayer) {
	
	index = 0;
	foundAt = -1;
	for (player in this.players) {
		index += 1;
		if (player == currentPlayer) {
			foundAt = index;
			break;
		}
	}
	// TODO: Usalda, aga kontrolli!!! Siit v6ib hakata vigu viskama. Ma pole p2ris kindel
	return foundAt <= this.players.length ? this.players[foundAt+1] : this.players[0];
};

TableManager.prototype.findButtonPlayer = function() {
	// TODO: find  and return player from this.players whose .button property is true
	buttonPlayer = null;
	for (player in this.players) {
		if (player.button == true) {
			buttonPlayer = player;
			break;
		}
	}
	if (buttonPlayer == null) {
		buttonPlayer = this.players[0];
	}
	return buttonPlayer;
};

TableManager.prototype.collectBlinds = function() {
	dealerPlayer = this.findButtonPlayer();
	sbPlayer = this.nextPlayerAfter(dealerPlayer);
	bbPlayer = this.nextPlayerAfter(sbPlayer);
	this.addToPot(sbPlayer.postBlind(this.BB / 2));
	this.addToPot(bbPlayer.postBlind(this.BB));
};

TableManager.prototype.dealHoleCards = function() {
	nextPlayer = this.nextPlayerAfter(this.findButtonPlayer());
	this.deck.shuffle();
	for (i = 0; i < this.players.length * 2; i++) { // Go through all players twice, beginning with player after dealer (small blind)
		nextPlayer.addCard(this.deck.nextCard());
		nextPlayer = this.nextPlayerAfter(nextPlayer);
	}
};

TableManager.prototype.doPlayerAction = function(actionDict) {
	if (actionDict['action'] == 'fold') {
		// TODO: fold player, make him inactive in players list (somehow :S)
	}
};

TableManager.prototype.preFlopBetting = function() {
	nextPlayer = this.nextPlayerAfter(this.findButtonPlayer());
	while (this.playersLeftToBet()) {
		actionDict = nextPlayer.getActionForTableInfo({'lastBet':100});
		this.doAction(actionDict);
		
	}
};

$(document).ready(function(){
	$("#startGame").click(function(){
		geim = new TableManager();
		geim.initGame();
	});
});

