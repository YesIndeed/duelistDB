var dataURL = 'http://yugiohprices.com/api/card_data/';

$(document).ready(function(){
	$('#search').click(function(e){
		e.preventDefault();
		var input = $('#searchInput').val();
		var queryResult = dataURL + input;

		requestJSON(queryResult, function(json) {
			if(json.status == "fail") {
				$('#cardapidata').html("<h2>No Card Information Found</h2>");
			} else {

				// We have a card from the API then we display card info
				var data = json.data;

				var cardName = data.name;
				var cardText = data.text;
				var cardType = data.card_type;
				var cardFamily = data.family;
				var cardAttack = data.atk;
				var cardDefense = data.def;
				var cardLevel = data.level;

				var outputHTML = '<h2>' + cardName + '</h2>';

				outputHTML += '<li> Text: ' + cardText + '</li>';
				outputHTML += '<li> Type: ' + cardType + '</li>';
				outputHTML += '<li> Family: ' + cardFamily + '</li>';
				outputHTML += '<li> Attack: ' + cardAttack + '</li>';
				outputHTML += '<li> Defense: ' + cardDefense + '</li>';
				outputHTML += '<li> Level: ' + cardLevel + '</li>';


				$('#cardapidata').html(outputHTML); // Modify the div's data to outputHTML
			} // end else statement
		}); // end requestJSON Ajax call
	});	
});

function requestJSON(url, callback) {
$.ajax({
  url: url,
  complete: function(xhr) {
    callback.call(null, xhr.responseJSON);
  }
});
}