/*
 * @Author: silence1amb
 * @Date: 2018-10-04 16:12:34
 * @Last Modified by: silence1amb
 * @Last Modified time: 2018-10-06 11:52:12
 */
(function () {
  'use strict';

  let $form_add_task = $('.add-task');
  let taskList = store.get('taskList') || [];

  init(taskList);
  $form_add_task.on('submit', function (e) {

    e.preventDefault();
    let $inputValue = $(this).find('input[name=content]')
    let newTask = {};
    newTask.content = $inputValue.val();
    if (!newTask.content) {
      console.log('任务不能为空');
      return;
    }
    addTask(newTask)
    $inputValue.val(null)
  });

  function init(taskList) {
    if (taskList.length) {
      renderTaskList()
    }
  }

  // 刷新localStorage数据并重新渲染页面
  function updateTaskList() {
    store.set('taskList', taskList)
    renderTaskList()
  }

  function addTask(newTask) {
    taskList.push(newTask)
    updateTaskList()
  }

  function deleteTask(index) {
    // 如果没有index或index不存在，直接返回
    if (!index || !taskList[index]) {
      return
    }
    delete taskList[index]
    updateTaskList()
  }

  function renderTaskList() {
    console.log(taskList);
    let $taskList = $('.task-list')
    $taskList.html('')
    for (let i = 0; i < taskList.length; i++) {
      const $task = renderTaskItem(taskList[i], i)
      $taskList.append($task)
    }


    let $delete_task = $('.delete')
    let $detail_task = $('detail')

    $delete_task.on('click', function() {
      let $item = $(this).parent().parent()
      confirm('确定删除？') ? deleteTask($item.data('index')) : null
    })

  }

  function renderTaskItem(data, index) {
    if (!data || !index)
    return
    let taskItemTpl = `
      <div class="task-item" data-index=${index}>
        <span><input type="checkbox" name="" id=""></span>
        <span class="task-content">${data.content}</span>
        <span class="action-wrap ">
          <span class="action delete">删除</span>
          <span class="action detail">详细</span>
        </span>
      </div>
    `
    return $(taskItemTpl)
  }
})();
