;
(function() {
    'use strict';

    var $form_add_task = $('.add-task');
    var new_task = {};
    var tasklist = {};

    $form_add_task.on('sumbit', function(e) {
        e.preventDefault();
        new_task.content = $(this).find('input[name=content]').val();
        if (!new_task.content) return;
        console.log('new_task', new_task);
    });
})();