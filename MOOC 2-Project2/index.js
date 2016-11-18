$(document).ready(function(){	
	// Click Home button and show slide
	$('#home').click(function carousel(){
		let source = $('#carousel-template').html();
		let carousel_template = Handlebars.compile(source);
		let html = carousel_template(animals_data);
		$('#carousel-content').html(html);
	});
	// End click Home button
	$('#home').click();
});