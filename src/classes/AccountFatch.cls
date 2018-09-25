public class AccountFatch {
//changed

	@AuraEnabled
    public static list<contact> getData(){
		   
        return [Select id,firstname,lastname,Title,Phone from contact limit 10];
        
    }
}



  