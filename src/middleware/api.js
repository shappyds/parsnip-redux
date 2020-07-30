import { makeCall } from '../api'

export const CALL_API = 'CALL_API'

const app = store => next => action => {
  const callApi = action[CALL_API]

  if (typeof callApi === 'undefined') {
    return next(action)
  }

  const [requestStart, success, fail ] = callApi.types

  next({
    type: requestStart
  })

  makeCall({endpoint: callApi.endpoint})
    .then(res => {
      next({
        type: success,
        payload: res.data
      })
    })
    .catch(err => {
      next({
        type: fail,
        payload: err.message
      })
    })
}

export default app