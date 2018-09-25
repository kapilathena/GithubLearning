public class AccountFatch {
	//dfhjkh
	//jkhjk
	@AuraEnabled
    public static list<contact> getData(){
		
        return [Select id,firstname,lastname,Title,Phone from contact limit 10];
        
    }
}