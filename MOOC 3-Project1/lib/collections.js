import { Mongo } from 'meteor/mongo';

Websites = new Mongo.Collection("websites");

// Set user privilege for data base.
Websites.allow({
	insert: function(userId, doc) {
		try{
			if (Meteor.user()){				
				console.log('insert success');
				return true;			
			}
		}catch(err){
			console.log('insert fail');
			return false;
		}			
	},
	update: function(userId, doc) {		
		try{
			if (Meteor.user()){					
				return true;			
			}
		}catch(err){			
			return false;
		}		
	},	
});