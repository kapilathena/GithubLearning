public class getOneAccount {
	@AuraEnabled
    public static contact getOneContact(string recordId){
		system.debug([Select id,firstname,lastname,Title,Phone from contact where id=:recordId]);
        return [Select id,firstname,lastname,Title,Phone from contact where id=:recordId order by createdDate];
        
    }
    @AuraEnabled
    public static boolean updateData(contact ContactVal){
		
        
        Database.UpsertResult results = Database.upsert(ContactVal);
        
        if(results.isSuccess()){
        	return true;    
        }
        else {return false;}
    }
    
}