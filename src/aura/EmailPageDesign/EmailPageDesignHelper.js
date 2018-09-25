({
    MAX_FILE_SIZE: 4500000, //Max file size 4.5 MB 
    CHUNK_SIZE: 750000,      //Chunk Max size 750Kb 
    uploadProcess: function(component, file,emails, fileContents,newAcc,recId) {
        var startPosition = 0;
        console.log('gfgghgfhkmjhjgjj'+newAcc);
        console.log(emails);
        console.log(recId);
        console.log('fileContents'+fileContents);
        var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
        console.log('uploadInChunk+fileContents'+fileContents);
        var actionToSave = component.get("c.SaveEmailDetails");
        var emails = component.get("v.emailList");
        console.log('emails');
        console.log('emails'+emails);
        var recId = component.get("v.recordId");
        console.log('recId'+recId);
        
        var dataobj = component.get("v.newEmail")
        actionToSave.setParams({
            "EmailData" : component.get("v.newEmail"),
            "Rid" : recId,
            "EmailList" : emails
        });
        
        // this.fatchSentEmails(component, event,recId);
        actionToSave.setCallback(this,function(response){
            var chk = response.getReturnValue();
            if(chk == true){
                alert('sucess');
                document.getElementById("composePage").style.display = "none";
                document.getElementById("detailPage").style.display = "block";
                this.fatchSentEmails(component, event,recId);
                
            }
            
        });
        
        $A.enqueueAction(actionToSave);
        
        
        var getchunk = fileContents.substring(startPosition, endPosition);
        
        
        
        var action1=component.get("c.sendMail");
        
        action1.setParams({
            fileName: file.name,
            "dataobj" : dataobj,
            "emailList" : emails,
            base64Data: encodeURIComponent(getchunk)
            
        });
        action1.setCallback(this, function(response) {
        });
        
        $A.enqueueAction(action1);
    },/*
    uploadInChunk: function(component, file,emails, fileContents, startPosition, endPosition, attachId,newAcc,recId) {
        console.log('uploadInChunk+fileContents'+fileContents);
        var actionToSave = component.get("c.SaveEmailDetails");
        var emails = component.get("v.emailList");
        console.log('emails');
        console.log('emails'+emails);
        var recId = component.get("v.recordId");
        console.log('recId'+recId);
        
        var dataobj = component.get("v.newEmail")
        actionToSave.setParams({
            "EmailData" : component.get("v.newEmail"),
            "Rid" : recId,
            "EmailList" : emails
        });
        
        // this.fatchSentEmails(component, event,recId);
        actionToSave.setCallback(this,function(response){
            var chk = response.getReturnValue();
            if(chk == true){
                alert('sucess');
                document.getElementById("composePage").style.display = "none";
                document.getElementById("detailPage").style.display = "block";
                this.fatchSentEmails(component, event,recId);
                
            }
            
        });
        
        $A.enqueueAction(actionToSave);
        
        
        var getchunk = fileContents.substring(startPosition, endPosition);
        
        
        
        var action1=component.get("c.sendMail");
        
        action1.setParams({
            fileName: file.name,
            "dataobj" : dataobj,
            "emailList" : emails,
            base64Data: encodeURIComponent(getchunk)
            
        });
        action1.setCallback(this, function(response) {
        });
        
        $A.enqueueAction(action1);
    }, */
    /*
    saveEmail : function(component, event,recId) {
        var actionToSave = component.get("c.SaveEmailDetails");
        var emails = component.get("v.emailList");
        console.log('emails');
        console.log('emails'+emails);
        var dataobj = component.get("v.newEmail")
        actionToSave.setParams({
            "EmailData" : component.get("v.newEmail"),
            "Rid" : recId,
            "EmailList" : emails
        });
        
        this.fatchSentEmails(component, event,recId);
        actionToSave.setCallback(this,function(response){
            var chk = response.getReturnValue();
            if(chk == true){
                alert('sucess');
                document.getElementById("composePage").style.display = "none";
                document.getElementById("detailPage").style.display = "block";
                this.fatchSentEmails(component, event,recId);
                
            }
            
        });
        
        $A.enqueueAction(action);
        
        
        var actionMail = component.get("c.sendMail");
        
        var dataobj = component.get("v.newEmail")
        actionMail.setParams({
            "dataobj" : dataobj,
            "emailList" : emails
            
            
        });
        
        actionMail.setCallback(this,function(response){
            
            
        });
        
        $A.enqueueAction(actionMail);
    }, */
    helperMethod : function(component,event,recId) {
        /* var action=component.get("c.insertRecord");
        action.setParams({
            "recorddata":newAcc,
            "recordId":recId
        });*/
        
        //   component.set("v.showLoadingSpinner", true);
        console.log('console.log(emails);'+recId);
        var newAcc = component.get("v.newEmail");
        var emails = component.get("v.emailList");
        var fileInput = component.find("fileId").get("v.files");
        var file = fileInput[0];
        console.log(newAcc);
        console.log(emails);
        console.log(fileInput);
        
        var self = this;  
        if (file.size > self.MAX_FILE_SIZE) {
            // component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", 'Alert : File size cannot exceed ' + self.MAX_FILE_SIZE + ' bytes.\n' + ' Selected file size: ' + file.size);
            return;
        }
        var objFileReader = new FileReader();
        objFileReader.onload = $A.getCallback(function() {
            var fileContents = objFileReader.result;
            var base64 = 'base64,';
            var dataStart = fileContents.indexOf(base64) + base64.length;
            fileContents = fileContents.substring(dataStart);
            console.log('fileContents'+fileContents);
            console.log(fileContents);
            console.log(base64);
            console.log('thisIsTheEnd'+dataStart);
            self.uploadProcess(component, file,emails, fileContents,newAcc,recId);
            
        });
        
        objFileReader.readAsDataURL(file);
    },
    fatchEmails : function(component,event,x) {
        var action = component.get("c.fatchRecieved");
        component.set("v.chkData","recieved");
        action.setParams({
            "RId" : x
        });
        action.setCallback(this,function(response){
            component.set("v.obj",response.getReturnValue());
            
        });
        
        $A.enqueueAction(action);
    },
    fatchSentEmails : function(component,event,x) {
        component.set("v.chkData","Send");
        var action = component.get("c.fatchSent");
        
        action.setParams({
            "RId" : x
        });
        action.setCallback(this,function(response){
            component.set("v.obj",response.getReturnValue());
            
        });
        
        $A.enqueueAction(action);
    },
    fatchDraft : function(component,event,x) {
        
        var action = component.get("c.fatchDraftData");
        component.set("v.chkData","draft");
        action.setParams({
            "RId" : x
        });
        action.setCallback(this,function(response){
            component.set("v.obj",response.getReturnValue());
            
        });
        
        $A.enqueueAction(action);
    },
    deleteChked : function(component,event,yourArray) {
        
        var action = component.get("c.DeleteCheckedEmail");
        var myJSON = JSON.stringify(yourArray);
        
        
        action.setParams({
            "RIdObj" : myJSON
        });
        action.setCallback(this,function(response){
            var typeDel = component.get("v.chkData");
            if(typeDel == 'recieved'){
                
                var x = component.get("v.recordId");
                this.fatchEmails(component,event,x);
            }
            else if(typeDel == 'Send'){
                
                var x = component.get("v.recordId");
                this.fatchSentEmails(component,event,x);
                
            }
                else if(typeDel == 'draft'){
                    
                    var x = component.get("v.recordId");
                    this.fatchDraft(component,event,x);
                }
            
        });
        
        $A.enqueueAction(action);
    },
    
    MakeDraft : function(component, event,recId) {
        var action = component.get("c.DraftEmailDetails");
        var emails = component.get("v.emailList");
        var draftId = component.get("v.draftRecordId");
        //console.log('chkgkhbjjb'+draftId);
        action.setParams({
            "EmailData" : component.get("v.newEmail"),
            "Rid" : recId,
            "draftRecId" : draftId,
            "EmailList" : emails
        });
        action.setCallback(this,function(response){
            var chk = response.getReturnValue();
            var old = component.get("v.draftRecordId");
            
            var recDraftId = response.getReturnValue();
            if(old != chk){
                
            }
            component.set("v.draftRecordId",recDraftId);
            
            
        });
        
        $A.enqueueAction(action);
    },
    getDetailToEdit : function(component, event,ctarget) {
        var action = component.get("c.getDetToEdit");
        
        
        action.setParams({
            "Rid" : ctarget
        });
        action.setCallback(this,function(response){
            component.set("v.newEmail",response.getReturnValue());
            document.getElementById("composePage").style.display = "block";
            
        });
        
        $A.enqueueAction(action);
    },
    DeleteMail : function(component, event,recId) {
        var action = component.get("c.deleteThisMail");
        
        
        action.setParams({
            "Rid" : recId
        });
        var x = component.get("v.recordId");
        this.fatchSentEmails(component, event,x);
        action.setCallback(this,function(response){
            
            document.getElementById("composePage").style.display = "none";
            this.fatchSentEmails(component, event,x);
        });
        
        $A.enqueueAction(action);
    },
    FatchUserLikeThis : function(component, event,recNameLike) {
        var action = component.get("c.fatchUsrData");
        
        
        action.setParams({
            "RecName" : recNameLike
        });
        
        action.setCallback(this,function(response){
            
            component.set("v.useEmailList",response.getReturnValue());
            document.getElementById("emlList").style.display = "block";
        });
        
        $A.enqueueAction(action);
    },
    chinghlpr : function(component,getAttachments) {
        //var action = component.get("c.sendEmailAction");
        console.log('getAttachments in helper--'+JSON.stringify(getAttachments));
        
    }
    
})