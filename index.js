var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

//
// function to grab template from html
// 
function getTemplate(name) {
	var $tpl = $('script#tpl-'+name);

	return _.template($tpl.html());
}

//
// define our main view
//
// var MainView = Backbone.View.extend({

// 	// set our template
// 	template: getTemplate('main'),

// 	// initialize the view
// 	initialize: function(options) {
// 		this.data = options.data
// 	},

// 	// render the view
// 	render: function() {
// 		this.$el.html(this.template(this.data));
// 	}
// });

var UnicornModel = Backbone.Model.extend({
	initialize:  function() {
		this.on('change', this.sync, this);
	}
});

var UnicornCollection = Backbone.Collection.extend({
	url: 'unicorns.json',
	model: UnicornModel,
	parse: function(resp) {
		return resp.unicorns;
	}
});

var UnicornsView = Backbone.View.extend({
	template: getTemplate('unicorn'),

	initialize: function(options) {
		this.data = options.data;
		this.collection.on('sync', this.render, this);
		this.collection.fetch();

		this.$el.on('change', '.unicorn', _.bind(this.onLocationChange, this));
	},

	// render the view
	render: function() {

		this.collection.each(function(unicorn) {
			var displayData = unicorn.toJSON();

			this.$el.append(this.template(displayData));
		}, this);
	},

	onLocationChange: function(e) {
		var $this = $(e.currentTarget);
		var id = $this.attr('data-id');
		var value = e.target.value;
		var model = this.collection.get(id);
		// var value 
		// 
		model.on('change:location', function(model, value) {
			console.log('model value changed', value);
		});

	}

});


//
// this is where the action happens
//

// load the `package.json` file 

$(function() {
	var unicorns = new UnicornCollection();
	var unicornsView = new UnicornsView({
		el: '#unicorns',
		collection: unicorns
	});

});


	// var main = new MainView({
	// 	el: '#main'
	// 	, data: pkg
	// });

	// main.render();

