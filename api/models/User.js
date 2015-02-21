/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  adapter: 'someMysqlServer',

  attributes: {

  	first_name: {
  		type: 'string',
  		required: true
  	},

  	last_name: {
  		type: 'string',
   		required: true 		
  	},

    organisation: {
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

    online: {
      type: 'boolean',
      defaultsTo: false
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
  }, // attributes

    beforeCreate: function(values,next){
      if(!values.password || values.password != values.confirmation){
        return next({err: ["Password doesn't match password confirmation."]});
      }

      require('bcrypt').hash(values.password,10, function passwordEncrypted(err, encrypted_pass){
        if(err) return next(err);
        //console.log('GOT HERE');
        values.encrypted_password = encrypted_pass;
        //values.online = true;
        next();
      });
    } 
};

