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
			jQuery('#tasks').append('<article data-itemid="' + taskObject.id + '"><h2><i class="fa fa-check-circle"></i></h2><a href="" class="delete-item"><h2><i class="fa fa-times-circle"></i></h2></a><div class="task"><h2 class="item dbl-click" contentEditable="true">' + taskObject.element.val() + '</h2></div><form class="edit-item edit-form" action=""><input type="text" name="editItem" value="' + taskObject.element.val() + '"></form></article>'), 
				// Make variables later
				localStorage.setItem(taskObject.id, JSON.stringify(taskObject)),
				jQuery('.form-create input').val('');
		}
		console.log("Submit is doing something"); // Remove later
	},
	deleteTask : function(event) {
		event.preventDefault();
		jQuery(this).closest('article').remove();
		itemId = jQuery(this).closest('article').data('itemid');
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

{"element":{"0":{},"length":1,"prevObject":{"0":{"location":{"ancestorOrigins":{"length":0},"origin":"file://","hash":"","search":"","pathname":"/Volumes/Sites/BA_JS_To-Do_List/index.html","port":"","hostname":"","host":"","protocol":"file:","href":"file:///Volumes/Sites/BA_JS_To-Do_List/index.html"}},"context":{"location":{"ancestorOrigins":{"length":0},"origin":"file://","hash":"","search":"","pathname":"/Volumes/Sites/BA_JS_To-Do_List/index.html","port":"","hostname":"","host":"","protocol":"file:","href":"file:///Volumes/Sites/BA_JS_To-Do_List/index.html"}},"length":1},"context":{"location":{"ancestorOrigins":{"length":0},"origin":"file://","hash":"","search":"","pathname":"/Volumes/Sites/BA_JS_To-Do_List/index.html","port":"","hostname":"","host":"","protocol":"file:","href":"file:///Volumes/Sites/BA_JS_To-Do_List/index.html"}},"selector":"input[name=\"createItem\"]"},"id":"idfm","title":"","completed":false}