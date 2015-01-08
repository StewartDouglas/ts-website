var search_string = 'Cameron';

var search_input = new Array();
search_input = search_string.split(" ");
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