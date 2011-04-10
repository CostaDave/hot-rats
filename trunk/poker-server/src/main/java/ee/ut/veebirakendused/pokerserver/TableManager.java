package ee.ut.veebirakendused.pokerserver;

public class TableManager {
	private int BB = 2; // Size of the big blind. 
	private Object[] players = new Object[9]; // Holds player objects
	private Object[] allInPlayers = new Object[9]; // When a player is all in he would be taken out of this.players and be put here
//	this.actions = new Array(); // Will hold an array of actions. All actions concerning the game and players should be defined as functions in TableManager.actions
	private int pot = 0; // Sum of all the bets thus far
	private Object[] board = new Object[5]; // Array of cards. When table is being drawn or new cards dealt, this is where the cards are asked/put.
	Deck deck = new Deck();
}
