var PlayerNames = ['Aadu', 'Peeter', 'Reina', 
                   'Madis', 'Siim', 'Taavet',
                   'Mari', 'Liis', 'Teele'];

var SUITS = ['c','d','h','s'];
var RANKS = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
var CARDS_PATH = './images/deck/';
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

var DEALER_BUTTON_HTML = '<img src="images/d_button.png">';

Card = function(rank, suit) {
	this.rank = rank;
	this.suit = suit;
};

Card.prototype = {
	constructor : this.Card,
	cardKey : function() {
		return this.rank+this.suit;
	},
	htmlValue : function() {
		htmlString = '<img src="'+CARDS_PATH+CARD_IMAGES[this.cardKey()] + '"></img>';
		return htmlString;
	}
};

Deck = function() {
	this.cards = new Array();
	this.nextCardIndex = 0;
	for (rank in RANKS) {
		for (suit in SUITS) {
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
		this.canContinuePlaying = false;
		this.isAllIn = false;
};

Player.prototype = {
		constructor : this.Player,
		draw : function() {
			$('.playerMoney', this.seat).html(this.money);
			$('.playerName', this.seat).html(this.name);
		},
		postBlind : function(blindSize) {
			this.money -= blindSize;
			$('.playerMoney', this.seat).text(this.money);
			return blindSize;
		},
		isDealer : function() {
			return this.button;
		},
		setIsDealer : function(buttonForMe) {
			this.button = buttonForMe;
			if (buttonForMe) {
				$('.dealer', this.seat).html(DEALER_BUTTON_HTML);
			} else {
				$('.dealer', this.seat).html('');
			}
		},
		addCard : function(card) {
			if(this.hand.length == 1){
				$('.holeCard2', this.seat).html(card.htmlValue());
			} else {
				$('.holeCard1', this.seat).html(card.htmlValue());}
			this.hand.push(card);
		},
		getActionForTableInfo : function(tableInfo) {
			// In our quite primitive version tableInfo is just the size of the last bet
			// Will return a dictionary with info about the move player decided to make
			// action = this.brain(tableInfo);
			action = {'action':'fold'};
			return action;
		},
		isInHand : function() {
			if (this.canContinuePlaying) {
				return true;
			}
			return false;
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
				logToChat(PlayerNames[i-1] + " joined the game.");
				player.draw();
				this.players.push(player);
			}		
		},
		startGame : function() {
			this.deck.shuffle();
//			this.positionDealerButton();
//			this.collectBlinds();
//			this.dealHoleCards();
//			this.preFlopBetting();
//			this.dealFlop();
//			thirdStreetBetting();
//			this.dealTurn();
//			fourthStreetBetting();
//			this.dealRiver();
//			fifthStreetBetting();
//			payWinner();
		}
};

TableManager.prototype.positionDealerButton = function() {
	dealerSelectionMsg = '';
	previousDealerFound = false;
	dealerPlayer = undefined;
	// If someone already has the dealer button, move it forward
	for (var p in this.players) {
		player = this.players[p];
		if (player.isDealer() == true) {
			player.setIsDealer(false); // Take button from previous player
			this.nextPlayerAfter(player).setIsDealer(true); // Give it to next
			dealerSelectionMsg = 'Dealer button given to ' + this.nextPlayerAfter(player).name;
			previousDealerFound = true;
			break;
		}
	}
	if (previousDealerFound == false) {
		// If there is no previous dealer, give button to random player
		randomPlayerIndex = Math.floor(Math.random()*this.players.length);
		randomDealer = this.players[randomPlayerIndex];
		randomDealer.setIsDealer(true);
		dealerSelectionMsg = 'Dealer button randomly given to ' + randomDealer.name;
	}
	logToChat(dealerSelectionMsg);
	return dealerSelectionMsg;
};

TableManager.prototype.addToPot = function(amountAdded) {
	this.pot += amountAdded;
	$('#pot').text('Pot: ' + this.pot);
};

TableManager.prototype.nextPlayerAfter = function(currentPlayer) {
	currentPlayerIndex = this.players.indexOf(currentPlayer);
	return currentPlayerIndex < this.players.length - 1 ? this.players[currentPlayerIndex+1] : this.players[0];
};

TableManager.prototype.findButtonPlayer = function() {
	// TODO: add moveButtonForward method
	buttonPlayer = null;
	for (p in this.players) {
		player = this.players[p];
		if (player.button == true) {
			buttonPlayer = player;
			break;
		}
	}
	console.log('Found button player ' + buttonPlayer.name);
	return buttonPlayer;
};

TableManager.prototype.collectBlinds = function() {
	dealerPlayer = this.findButtonPlayer();
	console.log('Starting to collect blinds. Dealer is : ' + dealerPlayer.name);
	sbPlayer = this.nextPlayerAfter(dealerPlayer);
	bbPlayer = this.nextPlayerAfter(sbPlayer);
	logToChat('Added SB of ' + this.BB/2 + ' from ' + sbPlayer.name + ' to pot');
	this.addToPot(sbPlayer.postBlind(this.BB / 2));
	logToChat('Added BB of ' + this.BB + ' from ' + bbPlayer.name + ' to pot');
	this.addToPot(bbPlayer.postBlind(this.BB));
};

TableManager.prototype.dealHoleCards = function() {
	logToChat('Dealing hole cards');
	nextPlayer = this.nextPlayerAfter(this.findButtonPlayer());
	this.deck.shuffle();
	for (i = 0; i < this.players.length * 2; i++) { // Go through all players twice, beginning with player after dealer (small blind)
		cardDealt = this.deck.nextCard();
		// console.log('Dealt ' + cardDealt.cardKey() + ' to ' + nextPlayer.name);
		nextPlayer.addCard(cardDealt);
		nextPlayer = this.nextPlayerAfter(nextPlayer);
	}
};

TableManager.prototype.doPlayerAction = function(actionDict) {
	if (actionDict['action'] == 'fold') {
		logToChat("Folded");
		// TODO: fold player, make him inactive in players list (somehow :S)
	}
};

// Should return true when at least 2 players are still in hand
TableManager.prototype.playersLeftToBet = function() {
	playersInHand = 0;
	for (var p in this.players) {
		player = this.players[p];
		if (player.isInHand()) {
			playersInHand += 1;
		}
	}
	return playersInHand > 1 ? true : false;
};

TableManager.prototype.preFlopBetting = function() {
	// TODO: in first round betting starts from player UTG (next to BB)
	nextPlayer = this.nextPlayerAfter(this.findButtonPlayer());
	while (this.playersLeftToBet()) {
		actionDict = nextPlayer.getActionForTableInfo({'lastBet':100});
		this.doPlayerAction(actionDict);
		
	}
};

TableManager.prototype.dealFlop = function() {
	logToChat('Dealing flop');
	for (var i = 0; i < 3; i++) {
		nextCardDealt = this.deck.nextCard();
		this.board.push(nextCardDealt);
		var cardsOnBoard = $('#communityCards');
		$('#communityCards').html(cardsOnBoard.html() + nextCardDealt.htmlValue());
	}
};

TableManager.prototype.dealTurn = function() {
	logToChat('Dealing turn');
	nextCardDealt = this.deck.nextCard();
	this.board.push(nextCardDealt);
	var cardsOnBoard = $('#communityCards');
	$('#communityCards').html(cardsOnBoard.html() + nextCardDealt.htmlValue());
};

TableManager.prototype.dealRiver = function() {
	logToChat('Dealing river');
	nextCardDealt = this.deck.nextCard();
	this.board.push(nextCardDealt);
	var cardsOnBoard = $('#communityCards');
	$('#communityCards').html(cardsOnBoard.html() + nextCardDealt.htmlValue());
};

function logToChat(str){
	var txt = $("#chatArea");
	txt.val(str + '\n' + txt.val());
}

function clearTable() {
//	console.log('Cleaning table');
//	console.log('Cleaning table');
//	$('#communityCards').empty();
//	$('#bet').empty();
//	$('#pot').empty();
//	$('.holeCard1').empty();
//	$('.holeCard2').empty();
//	$('.dealer').empty();
//	
	window.location.reload(); // Oops...
}

function enableJoinButton() {
	$('#startGame').html('<img src="images/join.png">');
	$('#startGame').click(enterGame);
};

function disableJoinButton() {
	console.log('disabling join button');
	$('#startGame').html('<img src="images/join_g.png">');
	$('#startGame').click(function(){});
};

function enterGame() {
	console.log('entering game');
	console.log('start game called');
	tableManager = new TableManager();
	logToChat("New table created");
	tableManager.initGame();
	// tableManager.buyInPlayers(); // TODO: initGame should only initialize TableManager, players should be bought in here
	tableManager.startGame();
	disableJoinButton();
};

function leaveGame() {
	console.log('leaving game');
	clearTable();
	enableJoinButton();
};

$(document).ready(function(){
	enableJoinButton();
	$('#exit').click(leaveGame);
});

function nextBigThing(){
	if (nextBigThing.step == undefined) {
		nextBigThing.step = 0;
	}
	switch(nextBigThing.step) {
	case 1:
		tableManager.positionDealerButton();
		break;
	case 2:
		tableManager.collectBlinds();
		break;
	case 3:
		tableManager.dealHoleCards();
		break;
	case 4:
		tableManager.preFlopBetting();
		break;
	case 5:
		tableManager.dealFlop();
		break;
	case 6:
		tableManager.dealTurn();
		break;
	case 7:
		tableManager.dealRiver();
		break;
	}
	nextBigThing.step += 1;
	return 'Did ' + nextBigThing.step + ' th thing';
};
xx = nextBigThing;
