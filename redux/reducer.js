import { GET_ALL_KEEPS, ADD_KEEP, EDIT_KEEP } from './actions_types';

const inicialState = {
  keeps: [
    {
      title: '11 сентября',
      data: [
        {
          id: 1,
          title: 'Заголовок 1',
          text: 'Текст 1',
          color: '#ff5750'
        },
        {
          id: 2,
          title: 'Заголовок 2',
          text: 'Текст 2',
          color: '#ffa4a0'
        },
        {
          id: 3,
          title: 'Заголовок 3',
          text: 'Текст 3',
          color: 'orange'
        }
      ]
    },
    {
      title: '12 сентября',
      data: [
        {
          id: 4,
          title: 'Заголовок 1',
          text: 'Текст 1',
          color: 'gray'
        },
        {
          id: 5,
          title: 'Заголовок 2',
          text: 'Текст 2',
          color: 'grey'
        },
        {
          id: 6,
          title: 'Заголовок 3',
          text: 'Текст 3',
          color: 'green'
        }
      ]
    },
  ]
};

const getAllKeeps = (state) => {
  return state;
}

const reducer = (state = inicialState, action) => {
  switch(action.type){
    case GET_ALL_KEEPS: 
      return getAllKeeps(state);

    default: return state;
  }
}

export default reducer;