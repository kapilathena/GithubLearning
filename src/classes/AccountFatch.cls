public class AccountFatch {

	//kjhgjhj
	//jkjhkjhhfjegskghaerpibhu yporwhu byosir
	// without plugin.
	// with plugin

	@AuraEnabled
    public static list<contact> getData(){
		
        return [Select id,firstname,lastname,Title,Phone from contact limit 10];
        
    }
}
  