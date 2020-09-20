import React from 'react';
import { useDispatch } from "react-redux";
import styled from 'styled-components/native';
import Swipeout from 'react-native-swipeout';
import { FontAwesome } from '@expo/vector-icons'; 
import { deleteKeep } from './../redux/actions';

import * as styleVariables from './../style-variables';
export default function Keep({ id, title, text, color, navigation }) {

  const dispatch = useDispatch();

  const swipeBtns = [{
    component: (
      <SwipeDelBtn>
        <FontAwesome name="trash-o" size={28} color={styleVariables.MAIN_BACKGROUND_COLOR} /><Br />
      </SwipeDelBtn>
    ),
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => { dispatch(deleteKeep(id)) }
  }];


  return (
    <Swipeout right={swipeBtns}
      autoClose='true'
      backgroundColor='transparent'
    >
      <KeepContainer color={color} 
                    onPress={() =>{
                      navigation.push('EditKeep', { 
                        id, 
                        propTitle: title, 
                        propText: text, 
                        propColor: color })
                    }}>
        <KeepTitle numberOfLines={1}>{title}</KeepTitle>
        <KeepText numberOfLines={1}>{text}</KeepText>
      </KeepContainer>
      
    </Swipeout>
  );
}

Keep.defaultProps = {
  title: `${new Date().getDate()}.${(new Date().getMonth() + 1)}.${new Date().getFullYear()}`,
  text: 'Текст не задан',
  color: styleVariables.KEEP_BACKGROUND_DEFAULT
}

//${props => (props.color ? `${props.color}` : '#e7edf2')}

const backgroundKeppColorTransformer = (color) => {
  switch (color.toLowerCase()) {
    case styleVariables.KEEP_BACKGROUND_DEFAULT:
      return styleVariables.KEEP_BACKGROUND_DEFAULT;

    case styleVariables.KEEP_BACKGROUND_WARNING:
      return styleVariables.KEEP_BACKGROUND_WARNING;

    case styleVariables.KEEP_BACKGROUND_DANGER:
      return styleVariables.KEEP_BACKGROUND_DANGER;
  
    default: return styleVariables.KEEP_BACKGROUND_DEFAULT;
  }
}

const KeepContainer = styled.TouchableOpacity`
  height: 95px;
  background-color: ${props => backgroundKeppColorTransformer(props.color)};
  border-radius: 10px;
  margin: 0 5px 5px 5px;
  padding: 10px;
`;

const KeepTitle = styled.Text`
  color: ${styleVariables.KEEP_TEXT_COLOR};
  font-weight: bold;
  font-size: 24px;
`;

const KeepText = styled.Text`
  color: ${styleVariables.KEEP_TEXT_COLOR};
  font-size: 18px;
  margin-top: 10px;
`;

const SwipeDelBtn = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 95px;
  position: relative;
`;

const Br = styled.View`
  background-color: ${styleVariables.MAIN_BACKGROUND_COLOR};
  width: 80px;
  height: 5px;
  position: absolute;
  bottom: 0;
  right: 0;
`;