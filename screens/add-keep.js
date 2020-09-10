import React from 'react';
import styled from 'styled-components/native';
import SelectBox from 'react-native-multi-selectbox';

export function AddKeep() {
  
  const [title, onChangeTitle] = React.useState();
  const [text, onChangeText] = React.useState();
  const [colors, onChangeColor] = React.useState(
    {
      selectedLocations: {},
      selectedValues: [],
      locations: [
        { item: 'gray', id: '1' },
        { item: 'yellow', id: '2' },
        { item: 'red', id: '3' }
      ]
    }
  );

  return (
    <AddKeepContainer>
      <Input
        onChangeText={title => onChangeTitle(title)}
        value={title}
        placeholder='Введите заголовок'
      />
     <Input
      multiline={true}
      numberOfLines={4}
      onChangeText={text => onChangeText(text)}
      value={text}
      placeholder='Введите текст заметки'
    />

    <SelectBoxContainer>
      <SelectBox
        label="Выберите цвет"
        options={colors.locations}
        value={colors.selectedLocations}
        onChange={color => {
          onChangeColor(state => ({ ...state, selectedLocations: color }))
        }}
        hideInputFilter={true}
      />
    </SelectBoxContainer>

      <AddKeepButton>
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
  border-bottom-color: silver;
  margin-top: 15px;
  padding: 5px;
  color: #545660;
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
  background-color: #8529e4;
  margin-top: 20px;
`;

const AddKeepButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
`;

