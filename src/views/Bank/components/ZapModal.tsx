import React, { useState, useMemo, useEffect } from 'react';

import { Button, Select, MenuItem, InputLabel, withStyles } from '@material-ui/core';
// import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';
import styled from 'styled-components';

import { getDisplayBalance } from '../../../utils/formatBalance';
import Label from '../../../components/Label';
import useLpStats from '../../../hooks/useLpStats';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useTombFinance from '../../../hooks/useTombFinance';
// import { useWallet } from 'use-wallet';
import useApproveZapper, { ApprovalState } from '../../../hooks/useApproveZapper';
import { TOMB_TICKER, TSHARE_TICKER, FTM_TICKER } from '../../../utils/constants';
import { Alert } from '@material-ui/lab';
// import { isCommunityResourcable } from '@ethersproject/providers';

interface ZapProps extends ModalProps {
  onConfirm: (zapAsset: string, lpName: string, amount: string) => void;
  tokenName?: string;
  decimals?: number;
}

const ZapModal: React.FC<ZapProps> = ({ onConfirm, onDismiss, tokenName = '', decimals = 18 }) => {
  const tombFinance = useTombFinance();
  // const { balance } = useWallet();
  // const ftmBalance = (Number(balance) / 1e18).toFixed(4).toString();
  const ftmBalanceVal = useTokenBalance(tombFinance.FTM);
  useEffect(() => {
    setZappingTokenBalance(getDisplayBalance(ftmBalanceVal, 6));
  }, [ftmBalanceVal]);

  const tombBalance = useTokenBalance(tombFinance.TOMB);
  const tshareBalance = useTokenBalance(tombFinance.TSHARE);
  const [val, setVal] = useState('');
  const [zappingToken, setZappingToken] = useState(FTM_TICKER);
  const [zappingTokenBalance, setZappingTokenBalance] = useState(getDisplayBalance(ftmBalanceVal, 6));
  const [estimate, setEstimate] = useState({ token0: '0', token1: '0' }); // token0 will always be FTM in this case
  const [approveZapperStatus, approveZapper] = useApproveZapper(zappingToken);
  const tombFtmLpStats = useLpStats('WLRS-USDC-LP');
  const tShareFtmLpStats = useLpStats('WSHARE-USDC-LP');
  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const ftmAmountPerLP = tokenName.startsWith(TOMB_TICKER) ? tombLPStats?.ftmAmount : tshareLPStats?.ftmAmount;
  /**
   * Checks if a value is a valid number or not
   * @param n is the value to be evaluated for a number
   * @returns
   */
  function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  const handleChangeAsset = (event: any) => {
    const value = event.target.value;
    setZappingToken(value);
    setZappingTokenBalance(getDisplayBalance(ftmBalanceVal, 6));
    if (event.target.value === TSHARE_TICKER) {
      setZappingTokenBalance(getDisplayBalance(tshareBalance, decimals));
    }
    if (event.target.value === TOMB_TICKER) {
      setZappingTokenBalance(getDisplayBalance(tombBalance, decimals));
    }
    // if (event.target.value === FTM_TICKER) {
    //   setZappingTokenBalance(ftmBalance);
    // }
  };

  const handleChange = async (e: any) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setVal(e.currentTarget.value);
      setEstimate({ token0: '0', token1: '0' });
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setVal(e.currentTarget.value);
    const estimateZap = await tombFinance.estimateZapIn(zappingToken, tokenName, String(e.currentTarget.value));
    setEstimate({ token0: estimateZap[0].toString(), token1: estimateZap[1].toString() });
  };

  const handleSelectMax = async () => {
    setVal(zappingTokenBalance);
    const estimateZap = await tombFinance.estimateZapIn(zappingToken, tokenName, String(zappingTokenBalance));
    setEstimate({ token0: estimateZap[0].toString(), token1: estimateZap[1].toString() });
  };

  return (
    <Modal>
      <ModalTitle text={`Zap in ${tokenName.replace('USDC', 'USDC.e')}`} />

      <StyledActionSpacer />
      <InputLabel style={{ color: '#fcfcfc', marginBottom: '8px' }} id="label">
        Select asset to zap with
      </InputLabel>
      <Select
        onChange={handleChangeAsset}
        style={{ color: '#fcfcfc' }}
        labelId="label"
        id="select"
        value={zappingToken}
      >
        <StyledMenuItem value={FTM_TICKER}>{'USDC.e'}</StyledMenuItem>
        <StyledMenuItem value={tokenName.startsWith(TOMB_TICKER) ? TOMB_TICKER : TSHARE_TICKER}>
          {tokenName.startsWith(TOMB_TICKER) ? TOMB_TICKER : TSHARE_TICKER}
        </StyledMenuItem>
        {/* Tomb as an input for zapping will be disabled due to issues occuring with the Gatekeeper system */}
        {/* <StyledMenuItem value={TOMB_TICKER}>TOMB</StyledMenuItem> */}
      </Select>
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={zappingTokenBalance}
        symbol={zappingToken}
      />
      {/* <Label text="Zap Estimations" color='black' />
      <StyledDescriptionText>
        {' '}
        {tokenName}: {Number(estimate.token1) / Number(ftmAmountPerLP)}
      </StyledDescriptionText>
      <StyledDescriptionText>
        {' '}
        ({Number(estimate.token0)} {FTM_TICKER} / {Number(estimate.token1)}{' '}
        {tokenName.startsWith(TOMB_TICKER) ? TOMB_TICKER : TSHARE_TICKER}){' '}
      </StyledDescriptionText> */}
      <ModalActions>
        <button
          className="primary-button"
          onClick={() =>
            approveZapperStatus !== ApprovalState.APPROVED ? approveZapper() : onConfirm(zappingToken, tokenName, val)
          }
        >
          {approveZapperStatus !== ApprovalState.APPROVED ? 'Approve' : "Let's go"}
        </button>
      </ModalActions>

      <StyledActionSpacer />
      <Alert variant="filled" severity="warning">
        Zapping only creates the asset, but doesn't stake it. Beta feature. Use at your own risk!
      </Alert>
    </Modal>
  );
};

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledDescriptionText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 22px;
  justify-content: flex-start;
`;
const StyledMenuItem = withStyles({
  root: {
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: 'grey',
      color: 'black',
    },
    selected: {
      backgroundColor: 'black',
      color: 'white',
    },
  },
})(MenuItem);

export default ZapModal;
