Meteor.methods({
	update_chat_msg: function(chat){
		if (Meteor.userId()){
			Chats.update({_id: chat._id}, chat);
		}
	},
	insertChat: function(otherUserId){
		if (Meteor.userId()){
			Chats.insert({user1Id: Meteor.userId(), user2Id: otherUserId});
		}		
	}
});