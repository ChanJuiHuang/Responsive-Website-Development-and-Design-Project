import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/ui/account_ui.js';

// helper function that returns all available websites
Template.website_list.helpers({
	websites:function(){		
		return Websites.find({}, {sort: {upVote: -1, downVote: 1, createdOn: -1}});
	}
});

// click event for reset session
Template.body.events({
	'click .js-reset-session': function(){		
		Session.clear();
	}
});

// event for search box
Template.navbar.events({
	'submit #search-form': function(event){
		Router.go('/website_detail');
		Session.setPersistent("search-title", event.target.search_title.value);		
		$('#search_title').val("");
		event.preventDefault();
	}
});

// Template event of website_item which function are up-vote and down-vote.
Template.website_item.events({
	"click .js-upvote":function(){
		//up wesite's [upVote]
		Websites.update({_id: this._id},{$set: {upVote: ++this.upVote}});		 

		// prevent the button from reloading the page
		event.preventDefault();
	}, 
	"click .js-downvote":function(event){
		//down website's [downVote]
		Websites.update({_id: this._id},{$set: {downVote: ++this.downVote}});		 

		// prevent the button from reloading the page
		event.preventDefault();
	}
});

// Template footer event
Template.footer.events({
	"click .go-top":function(){
		$(window).scrollTop(0);
	},
});

// calulate rank number
Template.registerHelper('incremented', function(index){		
	if (Meteor.user()){
		let rank = (++index);
		Websites.update({_id: this._id}, {$set: {rank: rank}});
		return rank;
	}else{
		return this.rank;
	}
});

// decide which nav is active
Template.registerHelper('isActive', function(url){
	if (Router.current().route.getName().match(url)){
		return "active";
	}else{
		return "";
	}
});