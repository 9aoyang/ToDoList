/*
 * @Author: silence1amb
 * @Date: 2018-10-04 16:12:34
 * @Last Modified by: silence1amb
 * @Last Modified time: 2018-10-06 10:49:22
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
    if (!newTask) {
      return;
    }
    addTask(newTask)
    $inputValue.val(null)
    init(taskList)
  });
  function init(taskList) {
    if (taskList.length) {
      renderTaskList()
    }
  }

  function addTask(newTask) {
    taskList.push(newTask)
    store.set('taskList', taskList)
  }

  function renderTaskList() {
    console.log(taskList);
    let $taskList = $('.task-list')
    $taskList.html('')
    for (let i = 0; i < taskList.length; i++) {
      const $task = renderTaskItem(taskList[i])
      $taskList.append($task)
    }
  }

  function renderTaskItem(data) {
    let taskItemTpl = `
      <div class="task-item">
        <span><input type="checkbox" name="" id=""></span>
        <span class="task-content">${data.content}</span>
        <span class="action-wrap ">
          <span class="action">删除</span>
          <span class="action">详细</span>
        </span>
      </div>
    `
    return $(taskItemTpl)
  }
})();
