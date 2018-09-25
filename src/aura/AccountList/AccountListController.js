({
	doInit : function(component, event, helper) {
		helper.getAccount(component, event);
	},
    eventAction : function(component, event, helper) {
        
        var btnValue = event.getSource().get("v.value");
        alert(btnValue);
        var myEv = $A.get("e.c:ContactListPageAppEvent");
        myEv.setParams({
            "Acc":btnValue
        });
        myEv.fire();
		alert('gj');
	}
})