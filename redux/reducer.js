import { GET_ALL_KEEPS, ADD_KEEP, EDIT_KEEP } from './actions_types';

const inicialState = {
  keeps: [
    {
      title: '11.9.2020',
      data: [
        {
          id: 1,
          title: 'Заголовок 1',
          text: 'Текст 1',
          color: 'Серый'
        },
        {
          id: 2,
          title: 'Заголовок 2',
          text: 'Текст 2',
          color: 'желтый'
        },
        {
          id: 3,
          title: 'Заголовок 3',
          text: 'Текст 3',
          color: 'красный'
        },
        {
          id: 10,
          title: 'Заголовок 4',
          text: 'Текст 4',
          color: 'yellow'
        }
      ]
    },
    {
      title: '16.9.2020',
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



const addKeep = (state, data) => {
  console.log(data);
  const currentDate = `${new Date().getDate()}.${new Date().getMonth()+1}.${new Date().getFullYear()}`;
  const repetition = state.keeps.findIndex(obj => obj.title === currentDate);

  if(repetition === -1){
    const newItem = {
      title: currentDate,
      data: [
        {
          id: 25,
          title: data.title,
          text: data.text,
          color: data.color
        }
      ]
    }

    return {
      ...state,
      keeps: [
        ...state.keeps,
        newItem
      ]
    }

  } else {
    // Object.values используется т.к.  "вы не можете распространять свойства объекта на массив, 
    //объекты всегда будут распространять свои свойства на новый объект."
    const item = Object.values(
      {
        ...state.keeps,
        [repetition]: {
          ...state.keeps[repetition],
          data: [
            ...state.keeps[repetition].data,
            {
              id: 30,
              title: data.title,
              text: data.text,
              color: data.color
            }
          ]
        }
      }
    );
    return {
      ...state,
      keeps: [
        ...item
      ]
    }
  }

}

const getAllKeeps = (state) => {
  //debugger;
  //let a = addKeep(state, {title: 'title', text: 'text', color: 'blue'});
  return state;
}

const reducer = (state = inicialState, action) => {
  switch(action.type){
    case GET_ALL_KEEPS: 
      return getAllKeeps(state);
    
    case ADD_KEEP: 
      return addKeep(state, action.data);

    default: return state;
  }
}

export default reducer;