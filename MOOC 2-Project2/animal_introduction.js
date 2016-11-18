$(document).ready(function(){
	// Click Animal Introduction button then show photo and introduction
	$('#animal_introduction').click(function(){
		let source = $('#introduction-template').html();
		let introduction_template = Handlebars.compile(source);
		let html = introduction_template(animals_data);
		$('#introduction-content').html(html);		
	});
	// End click Animal Introduction button
	$('#animal_introduction').click();
});