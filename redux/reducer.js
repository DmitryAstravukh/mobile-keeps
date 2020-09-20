import { GET_ALL_KEEPS, ADD_KEEP, EDIT_KEEP, DELETE_KEEP } from './actions_types';

const inicialState = {
  keeps: [
    {
      title: '11.9.2020',
      data: [
        {
          id: 1,
          title: 'Заголовок 1',
          text: 'Текст 1',
          color: '#fff'
        },
        {
          id: 2,
          title: 'Заголовок 2',
          text: 'Текст 2',
          color: '#fff'
        },
        {
          id: 3,
          title: 'Заголовок 3',
          text: 'Текст 3',
          color: '#fff'
        },
        {
          id: 4,
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
          id: 5,
          title: 'Заголовок 1',
          text: 'Текст 1',
          color: 'gray'
        },
        {
          id: 6,
          title: 'Заголовок 2',
          text: 'Текст 2',
          color: 'grey'
        },
        {
          id: 7,
          title: 'Заголовок 3',
          text: 'Текст 3',
          color: 'green'
        }
      ]
    },
  ]
};

const getCurrentDate = () => {
  return `${new Date().getDate()}.${new Date().getMonth()+1}.${new Date().getFullYear()}`;
}

const getAllKeeps = (state) => {
  return state;
}

const addKeep = (state, data) => {
  const currentDate = getCurrentDate();
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

const editKeep = (state, data) => { 
  let keepObjItemIndex;
  let keepObjDataItemIndex;

  state.keeps.forEach((obj, index) => {
    obj.data.forEach((keep, i) => {
      if(keep.id === data.id){
        keepObjItemIndex = index;
        keepObjDataItemIndex = i;
      }
    }) 
  });

  const editedKeep = Object.values(
    {
      ...state.keeps[keepObjItemIndex].data,
      [keepObjDataItemIndex]: {
        ...state.keeps[keepObjItemIndex].data[keepObjDataItemIndex],
        title: data.title,
        text: data.text,
        color: data.color
      }
    }
  )

  return {
    ...state,
    keeps: Object.values(
      {
        ...state.keeps,
        [keepObjItemIndex]: {
          ...state.keeps[keepObjItemIndex],
          data: editedKeep
        }
      }
    )
    
  }
}

const deleteKeep = (state, id) => {
  let keepObjItemIndex;

  state.keeps.forEach((obj, index) => {
    obj.data.forEach(keep => {
      if(keep.id === id) keepObjItemIndex = index; 
    }) 
  });

  if(state.keeps[keepObjItemIndex].data.length-1 > 0){
    return {
      ...state,
      keeps: Object.values(
        {
          ...state.keeps,
          [keepObjItemIndex]: {
            ...state.keeps[keepObjItemIndex],
            data: state.keeps[keepObjItemIndex].data.filter(keep => keep.id !== id)
          }
        }
      )
    }
  } else {
    return {
      ...state,
      keeps: state.keeps.filter((item, index) => index !== keepObjItemIndex)
    }
  }
}


const reducer = (state = inicialState, action) => {
  switch(action.type){
    case GET_ALL_KEEPS: 
      return getAllKeeps(state);
    
    case ADD_KEEP: 
      return addKeep(state, action.data);
      
    case EDIT_KEEP: 
      return editKeep(state, action.data);

    case DELETE_KEEP: 
      return deleteKeep(state, action.id);

    default: return state;
  }
}

export default reducer;