import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';


export default function AddButton({navigation}) {
  return (
    <AddButtonContainer onPress={() => navigation.push('AddKeep')}>
      <Ionicons name="ios-add" size={33} color="#ffffff" />
    </AddButtonContainer>
  )
}

const AddButtonContainer = styled.TouchableOpacity`
  position: absolute;
  z-index: 9999;
  bottom: 20px;
  right: 20px;
  width: 65px;
  height: 65px;
  border-radius: 50px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #8529e4;
`;