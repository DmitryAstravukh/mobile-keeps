import React from 'react';
import styled from 'styled-components/native';

export function EditKeep({ route: { params: {itemId} } }) {
  return (
    <EditKeepContainer>
      EditKeepContainer - {itemId}
    </EditKeepContainer>
  )
}

const EditKeepContainer = styled.Text`
  
`;