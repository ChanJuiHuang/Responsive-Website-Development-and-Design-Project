// Template event of add_website which function is adding new website.

Template.add_website.events({
	"click .js-toggle-website-form":function(){
		$("#add_website").toggle('slow');
	}, 
	"submit .js-save-website-form":function(event){	
		let website = event.target;

		// check url
		if (!website.url.value){
			alert("YOU LOSE SITE ADDRESS!");
			return false;
		}
		
		// use [http package] get website information
		Meteor.call('get_Website_Info', website.url.value,
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
						Session.set("title",title);

						// get description
						let description_pattern = /description.*content=.*/ig; 
						let description = result.content.match(description_pattern)[0];						
						let index1 = description.search(/=.*"/g);
						let index2 = description.search(/[\'\"].{0,5}>/g);
						description = description.slice(index1,index2);
						description = description.replace('=','');
						description = description.replace('"','');						
						Session.set("description",description);
					}catch(err){						
						console.log(err);						
					}
				}
			
			}				
		);			
		
		let title=0, description=0; 
		//check title
		if (website.title.value){
			title = website.title.value;
		}else if (Session.get("title")){
			title = Session.get("title");
		}else{
			alert('YOU LOSE TITLE!');
			return false;
		}

		// check description
		if (website.description.value){
			description = website.description.value;
		}else if (Session.get("description")){
			description = Session.get("description");
		}else{
			alert('YOU LOSE DESCRIPTION!');
			return false;
		}		

		// insert new website to [Websites' collection]	
		Websites.insert({
			title: title, 
			url: website.url.value,
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

		// clean the session
		Session.clear();

		// stop the form submit from reloading the page
		event.preventDefault();	
	}
});