// jQuery(document).ready(function(){

// jQuery(document).ready(function ($) { 
// 	task.prototype = { 
// 		init: function(options) { 
// 			this.settings = { 
// 				'id': ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);, 
// 				'title': '', 
// 				'completed': false };
// 		} 

// 		var aTask = new task({'title': title});


// more like the second one
// function task(array) { this.init(array); }
// where the array are your id, title and completed
// so you have something like:
// jQuery(document).ready(function ($) { task.prototype = { init: function(options) { this.settings = { 'id': IDgoesHere, 'title': '', 'completed': false }; } };
// So you'd need a way to generate your ID to put in IDgoesHere, but otherwise that code would initialize a new task object that has an id, an empty string for the title, and the completed flag set to false.
// then you call it using the new  keyword:
// var aTask = new task({'title': title});
// because the task prototype, when you construct a new task, unless you pass it new values, it'll initialize with the default ones (like false for the completed flag)


// var taskObject = {
//     id : 1,
//     title : 'title',
//     completed : false,
//     element: ''
// }

var taskObject;

function TaskObject(element) {
	this.init(element);
}

TaskObject.prototype = {
	init : function(element) {
		this.element = element;
		this.id = ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
		this.title = element.val();
		this.completed = false;
	},
	onSubmit : function(event) {
		event.preventDefault();
		if(inputElement.val() === '') {
			// Do nothing (keeps from creating a blank task)
		}
		else {
			jQuery('#tasks').append('<article><h2><i class="fa fa-check-circle"></i></h2><a href="" class="delete-item"><h2><i class="fa fa-times-circle"></i></h2></a><div class="task"><h2 class="item">' + taskObject.element.val() + '</h2></div></article>'), // Make variables later
				// localStorage.setItem(taskObject.id, JSON.stringify(taskObject)),
				jQuery('.form-create input').val('');
		}
		console.log("Submit is doing something");
	},
	deleteTask : function(event) {
		event.preventDefault();
	},
	completeTask : function(event) {
		event.preventDefault();
	},
	editTask : function(event) {
		event.preventDefault();
	},
	renderTasks : function() {
		event.preventDefault();
	}
}

jQuery(document).ready(function() {
	inputElement = jQuery('input[name="createItem"]');

	taskObject = new TaskObject(inputElement);

	// elementVal = taskObject.element.val();

	jQuery('#create-item').on('submit', taskObject.onSubmit);

});




