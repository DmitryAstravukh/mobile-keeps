import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SectionList } from 'react-native';
import styled from 'styled-components/native';

import Keep from './../components/keep';
import GroupTitle from './../components/group-title';
import AddButton from './../components/add-button';

import { StatusBar} from "react-native";
import { getAllKeeps } from './../redux/actions';

import * as styleVariables from './../style-variables';

import { FontAwesome5 } from '@expo/vector-icons'; 
import ModalWindow from './../components/modal-window';

export const Home = ({ navigation }) => {
  const [modalFilterVisible, setModalFilterVisible] = useState(false);

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
        <ModalText onPress={() =>setModalFilterVisible(false)}>Группировать по:</ModalText>
      </ModalWindow>

      <StatusBar hidden={true} />
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
  margin-bottom: 20px;
  color: ${styleVariables.MAIN_TEXT_COLOR};
`;