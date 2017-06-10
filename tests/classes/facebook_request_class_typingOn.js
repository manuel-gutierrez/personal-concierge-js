let chai = require('chai');
let expect = chai.expect;
const facebookRequest = require('./../../src/classes/facebook_request_class');
const keys = require('./../../keys.js');
const k = keys();
 
describe('#Facebook TypingOn method ', () => {

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
	    	resolve(facebook.typingOn());
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
	    	resolve(facebook.typingOn());
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

	it("Should be Ok 200", function(done) {

		const facebook = new facebookRequest(token, userId);
	    
	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(facebook.typingOn());
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.equal(200);
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});

});

