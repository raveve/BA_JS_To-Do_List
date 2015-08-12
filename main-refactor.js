/**
 * @package     Blueacorn/RavenTodo
 * @version     1.0
 * @author      Blue Acorn <code@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn.
 */

function RavenTodo(options) {
    this.init(options);
};

jQuery(document).ready(function ($) {

    RavenTodo.prototype = {
        init: function (options) {
            this.settings = {
                'debug': false
            };

            // Overrides the default settings
            this.overrideSettings(options);

            // Start the debugger
            if (this.settings.debug === true) {
                this.setupDebugging();
            }

            this.renderItems();
            this.setObservers();
        },

        renderItems: function() {
            var self = this;

            for (ls in localStorage) {
                var todoItem = JSON.parse(localStorage.getItem(ls));

                self.renderSingleItem(ls, todoItem.complete, todoItem.item);
            }
        },

        renderSingleItem: function(id, complete, item) {
            var self = this;

            $('#tasks').append('<article id="' + id + '"><h2 class="icon"><i class="fa fa-check-circle"></i></h2><h2 class="icon"><a href="" class="delete-item"><i class="fa fa-times-circle"></i></a></h2><div class="task"><h2 class="item dbl-click">' + item + '</h2><form class="edit-item edit-form" action=""><input type="text" name="editItem" value="' + item + '"></form></div></article>');

            if(complete === true) {
                $('#' + id + ' .item').addClass('completed');
            }
        },

        setObservers: function() {
            var self = this;

            $('#create-item').on('submit', function(event){
                self.createItem(this);
            });

            $('section').on('click', '.fa-check-circle', function(event){
                event.preventDefault();

                $(this).parent().siblings().children('h2').addClass('completed');
                var itemId = $(this).closest('article').attr('id');

                localStorage.setItem(itemId, JSON.stringify({
                    id: itemId,
                    item: jQuery(this).parent().siblings().children('h2').text(),
                    complete: true
                }));
            });

            $('section').on('submit', '.edit-item', function(event){
                event.preventDefault();

                $('.dbl-click').show();
                $(this).toggleClass('edit-form');

                var itemId = jQuery(this).closest('article').attr('id'),
                    taskObject = JSON.parse(localStorage.getItem(itemId));

                localStorage.setItem(itemId, JSON.stringify({
                    id: itemId,
                    item: jQuery(this).find('input[name="editItem"]').val(),
                    complete: taskObject.complete
                }));

                $(this).parent('.task').children('h2').replaceWith('<h2 class="item dbl-click">' + $(this).find('input[name="editItem"]').val() + '</h2>');
            });

            $('#delete-complete').on('click', function(event){
                var toDelete = [];

                $.each(localStorage, function(idx, item){
                    var todoItem = JSON.parse(localStorage.getItem(localStorage.key(idx)));

                    if(todoItem.complete === true) {
                        toDelete.push(key);
                    }
                });

                $.each(toDelete, function(idx, item){
                    self.deleteItem(item);
                });
            });

            $('section').on('click', '.delete-item', function(event){
                event.preventDefault();
                console.log($(this).closest('article'));
                self.deleteItem($(this).closest('article').attr('id'));
            });

            $('#delete-all').on('click', function(event){
                localStorage.clear();
                $('article').remove();
            });

            $('section').on('dblclick', '.dbl-click', function(event){
                event.preventDefault();
                $(this).hide();
                $(this).closest('article').find('form').toggleClass('edit-form');
            });
        },

        deleteItem: function(itemId) {
            localStorage.removeItem(itemId);
            $('#' + itemId).remove();
        },

        createItem: function(createdItem) {
            var self = this,
                uid = ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4),
                newItem = {
                    item: $(createdItem).find('input[name="createItem"]').val(),
                    complete: false
                };

            if(newItem.item === ''){
                return;
            }else{
                self.renderSingleItem(uid, newItem.complete, newItem.item);
                localStorage.setItem(uid, JSON.stringify(newItem));
                // jQuery('.form-create input').val('');
            }
        },

        /**
         * Takes default settings in object scope, and
         * merges the optional object passed in on initiation
         * of the class.
         */
        overrideSettings: function (options) {
            if (typeof options === 'object') {
                this.settings = $.extend(this.settings, options);
            }
        }, 

        setupDebugging: function () {
            this.watchConsole('Basic Javascript object loaded!!!');
            this.watchConsole(this.settings);
        },

        /**
         * Adds console log if degubbing is true
         * @param string
         */
        watchConsole: function (message) {
            if (this.settings.debug === true) {
                console.log(message);
            }
        }

    };

    /**
     * The parameter object is optional.
     * Must be an object.
     */
    var baRavenTodo = new RavenTodo({"debug":true});
});