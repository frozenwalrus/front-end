import React from 'react';
import styled from 'styled-components';
import config from '../../config';
import Dial from '../Dial';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import Button from '../Button';

interface LaunchCountdownProps {
  deadline: Date;
  description: string;
  descriptionLink: string;
}

const LaunchCountdown: React.FC<LaunchCountdownProps> = ({ deadline, description, descriptionLink }) => {
  const percentage =
    ((Date.now() - config.baseLaunchDate.getTime()) / (deadline.getTime() - config.baseLaunchDate.getTime())) * 100;

  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const h = String(days * 24 + hours);
    const m = String(minutes);
    const s = String(seconds);
    return (
      <StyledCountdown>
        {h.padStart(2, '0')}:{m.padStart(2, '0')}:{s.padStart(2, '0')}
      </StyledCountdown>
    );
  };
  return (
    <StyledCard>
      <StyledCountdownWrapper>
        <StyledCountdownTitle>{description}</StyledCountdownTitle>
        <Countdown date={deadline} renderer={countdownRenderer} />
      </StyledCountdownWrapper>
    </StyledCard>
  );
};

const StyledCard = styled.div`
border-radius: 20px;
  padding: 10px; 
  text-align: center; 
  color: #4b4453;
  margin: 0 auto;
  border: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledCountdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCountdownTitle = styled.p`
  font-size: 1.0rem;
  color: #000000;
  margin: 0;
`;

const StyledCountdown = styled.p`
  font-size: 1.2rem;
  color: #000000;
  margin: 0;
  margin-bottom: 10px; 
`;

const StyledDescriptionButton = styled.button`
  background-color: #271c20;
  align-items: center;
  border: 0;
  border-radius: 24px;
  margin-top: 32px;
  box-shadow: 0px 2px 10px #d5d5d544;
  color: ${(props) => props.theme.color.grey[500]};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  outline: none;
  padding-left: 24px;
  padding-right: 24px;
  width: 100%;
  &:hover {
    color: ${(props) => props.theme.color.grey[300]};
  }
`;

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

export default LaunchCountdown;
