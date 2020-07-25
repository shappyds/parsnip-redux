import React from 'react'
import { TASK_STATUSES } from '../constants'

const Task = props => {
  function onStatusChange(e) {
    props.onStatusChange({id: props.task.id, param: { status: e.target.value }})
  }


  return (
    <div className="task">
      <div className="task-header">
        <div>{props.task.title}</div>
        <select value={props.task.status} onChange={onStatusChange}>
          {
            TASK_STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))
          }
        </select>
      </div>
      <hr />
      <div className="task-body">{props.task.description}</div>
    </div>
  )
}

export default Task