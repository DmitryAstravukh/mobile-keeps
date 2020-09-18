import React from 'react';

import styled from 'styled-components/native';
import { Modal} from "react-native";

import * as styleVariables from './../style-variables';

const ModalWindow = ({ modalVisible, children}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <ModalContainer>
        <ModalItem>
          {children}
        </ModalItem>
      </ModalContainer>
    </Modal>
  )
}


const ModalContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.65);
  padding: 0 15px
`;

const ModalItem = styled.View`
  background-color: ${styleVariables.MAIN_BACKGROUND_COLOR};
  width: 100%;
  margin: 0 10px;
  padding: 30px 20px;
  border-radius: 20px;
  align-items: center;
`;


export default ModalWindow;