global class inBoundEmailHandler implements Messaging.InboundEmailHandler {
	  global Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email, Messaging.InboundEnvelope envelope) {
		  Messaging.InboundEmailResult result = new Messaging.InboundEmailresult();
		  string subjectTemp = 'lead# please create';
		  
		  System.debug('<<<<<<<<<<<<howto'+email);
		  System.debug('howto'+envelope);
		  string[] str = email.subject.split(' ');
		  subjectTemp += ' '+str[3];
		  		System.debug('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'+str);
		  		System.debug('+++++++++++'+subjectTemp+'----------'+email.subject);
		  if(subjectTemp == email.subject){
		  	//contact con = [select id from contact where email=:email.subject];
		  	System.debug('!!!!!!!!!');
		  	Account acc = new Account(); 
		  	
		  	try{
		  		  acc = [select id from account where account.name=:str[3] limit 1];
		  	}
		  	catch(exception e){
		  		acc = null;
		  	}
		  	System.debug('@@@@@@@@@@@'+acc);
		  	if(acc != null){
		  		System.debug('contactToAdd'+acc);
		  		Opportunity opp = new Opportunity();
				opp.CloseDate=date.today().addMonths(2);
				opp.Name='test opp';
				opp.StageName='IsWon';
				opp.AccountId = acc.id;
				insert opp;
			  	
			  	System.debug('lead is creted'+opp);
			  	//Email messageing
			  	
			  	EmailMessage em = new EmailMessage();
			  	em.FromAddress = 'ashish.vaishnav@athenalogics.com';
			  	em.Headers = string.valueOf(email.headers);
			  	em.Incoming = true;
			  	em.RelatedToId = opp.id;
			  	em.Status = '0';
			  	em.Subject = email.subject;
			  	em.TextBody = email.plainTextBody; 
			  	em.ToAddress = 'emailhandler@l-247kpnfp31oyeuknvob3myyr7k8g3vy0qoul6i3tz20ebnjs02.6f-2unxxuak.ap4.apex.salesforce.com';
			  	if(em != null){
			  		insert em;
			  	}
			  	//,,,,,,,
			  	//send mail
			  	string body = 'Year opportunity is created. Your opportunity id is'+opp.id;
			  	string sendTo = email.fromAddress;
			  	string sujectToReply = 'Lead confirmation';
			  	system.debug('body'+body+'sendto'+sendTo+'hjhjghj'+sujectToReply);
			  	EmailManager.sendMail(sendTo,sujectToReply,body);
			  	
		  	}
		  	else {
		  		Account accToAdd = new Account();
		  		accToAdd.Name = str[3];
		  		if(accToAdd != null){
		  			insert accToAdd;
		  		}
		  		System.debug('elseparthaha');
		  		
		  		 
		  		 contact con = new contact();
		  		 string[] name = email.fromName.split(' ');
		  		 con.firstname = name[0];
		  		 con.lastname = name[1];
		  		 con.AccountId = accToAdd.id;
		  		 if(con != null){
		  		 	insert con;
		  		 }
		  		 
		  		Opportunity opp = new Opportunity();
				opp.CloseDate=date.today().addMonths(2);
				opp.Name='test opp';
				opp.StageName='IsWon';
				opp.AccountId = accToAdd.id;
				insert opp;
			  	
			  	EmailMessage em = new EmailMessage();
			  	em.FromAddress = 'ashish.vaishnav@athenalogics.com';
			  	em.Headers = string.valueOf(email.headers);
			  	em.Incoming = true;
			  	em.RelatedToId = opp.id;
			  	em.Status = '0';
			  	em.Subject = email.subject;
			  	em.TextBody = email.plainTextBody; 
			  	em.ToAddress = 'emailhandler@l-247kpnfp31oyeuknvob3myyr7k8g3vy0qoul6i3tz20ebnjs02.6f-2unxxuak.ap4.apex.salesforce.com';
			  	if(em != null){
			  		insert em;
			  	}
			  	string body = 'Year opportunity is created. Your opportunity id is'+opp.id;
			  	string sendTo = email.fromAddress;
			  	string sujectToReply = 'opportunity confirmation';
			  	System.debug('lead is creted'+opp);
			  	system.debug('body'+body+'sendto'+sendTo+'hjhjghj'+sujectToReply);
			  	EmailManager.sendMail(sendTo,sujectToReply,body);
		  	}
		  	
		  }
		  else{ System.debug('Go for another Department');}
          return result;
      }
  }