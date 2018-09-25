public class AccountFatch {

//changed

	@AuraEnabled
    public static list<contact> getData(){
		 List<Contact> lst=new List<Contact>(); 
        lst= [Select id,firstname,lastname,Title,Phone from contact limit 10];
        return lst;
        
    }
}



  