import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import styled from 'styled-components/native';
import SelectBox from 'react-native-multi-selectbox';
import { addKeep } from './../redux/actions';
import { Keyboard} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import ModalWindow from './../components/modal-window';
import * as styleVariables from './../style-variables';

export function AddKeep() {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('Заметка добавлена');

  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [colors, setColor] = useState(
    {
      selectedLocations: {},
      selectedValues: [],
      locations: [
        { id: '1', item: 'Серый', color: styleVariables.KEEP_BACKGROUND_DEFAULT },
        { id: '2', item: 'Желтый', color: styleVariables.KEEP_BACKGROUND_WARNING },
        { id: '3', item: 'Красный', color: styleVariables.KEEP_BACKGROUND_DANGER }
      ]
    }
  );

  const dispatch = useDispatch();

  const _addKeep = () => {
    const dateNow = `${new Date().getDate()}.${(new Date().getMonth() + 1)}.${new Date().getFullYear()}`;
    
    if(text && colors.selectedLocations.item){
      let obj = {
        title: title ? title.trim() : dateNow, 
        text: text.trim(), 
        color: colors.selectedLocations.item
      };

      dispatch(addKeep(obj));
      clearFields();
      setModalText('Заметка добавлена');
      setModalVisible(true);
    } else {
      setModalText('Заполните все поля');
      setModalVisible(true);
    }
  }

  const clearFields = () => {
    setTitle('');
    setText('');
    setColor(state => ({ ...state, selectedLocations: {} }));
  }


  return (
    
    <AddKeepContainer >

      <ModalWindow modalText={modalText} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>{/* скрывает клаву */}
        <Input
          onChangeText={title => setTitle(title)}
          value={title}
          placeholder='Введите заголовок'
        />

        <Input
        multiline={true}
        numberOfLines={4}
        onChangeText={text => setText(text)}
        value={text}
        placeholder='Введите текст заметки'
        />

        <SelectBoxContainer>
          <SelectBox
            label="Выберите цвет"
            options={colors.locations}
            value={colors.selectedLocations}
            onPress={Keyboard.dismiss}
            onChange={color => {
              setColor(state => ({ ...state, selectedLocations: color }))
            }}
            hideInputFilter={true}
          />
        </SelectBoxContainer>
      </TouchableWithoutFeedback> 

      <AddKeepButton onPress={_addKeep}>
        <AddKeepButtonText>Добавить</AddKeepButtonText>
      </AddKeepButton>

    </AddKeepContainer>
    
  )
}



const AddKeepContainer = styled.View`
  margin: 0 5px;
`;

const Input = styled.TextInput`
  width: 100%;
  border: none;
  border-bottom-width: 2px;
  border-bottom-color: ${styleVariables.BORDER_BOTTOM_INPUT};
  margin-top: 15px;
  padding: 5px;
  color: ${styleVariables.MAIN_TEXT_COLOR};
  font-size: 16px;
`;

const SelectBoxContainer = styled.View `
  margin-top: 20px;
`;

const AddKeepButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  border-radius: 50px;
  background-color: ${styleVariables.MAIN_COLOR};
  margin-top: 20px;
`;

const AddKeepButtonText = styled.Text`
  color: ${styleVariables.MAIN_BACKGROUND_COLOR};
  font-size: 16px;
`;
