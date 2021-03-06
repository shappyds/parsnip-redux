import React from 'react'
import { TASK_STATUSES } from '../constants'

const Task = props => {
  function onStatusChange(e) {
    props.onStatusChange(props.task.id, { desc: props.task.description, title: props.title, status: e.target.value })
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
      <div className="task-timer">{props.task.timer}S</div>
    </div>
  )
}

export default Task