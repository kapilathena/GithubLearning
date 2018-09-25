({
    doInit : function(component, event, helper) {
        component.set("v.DisableVar",true);
        component.set("v.chkData","recieved");
        var x = component.get("v.recordId");
        
        console.log(x); 
        
        helper.fatchEmails(component,event,x);
    },
    sentMail : function(component, event, helper) {
        document.getElementById("composePage").style.display = "none";
        component.set("v.DisableVar",true);
        component.set("v.chkData","Send");
        var x = component.get("v.recordId");
        helper.fatchSentEmails(component,event,x);  
        
    },
    draftDetails : function(component, event, helper) {
        
        document.getElementById("composePage").style.display = "none";
        component.set("v.DisableVar",false);
        var x = component.get("v.recordId");
        component.set("v.chkData","draft");
        helper.fatchDraft(component, event,x);
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
    composeEvent : function(component, event, helper) {
        //component.set("v.newEmail","{'sobject' : 'Email__c','Recipient__c': '','Subject__c' : '','Body__c' :'' }");
        component.set("v.disableDelete",true);
        component.set("v.draftRecordId",'');
        component.set("v.DisableVar",false);
        component.set("v.chkData","compose");
        //   component.set("v.showChild",true);
        console.log('hi');
        
        document.getElementById("composePage").style.display = "block";
        document.getElementById("detailPage").style.display = "none";
        var recId = component.get("v.recordId");
        window.myVar = setInterval(function(){ 
            helper.MakeDraft(component, event,recId);
        }, 3000);
        
    },
    SendEmail : function(component, event, helper) {
        var recId = component.get("v.recordId");
        //alert(recId);
        //var recId = component.get("v.myval");
        console.log(recId);
        helper.helperMethod(component, event,recId);
        
        
    },
    
    cancelEmail : function(component, event, helper) {
        var recId = component.get("v.recordId");
        //alert(recId);
        // var recId = component.get("v.myval");
        clearInterval(myVar);
        
        helper.MakeDraft(component, event,recId);
        document.getElementById("detailPage").style.display = "block";
        document.getElementById("composePage").style.display = "none";
    },
    EditMail : function(component, event, helper) {
        component.set("v.disableDelete",false);
        var ctarget=event.currentTarget.dataset.text;
        console.log(ctarget);
        helper.getDetailToEdit(component, event,ctarget);
        
    },
    deleteEmail : function(component, event, helper) {
        
        var recId = component.get("v.newEmail.Id");
        console.log(recId);
        helper.DeleteMail(component, event,recId);
        
    },
    fatchinputdata : function(component, event, helper) {
        
        
        console.log('recId');
        
        
    },
    fatchUser : function(component, event, helper) {
        
        var recNameLike = component.get("v.newEmail.Recipient__c");
        console.log(component.get("v.newEmail.Recipient__c"));
        helper.FatchUserLikeThis(component, event,recNameLike);
        
    },
    takeData : function(component, event, helper) {
        var usrEm=event.currentTarget.dataset.val;
        //alert(usrEm);
        var arrEm = [];
        if(component.get("v.emailList") != null){
            arrEm = component.get("v.emailList");
            arrEm.push(usrEm);
            console.log('hoiguoifuyuy '+arrEm);
            component.set("v.emailList",arrEm);
        }
        document.getElementById('emlList').style.display = 'none';
    },
    handleFilesChange : function(component, event)
    {
        var uploadFile = event.getSource().get("v.files")[0];
        console.log(uploadFile.body);
        
    },
    selectedFileShow: function(component, event, helper){
        var fileName='No File Selectetxyyted';
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        
        var fileLst = [];
        if(component.get("v.fileList") != null){
            fileLst = component.get("v.fileList");
            fileLst.push(fileName);
            component.set("v.fileList", fileLst);
            console.log(fileLst);
        }
        
        
    },
    search : function(component, event, helper){
        
        var x = component.get("v.toSearch").toLowerCase();
        console.log(x);
        var value = $('#searchKey').val().toLowerCase();
        $("#tbodyId tr").filter(function() {
            console.log('ujkb');
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        
        
    },
    selectAll : function(component, event, helper){
		console.log('hi');       
        if($('#headCheckbox').prop('checked') == true){
            $("input:checkbox[name=chk]").each(function(){
                $(this).attr('checked',true);
            });
        }
        else if($('#headCheckbox').prop('checked') == false){
            $("input:checkbox[name=chk]").each(function(){
                $(this).attr('checked',false);
            });
        }
    }
    
})