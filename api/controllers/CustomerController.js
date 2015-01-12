/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	create: function(req,res){

		console.log('req.session.User.id: ' + req.session.User.id);
		console.log('req.param(\'customer_id\'): ' + req.param('customer_id'));

		var customerObj = {
		 	customer_id: req.param('customer_id'),
		 	first_name: req.param('first_name'),
		 	last_name: req.param('last_name'),
		 	alert_flag: req.param('alert_flag'),
		 	uri: req.param('uri'),		 			 			 			 	
		 	user_id: req.session.User.id
		}

		console.log(customerObj);

		Customer.create(customerObj, function(err,customer){
	        
	        // If there's an error
	    	if (err) {
	        	console.log(err);
	        	req.session.flash = {
	        	  err: err
	       		}
			}
		})

		// res.redirect('/user/search/'+req.session.User.id);
		//res.redirect('/user/search/'+req.session.User.id);
		// res.statusCode = 200;
		// res.end();
	},

	list: function(req,res){
	
		var qry = "SELECT * FROM customer WHERE user_id = " + req.session.User.id;

		Customer.query(qry,function(err,results){
			if(err){
				res.serverError();
				return	
			} else {
				res.send(results);
			}

		});

		//Customer.find()


	}



};

