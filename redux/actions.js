import { GET_ALL_KEEPS, ADD_KEEP, EDIT_KEEP } from './actions_types';


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