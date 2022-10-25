import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardContent, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';

import { getDisplayBalance } from '../../utils/formatBalance';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchMasonryAPR from '../../hooks/useFetchMasonryAPR';

import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnMasonry from '../../hooks/useTotalStakedOnMasonry';
import ProgressCountdown from './components/ProgressCountdown';
import MasonryImage from '../../assets/img/SVG_Icons_and_web_bg/bg.svg';
import { createGlobalStyle } from 'styled-components';

const BackgroundImage = createGlobalStyle`
  body, html {
    background: url(${MasonryImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Masonry = () => {
  const classes = useStyles();
  const { account } = useWallet();
  const currentEpoch = useCurrentEpoch();
  const cashStat = useCashPriceInEstimatedTWAP();
  const totalStaked = useTotalStakedOnMasonry();
  const masonryAPR = useFetchMasonryAPR();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes();

  return (
    <>
      
      {!!account ? (
        <>
          <Typography align="center" variant="h3" gutterBottom>
            WLRS Boardroom
          </Typography>
          <Box mt={5}>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card
                  style={{ background: '#161414', borderRadius: '15px', height: '100px' }}
                  className={classes.gridItem}
                >
                  <CardContent>
                    <h3 style={{ textAlign: 'center', color: '#5686d6', fontSize: '18px' }}>Next Epoch</h3>
                    <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card
                  style={{ background: '#161414', borderRadius: '15px', height: '100px' }}
                  className={classes.gridItem}
                >
                  <CardContent align="center">
                    <h3 style={{ textAlign: 'center', color: '#5686d6', fontSize: '18px' }}>Current Epoch</h3>
                    <h2 style={{ fontWeight: 'lighter' }}>{Number(currentEpoch)}</h2>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card
                  style={{ background: '#161414', borderRadius: '15px', height: '100px' }}
                  className={classes.gridItem}
                >
                  <CardContent align="center">
                    <h3 style={{ textAlign: 'center', color: '#5686d6', fontSize: '18px' }}>
                      WLRS Price<small> (TWAP)</small>
                    </h3>
                    <h2 style={{ fontWeight: 'lighter' }}>{scalingFactor} USDC.e</h2>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
                <Card
                  style={{ background: '#161414', borderRadius: '15px', height: '100px' }}
                  className={classes.gridItem}
                >
                  <CardContent align="center">
                    <h3 style={{ textAlign: 'center', color: '#5686d6', fontSize: '18px' }}>APR</h3>
                    <h2 style={{ fontWeight: 'lighter' }}>{masonryAPR.toFixed(2)}%</h2>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Card
                  style={{ background: '#161414', borderRadius: '15px', height: '100px' }}
                  className={classes.gridItem}
                >
                  <CardContent align="center">
                    <h3 style={{ textAlign: 'center', color: '#5686d6', fontSize: '18px' }}>Shares Staked</h3>
                    <h2 style={{ fontWeight: 'lighter' }}>{getDisplayBalance(totalStaked)}</h2>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container justify="center">
              <Box mt={3} style={{ width: '600px' }}>
                <Alert variant="filled" severity="info">
                  Earned WLRS can only be withdrawn after 2 epochs since deposit.
                </Alert>
              </Box>
            </Grid>

            <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  <StyledCardWrapper>
                    <Harvest />
                  </StyledCardWrapper>
                  <Spacer />
                  <StyledCardWrapper>
                    <Stake />
                  </StyledCardWrapper>
                </StyledCardsWrapper>
              </StyledBoardroom>
            </Box>
          </Box>
        </>
      ) : (
        <UnlockWallet />
      )}
    </>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default Masonry;
