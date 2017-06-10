let chai = require('chai');
let expect = chai.expect;
const esRequest = require('./../../src/classes/elastic_search_user_class');
const keys = require('./../../keys.js');
const k = keys();

describe('#Elastic  GET User ', () => {

	const userAuth = k.elastic.userAuth; 
	const password = k.elastic.password;
	const userId = "1200553030013011";
	
	it('should create a object for a new connection', ()=>{
		let user = new esRequest(userAuth, password); 
		expect(user).not.be.undefined; 
	})

	it("Should get user data object", function(done) {

		let user = new esRequest(userAuth, password); 

	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(user.get(userId));
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.equal(200);
	        expect(result).to.be.an('object');
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});

	it("Should fail (404) when user is not found.", function(done) {

		let user = new esRequest(userAuth, password); 

	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(user.get("123213"));
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.equal(404);
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});
}); 


describe('#Elastic  Create an user ', () => {
	const userAuth = k.elastic.userAuth; 
	const password = k.elastic.password;
	const userId = "1200553030013011";

	it("Should create a new User", function(done) {

		let user = new esRequest(userAuth, password); 
		const userData = {
          "user_first_name": "John testing",
          "user_last_name": "Doe",
          "profile_pic": "https://scontent.xx.fbcdn.net/v/t1.0-1/12743593_10155993023036980_7180088341040324243_n.jpg?oh=ddc7bc0deaf945b5ef7f24ed51be5370&oe=59838F61",
          "locale": "en_US",
          "user_timezone": "-5",
          "gender": "",
          "user_id": "1200553030013012",
          "bot_language": "en",
          "bot_platform": "facebook",
          "bot_app": "DEN",
          "country": "US",
          "first_session": "3f9ded46-ef3b-49fe-af4d-a457ce1b2382",
          "last_session": "9337622d-5ff6-456b-8c8d-d0c7c32f59fd",
          "creation_timestamp": "2017-03-28T02:20:30.054Z"
        }
	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(user.create(userData));
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.equal(201); 
	        expect(result.body["_id"]).to.not.be.empty;
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});


	it("Should fail to create a new user when no user data is present.", function(done) {

		let user = new esRequest(userAuth, password); 
		const userData = {}
	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(user.create(userData));
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.equal(400); // created 
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});

	it("Should fail when the user data is incomplete", (done) => {
		
		let user = new esRequest(userAuth, password); 
		const userData = {
		  "user_first_name": "",
          "user_last_name": "Doe",
          "profile_pic": "https://scontent.xx.fbcdn.net/v/t1.0-1/12743593_10155993023036980_7180088341040324243_n.jpg?oh=ddc7bc0deaf945b5ef7f24ed51be5370&oe=59838F61",
          "locale": "en_US",
          "user_timezone": "-5",
          "gender": "male",
          "user_id": "1200553030013012",
          "bot_language": "en",
          "bot_platform": "facebook",
          "bot_app": "DEN",
          "country": "US",
          "first_session": "3f9ded46-ef3b-49fe-af4d-a457ce1b2382",
          "last_session": "9337622d-5ff6-456b-8c8d-d0c7c32f59fd",
          "creation_timestamp": "2017-03-28T02:20:30.054Z"
		}
	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(user.create(userData));
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.equal(400); // created 
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});

});

describe('#Elastic  Update an user ', () => {
	const userAuth = k.elastic.userAuth; 
	const password = k.elastic.password;
	const userId = "1200553030013011";

	it("Should update an user session data", function(done) {

		let user = new esRequest(userAuth, password); 
		const userId = "AVxcfEiN3V3uGLKI83n-";
		const userData = {
          "last_session": "9asdsadsadasdd"
        }
	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(user.update(userData, userId));
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.equal(200); // created 
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});
	it("Should fail (400) update an user if no user data is present or empty", function(done) {

		let user = new esRequest(userAuth, password); 
		const userId = "AVxcZ_3X3V3uGLKI83lu";
		const userData = {
         
        }
	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(user.update(userData, userId));
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.equal(400); // created 
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});
	it("Should fail (404) update an user if no userId is provided", function(done) {

		let user = new esRequest(userAuth, password); 
		const userId = "";
		const userData = {
	     "id" : "sdadsada"
	    }
	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(user.update(userData, userId));
	    });

		testPromise
		.then((result) => {
	        //Show the assertion ok
	        expect(result.statusCode).to.equal(404); // created 
	        done()
	    })
	    .catch((error) => {
	    	// show assertion error
	    	done(error);
	    })
	});
});
describe('#Elastic Delete an user', () => {

    const userAuth = k.elastic.userAuth; 
	const password = k.elastic.password;
	const userId = "1200553030013011";

	it('Should delete an user', (done)=>{
		let user = new esRequest(userAuth, password); 
		const userId = "AVxcZW8Q3V3uGLKI83la";

	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(user.delete(userId));
	    });

		testPromise
		.then((result) => {

	        expect(result.statusCode).to.equal(200); // created 
	        done()
	    })
	    .catch((err) => {

	    	done(err);
	    })	
	});
	it('Should fail when no user is present.', (done)=>{
		let user = new esRequest(userAuth, password); 
		const userId = "";

	    let testPromise = new Promise(function(resolve, reject) {
	    	resolve(user.delete(userId));
	    });

		testPromise
		.then((result) => {
			
	        expect(result.statusCode).to.equal(400); // created 
	        done()
	    })
	    .catch((err) => {

	    	done(err);
	    })	
	});

});

