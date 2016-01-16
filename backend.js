var dataURL = 'http://yugiohprices.com/api/card_data/';

$(document).ready(function(){
	$('#search').click(function(){
		var input = $('#searchInput').val();
		/*console.log("spaghetti " + input);
		$(document.body).append("<div>input</div>");
		var request = new XMLHttpRequest();
		request.open('GET', 'http://yugiohprices.com/api/card_data/' + input);*/
		
		var xhr = $.ajax(dataURL + input, {dataType : 'json'});
		xhr.done(function(data, text_status, jqXhr){
			console.log(data);
			console.log(text_status);
			if (text_status == "success")
			{
				// Show card information.
				$(document.body).append("<div>" + input + "</div>");
			}
			else
			{
				// Card could not be found. Do something.
			}
		});

		/*request.onreadystatechange = function() {
			if (this.readyState === 4) {
				console.log('Status:', this.status);
				console.log('Headers:', this.getAllResponseHeaders());
				console.log('Body:', this.responseText);
			}
		};

		request.send();
		*/
	});	
});