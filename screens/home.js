import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SectionList } from 'react-native';
import styled from 'styled-components/native';

import Keep from './../components/keep';
import GroupTitle from './../components/group-title';
import AddButton from './../components/add-button';

import { StatusBar} from "react-native";
import { getAllKeeps } from './../redux/actions';


export function Home({navigation}) {
  const DATA = useSelector(state => state.keeps);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllKeeps())
  });

  return (
    <Container>
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
`;

