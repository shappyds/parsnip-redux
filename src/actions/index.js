
import { TASK_STATUSES } from '../constants'
import * as api from '../api'
import { CALL_API } from '../middleware/api'

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

export function editTask(id, { title, desc, status }) {
  return dispatch => {
    api.editTask(id, {
      title,
      description: desc,
      status
    }).then(res => {
      dispatch(editTaskSuccess(res.data))
    })
  }
}

export function fetchTasks() {
  return {
    [CALL_API]: {
      endpoint: '/tasks',
      types: ['FETCH_TASKS_START', 'FETCH_TASKS_SUCCEEDED', 'FETCH_TASKS_FAILED']
    }
  }
}
