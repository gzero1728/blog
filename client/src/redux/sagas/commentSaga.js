import axios from "axios";
import { push } from "connected-react-router";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { COMMENT_LOADING_REQUEST, COMMENT_LOADING_FAILURE, COMMENT_LOADING_SUCCESS, COMMENT_UPLOADING_FAILURE } from "../types";

// Load Commnet 
const loadCommentsAPI = (payload) => {
  console.log(payload, "loadCommentAPI ID");
  return axios.get(`/api/post/${payload}/comments`)
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.payload)
    console.log(result);
    yield put({
      type: COMMENT_LOADING_SUCCESS,
      payload: result.data
    })
  } catch (e) {
    console.log(e)
    yield put({
      type: COMMENT_LOADING_FAILURE,
      payload: e
    })
    yield push('/')
  }
}

function* watchLoadComments() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComments)
}

export default function* commentSaga() {
  yield all([
    fork(watchLoadComments)
  ])
}