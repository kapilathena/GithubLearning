public class AccountFatch {
	//kjhgjhj
	//jkjhkjhhfjegskghaerpibhu yporwhu byosir
	//this is my change komal
	@AuraEnabled
    public static list<contact> getData(){
		
        return [Select id,firstname,lastname,Title,Phone from contact limit 10];
        
    }
}
  