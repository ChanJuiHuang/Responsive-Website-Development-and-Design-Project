import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

////////////////////
// helper functions 
////////////////////
Template.user_list.helpers({
    users: function(){
        return Meteor.users.find({});
    }
});

Template.user_item.helpers({
    isMyUser: function(userId){
        if (userId == Meteor.userId()){
            return true;
        }else {
            return false;
        }
    },
    getUsername: function(userId){
      user = Meteor.users.findOne({_id:userId});
      return user.profile.username;
    },    
});


Template.chat_page.helpers({
    messages: function(){
        let chat = Chats.findOne({_id: Session.get("chatId")});
        return chat.messages;
    }, 
    otherUserAvatar: function(){        
        let user = Meteor.users.findOne({_id: Session.get("otherUserId")});
        return user.profile.avatar;
    }, 
});

Template.registerHelper('iterator', function(){
    let arr = [];
    for (let i=1; i<5; i++){
        arr.push({index: i});
    }
    return arr;
});

////////////////////
// events
////////////////////
Template.user_item.events({
    'click .js-link-msg': function(){
        if (!Meteor.userId()){
            alert("You must to login!");
            Router.go('/');
        }
    },
});

Template.chat_page.events({
    // this event fires when the user sends a message on the chat page
    'submit .js-send-chat': function(event){
        // stop the form from triggering a page reload
        event.preventDefault();
        // see if we can find a chat object in the database
        // to which we'll add the message
        let chat = Chats.findOne({_id: Session.get("chatId")});
        if (chat){// ok - we have a chat to use
            let msgs = chat.messages; // pull the messages property
            if (!msgs){// no messages yet, create a new array
                msgs = [];
            }
            // is a good idea to insert data straight from the form
            // (i.e. the user) into the database?? certainly not. 
            // push adds the message to the end of the array
            msgs.push({content: event.target.chat.value, isIcon: false});
            // reset the form
            event.target.chat.value = "";
            // put the messages array onto the chat object
            chat.messages = msgs;
            // update the chat object in the database.
            Meteor.call("update_chat_msg", chat);
        }
    },
    'click .js-click-icon': function(event){
        event.preventDefault();
        let chat = Chats.findOne({_id: Session.get("chatId")});
        if (chat){
            let msgs = chat.messages; // pull the messages property
            if (!msgs){// no messages yet, create a new array
                msgs = [];
            }
            msgs.push({content: event.target.src, isIcon: true});
            chat.messages = msgs;
            Meteor.call("update_chat_msg", chat);
        }
    }
});