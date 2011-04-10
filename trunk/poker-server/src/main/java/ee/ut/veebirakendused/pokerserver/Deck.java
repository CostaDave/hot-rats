package ee.ut.veebirakendused.pokerserver;

public class Deck {
	private Card[] cards;
	private int nextCardIndex = 0;
	

}

/*
 * Deck = function() {
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

 * 
 */
