/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

  	first_name: {
  		type: 'string',
  		required: true
  	},

  	last_name: {
  		type: 'string',
   		required: true 		
  	},

  	email: {
  		type: 'string',
   		required: true,
   		unique: true 		
  	},

  	encrypted_password: {
  		type: 'string'
  	},

  	// executed before any data sent to client
  	toJSON: function(){
  		var obj = this.toObject();
  		delete obj.password;
  		delete obj.confirmation;
  		delete obj.encrypted_password;
  		delete obj._csrf;
  		return obj;
  	}

  }
};

