let request = require('request');
/*
Class: apiAi Request
This Class create a apiAi object to query the Api.ai rest app. 
*/

class apiAiRequest {
 
	constructor(bearerToken) {
		this.options = {
	        method: 'POST',
	        url: 'https://api.api.ai/v1/query?v=20150910',
	        headers : {
	        	'Content-type': 'application/json', 
	        	'Authorization' : `Bearer ${bearerToken}`
	        }
       	}	
	}

	//Query an Intent
	query(body) {
		let opts = this.options;
		opts.body = body;
		let r = new Promise ((resolve,reject) => {
		     request(opts, (err, res, body) => {
		   		if (res.statusCode === 200) {
		   			resolve (this.resolveOk(res.statusCode, body));
		   		} else {
		   			reject(this.resolveError(err, res.statusCode, body));
		   		}
		     });
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
}

module.exports = apiAiRequest;