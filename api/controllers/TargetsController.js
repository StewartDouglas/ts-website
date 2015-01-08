/**
 * TargetsController
 *
 * @description :: Server-side logic for managing Targets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

/**
   * `TargetsController.all()`
   */
  all: function (req, res) {

    Targets.find()
      .exec(function(err,results){
            if(err){
              console.log('Error searching for all targets');
            }
            return res.json(
              results
            );
      });
  },

  /**
   * `TargetsController.pep()`
   */
  peps: function (req, res) {

    Targets.find()
      .where({listType: "PEP"})
      .exec(function(err,results){
            if(err){
              console.log('Error searching for PEPs');
            }
            return res.json(
              results
            );
      });
  },

  /**
   * `TargetsController.watchlist()`
   */
  watchlists: function (req, res) {

    Targets.find()
      .where({listType: "Watchlist"})
      .exec(function(err,results){
            if(err){
              console.log('Error searching the Watchlist');
            }
            return res.json(
              results
            );
      });

  },

  /**
   * `TargetsController.search()`
   */


   search: function (req, res){

      var search_input = new Array();
      //console.log(req);
      search_input = req.query.names.split(" ");
      console.log(search_input);

      var params = new Object();
      if(search_input.length > 1){
        params.first_name = search_input[0];
        params.last_name = search_input[search_input.length-1];
      } else if (search_input.length = 1){
        params.last_name = search_input[0];
      }

      console.log(params);

      require('request')
        .post({url:'https://api.teamtradesafe.com/v1/targets', form: params}, 
          function(err, httpResponse, body){
            if(err) return err;
            if(httpResponse.statusCode == 200){
              //console.log(body);
              return res.json(body);
            } else {
              var err = new Error('API responded with status code: ' + httpResponse.statusCode);
            }
          }); 

   } // search 


/*
  _config: {
    actions: false,
    shortcust: false,
    rest: false
  }
*/
};

