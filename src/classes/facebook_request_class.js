let request = require('request');
/*
Class: facebookRequest
This Class create a facebookRequest object to query the facebook graph Api. 
*/

class facebookRequest {
 
	constructor(accessToken,userId) {
		this.options = {
	        method: 'POST',
	        url: `https://graph.facebook.com/v2.6/me/messages?access_token=${accessToken}`,
	        headers : {"Content-type": "application/json"}
       	}	
		this.userId = userId;
	}
	// Typing on animation
	typingOn() {
		this.options.body = JSON.stringify ( {"recipient": { "id" : this.userId }, "sender_action":"typing_on" } )
		const opts = this.options
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
	// Typing off animation
	typingOff() {
		this.options.body = JSON.stringify ( {"recipient": { "id" : this.userId }, "sender_action":"typing_off" } )
		const opts = this.options
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
	// Mark seen animation
	markSeen() {
		this.options.body = JSON.stringify ( {"recipient": { "id" : this.userId }, "sender_action":"mark_seen" } )
		const opts = this.options
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

	// Send a message object to the user. 
	sendMessage(messageObject) {
		this.options.body = JSON.stringify ( {"recipient": { "id" : this.userId }, "message": messageObject  } )
		const opts = this.options
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



	resolveOk(statusCode,body) {
		let response = {
			statusCode: statusCode, 
			body:body 
	   	};
	   			
		return response;
	}

	resolveError(err,statusCode,body) {
	    let error = {
			statusCode: statusCode, 
			body:body, 
			error: err
	   	};
		return error;
	}

	
}

module.exports = facebookRequest;