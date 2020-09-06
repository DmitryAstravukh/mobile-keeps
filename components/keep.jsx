import React from 'react';
import styled from 'styled-components/native';

export default function Keep({ title, text, color }) {
  return (
    <KeepContainer color={color}>
      <KeepTitle numberOfLines={1}>{title}</KeepTitle>
      <KeepText numberOfLines={1}>{text}</KeepText>
    </KeepContainer>
  );
}

Keep.defaultProps = {
  title: `${new Date().getDate()}.${(new Date().getMonth() + 1)}.${new Date().getFullYear()}`,
  text: 'Текст не задан',
  color: '#e7edf2'
}

//${props => (props.color ? `${props.color}` : '#e7edf2')}

const KeepContainer = styled.TouchableOpacity`
  height: 95px;
  background-color: ${props => props.color};
  border-radius: 10px;
  margin: 0 5px 5px 5px;
  padding: 10px;
`;

const KeepTitle = styled.Text`
  color: #545660;
  font-weight: bold;
  font-size: 24px;
`;

const KeepText = styled.Text`
  color: #545660;
  font-size: 18px;
  margin-top: 10px;
`;