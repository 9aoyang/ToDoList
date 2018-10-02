//http://todolist.t.imooc.io/ 参考代码

;
(function() {
    'use strict';

    var task_list = [];
    var form_add_task = $('.add-task');
    // store.clear();
    init();
    form_add_task.on('submit', on_add_submit);

    function add_task(new_task) {
        // 将新task推入task_list
        task_list.push(new_task);
        // 更新localStroage
        refresh_task_list();
        //console.log('task_list', task_list);
        return true;
    }

    // 删除一条Task
    function delete_task(index) {
        // 如果没有index或者indexbu存在则直接返回
        if (index === undefined || !task_list[index]) return;

        delete task_list[index];

        // 更新localStroage
        refresh_task_list();
    }

    /*
     * 刷新localStorage数据并渲染页面 
     */
    function refresh_task_list() {
        store.set('task_list', task_list);
        render_task_list();
    }

    function init() {
        task_list = store.get('task_list') || [];
        if (task_list.length) {
            render_task_list();
        }
    }

    /*
     * 提交按钮的监听与事件绑定
     * */
    function on_add_submit(e) {
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
            input.val('');
        }

    }

    /*
     * 删除按钮的监听与事件绑定
     * */
    function listen_task_delete() {
        // 页面渲染后才能获取到class属性，因此在这定义
        var delete_item = $('.action.delete');
        // 查找并监听所有删除按钮的点击事件
        delete_item.on('click', function() {
            var $this = $(this);
            //找到删除按钮所在祖先节点索引
            var item = $this.parent();
            var index = item.data('index');
            // 确认删除
            var tmp = confirm('确定删除？');
            return tmp ? delete_task(index) : null;
        });
    }

    /*
     * 渲染整个Task_list
     * */
    function render_task_list() {
        var tasklist = $('.task-list');
        tasklist.html('');
        for (var i = 0; i < task_list.length; i++) {
            var task = render_task_item(task_list[i], i);
            tasklist.append(task);
        }
        listen_task_delete();
    }

    /*
     * 渲染单条Task记录模板
     * */
    function render_task_item(data, index) {
        if (!data || !index) return;
        var list_item_item =
            '<div class="task-item" data-index="' + index + '">' +
            '<span><input type="checkbox"></span>' +
            '<span class="task-content">' + data.content + '</span>' +
            '<span class="action delete"> 删除</span>' +
            '<span class="action"> 详细</span>' +
            '</div>';
        return $(list_item_item);
    }
})();