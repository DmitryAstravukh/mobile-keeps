import { GET_ALL_KEEPS, ADD_KEEP, EDIT_KEEP, DELETE_KEEP, FILTER_KEEPS, SEARCH_KEEPS } from './actions_types';


export const getAllKeeps = () => {
  return {
    type: GET_ALL_KEEPS
  }
}

export const addKeep = (data) => {
  return {
    type: ADD_KEEP,
    data
  }
}

export const editKeep = (data) => {
  return {
    type: EDIT_KEEP,
    data
  }
}

export const deleteKeep = (id) => {
  return {
    type: DELETE_KEEP,
    id
  }
}

export const filterKeeps = (filterId) => {
  return {
    type: FILTER_KEEPS,
    filterId
  }
}

export const searchKeeps = (str) => {
  return {
    type: SEARCH_KEEPS,
    str
  }
}