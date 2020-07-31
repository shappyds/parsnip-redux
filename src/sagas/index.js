import { call, put, takeLatest, delay, take } from 'redux-saga/effects'
import * as api from '../api'
import { channel } from 'redux-saga'

export default function* rootSaga() {
  yield takeLatest('FETCH_TASKS_START', fetchTasks)
  yield takeLatestById(['TIMER_START', 'TIMER_STOP'], processTimer)
}

function* takeLatestById(actionType, saga) {
  const channelMap = {}

  while(true) {
    const action = yield take(actionType)
    const { taskId } = action.payload

    if(!channelMap[taskId]) {
      channelMap[taskId] = channel()
      yield takeLatest(channelMap[taskId], saga)
    }

    yield put(channelMap[taskId], action)
  }
}

function* processTimer({ payload, type }) {
  if(type === 'TIMER_START') {
    while(true) {
      yield delay(1000)
      yield put({
        type: 'TIMER_INCREMENT',
        payload: {
          taskId: payload.taskId
        }
      })
    }
  }
}


function* fetchTasks() {
  try {
    const { data }  = yield call(api.fetchTasks)
    yield put({
      type: 'FETCH_TASKS_SUCCEEDED',
      payload: {
        tasks: data
      }
    })
  } catch (error) {
    yield put({
      type: 'FETCH_TASKS_FAILED',
      payload: {
        error: error.message
      }
    })
  }
}


