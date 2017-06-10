let chai = require('chai');
let expect = chai.expect;
const esRequest = require('./../../src/classes/elastic_search_log_class');
const keys = require('./../../keys.js');
const k = keys();

describe('#Elastic  create a conversation object. ', () => {
	
	const userAuth = k.elastic.userAuth; 
	const password = k.elastic.password;
	const userId = "1200553030013011";
	
	it('should create a object for a new connection', ()=>{
		let log = new esRequest(userAuth, password, "conversation"); 
		expect(log).not.be.undefined;
		expect(log.error).be.undefined;

	})
}); 
describe('#Elastic create a conversation log entry . ', () => {
	
	const userAuth = k.elastic.userAuth; 
	const password = k.elastic.password;
	const userId   = "1200553030013011";
	const sessionId = "123123123123123"
	
	it('should create new conversation log entry', (done)=>{
		
		let log = new esRequest(userAuth, password, "conversation"); 
		let testPromise = new Promise(function(resolve, reject) {
	    	resolve(log.create(sessionId));
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.eql(200);
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    });

	})
}); 



