/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'new': function(req,res){
		res.view();
	}, // new

	create: function(req,res,next){

	    var userObj = {
		      first_name: req.param('first_name'),
		      last_name: req.param('last_name'),
		      email: req.param('email'),
		      password: req.param('password'),
		      confirmation: req.param('confirmation')
   		 }

		User.create( userObj, function userCreated(err,user){

			if(err) {

				console.log(err);
				// req.session.flash = {
				// 	err:err
				// }

				return res.redirect('/user/new');

			}

			// res.json(user);
			// req.session.flash = {}; 
			res.redirect('/user/show/'+user.id);

		});

	}, // create

	show: function(req,res,next){
		User.findOne(req.param('id'),function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next();
			console.log(user);
			res.view({
				user:user
			});
		});
	} // show

};

