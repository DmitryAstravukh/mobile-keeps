import React from 'react';

import styled from 'styled-components/native';
import { Modal} from "react-native";

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
  background-color: #ffffff;
  width: 100%;
  margin: 0 10px;
  padding: 30px 20px;
  border-radius: 20px;
  align-items: center;
`;

const ModalText = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  color: #545660;
`;

const ModalButton = styled.TouchableOpacity`
  color: #ffffff;
  padding: 10px 80px;
  border-radius: 50px;
  background-color: #8529e4;
`;

const ModalButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
`;

export default ModalWindow;