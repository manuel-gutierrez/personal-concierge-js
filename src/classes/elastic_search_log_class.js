let request = require('request');
/*
Class: Elastic Search logging CRUD
This Class create delete and update and a log entry on elastic search using the conversation index.
*/


class elasticUser {
 
	constructor(userAuth, password, type) {
		
		if (type && userAuth && password ) {
			this.options = {
	        url: `https://e1822f0b7e239bcc6dab870f135bb256.us-east-1.aws.found.io:9243/conversations/${type}`,
	        headers : {
	        	'Content-type': 'application/json'
	        }
       	};
       		this.userAuth = userAuth; 
       		this.password = password;	
		} else {
			return this.resolveError("bad_request","400","Bad Request: Invalid Parameters"); 
		}
	}

	//Get an user Id. Note: Rquest default is GET so no method is specified.
	get(userId) {
		let opts = this.options;
		opts.url = opts.url+"_search";
		let r = new Promise ((resolve,reject) => {
		     request(opts, (err, res, body) => {
		   		if (res.statusCode === 200) {
		   			
		   			if ( JSON.parse(body).hits.total > 0 ) {
		   				const userData = JSON.parse(body).hits.hits[0]._source;
		   				resolve(this.resolveOk(res.statusCode, userData));	
		   			} else {
		   				reject(this.resolveError("user_not_found",404, "User was not found."));
		   			}
		   			
		   		} else {
		   			reject(this.resolveError(err, res.statusCode, body));
		   		}
		     }).auth(this.userAuth, this.password, false);
		});

	    return r.then((data) => {
	    	return data; 
	    })
	    .catch((err) => {
	    	return err;
	    })
	}	

	// POST Create an User. 
	create(userData) {
		let opts = this.options;
		opts.method  = 'POST';
		if (Object.keys(userData).length > 0) {
			const validation = this.validateData(userData);
			if (validation.status){
				opts.body = JSON.stringify(userData);
			} else {
				return (this.resolveError("parameter_missing", 400, `Bad Request : The parameter ${validation.property} is empty`));
			}			
		} else {
			return (this.resolveError("no_user_data", 400, "Bad Request : User data is empty"));
		}
	

		let r = new Promise ((resolve,reject) => {
		     request(opts, (err, res, body) => {
		   		if (res.statusCode === 201) {
		   			resolve(this.resolveOk(res.statusCode, JSON.parse(body)));	
		   		} else {
		   			reject(this.resolveError(err, res.statusCode, body));
		   		}
		     }).auth(this.userAuth, this.password, false);
		});

	    return r.then((data) => {
	    	return data; 
	    })
	    .catch((err) => {
	    	return err;
	    })
	}

	// POST Update an User the id is the uuid stored on elastic : _id . 
	update(userData,userId) {
		
		let opts = this.options;
		opts.method  = 'POST';
		opts.url = `https://e1822f0b7e239bcc6dab870f135bb256.us-east-1.aws.found.io:9243/users/user/${userId}/_update`;
		
		if (Object.keys(userData).length > 0) {
			opts.body = {
				"doc":userData
			} ;
			opts.body = JSON.stringify(opts.body);
		} else {
			return (this.resolveError("no_user_data", 400, "Bad Request : User data is empty"));
		}
	
		let r = new Promise ((resolve,reject) => {
		     request(opts, (err, res, body) => {
		   		if (res.statusCode === 200) {
		   			resolve(this.resolveOk(res.statusCode, JSON.parse(body)));	
		   		} else {
		   			reject(this.resolveError(err, res.statusCode, body));
		   		}
		     }).auth(this.userAuth, this.password, false);
		});

	    return r.then((data) => {
	    	return data; 
	    })
	    .catch((err) => {
	    	return err;
	    })
	}

	// DELETE Delete an User. The id is the uuid stored on elastic : _id . 
	delete(userId) {
		
		let opts = this.options;
		opts.method  = 'DELETE';
		opts.url = `https://e1822f0b7e239bcc6dab870f135bb256.us-east-1.aws.found.io:9243/users/user/${userId}/`;
		// if userID is empty -> fail
		if (!userId) {
			return (this.resolveError("empty_user_id", 400, "Bad Request : User id is empty"));
		} 

		let r = new Promise ((resolve,reject) => {
		     request(opts, (err, res, body) => {
		   		if (res.statusCode === 200) {
		   			resolve(this.resolveOk(res.statusCode, JSON.parse(body)));	
		   		} else {
		   			reject(this.resolveError(err, res.statusCode, JSON.parse(body)));
		   		}
		     }).auth(this.userAuth, this.password, false);
		});

	    return r.then((data) => {
	    	return data; 
	    })
	    .catch((err) => {
	    	return err;
	    })
	}

	// Resolve ok function 
	resolveOk(statusCode,body) {
		let response = {
			statusCode: statusCode, 
			body:body
	   	};
	   			
		return response;
	}

	// Resolve and error function
	resolveError(err,statusCode,body) {
	    let error = {
			statusCode: statusCode, 
			body:body, 
			error: err
	   	};
		return error;
	}

	//Validate user Data 
	validateData (userObject) {
		const properties = ["user_first_name", "user_id", "first_session", "creation_timestamp"]
		let result = { 
			status: true, 
		}
		properties.forEach((property) => {
			if(!userObject[property]) {
				result  = { 
					status: false, 
					property: property
				};
			}
		});

		return(result);

			
	}
}

module.exports = elasticUser;