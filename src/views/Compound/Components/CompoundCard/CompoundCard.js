import React from 'react';
import { Button, Card, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';

import TokenSymbol from '../../../../components/TokenSymbol';

import { black, white } from '../../../../theme/colors';
import MagicLogo from '../../../../assets/img/MAGIK.png';

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  borderRadius: '20px',
  backgroundColor: '#23252e',
});

const PaddedInner = styled('div')({
  padding: '25px',
  textAlign: 'center'
});

const StyledButton = styled(Button)({
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'center',
  textTransform: 'none',
  borderRadius: 0,
  backgroundColor: black,
  color: white,
  width: '100%',
  padding: '10px 20px',
  marginTop: 32,
  '&:hover': {
    backgroundColor: black,
    boxShadow: '0px 0px 5px 0px rgba(251, 221, 76, 1)',
  },
});

const CompoundCard = ({ cardData, buttonProps }) => {
  const { title, tokenSymbol, tokenWidth = 100, tokenHeight = 65 } = cardData;
  const { href } = buttonProps;

  return (
    <StyledCard>
      <PaddedInner>
        <Box mt={4}>
          <div className="pending-rewards">{title}</div>
        </Box>

        <Box mt={4}>
          <TokenSymbol symbol={tokenSymbol} width={tokenWidth} height={tokenHeight} />{' '}
        </Box>

        <p
          style={{
            fontSize: 14,
            fontWeight: 'lighter',
            textAlign: 'center',
            color: '#fcfcfc',
            margin: 32,
          }}
        >
          This compounding is hosted on <strong>magik.farm</strong>
        </p>

        <img src={MagicLogo} alt="invest cow" style={{ width: 60 }} />

        <Box mt={3}>
          {' '}
          <a href={href} target="_blank" rel="noreferrer noopener">
            <button className="primary-button">Invest</button>
          </a>
        </Box>
      </PaddedInner>
    </StyledCard>
  );
};

export default CompoundCard;
