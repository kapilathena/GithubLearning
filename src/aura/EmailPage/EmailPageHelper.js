({
	fatchEmails : function(component,event,x) {
		var action = component.get("c.fatchRecieved");
         
        action.setParams({
            "RId" : x
        });
        action.setCallback(this,function(response){
            component.set("v.obj",response.getReturnValue());
            alert(response.getReturnValue()[0].isRecieved__c);
        });
        
        $A.enqueueAction(action);
	},
    fatchSentEmails : function(component,event,x) {
		alert('sent');
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
        console.log(myJSON);
        
        action.setParams({
            "RIdObj" : myJSON
        });
        action.setCallback(this,function(response){
            
           
        });
        
        $A.enqueueAction(action);
	}
})