public class AccountFatch {
//cheatrtgfhgtadsfsidbygoiweytaoyg
//my name is ashish bro
	@AuraEnabled
    public static list<contact> getData(){
		 List<Contact> lst=new List<Contact>(); 
        lst= [Select id,firstname,lastname,Title,Phone from contact limit 10];
        return lst;
        
    }
}



  