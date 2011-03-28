var PlayerNames = ['Aadu', 'Peeter', 'Rein', 
                   'Madis', 'Siim', 'Taavet',
                   'Mari', 'Liis', 'Teele'];

var SUITS = ['c','d','h','s'];
var RANKS = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
var CARDS_PATH = '../images/deck/';
var CARD_IMAGES = {
	'Ad':'101.png',	'Ac':'114.png',	'Ah':'127.png', 'As':'140.png',
	'2d':'102.png',	'2c':'115.png',	'2h':'128.png',	'2s':'141.png',
	'3d':'103.png',	'3c':'116.png',	'3h':'129.png', '3s':'142.png',
	'4d':'104.png',	'4c':'117.png',	'4h':'130.png',	'4s':'143.png',
	'5d':'105.png',	'5c':'118.png',	'5h':'131.png', '5s':'144.png',
	'6d':'106.png',	'6c':'119.png',	'6h':'132.png', '6s':'145.png',
	'7d':'107.png',	'7c':'120.png',	'7h':'133.png', '7s':'146.png',
	'8d':'108.png',	'8c':'121.png',	'8h':'134.png', '8s':'147.png',
	'9d':'109.png',	'9c':'122.png',	'9h':'135.png', '9s':'148.png',
	'Td':'110.png',	'Tc':'123.png',	'Th':'136.png', 'Ts':'149.png',
	'Jd':'111.png',	'Jc':'124.png', 'Jh':'137.png', 'Js':'150.png',
	'Qd':'112.png',	'Qc':'125.png', 'Qh':'138.png', 'Qs':'151.png',
	'Kd':'113.png',	'Kc':'126.png', 'Kh':'139.png', 'Ks':'152.png'
};

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
	this.nextCardIndex = 0;
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
		this.nextCardIndex = 0;
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
		retCard = this.cards[this.nextCardIndex];
		this.nextCardIndex += 1;
		return retCard;
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
	this.deck = new Deck();
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
			this.deck.shuffle();
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
	// TODO: in first round betting starts from player UTG (next to BB)
	nextPlayer = this.nextPlayerAfter(this.findButtonPlayer());
	while (this.playersLeftToBet()) {
		actionDict = nextPlayer.getActionForTableInfo({'lastBet':100});
		this.doPlayerAction(actionDict);
		
	}
};

$(document).ready(function(){
	$("#startGame").click(function(){
		geim = new TableManager();
		geim.initGame();
	});
});

