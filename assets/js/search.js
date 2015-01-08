function search (query){

	$.get('/targets/search', {names: query}, function(response){
		console.log(response);
		// update results div

	})

}