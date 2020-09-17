import React from 'react';

import styled from 'styled-components/native';
import { Modal} from "react-native";

import * as styleVariables from './../style-variables';

const ModalWindow = ({ modalVisible,  modalText, setModalVisible}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <ModalContainer>
        <ModalItem>
          <ModalText>{modalText}</ModalText>

          <ModalButton onPress={() => setModalVisible(false)}>
            <ModalButtonText>Ок</ModalButtonText>
          </ModalButton>
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

export default ModalWindow;