let chai = require('chai');
let expect = chai.expect;
const apiAiRequest = require('./../../src/classes/api_ai_request_class');
const keys = require('./../../keys.js');
const k = keys();

describe('#apiAi request',() => {

	const bearerToken = k.apiAi.bearerToken;
	const sessionId = "1231232nvnddd22212313";

	it('should create an object', () => {
	 const apiAi = new apiAiRequest(bearerToken);
	 expect(apiAi).to.be.an('object');
	})

	it("Should fail on bad access token : error 401 unauthorized", function(done) {

			let badToken = "aiosdhasidj"
			const apiAi = new apiAiRequest(badToken);
			const body = JSON.stringify ( {
		        "query": "blbla", 
		        "lang":"en", 
		        "sessionId" : sessionId
		     } );
		    
		    let testPromise = new Promise(function(resolve, reject) {
		    	resolve(apiAi.query(body));
		    });

			testPromise
			.then((result) => {
		        //Show the assertion ok
		        expect(result.statusCode).to.equal(401);
		        done();
		    })
		    .catch((error) => {
		    	// show assertion error
		    	done(error);
		    })
		});


	it("Should fail when there is no sessionId : error 400 bad request", function(done) {

			const apiAi = new apiAiRequest(bearerToken);
			const body = JSON.stringify ( {
		        "query": "blbla", 
		        "lang":"en", 
		        // here should be a session Id
		     } );
		    
		    let testPromise = new Promise(function(resolve, reject) {
		    	resolve(apiAi.query(body));
		    });

			testPromise
			.then((result) => {
		        //Show the assertion ok
		        expect(result.statusCode).to.equal(400);
		        done();
		    })
		    .catch((error) => {
		    	// show assertion error
		    	done(error);
		    })
		});

	it("Should fail when there is no query : error 400 bad request", function(done) {

			const apiAi = new apiAiRequest(bearerToken);
			const body = JSON.stringify ( { 
		        "lang":"en", 
		        "sessionId": sessionId
		     } );
		    
		    let testPromise = new Promise(function(resolve, reject) {
		    	resolve(apiAi.query(body));
		    });

			testPromise
			.then((result) => {
		        //Show the assertion ok
		        expect(result.statusCode).to.equal(400);
		        done();
		    })
		    .catch((error) => {
		    	// show assertion error
		    	done(error);
		    })
		});

	it("Should fail when there is no lang param: error 400 bad request", function(done) {

			const apiAi = new apiAiRequest(bearerToken);
			const body = JSON.stringify ( { 
		        "query" : "asdasdasdas",
		        "sessionId": sessionId
		     } );
		    
		    let testPromise = new Promise(function(resolve, reject) {
		    	resolve(apiAi.query(body));
		    });

			testPromise
			.then((result) => {
		        //Show the assertion ok
		        expect(result.statusCode).to.equal(400);
		        done();
		    })
		    .catch((error) => {
		    	// show assertion error
		    	done(error);
		    })
		});

	it("Should return an intent object response", function(done) {

			const apiAi = new apiAiRequest(bearerToken);
			const body = JSON.stringify ( { 
		        "query" : "asdasdasdas",
		        "lang" : "en",
		        "sessionId": sessionId
		     } );
		    
		    let testPromise = new Promise(function(resolve, reject) {
		    	resolve(apiAi.query(body));
		    });

			testPromise
			.then((result) => {
		        //Show the assertion ok
		        r = JSON.parse(result.body);
		        expect(result.statusCode).to.equal(200);
		        expect(r.result).to.be.an('object');

		        done();
		    })
		    .catch((error) => {
		    	// show assertion error
		    	done(error);
		    })
		});

	it("query should be the same as resolved query", function(done) {

			const apiAi = new apiAiRequest(bearerToken);
			const body =  { 
		        "query" : "asdasdasdas",
		        "lang" : "en",
		        "sessionId": sessionId
		     } ;
		    
		    let testPromise = new Promise(function(resolve, reject) {
		    	resolve(apiAi.query(JSON.stringify(body)));
		    });

			testPromise
			.then((result) => {
		        //Show the assertion ok
		        r = JSON.parse(result.body);
		        expect(result.statusCode).to.equal(200);
		        expect(r.result.resolvedQuery).to.eql(body.query);
		        
		        done();
		    })
		    .catch((error) => {
		    	// show assertion error
		    	done(error);
		    })
		});

	it("query should respond faq_not_found when a faq question is not asked", function(done) {

			const apiAi = new apiAiRequest(bearerToken);
			const body =  { 
		        "query" : "asdasdasdas",
		        "lang" : "en",
		        "sessionId": sessionId
		     } ;
		    
		    let testPromise = new Promise(function(resolve, reject) {
		    	resolve(apiAi.query(JSON.stringify(body)));
		    });

			testPromise
			.then((result) => {
		        //Show the assertion ok
		        r = JSON.parse(result.body);
		        expect(result.statusCode).to.equal(200);
		        expect(r.result.action).to.eql("faq_not_found");
		        done();
		    })
		    .catch((error) => {
		    	// show assertion error
		    	done(error);
		    })
		});
	it("query should not respond faq_not_found when a faq question is  asked", function(done) {

			const apiAi = new apiAiRequest(bearerToken);
			const body =  { 
		        "query" : "Where is the Airport?",
		        "lang" : "en",
		        "sessionId": sessionId
		     } ;
		    
		    let testPromise = new Promise(function(resolve, reject) {
		    	resolve(apiAi.query(JSON.stringify(body)));
		    });

			testPromise
			.then((result) => {
		        //Show the assertion ok
		        r = JSON.parse(result.body);
		        expect(result.statusCode).to.equal(200);
		        expect(r.result.action).not.to.eql("faq_not_found");
		        expect(r.result.score).to.be.above(0.7);
		        done();
		    })
		    .catch((error) => {
		    	// show assertion error
		    	done(error);
		    })
		});




});