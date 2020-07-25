import { uniqueId } from '../actions'

const mockData = [
  {
    id: uniqueId(),
    title: 'Learn Redux',
    description: 'Store, action',
    status: 'Completed'
  },
  {
    id: uniqueId(),
    title: 'Peace',
    description: 'No big deal',
    status: 'In Progress'
  }
]

export default function tasks(state = { tasks: mockData }, action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return {tasks: state.tasks.concat(
        action.payload
      )}
    case 'EDIT_TASK':
      const { payload } = action
      return {
        tasks: state.tasks.map(task => {
          if (task.id === payload.id) {
            return {...task, status: payload.param.status}
          }
          return task
        })
      }
    default:
      return state
  }
}