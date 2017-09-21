//http://todolist.t.imooc.io/ 参考代码

;
(function() {
    'use strict';

    var form_add_task = $('.add-task');
    var task_list = [];
    // store.clear();
    init();
    form_add_task.on('submit', function(e) {
        var new_task = {};
        e.preventDefault();
        // 获取新task的值
        var input = $(this).find('input[name=content]');
        new_task.content = input.val();
        // 如果task值为空，直接返回，否则继续执行
        if (!new_task.content) return;
        // 存入新task
        if (add_task(new_task)) {
            //console.log('new_task', new_task);
            render_task_list();
            input.val('');
        }

    });

    function add_task(new_task) {
        // 更新localStroage
        task_list.push(new_task);
        store.set('task_list', task_list);
        console.log('task_list', task_list);
        return true;
    }

    function init() {
        task_list = store.get('task_list') || [];
        if (task_list.length) {
            render_task_list();
        }
    }

    function render_task_list() {
        var tasklist = $('.task-list');
        tasklist.html('');
        for (var i = 0; i < task_list.length; i++) {
            var task = render_task_tpl(task_list[i]);
            tasklist.append(task);
        }
    }

    function render_task_tpl(data) {
        var list_item_tpl = '<div class="task-item">' +
            '<span><input type="checkbox"></span>' +
            '<span class="task-content">' + data.content + '</span>' +
            '<span class="action"> 删除</span>' +
            '<span class="action"> 详细</span>' +
            '</div>';
        return $(list_item_tpl);
    }
})();