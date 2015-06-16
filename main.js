var tdList = {

  config: {
    url: 'http://rh-tiny-server.herokuapp.com/collections/raveve',
  },

  init: function () {
    tdList.initStyling();
    tdList.initEvents();
  },

  initStyling: function () {
    tdList.renderItems();
  },

  initEvents: function () {

        /////////////////////////////////////////////////////
       /////    Enter submits text for creating item    ////
      /////////////////////////////////////////////////////
      jQuery('#create-item').on('submit', function (event) {
        event.preventDefault();
        var newItem = {
          item: jQuery(this).find('input[name="createItem"]').val(),
          complete: false
        }
        if(newItem.item === '') {
         // Does nothing, this keeps from creating an empty item
       }
       else {
         tdList.createItems(newItem);
       }
      });

      /////////////////////////////////////////////////////
     ///// Event delegation of check-circle icon click to complete item
    /////////////////////////////////////////////////////
    jQuery('section').on('click', '.fa-check-circle', function (event) {
      console.log ('check-circle click works');
      jQuery(this).parent().siblings('h2').toggleClass('completed');

    //  tdList.updateItems(); need an if / else statement for PUT of complete
    });
    /////////////////////////////////////////////////////
   /////////////////////////////////////////////////////

      /////////////////////////////////////////////////////
     ///// Event delegation of double click to edit item /
    /////////////////////////////////////////////////////
    jQuery('article').on('dblclick', '.dbl-click', function (event) {
        event.preventDefault();
        jQuery(this).hide();
        jQuery(this).closest('article').find('form').toggleClass('form-group');
    });

      /////////////////////////////////////////////////////
     /////   Enter submits update for editing item    ////
    /////////////////////////////////////////////////////
    jQuery('section').on('submit', '.editItem', function (event) {
        event.preventDefault();
        var itemId = jQuery(this).closest('article').data('itemid');
        var editedItem = {
        item: jQuery(this).find('input[name="editItem"]').val(),
        complete: false
        }
        if (editedItem.item === '') {
          // Does nothing, this keeps from creating an empty item upon edit
       }
       else {
         tdList.updateItems(itemId, editedItem);
       }
      });

        /////////////////////////////////////////////////////
       ///// Event delegation of x icon click to delete item
      /////////////////////////////////////////////////////
      jQuery('section').on('click', '.delete-item', function (event) {
        event.preventDefault();
        var itemId = jQuery(this).closest('article').data('itemid');
        console.log(itemId);

        tdList.deleteItems(itemId);
      });
    },

    /////////////////////////////////////////////////////
   /////    Function that renders item on DOM     //////
  /////////////////////////////////////////////////////
  renderItems: function () {
    jQuery.ajax({
      url: tdList.config.url,
      type: 'GET',
      success: function (items) {
        console.log(items);
        var template = _.template(jQuery('#todoTmpl').html());
        var markup = "";
        items.forEach(function (item, idx, arr){
          markup += template(item);
        });
        console.log('markup is...', markup);
        jQuery('article').html(markup);
      },
    });
  },

    /////////////////////////////////////////////////////
   /////   Function that creates item on server   //////
  /////////////////////////////////////////////////////
  createItems: function (item) {
    jQuery.ajax({
      url: tdList.config.url,
      data: item,
      type: 'POST',
      success: function (data) {
        console.log(data);
        tdList.renderItems();

        localStorage.setItem(data._id, JSON.stringify(data));
        var restoredSession = JSON.parse(localStorage.getItem(data._id));

        // Clears the input text areas
        jQuery('.form-create input').val('');
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

    /////////////////////////////////////////////////////
   /////   Function that deletes item on server   //////
  /////////////////////////////////////////////////////
  deleteItems: function (id) {
    jQuery.ajax({
      url: tdList.config.url + '/' + id,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
        tdList.renderItems();
      },
      error: function (err) {
        console.log(err);
      }
    });
  },

    /////////////////////////////////////////////////////
   /////   Function that updates item on server   //////
  /////////////////////////////////////////////////////
  updateItems: function (id, item) {
    jQuery.ajax({
      url: tdList.config.url + '/' + id,
      data: item,
      type: 'PUT',
      success: function (data) {
        console.log(data);
        tdList.renderItems();

      },
      error: function (err) {
        console.log(err);
      }
    });
  },

};

  /////////////////////////////////////////////////////
 /////          Initialize on DOM load          //////
/////////////////////////////////////////////////////
jQuery(document).ready(function () {

  tdList.init();

});