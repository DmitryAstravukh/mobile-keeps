import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import styled from 'styled-components/native';

import SelectBox from 'react-native-multi-selectbox';
import { editKeep } from './../redux/actions';
import { Keyboard} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import ModalWindow from './../components/modal-window';
import * as styleVariables from './../style-variables';

export const EditKeep = ({ route: { params: { id, propTitle, propText, propColor } } }) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('Заметка изменена');

  const [title, setEditTitle] = useState();
  const [text, setEditText] = useState();
  const [colors, setEditColor] = useState(
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

  useEffect(() => {
    setEditTitle(propTitle);
    setEditText(propText);
    setEditColor(state =>{
      const foundItem = state.locations.findIndex(obj => obj.color === propColor);
      if(foundItem === -1){
        return { ...state, selectedLocations: state.locations[0] }
      }
      return { ...state, selectedLocations: state.locations[foundItem] }
    });
  }, [propTitle, propText, propColor]);

  const dispatch = useDispatch();

  const _editKeep = () => {
    const dateNow = `${new Date().getDate()}.${(new Date().getMonth() + 1)}.${new Date().getFullYear()} в`;
    const timeNow = `${new Date().getHours()}ч.${(new Date().getMinutes())}м.${new Date().getSeconds()}с`;
    if(text && colors.selectedLocations.color && text.trim().length > 0){
      let obj = {
        id,
        title: title ? title.trim() : `${dateNow} ${timeNow}`, 
        text: text.trim(), 
        color: colors.selectedLocations.color
      };

      dispatch(editKeep(obj));

      setModalText('Заметка изменена');
      setModalVisible(true);
    } else {
      setModalText('Заполните все поля');
      setModalVisible(true);
    }
  }
  
  return (
    <EditKeepContainer>
      <ModalWindow modalVisible={modalVisible}>
        <ModalText>{modalText}</ModalText>
        <ModalButton onPress={() => setModalVisible(false)}>
          <ModalButtonText>Ок</ModalButtonText>
        </ModalButton>
      </ModalWindow>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>{/* скрывает клаву */}
        <Input
          onChangeText={title => setEditTitle(title)}
          value={title}
          placeholder='Введите заголовок'
        />

        <Input
          multiline={true}
          numberOfLines={4}
          onChangeText={text => setEditText(text)}
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
              setEditColor(state => ({ ...state, selectedLocations: color }))
            }}
            hideInputFilter={true}
          />
        </SelectBoxContainer>
      </TouchableWithoutFeedback> 

      <EditKeepButton onPress={_editKeep}>
        <EditKeepButtonText>Изменить</EditKeepButtonText>
      </EditKeepButton>
    </EditKeepContainer>
  )
}

const EditKeepContainer = styled.View`
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

const EditKeepButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  border-radius: 50px;
  background-color: ${styleVariables.MAIN_COLOR};
  margin-top: 20px;
`;

const EditKeepButtonText = styled.Text`
  color: ${styleVariables.MAIN_BACKGROUND_COLOR};
  font-size: 16px;
`;


const ModalText = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  color: ${styleVariables.MAIN_TEXT_COLOR};
`;

const ModalButton = styled.TouchableOpacity`
  color: ${styleVariables.MAIN_TEXT_COLOR};
  padding: 10px 80px;
  border-radius: 50px;
  background-color: ${styleVariables.MAIN_BUTTON_BACKGROUND_COLOR};
`;

const ModalButtonText = styled.Text`
  color: ${styleVariables.MAIN_BUTTON_TEXT_COLOR};
  font-size: 18px;
`;