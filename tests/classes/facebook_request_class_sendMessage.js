let chai = require('chai');
let expect = chai.expect;
const facebookRequest = require('./../../src/classes/facebook_request_class');
const keys = require('./../../keys.js');
const k = keys();
 
describe('#Facebook sendMessage method ', () => {
    
    let token = k.facebook.token;
	let userId = k.facebook.userId;
	 


	it('Should Create a new object', function(){

		const facebook = new facebookRequest(token, userId);
		expect(facebook).not.be.undefined;
		expect(facebook).that.is.an('object');
	 
	 });

	it("Should fail on bad access token error 400", function(done) {

		let badToken = "aiosdhasidj"
		const facebook = new facebookRequest(badToken, userId);

	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(facebook.sendMessage());
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.equal(400);
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});

	it("Should fail on bad user Id statusCode 400", function(done) {

		badUserId = "12312312"
		const facebook = new facebookRequest(token, badUserId);
	    
	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(facebook.sendMessage());
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.equal(400);
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});

	it("Message object should exist. ", function(done) {

		const facebook = new facebookRequest(token, userId);
	    
	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(facebook.sendMessage());
	    });

		testPromise
		.then((result) => {
	        //Show the assertion error
	        let err = JSON.parse(result.body);
	        expect(err.error.message).to.eql("(#100) Must send either message or state");
	        expect(result.statusCode).to.eql(400);
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});
	it("Should send a message object and return ok 200", function(done) {

		const facebook = new facebookRequest(token, userId);
	    const messageObject = {
	    	text: "Hello, world!"
	    };


	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(facebook.sendMessage(messageObject));
	    });

		testPromise
		.then((result) => {
			const responseBody  = JSON.parse(result.body);

	        expect(result.statusCode).to.eql(200);
	        expect(responseBody.recipient_id).to.eql(userId);
	        expect(responseBody.message_id).not.to.be.undefined;
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});


});

