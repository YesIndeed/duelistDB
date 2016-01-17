var dataURL = 'http://yugiohprices.com/api/card_data/';
var imageURL = 'http://yugiohprices.com/api/card_image/';
var priceURL = 'http://yugiohprices.com/api/get_card_prices/';

function bold(text)
{
	return '<strong>' + text + '</strong>';
}

function makeListItem(label, text)
{
	return '<li> ' + bold(label) + ': ' + text + '</li>';
}

$(document).ready(function(){
	$('#data').hide()

	$('#search').click(function(e){
		e.preventDefault();
		var input = $('#searchInput').val();
		var queryCard = dataURL + input;
		var queryPrice = priceURL + input;

		$.getJSON(queryCard, function(json){
		$('#data').show()
			if(json.status == "fail") {
				$('#cardData').html("<h2>No Card Information Found</h2>");
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

				outputHTML += makeListItem('Text', cardText);
				outputHTML += makeListItem('Type', cardType);
				outputHTML += makeListItem('Family', cardFamily);
				outputHTML += makeListItem('Attack', cardAttack);
				outputHTML += makeListItem('Defense', cardDefense);
				outputHTML += makeListItem('Level/Rank', cardLevel);

				imageHTML = "<img src=\"" + imageURL + cardName + "\" width=\"200\">"
				$('#cardData').html(outputHTML); // Modify the div's data to outputHTML
				$('#cardImage').html(imageHTML);
			} // end else statement
	    });

	    $.getJSON(queryPrice, function(json) {
	    $('#data').show()
			if(json.status == "fail") {
				$('#priceData').html("<h2>No Card Packs Found</h2>");
			} else {

				// We have a card price from the API then we display price info
				var data = json.data;
				var outputHTML = '<h2> Card Packs & Prices </h2>';
				outputHTML += '<div class=\'pre-scrollable\'>'; // Add a div to make packs scrollable

				$.each(data, function(index, value) {
					var packName = value.name;
					var packTag = value.print_tag;
					var packRarity = value.rarity;
					var priceHTML = '';

					if(value.price_data.status == "fail") {
						priceHTML = 'No price information found for this card pack';
					} else {
						priceHTML += '$' + value.price_data.data.prices.average;
					}

					outputHTML += '<div>' + '<strong>' + packName + '</strong>';
					outputHTML += makeListItem('Print Tag', packTag);
					outputHTML += makeListItem('Rarity', packRarity);
					outputHTML += makeListItem('Avg. Price', priceHTML); 
					outputHTML += '</div>';
				});

				outputHTML += '</div>'; // End scrollable div.
				$('#priceData').html(outputHTML);
			} // end else statement
	    });

	});	
});