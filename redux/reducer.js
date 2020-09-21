import { GET_ALL_KEEPS, ADD_KEEP, EDIT_KEEP, DELETE_KEEP, FILTER_KEEPS, SEARCH_KEEPS } from './actions_types';
import { 
  KEEP_BACKGROUND_DEFAULT,
  KEEP_BACKGROUND_WARNING,
  KEEP_BACKGROUND_DANGER 
} from './../style-variables';
const inicialState = {
  keeps: [
    {
      title: '11.9.2020',
      data: [
        {
          id: 1,
          title: 'Заголовок 1',
          text: 'Текст 1',
          color: '#c6c6c6',
          date: '11.9.2020'
        },
        {
          id: 2,
          title: 'Заголовок 2',
          text: 'Текст 2',
          color: '#ffdb4d',
          date: '11.9.2020'
        },
        {
          id: 3,
          title: 'Заголовок 3',
          text: 'Текст 3',
          color: '#ff7b7b',
          date: '11.9.2020'
        },
        {
          id: 4,
          title: 'Заголовок 4',
          text: 'Текст 4',
          color: '#ffdb4d',
          date: '11.9.2020'
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
          color: '#ffdb4d',
          date: '16.9.2020'
        },
        {
          id: 6,
          title: 'Заголовок 2',
          text: 'Текст 2',
          color: '#ffdb4d',
          date: '16.9.2020'
        },
        {
          id: 7,
          title: 'Заголовок 3',
          text: 'Текст 3',
          color: '#c6c6c6',
          date: '16.9.2020'
        }
      ]
    },
  ],
  filteredData: [],
  searchedData: [],
  visibleData: [],
  searchStr: '',
  filterId: 0
};

const getCurrentDate = () => {
  return `${new Date().getDate()}.${new Date().getMonth()+1}.${new Date().getFullYear()}`;
}

const getAllKeeps = (state) => {
  //return searchKeeps(state, state.searchStr)
  if(state.visibleData && state.visibleData.length === 0 && state.searchStr === ''){ 
    //console.log(state.visibleData.length);
    return {
      ...state,
      visibleData: state.keeps
    }
  }
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
          color: data.color,
          date: currentDate
        }
      ]
    }

    return filterKeeps({
      ...state,
      keeps: [
        ...state.keeps,
        newItem
      ]
    }, state.filterId)

    // return {
    //   ...state,
    //   keeps: [
    //     ...state.keeps,
    //     newItem
    //   ],
    //   //при добавлении копируется весь новый массив и сбивается поиск
    //   visibleData: [
    //     ...state.keeps,
    //     newItem
    //   ]
    // }

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
              color: data.color,
              date: currentDate
            }
          ]
        }
      }
    );
    return filterKeeps({
      ...state,
      keeps: item
    }, state.filterId);
    // return {
    //   ...state,
    //   keeps: item,
    //   visibleData: item
    // }
  }

}

const editKeep = (state, data) => { 
  //проверять если число редактирования отличается, то переносить в другой блок
  //отредактировал заметку 16-го числа, она должна перенестить в заметки текущего числа
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
        color: data.color,
        date: getCurrentDate()
      }
    }
  )

  const editedState = {
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
  };

  return filterKeeps(editedState, state.filterId);

  // return {
  //   ...state,
  //   keeps: Object.values(
  //     {
  //       ...state.keeps,
  //       [keepObjItemIndex]: {
  //         ...state.keeps[keepObjItemIndex],
  //         data: editedKeep
  //       }
  //     }
  //   ),
  //   visibleData: Object.values(
  //     {
  //       ...state.keeps,
  //       [keepObjItemIndex]: {
  //         ...state.keeps[keepObjItemIndex],
  //         data: editedKeep
  //       }
  //     }
  //   )
  // }
}

const deleteKeep = (state, id) => {
  let keepObjItemIndex;

  state.keeps.forEach((obj, index) => {
    obj.data.forEach(keep => {
      if(keep.id === id) keepObjItemIndex = index; 
    }) 
  });

  if(state.keeps[keepObjItemIndex].data.length-1 > 0){
    return filterKeeps({
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
    }, state.filterId);
    // return {
    //   ...state,
    //   keeps: Object.values(
    //     {
    //       ...state.keeps,
    //       [keepObjItemIndex]: {
    //         ...state.keeps[keepObjItemIndex],
    //         data: state.keeps[keepObjItemIndex].data.filter(keep => keep.id !== id)
    //       }
    //     }
    //   ),
    //   visibleData: Object.values(
    //     {
    //       ...state.keeps,
    //       [keepObjItemIndex]: {
    //         ...state.keeps[keepObjItemIndex],
    //         data: state.keeps[keepObjItemIndex].data.filter(keep => keep.id !== id)
    //       }
    //     }
    //   )
    // }
  } else {
    return filterKeeps({
      ...state,
      keeps: state.keeps.filter((item, index) => index !== keepObjItemIndex)
    }, state.filterId);
    // return {
    //   ...state,
    //   keeps: state.keeps.filter((item, index) => index !== keepObjItemIndex),
    //   visibleData: state.keeps.filter((item, index) => index !== keepObjItemIndex)
    // }
  }
}

//TODO при поиске и выборе фильтра не фильтрует
const filterKeeps = (state, filterId) => {
  
  if(filterId === 0) return searchKeeps({
    ...state,
    visibleData: state.keeps
  }, state.searchStr);

  const filteredData = state.keeps.map(keepBlockObj => {

    const keepsDefault = keepBlockObj.data.filter(keep => {
      return keep.color.toLowerCase().includes(KEEP_BACKGROUND_DEFAULT.toLowerCase()) 
    });
    
    const keepsWarning = keepBlockObj.data.filter(keep => {
      return keep.color.toLowerCase().includes(KEEP_BACKGROUND_WARNING.toLowerCase()) 
    })

    const keepsDanger = keepBlockObj.data.filter(keep => {
      return keep.color.toLowerCase().includes(KEEP_BACKGROUND_DANGER.toLowerCase()) 
    })

    switch(filterId){
      case 1:
        return {
          title: keepBlockObj.title,
          data: [
            ...keepsDefault,
            ...keepsWarning,
            ...keepsDanger
          ]
        };

      case 2:
        return {
          title: keepBlockObj.title,
          data: [
            ...keepsDanger,
            ...keepsWarning,
            ...keepsDefault
          ]
        };

      default: return searchKeeps(state, state.searchStr);
    }
  });

  return searchKeeps({
    ...state,
    visibleData: filteredData
  }, state.searchStr);
}

const searchKeeps = (state, str) => {
  console.log(state);
  if(str === '') return state;

  const searchedData = state.keeps.map(keepBlockObj => {
    const keepsSearch = keepBlockObj.data.filter(keep => {
      return keep.text.toLowerCase().includes(str.toLowerCase()) || keep.date.toLowerCase().includes(str.toLowerCase())
    }) 

    if(keepsSearch.length > 0){
      return {
        title: keepBlockObj.title,
        data: keepsSearch
      }
    }
  }).filter(item => item !== undefined);

  return {
    ...state,
    searchStr: str,
    visibleData: searchedData
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

    case FILTER_KEEPS: 
      return filterKeeps(state, action.filterId);
      
    case SEARCH_KEEPS: 
      return searchKeeps(state, action.str);

    default: return state;
  }
}

export default reducer;