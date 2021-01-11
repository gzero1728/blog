import axios from "axios";
import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST
} from "../types";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";

// @ All Posts load
const loadPostAPI = () => {
  return axios.get("/api/post")
}

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI)
    console.log(result, "loadPosts")
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data
    })
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e
    })
    yield put(push("/"))
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts)
}


// @ Post Upload
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post("/api/post", payload, config)
}

function* uploadPosts(action) {
  try {
    console.log(action, "uploadPost function");
    const result = yield call(uploadPostAPI, action.payload)
    console.log(result, "uploadPostAPI, action.payload")
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data
    })
    // /post/:id로 이동
    yield put(push(`/post/${result.data._id}`))
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e
    })
    yield put(push("/"))
  }
}

function* watchUploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts)
}


// @ Post Detail
const loadPostDetailAPI = (payload) => {
  console.log(payload)
  return axios.get(`/api/post/${payload}`)
}

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload)
    console.log(result, "post_detail_saga_data")
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data
    })
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e
    })
    yield put(push("/"))
  }
}

function* watchLoadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail)
}


// @ Post Delete
const deletePostAPI = (payload) => {
  // delete 자격은 글쓴 사람만 할 수 있음
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const token = payload.token
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.delete(`/api/post/${payload}`, config)
}

function* deletePost(action) {
  try {
    const result = yield call(deletePostAPI, action.payload)
    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data
    })
    yield put(push("/"))
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e
    })
  }
}

function* watchDeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, deletePost)
}


// @ Post Edit Load
const postEditLoadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const token = payload.token
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get(`/api/post/${payload.id}/edit`, config, payload)
}

function* postEditLoad(action) {
  try {
    const result = yield call(postEditLoadAPI, action.payload)
    yield put({
      type: POST_EDIT_LOADING_SUCCESS,
      payload: result.data
    })
  } catch (e) {
    yield put({
      type: POST_EDIT_LOADING_FAILURE,
      payload: e
    })
    yield put(push("/"))
  }
}

function* watchPostEditLoad() {
  yield takeEvery(POST_EDIT_LOADING_REQUEST, postEditLoad)
}


// @ Post Edit Upload
const postEditUploadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const token = payload.token
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  // payload가 앞에 있어야 const token=payload.token을 실행시킬 수 있다.
  return axios.post(`/api/post/${payload.id}/edit`, payload, config)
}

function* postEditUpload(action) {
  try {
    const result = yield call(postEditUploadAPI, action.payload)
    yield put({
      type: POST_EDIT_UPLOADING_SUCCESS,
      payload: result.data
    })
    yield put(push(`/post/${result.data._id}`))
  } catch (e) {
    yield put({
      type: POST_EDIT_UPLOADING_FAILURE,
      payload: e
    })
    yield put(push("/"))
  }
}

function* watchPostEditUpload() {
  yield takeEvery(POST_EDIT_UPLOADING_REQUEST, postEditUpload)
}


// @ POST SAGA
export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUploadPosts),
    fork(watchLoadPostDetail),
    fork(watchDeletePost),
    fork(watchPostEditLoad),
    fork(watchPostEditUpload)
  ])
}

