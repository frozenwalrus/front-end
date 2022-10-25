import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';

// import Button from '../../../components/Button';
import { Button, CardContent /*, Grid */ } from '@material-ui/core';
import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
// import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import FlashOnIcon from '@material-ui/icons/FlashOn';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useZap from '../../../hooks/useZap';
import useZapNrwl from '../../../hooks/useZapNrwl';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdraw';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import ZapModal from './ZapModal';
import ZapModalNrwl from './ZapModalNrwl';
import TokenSymbol from '../../../components/TokenSymbol';
import { Bank } from '../../../tomb-finance';

interface StakeProps {
  bank: Bank;
}
const HomeCardBlue = styled.div`
  background: linear-gradient(0deg, rgba(217, 237, 254, 1) 0%, rgba(214, 211, 242, 1) 66%, rgba(186, 185, 212, 1) 100%);
  border-radius: 50px;
  box-shadow: 6px 6px 12px black;
  padding: 20px;
  color: #4b4453;
`;

const Stake: React.FC<StakeProps> = ({ bank }) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  // const { color: themeColor } = useContext(ThemeContext);
  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
  console.log(stakedTokenPriceInDollars);
  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );

  const multiplier =
    (bank.depositTokenName.includes('WLRS') || bank.depositTokenName.includes('WSHARE-USDC-LP')) &&
    !bank.depositTokenName.includes('WLRS-USDIBS-LP') &&
    !bank.depositTokenName.includes('XWLRS')
      ? 10 ** 6
      : 1;
  const earnedInDollars = (
    Number(tokenPriceInDollars) *
    Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal, bank.depositToken.decimal === 6 ? 3 : 9)) *
    multiplier
  ).toFixed(2);
  const { onStake } = useStake(bank);
  const { onZap } = useZap(bank);
  const { onZapNrwl } = useZapNrwl(bank);
  const { onWithdraw } = useWithdraw(bank);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
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

  const [onPresentZap, onDissmissZap] = useModal(
    <ZapModal
      decimals={bank.depositToken.decimal}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onZap(zappingToken, tokenName, amount);
        onDissmissZap();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentZapNrwl, onDissmissZapNrwl] = useModal(
    <ZapModalNrwl
      decimals={bank.depositToken.decimal}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onZapNrwl(zappingToken, tokenName, amount);
        onDissmissZapNrwl();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const stakedBalanceNumber = Number(
    getDisplayBalance(stakedBalance, bank.depositToken.decimal, bank.depositToken.decimal === 6 ? 3 : 9),
  );
  return (
    <HomeCardBlue>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <TokenSymbol symbol={bank.depositToken.symbol} />
            <Value
              value={
                '' +
                (stakedBalanceNumber < 1 / 10 ** 4
                  ? (stakedBalanceNumber * 10 ** 6).toFixed(4) + 'µ'
                  : stakedBalanceNumber)
              }
            />
            <Label color="rgba(74, 68, 82)" text={`≈ $${earnedInDollars}`} />
            <Label
              color="rgba(74, 68, 82)"
              text={`${
                bank.depositTokenName === 'USDC' || bank.depositTokenName === 'USDT'
                  ? bank.depositTokenName + '.e'
                  : bank.depositTokenName.replace('USDC', 'USDC.e')
              } Staked`}
            />
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={
                  bank.closedForStaking ||
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN
                }
                onClick={approve}
                color="primary"
                variant="contained"
                style={{ marginTop: '65px', borderRadius: '15px', width: '250px' }}
              >
                {`Approve ${bank.depositTokenName.replace('USDC', 'USDC.e')}`}
              </Button>
            ) : (
              <>
                <StyledCardActions2>
                  <IconButton onClick={onPresentWithdraw}>
                    <RemoveIcon />
                  </IconButton>
                  <StyledActionSpacer />
                  {
                    // bank.depositTokenName !== 'WLRS-USDC-LP' &&  bank.depositTokenName !== 'WSHARE-USDC-LP' && bank.depositTokenName !== 'WLRS-USDIBS-LP'
                    bank.depositTokenName !== 'WLRS-USDC-LP' && bank.depositTokenName !== 'WSHARE-USDC-LP' ? null : (
                      <IconButton
                        disabled={bank.closedForStaking}
                        onClick={() => (bank.closedForStaking ? null : onPresentZap())}
                      >
                        <FlashOnIcon style={{ color: '#ccc' }} />
                      </IconButton>
                    )
                  }
                  {bank.depositTokenName === 'NRWL-YUSD-LP' ? (
                    <IconButton
                      disabled={bank.closedForStaking}
                      onClick={() => (bank.closedForStaking ? null : onPresentZapNrwl())}
                    >
                      <FlashOnIcon style={{ color: '#ccc' }} />
                    </IconButton>
                  ) : null}
                  <StyledActionSpacer />
                  <IconButton
                    disabled={bank.closedForStaking}
                    onClick={() => (bank.closedForStaking ? null : onPresentDeposit())}
                  >
                    <AddIcon />
                  </IconButton>
                </StyledCardActions2>
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </HomeCardBlue>
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
const StyledCardActions2 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[5]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
