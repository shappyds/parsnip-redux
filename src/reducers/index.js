
export default function tasks(state = { tasks: [] }, action) {
  switch (action.type) {
    case 'FETCH_TASKS_SUCCEEDED':
      return action.payload
    case 'CREATE_TASK_SUCCESS':
      return {tasks: state.tasks.concat(
        action.payload.task
      )}
    case 'EDIT_TASK_SUCCESS':
      const { payload } = action
      return {
        tasks: state.tasks.map(task => {
          if (task.id === payload.task.id) {
            return payload.task
          }
          return task
        })
      }
    default:
      return state
  }
}