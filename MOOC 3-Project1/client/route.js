// This file plan the web-route.
Router.configure({layoutTemplate: 'ApplicationLayout'});

Router.route('/', 
	function(){
		this.render('navbar', {to: 'navbar'});
		this.render('welcome', {to: 'main'});
		this.render('footer', {to: 'footer'});},
	{name: 'home'}
);

Router.route('/website_list',
	function(){
		this.render('navbar', {to: 'navbar'});
		this.render('website_list', {to: 'main'});
		this.render('footer', {to: 'footer'});
	},
	{name: 'website_list'}
);

Router.route('/website_detail', 
	function(){
		this.render('navbar', {to: 'navbar'});
		this.render('website_detail', {to: 'main'});
		this.render('footer', {to: 'footer'});
	},
	{name: 'website_detail'}
);

Router.route('/website_detail/:_id', function(){
	this.render('navbar', {to: 'navbar'});
	this.render('detail_page', {
		to: 'main',
		data: function(){
			return Websites.findOne({_id: this.params._id});
		}
	});
	this.render('footer', {to: 'footer'});
});