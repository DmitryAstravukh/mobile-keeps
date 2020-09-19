import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SectionList } from 'react-native';
import styled from 'styled-components/native';
import Keep from './../components/keep';
import GroupTitle from './../components/group-title';
import AddButton from './../components/add-button';
import { StatusBar } from "react-native";
import { getAllKeeps } from './../redux/actions';
import * as styleVariables from './../style-variables';
import { FontAwesome5 } from '@expo/vector-icons'; 
import ModalWindow from './../components/modal-window';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const Home = ({ navigation }) => {
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const [searchText, setSearchText] = useState();

  const DATA = useSelector(state => state.keeps);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllKeeps())
  });


  return (
    <Container>
      <FilterContainer onPress={() => setModalFilterVisible(true)}>
        <FontAwesome5 name="filter" size={26} color={styleVariables.MAIN_BACKGROUND_COLOR} />
      </FilterContainer>

      <ModalWindow modalVisible={modalFilterVisible}>
        <ModalText onPress={() =>setModalFilterVisible(false)}>Выберите вариант группировки</ModalText>

        <ModalFilterItem onPress={() => console.log('1')}>
          <ItemNumber>1.</ItemNumber>
          <ItemFilter>
            <ColorBlockDefault></ColorBlockDefault>
            <ColorBlockWarning></ColorBlockWarning>
            <ColorBlockDanger></ColorBlockDanger>
          </ItemFilter>
        </ModalFilterItem>

        <ModalFilterItem onPress={() => console.log('2')}>
          <ItemNumber>2.</ItemNumber>
          <ItemFilter>
            <ColorBlockDanger></ColorBlockDanger>
            <ColorBlockWarning></ColorBlockWarning>
            <ColorBlockDefault></ColorBlockDefault>
          </ItemFilter>
        </ModalFilterItem>

        <ModalFilterItem onPress={() => console.log('3')}>
          <ItemNumber>3.</ItemNumber>
          <ItemFilterText>По умолчанию</ItemFilterText>
        </ModalFilterItem>

        <ModalButton onPress={() => setModalFilterVisible(false)}>
          <ModalButtonText>Отмена</ModalButtonText>
        </ModalButton>

      </ModalWindow>

      <StatusBar hidden={true} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Input
          onChangeText={searchText => setSearchText(searchText)}
          value={searchText}
          placeholder='Найти заметку'
        />
      </TouchableWithoutFeedback>

      <SectionList
        sections={DATA}

        keyExtractor={
          (item, index) => item + index
        }

        renderItem={
          ({ item }) => <Keep {...item} navigation={navigation}/> 
        }

        renderSectionHeader={
          ({ section: { title } }) => (
            <GroupTitle title={title} />
          )
        }
      />
      
      <AddButton navigation={navigation}/>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const FilterContainer = styled.TouchableOpacity`
  position: absolute;
  top: -43px;
  right: 10px;
  z-index: 99999;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: ${styleVariables.MAIN_COLOR};
`;

const ModalText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${styleVariables.MAIN_TEXT_COLOR};
`;

const ModalFilterItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 10px;
  border-radius: 10px;
`;

const ItemNumber = styled.Text`
  color: ${styleVariables.MAIN_TEXT_COLOR};
  font-size: 18px;
  margin-right: 10px;
`;

const ItemFilter = styled.View`
  flex-direction: row;
`;

const ItemFilterText = styled.Text`
  color: ${styleVariables.MAIN_TEXT_COLOR};
  font-size: 18px;
`;

const ColorBlockDefault = styled.View`
  width: 30px;
  height: 30px;
  background-color: ${styleVariables.KEEP_BACKGROUND_DEFAULT};
`;
const ColorBlockWarning = styled.View`
  width: 30px;
  height: 30px;
  margin: 0 5px;
  background-color: ${styleVariables.KEEP_BACKGROUND_WARNING};
`;
const ColorBlockDanger = styled.View`
  width: 30px;
  height: 30px;
  background-color: ${styleVariables.KEEP_BACKGROUND_DANGER};
`;

const ModalButton = styled.TouchableOpacity`
  padding: 10px 80px;
  margin-top: 30px;
  border-radius: 50px;
  background-color: ${styleVariables.KEEP_BACKGROUND_DEFAULT};
`;

const ModalButtonText = styled.Text`
  color: ${styleVariables.MAIN_TEXT_COLOR};
  font-size: 18px;
`;


const Input = styled.TextInput`
  width: 100%;
  border: none;
  border-bottom-width: 2px;
  border-bottom-color: ${styleVariables.BORDER_BOTTOM_INPUT};
  padding: 5px;
  color: ${styleVariables.MAIN_TEXT_COLOR};
  font-size: 16px;
`;