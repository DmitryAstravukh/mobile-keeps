import React from 'react';
import styled from 'styled-components/native';

export default function GroupTitle({title}) {
  return (
    <GroupTitleContainer>{title}</GroupTitleContainer>
  )
}

const GroupTitleContainer = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center;
`;