({
    composeEvent : function(component, event, helper) {

         //   component.set("v.showChild",true);
        	console.log('hi');
    },
    Del : function (component, event, helper) {
        var jsonWrapper = {};
            jsonWrapper.rid = [];
        

        $("input:checkbox[name=chk]:checked").each(function(){
            
           jsonWrapper.rid.push($(this).val());
            
        });
        
		helper.deleteChked(component, event,jsonWrapper);
        
        console.log(jsonWrapper);
        
    },
    doInit : function(component, event, helper) {
        component.set("v.showChild",false);
        window.recIdArr=[];
        component.set("v.isSent",true);
        var x = component.get("v.recordId");
        component.set("v.RecordSendId",x);
        
        
        helper.fatchEmails(component,event,x);  
        
    },
    sentMail : function(component, event, helper) {
        component.set("v.isSent",false);
        component.set("v.isSent",true);
        var x = component.get("v.recordId");
        
        helper.fatchSentEmails(component,event,x);  
        
    },
    EditMail : function(component, event, helper) {
        //var x = component.get("v.recordId");
        //console.log($('#tableRow').val());
        
        var ctarget=event.currentTarget.dataset.text;
        console.log(ctarget);
        component.set("v.EmailToEdit",ctarget);
        component.set("v.showChild",true);
        
    },
    draftDetails : function(component, event, helper) {
        var x = component.get("v.recordId");
        
        helper.fatchDraft(component, event,x);
    },
    editRecord : function(component, event, helper) {
        var btnValue = event.getSource().get("v.value");
        console.log(btnValue);
    }
})