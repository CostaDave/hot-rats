package ee.ut.veebirakendused.pokerserver;

public class Player {
	private String name;
	private int money;
	private int seat;
	private Object[] hand = new Object[2];
	private boolean button = false;
	//brain = undefined;
	private boolean canContinuePlaying = false;
	private boolean isAllIn = false;
	
	Player(){
		this.name = null;
		this.money = 0;
		this.seat = 0;
	}
	
	Player(String name, int money, int seat){
		this.name = name;
		this.money = money;
		this.seat = seat;
	}
	
	public void draw(){
		// TODO
	}
	
	int postBlind(int blindSize){
		this.money -= blindSize;
		return blindSize;
	}
	
	boolean isDealer(){
		return button;
	}
	
	public void setIsDealer(boolean buttonForMe){
		this.button = buttonForMe;
	}
	
	public void addCard(Card card){
		if (hand[0].equals(null)){
			hand[0]=card;
		} else {
			hand[1]=card;
		}
	}
	
//	getActionForTableInfo(tableInfo){
//		return action
//	}
	
	boolean isInHand(){
		if (canContinuePlaying){
			return true;
		} else {
			return false;
		}
	}
}
