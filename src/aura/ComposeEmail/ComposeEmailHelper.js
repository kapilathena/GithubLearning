({
	getAccount : function(component, event) {
		var action = component.get("c.fatchAccount");
         
        
        action.setCallback(this,function(response){
            component.set("v.AccountList",response.getReturnValue());
            
        });
        
        $A.enqueueAction(action);
	},
    saveEmail : function(component, event,recId) {
		var action = component.get("c.SaveEmailDetails");
         
        var dataobj = component.get("v.newEmail")
        action.setParams({
            "EmailData" : component.get("v.newEmail"),
            "Rid" : recId
        });
        action.setCallback(this,function(response){
            var chk = response.getReturnValue();
            if(chk == true){
                alert('sucess');
            }
            
        });
        
        $A.enqueueAction(action);
	},
    MakeDraft : function(component, event,recId) {
		var action = component.get("c.DraftEmailDetails");
         
        
        action.setParams({
            "EmailData" : component.get("v.newEmail"),
            "Rid" : recId
        });
        action.setCallback(this,function(response){
            var chk = response.getReturnValue();
            if(chk == true){
                alert('sucess');
            }
            
        });
        
        $A.enqueueAction(action);
	},
    getDetailToEdit : function(component, event,x) {
		var action = component.get("c.getDetToEdit");
         
        
        action.setParams({
            "Rid" : x
        });
        action.setCallback(this,function(response){
            component.set("v.newEmail",response.getReturnValue());
            
            
        });
        
        $A.enqueueAction(action);
	}
})