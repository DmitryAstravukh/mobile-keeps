import { GET_ALL_KEEPS, ADD_KEEP, EDIT_KEEP, DELETE_KEEP, FILTER_KEEPS, SEARCH_KEEPS } from './actions_types';

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

    return {
      ...state,
      keeps: [
        ...state.keeps,
        newItem
      ],
      visibleData: [
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
              color: data.color,
              date: currentDate
            }
          ]
        }
      }
    );
    return {
      ...state,
      keeps: item,
      visibleData: item
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
        color: data.color,
        date: getCurrentDate()
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
    ),
    visibleData: Object.values(
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
      ),
      visibleData: Object.values(
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
      keeps: state.keeps.filter((item, index) => index !== keepObjItemIndex),
      visibleData: state.keeps.filter((item, index) => index !== keepObjItemIndex)
    }
  }
}

const filterKeeps = (state, filterId) => {
  //создать свойство со структурой как у заметок и вовращать его
  // switch(filterId){
  //   case 0: return state;
    
  //   case 1: 
  //     return {
  //       keeps: [
  //         state.keeps[0]
  //       ]
  //     };

  //   case 2: 
  //     return {
  //       keeps: [
  //         state.keeps[1]
  //       ]
  //     };

  //   default: return state;
  // }
  //делать конкатенацию array.filter по цветам
  return state;
}

const searchKeeps = (state, str) => {
  //console.log('---------------------------------------------------------');
  const searchedData = state.keeps.map(keepBlockObj => {
    const keepsSearch = keepBlockObj.data.filter(keep => {
      return keep.text.toLowerCase().includes(str.toLowerCase()) || keep.date.toLowerCase().includes(str.toLowerCase())
    }) // return "data"

    if(keepsSearch.length > 0){
      return {
        title: keepBlockObj.title,
        data: keepsSearch
      }
    }
  }).filter(item => item !== undefined);

  let a = {
    ...state,
    searchStr: str,
    searchedData,
    visibleData: searchedData
  }
  //console.log(a);

  return {
    ...state,
    searchStr: str,
    searchedData,
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