import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
`;
const FitnessIcon = styled.div`
  font-size: 60px;
  animation: ${pulseAnimation} 2s infinite;
  position: fixed;
  top: 10%;
  left: 5%;
  style={{ top: '10%', right: '5%' }}
`;
function DumbbellIcon() {
    return <FitnessIcon>🏋️</FitnessIcon>;
}

export default DumbbellIcon;
