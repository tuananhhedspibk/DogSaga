import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

// watcherSaga: watches for actions dispatched to the store, start worker-saga

export function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga);
}

const fetchDog = (): Promise<any> => {
  return axios({
    method: 'get',
    url: 'https://dog.ceo/api/breeds/image/random',
  });
}

// worker-saga: makes the api call when watcher-saga sees the action

function* workerSaga(): Generator<any> {
  try {
    const response: any = yield call(fetchDog);
    const dog = response.data.message;

    yield put({ type: 'API_CALL_SUCCESS', dog });

  } catch (error) {
    yield put({ type: 'API_CALL_FAILURE', error });
  }
}
