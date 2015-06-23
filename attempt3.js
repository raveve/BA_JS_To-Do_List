var taskObject;

function TaskObject(element) {
	this.init(element);
}

TaskObject.prototype = {
	init : function(element) {
		if(!this.tasks) {
			this.tasks = [];
		}
	},
	makeId: function() {
		return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
	},
	onSubmit : function(event) {
		event.preventDefault();
		if(inputElement.val() === '') {
			// Do nothing (keeps from creating a blank task)
		}
		else {
			var element = jQuery('.form-create input');
			var id = taskObject.makeId();
			taskObject.tasks.push({
				id: id,
				title: element.val(),
				completed: false,
				markup: '<article data-itemid="' + id + '"><h2><i class="fa fa-check-circle"></i></h2><a href="" class="delete-item"><h2><i class="fa fa-times-circle"></i></h2></a><div class="task"><h2 class="item dbl-click" contentEditable="true">' + element.val() + '</h2></div><form class="edit-item edit-form" action=""><input type="text" name="editItem" value="' + element.val() + '"></form></article>'
			});
			// Make variables later
			localStorage.setItem('tasks', JSON.stringify(taskObject.tasks));
			jQuery('.form-create input').val('');
		}
		console.log("Submit is doing something"); // Remove later
	},
	addTask: function(element) {
		this.tasks.push({
			id: this.makeId(), 
			title: element.val(),
			completed: false
		});
	},
	deleteTask : function(event) {
		event.preventDefault();
		jQuery(this).closest('article').remove();
		var itemId = jQuery(this).closest('article').data('itemid');
		localStorage.removeItem(itemId);
		console.log("Delete is doing something"); // Remove later
	},
	completeTask : function(event) {
		event.preventDefault();
		jQuery(this).parent().siblings().children('h2').toggleClass('completed');
		console.log('Check-circle click is doing something'); // Remove later
	},
	editTask : function(event) {
		event.preventDefault();
		// jQuery(this).hide();
		// jQuery(this).closest('article').find('form').toggleClass('edit-form');
		// console.log("Double click is doing something");
	},
	updateTask : function() {
		event.preventDefault();
		// jQuery('.dbl-click').show();
		// jQuery(this).toggleClass('edit-form');
	},
	renderTasks : function() {
		event.preventDefault();
		var local = localStorage.getItem("tasks");

		local.forEach(function(tasks, id, arr) {
			jQuery('#tasks').append(tasks.markup);
		});
	}   
}

jQuery(document).ready(function() {
	inputElement = jQuery('input[name="createItem"]');

	taskObject = new TaskObject(inputElement);

	jQuery('#create-item').on('submit', taskObject.onSubmit);

	jQuery('section').on('click', '.delete-item', taskObject.deleteTask);

	jQuery('section').on('click', '.fa-check-circle', taskObject.completeTask);

	// jQuery('article').on('dblclick', '.dbl-click', taskObject.editTask);

	// jQuery('section').on('submit', '.edit-item', taskObject.updateTask);
});