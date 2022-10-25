import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Button, CardContent } from '@material-ui/core';
// import Button from '../../../components/Button';
import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
// import CardIcon from '../../../components/CardIcon';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';
import useRedeem from '../../../hooks/useRedeem';

import { getDisplayBalance } from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';
import { Bank } from '../../../tomb-finance';
import useTombStats from '../../../hooks/useTombStats';
import useShareStats from '../../../hooks/usetShareStats';
import useNrwlStats from '../../../hooks/useNrwlStats';

interface HarvestProps {
  bank: Bank;
}
const HomeCardPurple = styled.div`
  background: linear-gradient(
    180deg,
    rgba(217, 237, 254, 1) 0%,
    rgba(214, 211, 242, 1) 33%,
    rgba(186, 185, 212, 1) 100%
  );
  border-radius: 50px;
  box-shadow: 6px 6px 12px black;
  padding: 20px;
  color: #4b4453;
`;
const Harvest: React.FC<HarvestProps> = ({ bank }) => {
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
  const { onReward } = useHarvest(bank);
  const tombStats = useTombStats();
  const tShareStats = useShareStats();
  const nrwlStats = useNrwlStats();

  const tokenName = bank.earnTokenName; /*=== 'WSHARE' ? 'WSHARE' : 'WSHARE'*/
  const tokenStats =
    bank.earnTokenName === 'WSHARE' ? tShareStats : bank.earnTokenName === 'WLRS' ? tombStats : nrwlStats;
  const tokenPriceInDollars = useMemo(
    () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
    [tokenStats],
  );
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
  const { onRedeem } = useRedeem(bank);
  return (
    <HomeCardPurple>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <TokenSymbol symbol={bank.earnToken.symbol} />
            <Value value={getDisplayBalance(earnings)} />
            <Label color="rgba(74, 68, 82)" text={`≈ $${earnedInDollars}`} />
            <Label color="rgba(74, 68, 82)" text={`${tokenName} Earned`} />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              style={{ borderRadius: '15px', width: '240px', boxShadow: '6px 6px 12px black' }}
              onClick={onReward}
              disabled={earnings.eq(0)}
              color="primary"
              variant="contained"
            >
              Claim
            </Button>
          </StyledCardActions>
          <Button
            style={{ borderRadius: '15px', marginTop: '10px', width: '240px', boxShadow: '6px 6px 12px black' }}
            onClick={onRedeem}
            color="primary"
            variant="contained"
          >
            Claim & Withdraw
          </Button>
        </StyledCardContentInner>
      </CardContent>
    </HomeCardPurple>
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
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;
