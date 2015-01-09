function search (query){

	$.get('/targets/search', {names: query}, function(response){
		console.log(response);
		var data = JSON.parse(response);

		// display results
		var result = formatResult(data);
		console.log(result);
		populateTable('searchResult', result)	;
	})

	function formatResult(input){
		console.log(input);
		//TODO: add error checking for empty response
		var values = input[0];
		var result = Object();
		result.name = values.first_name + " " + values.last_name;
		if(values.nationality !== undefined){
			result.country = values.nationality;
		}

		if(values.list_type.indexOf("PEP") > -1){
			result.type = "Politically Exposed Person";
			result.alert_flag = 0;
		} else {
			result.type = "Sanction List";
			result.alert_flag = 1;
		}

		result.position = getPosition(input);

		result.uri = values.uri;

		return result;
	}

	function getPosition(input){
		var result;
		var positions = Array();
		input.forEach(function(item){
			if(item.position !== undefined){
				positions.push(item.position);
			}
		});

		result = positions[0];

		positions.forEach(function(position){
				if(position.length < result.length){
					result = position;
				}
		});

		return result;
	}

	function populateTable(tableID, values){
		var table = $('#' + tableID);
		$(table).empty();

		//first row
		var row = "<tr><td><p>Name: <b>" + values.name + "</b></p></td><td><p>List Type: " + values.type + "</p></td><td><p><a href=" + values.uri + ">More Info</a></td></tr>";
		$(table).append(row);

		//second row
		row = "<tr>";
		if(values.country !== undefined){
			row += "<td><p>Country: " + values.country + "</p></td>";
		}

		if(values.position !== undefined){
			row += "<td><p>Position: " + values.position + "</p></td>";
		}

		row += "</tr>";

		$(table).append(row);

		$('.searchResultDiv').css({'visibility':'visible'});

		//default color is green
		var color = '#B1E6AA';

		if(values.alert_flag){
			//color red if person is on a sanction list
			color = '#EA8485';
		}

		$('.searchResultDiv').css({'background-color':color});

		// display all rows of values object
		// for (var prop in values) {
		// 	console.log(values[prop]);
		// 	if(values[prop] !== undefined){
		// 		var row = "<tr><td>" + prop +  ": " + values[prop] + "</td></tr>";
		// 		$(table).append(row);
		// 	}
		// }

	}
}

$('#searchBox').keypress(function(e){
	if(e.keyCode==13){
		search($('#searchBox').val())
	}
});
