import React from 'react';
import { Text, SectionList } from 'react-native';
import styled from 'styled-components/native';

import Keep from './components/keep';
import GroupTitle from './components/group-title';
import AddButton from './components/add-button';

const DATA = [
  {
    title: '11 сентября',
    data: [
      {
        title: 'Заголовок 1',
        text: 'Текст 1',
        color: '#ff5750'
      },
      {
        title: 'Заголовок 2',
        text: 'Текст 2',
        color: '#ffa4a0'
      },
      {
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
        title: 'Заголовок 1',
        text: 'Текст 1',
        color: 'gray'
      },
      {
        title: 'Заголовок 2',
        text: 'Текст 2',
        color: 'grey'
      },
      {
        title: 'Заголовок 3',
        text: 'Текст 3',
        color: 'green'
      }
    ]
  },
];

export default function App() {
  return (
    <Container>
      <SectionList
        sections={DATA}

        keyExtractor={
          (item, index) => item + index
        }

        renderItem={
          ({ item }) => <Keep {...item}/> 
        }

        renderSectionHeader={
          ({ section: { title } }) => (
            <GroupTitle title={title} />
          )
        }
      />
      
      <AddButton />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  margin-top: 25px;
`;

