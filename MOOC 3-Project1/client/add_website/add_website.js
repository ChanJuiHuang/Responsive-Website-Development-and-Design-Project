// Template event of add_website which function is adding new website.

Template.add_website.events({
	"click .js-toggle-website-form":function(){
		$("#add_website").toggle('slow');
	}, 
	"input #url": function(){
		// use [http package] get website information
		$('#title').val("");
		$('#description').val("");
		Meteor.call('get_Website_Info', $('#url').val(),
			function(error, result){
				if (error){
					console.log(error);
				}else{					
					try{
						// get title
						let title_pattern = /<title>.*<\/title>/ig; 					
						let title = result.content.match(/<title>.*<\/title>/ig)[0];
						title = title.replace('<title>','');
						title = title.replace('</title>','');
						$('#title').val(title);						

						// get description
						let description_pattern = /description.*content=.*/ig; 
						let description = result.content.match(description_pattern)[0];						
						let index1 = description.search(/=.*"/g);
						let index2 = description.search(/[\'\"].{0,5}>/g);
						description = description.slice(index1,index2);
						description = description.replace('=','');
						description = description.replace('"','');						
						$('#description').val(description);				
					}catch(err){						
						console.log(err);						
					}
				}
			}				
		);			
	},
	"submit .js-save-website-form":function(event){	
		let URL = $('#url').val();		
		let title = $('#title').val();
		let description = $('#description').val();

		// check URL
		if (!URL){
			alert("YOU LOSE SITE ADDRESS!");
			return false;
		}
		//check title
		if (!title){
			alert('YOU LOSE TITLE!');
			return false;			
		}
		// check description
		if (!description) {
			alert('YOU LOSE DESCRIPTION!');
			return false;
		}		

		// insert new website to [Websites' collection]	
		Websites.insert({
			title: title, 
			url: URL,
			description: description,
			upVote: 0,
			downVote: 0,
			rank: 0,
			comment: "",
			createdOn: new Date()
		});		

		// close the [website-form]
		$("#add_website").toggle('slow');

		// clean the form
		$('#url').val("");
		$('#title').val("");
		$('#description').val("");

		// stop the form submit from reloading the page
		event.preventDefault();	
	}
});