({
	eventAction : function(component, event, helper) {
        alert('dfg');
		var myEv = component.getEvent("RegEvName");
        myEv.setParams({"eventItem":"ashish"});
        myEv.fire();
	}
})