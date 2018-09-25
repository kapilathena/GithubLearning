public class fieldSetController {
    public list<WrrapperClass> WrrapperClasslist;
    public fieldSetController(){
        WrrapperClasslist = new list<WrrapperClass>();
    }
    @RemoteAction
    public static WrrapperClass fatchFieldSetData(string objectName){
        string fildSetName;
        if(objectName == 'Contact'){
            fildSetName = 'FieldTest';
        }
        else if(objectName == 'Account'){
            fildSetName = 'AccountFieldSet';
        }
        WrrapperClass wc = new WrrapperClass();
        String listType = 'List<' + objectName + '>';
    	List<SObject> castRecords = (List<SObject>)Type.forName(listType).newInstance();
        Map<String, Schema.SObjectType> GlobalDescribeMap = Schema.getGlobalDescribe(); 
        Schema.SObjectType SObjectTypeObj = GlobalDescribeMap.get(objectName);
        Schema.DescribeSObjectResult DescribeSObjectResultObj = SObjectTypeObj.getDescribe();
        
        system.debug('====>' + DescribeSObjectResultObj.FieldSets.getMap().get(fildSetName));
        
        Schema.FieldSet fieldSetObj = DescribeSObjectResultObj.FieldSets.getMap().get(fildSetName);
        List<Schema.FieldSetMember> fieldSetMemberList =  fieldSetObj.getFields();
        System.debug(fieldSetMemberList);
         String query = 'SELECT ';
        
        for(Schema.FieldSetMember f : fieldSetMemberList) {
            query += f.getFieldPath() + ', ';
            wc.fieldList.add(f.getFieldPath());
        }
        query += 'id from '+objectName;
        System.debug(''+query);
        castRecords = Database.query(query); 
        System.debug(''+castRecords);
        for(Sobject sbj:castRecords){
            wc.sobjList.add(sbj);
        }
        return wc;
    }
    
    public class WrrapperClass{
        list<string> fieldList ;
        list<Sobject> sobjList;
        public WrrapperClass(){
            fieldList = new list<string>();
            sobjList = new list<Sobject>();
        }
    }
    
    
}