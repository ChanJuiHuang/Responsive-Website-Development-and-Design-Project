///////////////
// Route
///////////////

// set up the main template the the router will use to build pages
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

// specify the top level route, the page users see when they arrive at the site
Router.route('/', function(){
    this.render("navbar", {to:"header"});
    this.render("user_list", {to:"main"});  
});

// specify a route that allows the current user to chat to another users
Router.route('/chat/:_id', function(){
    if (!Meteor.userId()){
        Router.go('/');
        return;
    }
    // the user they want to chat to has id equal to 
    // the id sent in after /chat/... 
    let otherUserId = this.params._id;
    Session.set("otherUserId", otherUserId);
    // find a chat that has two users that match current user id
    // and the requested user id
    let filter = {$or: [
                    {user1Id: Meteor.userId(), user2Id: otherUserId}, 
                    {user2Id: Meteor.userId(), user1Id: otherUserId}
                ]};
    this.wait(Meteor.subscribe("chats"));    
    if (this.ready()){
        let chat = Chats.findOne(filter);
        let chatId = getChatId(chat, otherUserId);
        // looking good, save the id to the session
        if (chatId){
            Session.set("chatId",chatId);
        }
        this.render("navbar", {to:"header"});
        this.render("chat_page", {to:"main"}); 
    }else{
        this.render("navbar", {to:"header"});
    }
});

function getChatId(chat, otherUserId){
    let chatId = 0;
    // no chat matching the filter - need to insert a new one
    if (!chat){
        chatId = Meteor.call("insertChat", otherUserId);
    }else{
        chatId = chat._id;
    }
    return chatId;
}