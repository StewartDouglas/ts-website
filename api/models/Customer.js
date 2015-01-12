/**
* Customer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

  	id: {
  		type: 'integer',
  		primaryKey: true
  	},

  	customer_id: {
  		type: 'string',
  		required: true
  	},

  	user_id: {
  		type: 'integer',
  		required: true
  	},

    first_name: {
      type: 'string'
    },

    last_name: {
      type: 'string'
    },

    alert_flag: {
      type: 'boolean'
    },

    uri: {
      type: 'string'
    }    


   },
  
  // autoPK:false // allows us to specify our own primary key

};

