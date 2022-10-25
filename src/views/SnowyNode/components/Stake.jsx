import React, {useMemo, useContext} from 'react';
import styled from 'styled-components';

// import Button from '../../../components/Button';
import {Button, Card, CardContent, Typography} from '@material-ui/core';
import DepositModal from './DepositModal';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import {AddIcon, RemoveIcon} from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import useApprove, {ApprovalState} from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useNodePrice from '../../../hooks/useNodePrice';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../hooks/useTokenBalance';
import {getDisplayBalance} from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';



const Stake = ({bank}) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);


  const tokenBalance = useTokenBalance(bank.depositToken);
  const nodePrice = useNodePrice(bank.contract, bank.poolId, bank.sectionInUI);
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);

  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );
  const earnedInDollars = (
    Number(tokenPriceInDollars) * Number(getDisplayBalance(nodePrice, 12))
  ).toFixed(2);
  const {onStake} = useStake(bank);
console.log(earnedInDollars)

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      bank={bank}
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );


  return (
    <Card style={{borderRadius: '15px'}}>
      <CardContent style={{background: 'linear-gradient(90deg, #8fbdeb 14%, #a2c8ee 100%)', borderRadius: '15px'}}>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
             <TokenSymbol symbol={bank.depositTokenName} />
            </CardIcon>
            <Typography style={{textTransform: 'uppercase', color: '#fff'}}>
              <Value value={bank.depositTokenName === 'GRAPE-WLRS-LP' || bank.depositTokenName === 'NRWL-YUSD-LP' ? getDisplayBalance(nodePrice, bank.depositToken.decimal, 0) : getDisplayBalance(nodePrice, bank.depositToken.decimal, 8)} />
            </Typography>

           {bank.depositTokenName === 'NRWL-YUSD-LP' ? <Label text={`≈ $${(earnedInDollars/1e6).toFixed(2)}`} />: <Label text={`≈ $${earnedInDollars}`} />}

            <Typography style={{textTransform: 'uppercase', color: '#fff'}}>{`${'NODE'} COST`}</Typography>

          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
                <Button
                  disabled={
                    bank.closedForStaking ||
                    approveStatus === ApprovalState.PENDING ||
                    approveStatus === ApprovalState.UNKNOWN
                  }
                  color="#fff"
                  onClick={approve}
                  
                  style={{marginTop: '20px', background: '#5686d6', borderRadius: '15px'}}
                >
                  {`Approve ${bank.depositTokenName.replace('USDC', 'USDC.e')}`}
                </Button>
              ) : (
                <IconButton
                  disabled={bank.closedForStaking}
                  onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}
                  style={{marginTop: '20px', background: '#5686d6', borderRadius: '15px'}}
                >
                  <AddIcon />
                </IconButton>
              )
            }
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;