({
	myAction : function(component, event, helper) {
		var i = event.getParam("Acc");
        if(i != null){
            window.contactIds = i;
        }
        helper.getOneCon(component, event,i);
	},
    updateCon : function(component, event, helper){
		var contactId = component.get("v.cont.Id");
        if(contactId != ''){
        	helper.setCon(component, event,contactId);  
            
        }
        else {helper.createCon(component, event);}
        
        console.log(contactId);
    }
})