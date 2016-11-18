$(document).ready(function(){
	// Click All Photo button and show all photos
	$('#all_photos').click(function(){
		let source = $('#photo-template').html();
		let photo_template = Handlebars.compile(source);
		let html = photo_template(animals_data);
		$('#photo-content').html(html);		
	});
	//End click All Photo button
	$('#all_photos').click();
});