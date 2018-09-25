public class SObjectFieldController {
    list<ResultWrapper> RWList = new list<ResultWrapper>();
    
    @RemoteAction
    public static ResultWrapper GetFieldDetail(string sobj){
        ResultWrapper rw = new ResultWrapper();
        Schema.SObjectType convertType = Schema.getGlobalDescribe().get(sobj);
        System.debug(convertType);
        
        
        
        map<string,list<FieldClass>> fieldTypeFieldListMap = new map<string,list<FieldClass>>();
        Map<String, Schema.SObjectField> fieldMap = convertType.getDescribe().fields.getmap();
        System.debug(''+fieldMap);
          
        
        for(Schema.SObjectField sObjField:fieldMap.values()){
            //TypeToField.put(String.ValueOf(fieldMap.get(sObjField).getDescribe().getType()),sObjField);
            FieldClass fC = new FieldClass(sObjField);
            if(!fieldTypeFieldListMap.containsKey(fC.fieldType)){
                fieldTypeFieldListMap.put(fC.fieldType, new list<FieldClass>());
            }
            fieldTypeFieldListMap.get(fC.fieldType).add(fC);
        }
        list<string> fieldList = new list<string>();
        for(string fType:fieldTypeFieldListMap.keySet()){
            fieldList.add(fType);
        }
        fieldList.sort();
        for(string fldTyp: fieldList){
            FieldTypeFieldWrapper FTFW = new FieldTypeFieldWrapper(fldTyp,fieldTypeFieldListMap.get(fldTyp));
            rw.fieldTypeFieldWrapperList.add(FTFW);
        }
        System.debug(rw);
        
        return rw;
    } 
    @RemoteAction
    public static ResultWrapper getObjlist(){
        List<string> ObjListToSort = new list<string>();
        ResultWrapper rw = new ResultWrapper();
            for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()){
                ObjListToSort.add(objTyp.getDescribe().getName());
                
        }  
        ObjListToSort.sort();
        for(string str:ObjListToSort){
                    rw.sObjectwrapperList.add(new sObjectClass( Schema.getGlobalDescribe().get(str)));        
        }

        return rw;
    }
    
     @RemoteAction
    public static ResultWrapper getpicklistdatalist(String object_name , String field_name){
        ResultWrapper rw = new ResultWrapper();                 
    
       
      String[] types = new String[]{object_name};
      Schema.DescribeSobjectResult[] results = Schema.describeSObjects(types);
      for(Schema.DescribeSobjectResult res : results) {
         for (Schema.PicklistEntry entry : res.fields.getMap().get(field_name).getDescribe().getPicklistValues()) {
            rw.picklistStringlist.add(new pickliststring(entry.getValue()));
                }
      }                 
        return rw;
    } 
    
    public class ResultWrapper{
        list<sObjectClass> sObjectwrapperList;
        public list<pickliststring>  picklistStringlist;
        public list<FieldTypeFieldWrapper> fieldTypeFieldWrapperList;
        
        public ResultWrapper(){
            sObjectwrapperList = new list<sObjectClass>();
            picklistStringlist = new list<pickliststring>();
            fieldTypeFieldWrapperList = new list<FieldTypeFieldWrapper>();
        }
        
    }
    public class pickliststring{
        public string val;  
        public  pickliststring(){
        }
        
        public pickliststring(String str){
            val =str;
        }
    }   
    public class FieldTypeFieldWrapper{
        public string fieldTypeName;
        public list<FieldClass> FieldsList;
        public FieldTypeFieldWrapper(){
            FieldsList = new list<FieldClass>();
            
        }
        public FieldTypeFieldWrapper(string fdType, list<FieldClass> fdList){
            this();
            FieldsList = fdList;
            this.fieldTypeName = fdType;
        }
    }
    
    public class FieldClass{
        public string fieldType;
        public string fieldName;
        public boolean isCustom;
        public FieldClass(){
            
        }
        public FieldClass(Schema.SObjectField sObjField){
            fieldType = string.valueOf(sObjField.getdescribe().getType());
            fieldName = string.valueOf(sObjField.getdescribe().getLocalName());
            isCustom =  sObjField.getdescribe().isCustom();
        }
    }
    public class sObjectClass{
        public string sObjectlabel;
        public string sObjectName;
        
        public sObjectClass(){
            
        }
        public sObjectClass(Schema.SObjectType sObj){
            sObjectlabel = string.valueOf(sObj.getDescribe().getLabel());
            sObjectName = string.valueOf(sObj.getDescribe().getName());
            
        }
    }
   
}