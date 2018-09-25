({
	getAccount : function(component, event) {
		var action = component.get("c.getData");
        action.setCallback(this,function(response){
            component.set("v.AccList",response.getReturnValue());
            
        });
        
        $A.enqueueAction(action);
        
	},
    getAccountToEdit : function(component, event){
    	
	}
})