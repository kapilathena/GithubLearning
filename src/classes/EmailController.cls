public class EmailController {
	//Changed
    @AuraEnabled
    public static list<Email__c> fatchRecieved(string RId){
        system.debug(RId);
        return [select id,Body__c,isDraft__c,Recipient__c,receivedFrom__c,sentStatus__c,isRecieved__c,Subject__c,CreatedDate,RecordId__c from Email__c where RecordId__c =:RId AND isRecieved__c=true];
    }
    @AuraEnabled
    public static list<Email__c> fatchSent(string RId){
        system.debug(RId);
        system.debug([select id,Recipient__c,receivedFrom__c,sentStatus__c,isRecieved__c,Subject__c,CreatedDate,RecordId__c from Email__c where RecordId__c =:RId AND sentStatus__c=true]);
        return [select id,Body__c,Recipient__c,isDraft__c,receivedFrom__c,sentStatus__c,isRecieved__c,Subject__c,CreatedDate,RecordId__c from Email__c where RecordId__c =:RId AND sentStatus__c=true];
    }
    
    @AuraEnabled
    public static list<Account> fatchAccount(){
        
        return [select id,name from account];
    }
    
    @AuraEnabled
    public static boolean SaveEmailDetails(Email__c EmailData, string Rid,list<string> EmailList){
        System.debug('<<<<<<<'+EmailList);
        
        string emails = '';
        for(string str:EmailList){
            emails += str+';';
            
        }
        Email__c em = new Email__c();
        em = EmailData;
        em.Recipient__c = emails;
        em.RecordId__c = Rid;
        em.sentStatus__c = true;
        
        system.debug('LLLLLLL'+em);
        Database.UpsertResult results = Database.upsert(em);
        
        if(results.isSuccess()){
            return true;    
        }
        else {return false;}
    }
    @AuraEnabled
    public static id DraftEmailDetails(Email__c EmailData, string Rid,string draftRecId, list<string> EmailList){
        Email__c em = new Email__c();
        string emails = '';
        for(string str:EmailList){
            emails += str+';';
            
        }
        
        em = EmailData;
        em.Recipient__c = emails;
        em.Id = draftRecId;
        em.RecordId__c = Rid;
        em.isDraft__c = true;
        System.debug(em);
        Database.UpsertResult results = Database.upsert(em);
        
        
        return em.Id;    
        
        
        
    }
    @AuraEnabled
    public static list<Email__c> fatchDraftData(string RId){
        system.debug(RId);
        system.debug([select id,Recipient__c,receivedFrom__c,sentStatus__c,isRecieved__c,Subject__c,CreatedDate,RecordId__c from Email__c where RecordId__c =:RId AND isDraft__c=true]);
        return [select id,Body__c,isDraft__c,Recipient__c,receivedFrom__c,sentStatus__c,isRecieved__c,Subject__c,CreatedDate,RecordId__c from Email__c where RecordId__c =:RId AND isDraft__c=true];		
    }
    @AuraEnabled
    public static void DeleteCheckedEmail(string RIdObj){
        system.debug('RIdObj::::::::::::::'+RIdObj);
        system.debug('gd'+RIdObj.length());
        saveRegionWrapper wr = (saveRegionWrapper) JSON.deserialize(RIdObj, saveRegionWrapper.class);
        system.debug(wr.rId);
        if(!wr.rId.isEmpty()){
            list<Email__c> delList = new  list<Email__c>();
            for(id recordId : wr.rId){
                delList.add(new Email__c(id = recordId));
            }
            if(!delList.isEmpty()){
                
                Database.DeleteResult[] drList = Database.delete(delList, false);
                
            }
        }
        
    }
    
    public class saveRegionWrapper{
        @AuraEnabled public list<id>rId;
    }
    @AuraEnabled
    public static Email__c getDetToEdit(string Rid){
        system.debug(RId);
        system.debug([select id,Recipient__c,receivedFrom__c,sentStatus__c,isRecieved__c,Subject__c,CreatedDate,RecordId__c from Email__c where id =:RId]);
        return [select id,isDraft__c,Body__c,Recipient__c,receivedFrom__c,sentStatus__c,isRecieved__c,Subject__c,CreatedDate,RecordId__c from Email__c where id =:RId];		
    }
    @AuraEnabled
    public static list<string> fatchUsrData(string RecName){
        system.debug(RecName);
        
        list<string> usrEmail = new list<string>();
        list<User> usrList = [SELECT Email FROM User  where Email LIKE :'%'+RecName+'%'];
        for(User us: usrList){
            usrEmail.add(us.Email);
        }
        return usrEmail;		
    }    
    @AuraEnabled
    public static void deleteThisMail(string Rid){
        system.debug(Rid);
        Email__c em = new Email__c();
        em.Id = Rid;
        if(em != null){
            database.delete(em);
        }
    }
    
    @AuraEnabled
    public static void sendMail(string fileName,Email__c dataobj, list<string> emailList,string base64Data) {
        // Create an email message object
        string emails;
        for(string str:EmailList){
            emails += str+';';
            System.debug(''+str);
        }
        
        String address = dataobj.Recipient__c;
        String subject = dataobj.Subject__c;
        String body = dataobj.Body__c;
        System.debug(''+body);
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String [] toAddr = emails.split(';');
        System.debug('kfjfh'+toAddr);
        // String[] toAddresses = new String[] {toAddr};
        mail.setToAddresses(toAddr);
        mail.setSubject(subject);
        mail.setPlainTextBody(body);
        Messaging.EmailFileAttachment fileAttachments = new Messaging.EmailFileAttachment();
        fileAttachments.setFileName(fileName);
        fileAttachments.setBody(blob.valueOf(base64Data));
        // Pass this email message to the built-in sendEmail method 
        // of the Messaging class
        
        mail.setFileAttachments(new Messaging.EmailFileAttachment[] { fileAttachments });
        Messaging.SendEmailResult[] results = Messaging.sendEmail(
            new Messaging.SingleEmailMessage[] { mail });
        
        // Call a helper method to inspect the returned results
        inspectResults(results); 
    }
    
    // Helper method 
    private static Boolean inspectResults(Messaging.SendEmailResult[] results) {
        Boolean sendResult = true;
        
        // sendEmail returns an array of result objects.
        // Iterate through the list to inspect results. 
        // In this class, the methods send only one email, 
        // so we should have only one result.
        for (Messaging.SendEmailResult res : results) {
            if (res.isSuccess()) {
                System.debug('Email sent successfully');
            }
            else {
                sendResult = false;
                System.debug('The following errors occurred: ' + res.getErrors());                 
            }
        }
        
        return sendResult;
    }
}