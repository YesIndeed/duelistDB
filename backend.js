$(document).ready(function(){
	$('#search').click(function(){
		var input = $('#searchInput').val();
		// console.log(input);
		// $(document.body).append("<div>input</div>");
		var request = new XMLHttpRequest();
		request.open('GET', 'http://private-anon-5cal96e2f-yugiohprices.apiary-mock.com/api/' + input);

		request.onreadystatechange = function() {
			if (this.readyState === 4) {
				console.log('Status:', this.status);
				console.log('Headers:', this.getAllResponseHeaders());
				console.log('Body:', this.responseText);
			}
		};

		request.send();
	});	
});