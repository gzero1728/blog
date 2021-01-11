import { POSTS_LOADING_FAILURE, POSTS_LOADING_REQUEST, POSTS_LOADING_SUCCESS, POST_DETAIL_LOADING_FAILURE, POST_DETAIL_LOADING_REQUEST, POST_DETAIL_LOADING_SUCCESS, POST_EDIT_LOADING_FAILURE, POST_EDIT_LOADING_REQUEST, POST_EDIT_LOADING_SUCCESS, POST_EDIT_UPLOADING_FAILURE, POST_EDIT_UPLOADING_REQUEST, POST_EDIT_UPLOADING_SUCCESS } from "../types"

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: "",
  postCount: "",
  loading: false,
  error: "",
  creatorID: "",
  categoryFindResult: "",
  title: "",
  searchBy: "",
  searchResult: ""
}

// eslint-disable-next-line
export default function (state = initialState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case POSTS_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      }
    case POSTS_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
      }
    case POSTS_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      }
    case POST_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      }
    case POST_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        creatorId: action.payload.creator._id,
        title: action.payload.title,
        loading: false,
      }
    case POST_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case POST_EDIT_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      }
    case POST_EDIT_LOADING_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      }
    case POST_EDIT_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case POST_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case POST_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isAuthenticated: true,
        loading: false,
      }
    case POST_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}