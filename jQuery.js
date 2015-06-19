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
			jQuery('#tasks').append('<article data-itemid="' + uid + '"><h2><i class="fa fa-check-circle"></i></h2><a href="" class="delete-item"><h2><i class="fa fa-times-circle"></i></h2></a><div class="task"><h2 class="item">' + newItem.item + '</h2></div></article>'),
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

	jQuery('section').on('click', '.fa-check-circle', function(event) {
		console.log('check-circle click works');
		var completed = jQuery(this).parent().siblings().children('h2');
		jQuery(completed).toggleClass('completed'); // Toggle the "completed" class on the specific task in order to put a line through it via CSS
		if(jQuery('.completed')) {
			var itemId = jQuery(this).closest('article').data('itemid');
			localStorage.setItem(itemId, JSON.stringify({
				item: jQuery(this).parent().siblings().children('h2').text(),
				complete: true}));
		}
		else if(jQuery('.item:not(.completed)')) {
			
			// The below works to change it to false when doing it in the console, so not sure why the above is not working as well...
			var itemId = jQuery('.fa-check-circle').closest('article').data('itemid');
			localStorage.setItem(itemId, JSON.stringify({
				item: jQuery('.fa-check-circle').parent().siblings().children('h2').text(),
				complete: false}));
		}
	});

});

// (jQuery('.fa-check-circle').parent().siblings().children('h2').eq(1))