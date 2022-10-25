import React from 'react';
import styled from 'styled-components';

import { Button, Card } from '@material-ui/core';

// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import useGrapeFinance from '../../../hooks/useTombFinance';
import Label from '../../../components/Label';
import TokenSymbol from '../../../components/TokenSymbol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useModal from '../../../hooks/useModal';
import ExchangeModal from './ExchangeModal';
import ERC20 from '../../../tomb-finance/ERC20';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';

interface ExchangeCardProps {
  action: string;
  fromToken: ERC20;
  fromTokenName: string;
  toToken: ERC20;
  toTokenName: string;
  priceDesc: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
  disabledDescription?: string;
}
const BondCard = styled.div`
  background: rgba(255, 255, 255, 0.55);
  border-radius: 50px;
  padding: 20px; 
  color: #4b4453;
`;

const ExchangeCardNRWL: React.FC<ExchangeCardProps> = ({
  action,
  fromToken,
  fromTokenName,
  toToken,
  toTokenName,
  priceDesc,
  onExchange,
  disabled = false,
  disabledDescription,
}) => {
  const catchError = useCatchError();

  const balance = useTokenBalance(fromToken);
  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={priceDesc}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={fromTokenName}
    />,
  );
  return (
    <BondCard >
      <CardContent>
        <StyledCardContentInner>
          <StyledCardTitle>{`ENTER LOTTERY WITH NRWL`}</StyledCardTitle> 
          <StyledExchanger>
            <StyledToken>
              <StyledCardIcon>
                <TokenSymbol symbol={fromToken.symbol} height={75} width={75} />
              </StyledCardIcon>
              {/*<Label text={fromTokenName} color="#000" />*/}
            </StyledToken>
          </StyledExchanger>
          <StyledDesc>{priceDesc}</StyledDesc>
          <StyledCardActions>
            <Button
              className={disabled ? 'shinyButtonDisabled' : 'shinyButton'}
              onClick={onPresent}
              disabled={true}
              style={{ padding: '1px', borderRadius: '8px', fontSize: '1rem', marginTop: '7%', width: '100%'}}
            >
              {disabledDescription || action}
            </Button>
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </BondCard>
  );
};

const StyledCardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  justify-content: center;
  text-align: center; 
  color: #000;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
  margin-bottom: 2%; 
`;

const StyledCardIcon = styled.div`
  background-color: #fff;
  margin-top: '15px'; 
  width: 80px;
  height: 80px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 50px;
`;

const StyledExchangeArrow = styled.div`
  font-size: 20px;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  margin-top: '10px'; 
`;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  width: 50%;
`;

const StyledDesc = styled.span`
  color: #000;
  font-size: '1.2rem';
  text-align: 'center'; 
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default ExchangeCardNRWL;
