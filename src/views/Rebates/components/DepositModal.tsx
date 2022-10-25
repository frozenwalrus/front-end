import React, { useCallback, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';
// import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';
import useRebateTreasury from '../../../hooks/useRebateTreasury';
import useTombFinance from '../../../hooks/useTombFinance';
import useFantomPrice from '../../../hooks/useFantomPrice';

import { getFullDisplayBalance } from '../../../utils/formatBalance';
import { BigNumber } from 'ethers';

interface DepositModalProps extends ModalProps {
  max: BigNumber;
  onConfirm: (amount: Number) => void;
  tokenName?: string;
  token?: any;
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '', token }) => {
  const [val, setVal] = useState('');
  const [out, setOut] = useState(0);

  const tombFinance = useTombFinance();
  const rebateStats = useRebateTreasury();
  const { price: ftmPrice, marketCap: ftmMarketCap, priceChange: ftmPriceChange } = useFantomPrice();

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, tokenName === 'USDC' ? 6 : 18);
  }, [max, tokenName]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value);
    },
    [setVal],
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal, rebateStats]);

  function getAssetPrice(token: String) {
    const address = tombFinance.externalTokens[tokenName].address;
    const assetPrice = rebateStats.assets.find((a: any) => a.token === address).price;
    return assetPrice;
  }

  function getOutAmount() {
    const toBondPrice = getAssetPrice(tokenName);
    const outAmount =
      +val *
      ((toBondPrice / rebateStats.tombPrice) *
        (1 + rebateStats.bondPremium / 100) *
        (token.params.multiplier / 1000000));
    return outAmount;
  }

  function formatOutAmount() {
    const outAmount = getOutAmount();
    return `Receiving: ${outAmount.toFixed(4)} WLRS ($${(outAmount * rebateStats.tombPrice * ftmPrice).toFixed(4)})`;
  }

  function formatInAmount() {
    return `Input: ${(+val).toFixed(9)} ${tokenName.replace('USDC', 'USDC.e')} ($${(+val * getAssetPrice(tokenName) * ftmPrice).toFixed(4)})`;
  }

  return (
    <Modal>
      <ModalTitle text={`Bond ${tokenName.replace('USDC', 'USDC.e')}`} />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <StyledMaxText style={{ marginTop: '14px', color: 'black' }}>{formatInAmount()}</StyledMaxText>
      <StyledMaxText style={{ color: 'black' }}>{formatOutAmount()}</StyledMaxText>
      <StyledMaxText style={{ color: 'black' }}>
        {rebateStats.tombAvailable > 0 ? `${rebateStats.tombAvailable.toFixed(4)} WLRS Available` : 'Bond Sold Out'}
      </StyledMaxText>
      <ModalActions>
        <Button
          color={getOutAmount() < rebateStats.tombAvailable ? 'secondary' : 'primary'}
          variant="contained"
          disabled={getOutAmount() >= rebateStats.tombAvailable}
          onClick={() => onConfirm(+val)}
        >
          Confirm
        </Button>
      </ModalActions>
    </Modal>
  );
};

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[600]};
  display: flex;
  font-size: 18px;
  margin-top: 2px;
  font-weight: 700;
  justify-content: flex-start;
`;

export default DepositModal;
