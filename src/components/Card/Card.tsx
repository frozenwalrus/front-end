import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background: #1d1f2c;
  border-radius: 20px;
  color: #fcfcfc;
  position: relative;
`;

export default Card;
