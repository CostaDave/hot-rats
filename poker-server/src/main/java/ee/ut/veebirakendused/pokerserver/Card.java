package ee.ut.veebirakendused.pokerserver;


public class Card {
	private String rank;
	private String suit;
	
	Card(){
		this.rank = null;
		this.suit = null;
	}
	
	Card(String rank, String suit){
		this.rank = rank;
		this.suit = suit;
	}
		
	public String getRank() {
		return rank;
	}

	public void setRank(String rank) {
		this.rank = rank;
	}

	public String getSuit() {
		return suit;
	}

	public void setSuit(String suit) {
		this.suit = suit;
	}

	public String cardKey(){
		return rank+suit;
	}
	
	
}
