({
	actionAccount : function(component, event, helper) {
        var x = component.get("v.recIdToEdit");
        console.log('child'+x);
		helper.getAccount(component, event);
        helper.getDetailToEdit(component, event,x);
	},
    SendEmail : function(component, event, helper) {
        var recId = component.get("v.recordId");
        //alert(recId);
         //var recId = component.get("v.myval");
       
        helper.saveEmail(component, event,recId);
    },
    cancelEmail : function(component, event, helper) {
        var recId = component.get("v.recordId");
        //alert(recId);
        // var recId = component.get("v.myval");
        
        helper.MakeDraft(component, event,recId);
    },
    editDetails : function(component, event, helper) {
        console.log('hjc');
        var record = event.getParam("EmailToEdit");
        console.log('compose'+record);

    },
    deleteEmail : function(component, event, helper){
    
	}
})