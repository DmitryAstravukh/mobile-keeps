import React from 'react';
import styled from 'styled-components/native';

import * as styleVariables from './../style-variables';
export default function Keep({ id, title, text, color, navigation }) {
  return (
    <KeepContainer color={color} 
                   onPress={() =>{
                    navigation.push('EditKeep', {
                      itemId: id,
                    })
                  }}>
      <KeepTitle numberOfLines={1}>{title}</KeepTitle>
      <KeepText numberOfLines={1}>{text}</KeepText>
    </KeepContainer>
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