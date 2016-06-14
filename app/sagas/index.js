import { call, put, take, fork, cancel } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function* tick() {
  while(true) {
    yield call(delay, 1000);
    yield put({type: 'TICK'});
  }
}

function* timer() {
  while(yield take('START')) {
    // starts the task in the background
    const bgSyncTask = yield fork(tick)

    // wait for the user stop action
    yield take('STOP')
    // user clicked stop. cancel the background task
    // this will throw a SagaCancellationException into task
    yield cancel(bgSyncTask)
  }
}

export default function* root() {
  yield timer()
}