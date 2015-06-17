jQuery(document).ready(function(){
	jQuery('#create-item').on('submit', function(event) {
		event.preventDefault();
		var newItem = {
			item: jQuery(this).find('input[name="createItem"]').val(),
			complete: false
		}
		var uid = ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
		console.log(uid);
		if(newItem.item === '') {
			//Do nothing (keeps from creating an empty item)
		}
		else {
			jQuery('#tasks').append('<article data-itemid="' + uid + '"><a href="" class="delete-item"><h2><i class="fa fa-times-circle"></i></h2></a><div class="task"><h2>' + newItem.item + '</h2></div></article>'),
			localStorage.setItem(uid, JSON.stringify(newItem)),
			jQuery('.form-create input').val('');
		}
		console.log("Submit is doing something");
		console.log(newItem.item);
	});

	jQuery('section').on('click', '.delete-item', function(event){
		event.preventDefault();
		var itemId = jQuery(this).closest('article').data('itemid');
		localStorage.removeItem(itemId);
		var itemDelete = jQuery(this).closest('article').remove();
	});

});