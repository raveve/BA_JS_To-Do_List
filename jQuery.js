jQuery(document).ready(function(){

	renderItems();

	jQuery('#create-item').on('submit', function(event) {
		event.preventDefault();
		var uid = ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
		var newItem = {
			id: uid,
			item: jQuery(this).find('input[name="createItem"]').val(),
			complete: false
		}
		console.log(uid); // Remove later
		if (newItem.item === '') {
			//Do nothing (keeps from creating an empty item)
		}
		else {
			jQuery('#tasks').append('<article id="' + uid + '" data-itemid="' + uid + '"><h2 class="icon"><i class="fa fa-check-circle"></i></h2><h2 class="icon"><a href="" class="delete-item"><i class="fa fa-times-circle"></i></a></h2><div class="task"><h2 class="item dbl-click">' + newItem.item + '</h2><form class="edit-item edit-form" action=""><input type="text" name="editItem" value="' + newItem.item + '"></form></div></article>'),
			localStorage.setItem(uid, JSON.stringify(newItem)),
			jQuery('.form-create input').val('');
			jQuery('#' + uid).on('dblclick', '.dbl-click', function(event){
				event.preventDefault();
				console.log("Double click is doing something"); // Remove later
				jQuery(this).hide();
				jQuery(this).closest('article').find('form').toggleClass('edit-form');
			});
		}
		console.log("Submit is doing something");
		console.log(newItem.item); // Remove later
	});

	jQuery('section').on('click', '.delete-item', function(event){
		event.preventDefault();
		var itemId = jQuery(this).closest('article').data('itemid');
		localStorage.removeItem(itemId);
		var itemDelete = jQuery(this).closest('article').remove();
	});

	jQuery('section').on('click', '.fa-check-circle', function(event) {
		console.log('check-circle click works'); // Remove later
		var completed = jQuery(this).parent().siblings().children('h2');
		jQuery(completed).addClass('completed'); // toggleClass might be an option, see commented out code below
		if (jQuery('.completed')) {
			var itemId = jQuery(this).closest('article').data('itemid');
			localStorage.setItem(itemId, JSON.stringify({
				id: itemId,
				item: jQuery(this).parent().siblings().children('h2').text(),
				complete: true
			}));
		}
		// else if(jQuery('.item:not(.completed)')) {

		// 	// The below works to change it to false when doing it in the console, so not sure why the above is not working as well...
		// 	var itemId = jQuery('.fa-check-circle').closest('article').data('itemid');
		// 	localStorage.setItem(itemId, JSON.stringify({
		// 		item: jQuery('.fa-check-circle').parent().siblings().children('h2').text(),
		// 		complete: false}));
		// }
	});

	jQuery('section').on('submit', '.edit-item', function(event) {
		event.preventDefault();
		jQuery('.dbl-click').show();
		jQuery(this).toggleClass('edit-form');
		var itemId = jQuery(this).closest('article').data('itemid');
		var taskObject = JSON.parse(localStorage.getItem(itemId));
		localStorage.setItem(itemId, JSON.stringify({
			id: itemId,
			item: jQuery(this).find('input[name="editItem"]').val(),
			complete: taskObject.complete
		}));
		jQuery(this).parent('.task').children('h2').replaceWith('<h2 class="item dbl-click">' + jQuery(this).find('input[name="editItem"]').val() + '</h2>');
	});

	function renderItems() {
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		var value = JSON.parse(localStorage.getItem(key));

		if (value.complete === true) {
			jQuery('#tasks').append('<article id="' + value.id + '" data-itemid="' + value.id + '"><h2 class="icon"><i class="fa fa-check-circle"></i></h2><h2 class="icon"><a href="" class="delete-item"><i class="fa fa-times-circle"></i></a></h2><div class="task"><h2 class="item dbl-click completed">' + value.item + '</h2><form class="edit-item edit-form" action=""><input type="text" name="editItem" value="' + value.item + '"></form></div></article>')
			jQuery('#' + value.id).on('dblclick', '.dbl-click', function(event){
				event.preventDefault();
				console.log("Double click is doing something"); // Remove later
				jQuery(this).hide();
				jQuery(this).closest('article').find('form').toggleClass('edit-form');
			});
		}
		else if (value.complete === false)
			jQuery('#tasks').append('<article id="' + value.id + '" data-itemid="' + value.id + '"><h2 class="icon"><i class="fa fa-check-circle"></i></h2><h2 class="icon"><a href="" class="delete-item"><i class="fa fa-times-circle"></i></a></h2><div class="task"><h2 class="item dbl-click">' + value.item + '</h2><form class="edit-item edit-form" action=""><input type="text" name="editItem" value="' + value.item + '"></form></div></article>')
		jQuery('#' + value.id).on('dblclick', '.dbl-click', function(event){
				event.preventDefault();
				console.log("Double click is doing something"); // Remove later
				jQuery(this).hide();
				jQuery(this).closest('article').find('form').toggleClass('edit-form');
			});
		}
	};

	jQuery('#delete-all').on('click', function(event){
		localStorage.clear();
		jQuery('article').remove();
	});

	jQuery('#delete-complete').on('click', function(event){
		for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			var value = JSON.parse(localStorage.getItem(key));

			if (value.complete === true) {
				localStorage.removeItem(key);
				jQuery('.completed').parent().parent().remove();
			}
		}
	});
});
