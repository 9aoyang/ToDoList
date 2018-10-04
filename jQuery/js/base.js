/*
 * @Author: silence1amb
 * @Date: 2018-10-04 16:12:34
 * @Last Modified by: silence1amb
 * @Last Modified time: 2018-10-04 16:38:07
 */
(function () {
  'use strict';

  let $form_add_task = $('.add-task');
  let taskList = store.get('taskList') || [];

  init(taskList);

  $form_add_task.on('submit', function (e) {
    e.preventDefault();
    let inputValue = $(this).find('input[name=content]').val()
    let newTask = {};
    newTask.content = inputValue;
    if (!newTask) {
      return;
    }
    addTask(newTask)
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
        <span>删除</span>
        <span>详细</span>
      </div>
    `
    return $(taskItemTpl)
  }
})();
