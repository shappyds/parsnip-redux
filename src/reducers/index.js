const initialState = {
  isLoading: false,
  tasks: [],
  error: null
}

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TASKS_START':
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_TASKS_FAILED': 
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case 'FETCH_TASKS_SUCCEEDED':
      return {
        ...state,
        tasks: action.payload,
        error: null,
        isLoading: false
      }
    case 'CREATE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.concat(
        action.payload.task
      )}
    case 'EDIT_TASK_SUCCESS':
      const { payload } = action
      return {
        ...state,
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