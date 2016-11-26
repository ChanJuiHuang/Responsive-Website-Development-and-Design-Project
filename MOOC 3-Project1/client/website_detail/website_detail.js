// helper function that returns all available websites
Template.website_detail.helpers({
	websites:function(){		
		if (Session.get("search-title")){						
			let search_value = Session.get("search-title");		
			let patt = new RegExp(search_value,"i");	
			return Websites.find({title: patt}, {sort: {upVote: -1, downVote: 1, createdOn: -1}});	
		}else{			
			return Websites.find({}, {sort: {upVote: -1, downVote: 1, createdOn: -1}});	
		}	
	}	
});