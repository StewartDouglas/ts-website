function search (query){

	$.get('/targets/search', {names: query}, function(response){
		console.log(response);
		var data = JSON.parse(response);

		// display results
		var result = formatResult(data);
		console.log(result);
		// $('#searchResult').html("<p>"+ result + "<p/>");
		populateTable('searchResult', result)	;
	})

	function formatResult(input){
		var values = input[0];
		var result = Object();
		result.name = values.first_name + " " + values.last_name;
		if(values.list_type.indexOf("PEP") > -1){
			result.type = "Politically Exposed Person";
		} else {
			result.type = "Sanction List";
		}
		return result;
	}

	function populateTable(tableID, values){
		var table = $('#' + tableID);
		$(table).empty();

		for (var prop in values) {
			console.log(values[prop]);
			var row = "<tr><td>" + prop + "</td><td>" + values[prop] + "</td></tr>";
			$(table).append(row);
		}
	}
}
