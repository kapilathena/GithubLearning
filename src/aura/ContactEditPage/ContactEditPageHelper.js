({
	getOneCon : function(component, event, i) {
		var action = component.get("c.getOneContact");
        action.setParams({
            "recordId" : i  
        });
        
        action.setCallback(this,function(response){
            component.set("v.cont",response.getReturnValue());
            console.log("-------res------"+i);
            console.log(response.getReturnValue());
        });
        
        $A.enqueueAction(action);
        
	},
    setCon : function(component, event, contactId){
       
        var obj = component.get("v.cont");
        console.log(f,l);
		var action = component.get("c.updateData");
        action.setParams({
            "ContactVal":obj
        });
        
        action.setCallback(this,function(response){
           var chk = response.getReturnValue();
            if(chk == true){
                alert('sucessfullyUpdated');
                 var myEv = $A.get("e.c:temp");
        
        		myEv.fire();
                component.set("v.cont",{ 'sobjectType': 'Contact','Id': '','FirstName': '','LastName': '','Title': '','Phone':''});

            }
            else{
                alert('upsert failed');
            }
        });
        $A.enqueueAction(action);
    },
    createCon : function(component, event){
   		var obj = component.get("v.cont");
        console.log();
		var action = component.get("c.updateData");
        action.setParams({
			"ContactVal":obj
            
        });
        action.setCallback(this,function(response){
           var chk = response.getReturnValue();
            if(chk == true){
                alert('sucessfull');
                 var myEv = $A.get("e.c:temp");
        
        		myEv.fire();
				component.set("v.cont",{ 'sobjectType': 'Contact','Id': '','FirstName': '','LastName': '','Title': '','Phone':''});
            }
            else{
                alert('upsert failed');
            }
        });
        $A.enqueueAction(action);
    }
})