function search (query){

	$.get('/targets/search', {names: query}, function(response){
		console.log(response);
		var data = JSON.parse(response);

		// display results
		if(data.length > 0){
			var result = formatResult(data);
			console.log(result);
			populateTable('searchResult', result);
		} else {
			clearTable('searchResult');
		}
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

		result.first_name = values.first_name;
		result.last_name = values.last_name;

		result.type = getPersonType(input);

		if(result.type.indexOf("Politically Exposed Person") > -1){
			result.alert_flag = 0;
		} else {
			result.alert_flag = 1;
		}

		result.position = getPosition(input);

		result.uri = values.uri;

		result.id = values.id;

		return result;
	}

	function getPersonType(input){
		var type = "Politically Exposed Person";

		//if the person is on any non-PEP lists then they are a sanction target
		input.forEach(function(item){
			if(item.list_type.indexOf("PEP") == -1){
				type = "Sanction";
			}
		});

		return type;
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
		var row = "<tr><td><p>Name: <b>" + values.name + "</b></p></td><td><p>List Type: <b>" + values.type + "</b></p></td><td><p><a href=" + values.uri + " " + "target='_blank'><b>More Info</b></a></td></tr>";
		$(table).append(row);

		//second row
		row = "<tr>";
		if(values.country !== undefined){
			row += "<td><p>Country: <b>" + values.country + "</b></p></td>";
		}

		if(values.position !== undefined){
			row += "<td><p>Position: <b>" + values.position + "</b></p></td>";
		} else {
			row += "<td></td>"
		}

		row += "<td><input value=\"Add Customer\" type=\"submit\" class=\"btn btn-primary\"></td>"; // add check box

		row += "</tr>";

		$(table).append(row);

		$('.searchResultDiv').css({'visibility':'visible'});

		//default color is green
		var color = '#B1E6AA';

		if(values.alert_flag){
			//color red if person is on a sanction list
			color = '#EA8485';
		}

		console.log(values.id);
		$('#customer_create_form').append("<input type=\"hidden\" id=\"customer_id\" name=\"customer_id\" value='" + values.id + "'></input>");
		$('#customer_create_form').append("<input type=\"hidden\" id=\"first_name\" name=\"first_name\" value='" + values.first_name+ "'></input>");
		$('#customer_create_form').append("<input type=\"hidden\" id=\"last_name\" name=\"last_name\" value='" + values.last_name+ "'></input>");
		$('#customer_create_form').append("<input type=\"hidden\" id=\"alert_flag\" name=\"alert_flag\" value='" + values.alert_flag+ "'></input>");
		$('#customer_create_form').append("<input type=\"hidden\" id=\"uri\" name=\"uri\" value='" + values.uri+ "'></input>");


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

	function clearTable(tableID){
		$('#' + tableID).empty();
		$('.searchResultDiv').css({'visibility':'hidden'});
	}
}

$('#searchBox').keypress(function(e){
	if(e.keyCode==13){
		search($('#searchBox').val())
	}
});


$('#peopleTab').on('click', function() {

	io.socket.get('/customer/list', function(data) {

		console.log(data);

		$('#customerList').html("");

		data.forEach(function(customer){
			//default color is green
			var color = '#B1E6AA';

			if(customer.alert_flag){
				//color red if person is on a sanction list
				color = '#EA8485';
			}

			var row = "<tr style=\"background-color:" + color + "\"><td>" + customer.first_name + " " + customer.last_name + "</td><td><a href=\"" + customer.uri + "\">More Info</a></td></tr>"
			console.log(row);
			$('#customerList').append(row);
		});

	});

});


