//Documentation (ReportEvents.txt) for Reporting.js is in the Documentation folder of the GIT repository.

class Reporting {
	
	log(code,cID,aID,typ, amnt)
	{
		var eventS = '';
		var data = {};
		var timestmp = Math.round(+new Date());
		
                switch(code) {
			case '1':
				eventS = "Added Client";
				data = {event: eventS, timestamp: timestmp, clientID: cID, accountID: -1, type: "-1", amount: amnt};
				break;
			case '2':
				eventS = "Client Accounts Requested";
				data = {event: eventS, timestamp: timestmp, clientID: cID, accountID: -1, type: "-1", amount: -1};
				break;
			case '3':
				eventS = "Account Balance Requested";
				data = {event: eventS, timestamp: timestmp, clientID: -1, accountID: aID, type: "-1", amount: -1};
				break;
			case '4':
				eventS = "Mini Statement Requested";
				data = {event: eventS, timestamp: timestmp, clientID: -1, accountID: aID, type: "-1", amount: -1};
				break;
                        case '5':
				eventS = "Withdrawel";
				data = {event: eventS, timestamp: timestmp, clientID: -1, accountID: aID, type: "-1", amount: amnt};
				break;
			case '6':
				eventS = "Deposit";
				data = {event: eventS, timestamp: timestmp, clientID: -1, accountID: aID, type: "-1", amount: amnt};
				break;
                        case '7':
                                eventS = "Client and Account Created";
                                data = {event: eventS, timestamp: timestmp, clientID: cID, accountID: aID, type: typ, amount: -1};
                                break;
			case '8':
				eventS = "Client Deactivation Requested by CIS";
				data = {event: eventS, timestamp: timestmp, clientID: cID, accountID: -1, type: "-1", amount: -1};
				break;
			case '9':
				eventS = "Client Reactivation Requested by CIS";
				data = {event: eventS, timestamp: timestmp, clientID: cID, accountID: -1, type: "-1", amount: -1};
				break;
                        
                                
                        }
                //data = {event: eventS, timestamp: timestmp, clientID: cID, accountID: aID, type: typ, amount: -1};
		this.saveEvent(data);
	}
	

	
	saveEvent(data)
	{
		var numLines = 0;
		var dataS = JSON.stringify(data)+"\n";
                
                //post to reporting sub system
		
		const axios = require('axios');
		
		axios.post('https://fnbreports-6455.nodechef.com/api', {
			system: 'CAS',
			data: dataS
		})
		.then((res) => {
			console.log('statusCode: ${res.statusCode}')
			console.error(res)
		})
		.catch((error) => {
			console.error(error)
		})
		
		console.log('Log Posted');
                
              
	}
	
}

module.exports = Reporting;
