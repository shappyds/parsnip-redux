
import { TASK_STATUSES } from '../constants'
let _id = 1

export function uniqueId() {
  return _id++
}

export function createTask({ title, desc }) {
  return {
    type: 'CREATE_TASK',
    payload: {
      id: uniqueId(),
      title,
      description: desc,
      status: TASK_STATUSES[0]
    }
  }
}

export function editTask({ id, param = {}}) {
  return {
    type: 'EDIT_TASK',
    payload: {
      id,
      param
    }
  }
}