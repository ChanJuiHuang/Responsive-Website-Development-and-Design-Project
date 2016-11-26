// comment page
Template.detail_page.events({
	"click #comment-submit":function(){
		if (Meteor.user()){
			Websites.update({_id: this._id}, {$set: {comment: $('#comment').val()}});
		}else{
			alert("YOU MUST TO LOGIN");
		}
		$('#comment').val("");		
	}, 
});