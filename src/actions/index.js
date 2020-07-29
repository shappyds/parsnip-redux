
import { TASK_STATUSES } from '../constants'
import * as api from '../api'
let _id = 1

export function uniqueId() {
  return _id++
}

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

export function fetchTasksStart() {
  return {
    type: 'FETCH_TASKS_START'
  }
}

export function fetchTasksSucceeded(tasks) {
  return {
    type: 'FETCH_TASKS_SUCCEEDED',
    payload: {
      tasks
    }
  }
}

export function fetchTasksFailed(error) {
  return {
    type: 'FETCH_TASKS_FAILED',
    payload: {
      error
    }
  }
}


export function fetchTasks() {
  return dispatch => {
    dispatch(fetchTasksStart())
    api.fetchTasks()
      .then(res => {
        setTimeout(() => dispatch(fetchTasksSucceeded(res.data)), 3000)
      })
      .catch(error => {
        dispatch(fetchTasksFailed(error.message))
      })
  }
}