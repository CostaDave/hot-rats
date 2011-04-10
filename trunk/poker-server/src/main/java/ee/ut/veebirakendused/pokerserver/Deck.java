package ee.ut.veebirakendused.pokerserver;

import java.util.Vector;

public class Deck {
	private Vector <Card> cards = new Vector<Card>();
	private int nextCardIndex = 0;
	
	private String [] suits = {"c","d","h","s"};
	private String [] ranks = {"2","3","4","5","6","7","8","9","T","J","Q","K","A"};
	
	Deck(){
		for (int i=0;i<suits.length;i++){
			for (int j = 0; j<ranks.length;j++){
				cards.add(new Card(ranks[j], suits[i]));
			}
		}
	}
	public void shuffle(){
		int nextCardIndex = 0;
		int deckSize = cards.size();
		for (int i = 0; i < deckSize; i++){
			Card card = cards.elementAt(i);
			int randIndex = (int) Math.floor(Math.random()*deckSize);
			Card randCard = cards.elementAt(randIndex);
			cards.elementAt(i).setRank(randCard.getRank());
			cards.elementAt(i).setSuit(randCard.getSuit());
			cards.elementAt(randIndex).setRank(card.getRank());
			cards.elementAt(randIndex).setSuit(card.getSuit());
		}
	}

}

/*
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
