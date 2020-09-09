import React from 'react';
import { SectionList } from 'react-native';
import styled from 'styled-components/native';

import Keep from './../components/keep';
import GroupTitle from './../components/group-title';
import AddButton from './../components/add-button';

import { StatusBar} from "react-native";

const DATA = [
  {
    title: '11 сентября',
    data: [
      {
        id: 1,
        title: 'Заголовок 1',
        text: 'Текст 1',
        color: '#ff5750'
      },
      {
        id: 2,
        title: 'Заголовок 2',
        text: 'Текст 2',
        color: '#ffa4a0'
      },
      {
        id: 3,
        title: 'Заголовок 3',
        text: 'Текст 3',
        color: 'green'
      }
    ]
  },
  {
    title: '12 сентября',
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
];

export function Home({navigation}) {
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

