
import { TASK_STATUSES } from '../constants'
import * as api from '../api'

export function createTaskSuccess(task) {
  return {
    type: 'CREATE_TASK_SUCCESS',
    payload: {
      task
    }
  }
}

export function createTask({ title, desc, status = TASK_STATUSES[0] }) {
  return dispatch => {
    api.createTask({
      title,
      description: desc,
      status
    }).then(res => {
      dispatch(createTaskSuccess(res.data))
    })
  }
}

export function editTaskSuccess(task) {
  return {
    type: 'EDIT_TASK_SUCCESS',
    payload: {
      task
    }
  }
}

function progressTimerStart(taskId) {
  return {
    type: 'TIMER_START',
    payload: {
      taskId
    }
  }
}

function progressTimerStop(taskId) {
  return {
    type: 'TIMER_STOP',
    payload: {
      taskId
    }
  }
}


export function editTask(id, { title, desc, status }) {
  return (dispatch, getState) => {
    const task = getState().tasks.tasks.find(task => task.id === id)
    api.editTask(id, {
      ...task,
      title,
      description: desc,
      status
    }).then(res => {
      dispatch(editTaskSuccess(res.data))
      if(res.data.status === TASK_STATUSES[1]) {
        return dispatch(progressTimerStart(res.data.id))
      }

      if(task.status === TASK_STATUSES[1]) {
        return dispatch(progressTimerStop(id))
      }
    })
  }
}

export function fetchTasks() {
  return {
    type: 'FETCH_TASKS_START'
  }
}


export function filterTasks(keyword) {
  return {
    type: 'FILTER_TASKS',
    payload: {
      keyword
    }
  }
}