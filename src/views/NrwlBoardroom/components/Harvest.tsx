import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, CardContent, Typography } from '@material-ui/core';
import Card from '../../../components/Card';
import TokenSymbol from '../../../components/TokenSymbol';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
// import CardIcon from '../../../components/CardIcon';

import ProgressCountdown from './ProgressCountdown';
import { getDisplayBalance } from '../../../utils/formatBalance';

import useClaimRewardTimerMasonry from '../../../hooks/masonryNrwl/useClaimRewardTimerMasonry';
import useClaimRewardCheck from '../../../hooks/masonryNrwl/useClaimRewardCheck';
import useWithdrawCheck from '../../../hooks/masonryNrwl/useWithdrawCheck';

import useHarvestFromMasonryNrwl from '../../../hooks/useHarvestFromMasonryNrwl';
import useEarningsOnMasonryNrwl from '../../../hooks/useEarningsOnMasonryNrwl';
import useNrwlStats from '../../../hooks/useNrwlStats';
import useRedeemOnMasonryNrwl from '../../../hooks/useRedeemOnMasonryNrwl';
import useStakedBalanceOnMasonryNrwl from '../../../hooks/useStakedBalanceOnMasonryNrwl';

const Harvest: React.FC = () => {
  const { onRedeem } = useRedeemOnMasonryNrwl();
  const tombStats = useNrwlStats();
  const { onReward } = useHarvestFromMasonryNrwl();
  const earnings = useEarningsOnMasonryNrwl();
  const canClaimReward = useClaimRewardCheck();
  const stakedBalance = useStakedBalanceOnMasonryNrwl();
  const canWithdraw = useWithdrawCheck();

  const tokenPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );

  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const { from, to } = useClaimRewardTimerMasonry();

  return (
    <Box>
      <Card>
        <CardContent>
          <StyledCardContentInner>
            <StyledCardHeader>
              <TokenSymbol symbol="NRWL" />
              <Value value={getDisplayBalance(earnings)} />
              <Label color="#777" text={`≈ $${earnedInDollars}`} />
              <Label color="#777" text="NRWL Earned" />
            </StyledCardHeader>
            <StyledCardActions>
              <Button
                onClick={onReward}
                color="primary"
                variant="contained"
                disabled={earnings.eq(0) || !canClaimReward}
                style={{ borderRadius: '15px', width: '250px' }}
              >
                Claim Reward
              </Button>
            </StyledCardActions>
            <Button
              disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
              onClick={onRedeem}
              color="primary"
              variant="contained"
              style={{ borderRadius: '15px', width: '250px', marginTop: '10px' }}
            >
              Claim and Withdraw
            </Button>
          </StyledCardContentInner>
        </CardContent>
      </Card>
      <Box mt={2} style={{ color: '#FFF' }}>
        {canClaimReward ? (
          ''
        ) : (
          <Card>
            <CardContent>
              <Typography style={{ textAlign: 'center', color: '#000' }}>Claim possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} description="Claim available in" />
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
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
