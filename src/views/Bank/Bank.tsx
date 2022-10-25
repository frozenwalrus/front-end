import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { makeStyles } from '@material-ui/core/styles';

import { Box, /*Button,*/ Card, CardContent, /*Typography,*/ Grid } from '@material-ui/core';

import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import UnlockWallet from '../../components/UnlockWallet';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';
// import useRedeem from '../../hooks/useRedeem';
// import { Bank as BankEntity } from '../../tomb-finance';
// import useTombFinance from '../../hooks/useTombFinance';
import { Alert } from '@material-ui/lab';

import config from '../../config';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));
const TopTile = styled.div`
background: rgba(49, 75, 119, 1); 
border-radius: 50px;  
box-shadow: 6px 6px 12px black; 
padding: 20px; 
`;

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const classes = useStyles();
  const { bankId } = useParams();
  const bank = useBank(bankId);

  const { account } = useWallet();
  // const { onRedeem } = useRedeem(bank);
  const statsOnPool = useStatsForPool(bank);

  if (!bank) {
    return <BankNotFound />;
  }
  return account && bank ? (
    <>
      <PageHeader
        icon="🏦"
        subtitle={`Deposit ${bank?.depositTokenName === 'USDC' || bank?.depositTokenName === 'USDT' ? bank?.depositTokenName + '.e' : bank?.depositTokenName.replace('USDC', 'USDC.e')} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      {/* {bank?.depositTokenName === 'WLRS' && Date.now() < 1646510400000 ? (
        <Alert
          variant="filled"
          severity="info"
          style={{ maxWidth: '400px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          Pool starts at 3:00 PM Eastern
        </Alert>
      ) : bank?.depositTokenName === 'WLRS-USDIBS-LP' && Date.now() < 1657893600000 ? (
        <Alert
          variant="filled"
          severity="info"
          style={{ maxWidth: '400px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          Pool starts at 2:00 PM UTC
        </Alert>
      ) : (
        <></>
      )} */}
      {
        bank?.sectionInUI === 5 && Date.now() < config.nrwlLaunchDate.getTime()
        ? (
            <Alert
              variant="filled"
              severity="info"
              style={{ maxWidth: '400px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Genesis pool starts on July 24th at 14:00 UTC. Pre-staking is open.
            </Alert>
          )
        : <></>
      }
     {/* {
        bank?.depositTokenName.endsWith('-USDC-LP')
        ? (
            <Alert variant="filled" severity="info" style={{ marginTop: '-25px', marginBottom: '35px' }}>
              Unstaking now will incur a tax. To read about how much refer to our{' '}
              <a style={{ color: '#fff' }} href="https://docs.frozenwalrus.finance/protocol-information/taxes">
              documentation.
              </a>
            </Alert>
          ) : null
      }*/}
      <Box>
        <Grid container justify="center" spacing={3} style={{ marginBottom: '50px' }}>
          <Grid item xs={12} sm={4} lg={3} className={classes.gridItem}>
            <TopTile className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'white' }}>APR</h3>
                <h2 style={{ color: 'white', fontWeight: 'lighter' }}>{bank.closedForStaking || statsOnPool?.yearlyAPR === 'Infinity' ? '0.00' : statsOnPool?.yearlyAPR}%</h2>
              </CardContent>
            </TopTile>
          </Grid>
          <Grid item xs={12} sm={4} lg={3} className={classes.gridItem}>
          <TopTile className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'white' }}>DAILY APR</h3>
                <h2 style={{ color: 'white', fontWeight: 'lighter' }}>{bank.closedForStaking || statsOnPool?.dailyAPR === 'Infinity' ? '0.00' : statsOnPool?.dailyAPR}%</h2>
              </CardContent>
            </TopTile>
          </Grid>
          <Grid item xs={12} sm={4} lg={3} className={classes.gridItem}>
          <TopTile className={classes.gridItem}>
              <CardContent style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'white' }}>TVL</h3>
                <h2 style={{ color: 'white', fontWeight: 'lighter' }}>${statsOnPool?.TVL}</h2>
              </CardContent>
            </TopTile>
          </Grid>
        </Grid>
      </Box>
<Grid container spacing={3} style={{marginTop: '10%', 
      justifyContent: 'center', alignContent: 'center', 
      alignItems: 'center'}}>
  <Grid item xs={12} lg={3} style={{marginRight: '2%', width: '90%'}}>
    <StyledBank>
        <StyledCardWrapper>
          <Harvest bank={bank} />
        </StyledCardWrapper>
    </StyledBank>
  </Grid>

  <Grid item xs={12} lg={3} style={{marginLeft: '2%', width: '90%'}}>
        <StyledBank>
            <StyledCardWrapper>
              <Stake bank={bank} />
            </StyledCardWrapper>
        </StyledBank>
      </Grid>
    </Grid>
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

/* const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  const tombFinance = useTombFinance();
  const tombAddr = tombFinance.TOMB.address;
  const tshareAddr = tombFinance.TSHARE.address;

  let pairName: string;
  let uniswapUrl: string;
  if (bank.depositTokenName.includes('TOMB')) {
    pairName = 'TOMB-AVAX pair';
    uniswapUrl = 'https://app.pangolin.exchange/#/add/AVAX/' + tombAddr;
  } else {
    pairName = 'WSHARE-AVAX pair';
    uniswapUrl = 'https://app.pangolin.exchange/#/add/AVAX/' + tshareAddr;
  }
  return (
    <Card>
      <CardContent>
        <StyledLink href={uniswapUrl} target="_blank">
          {`Provide liquidity for ${pairName} now on Pangolin Exchange`}
        </StyledLink>
      </CardContent>
    </Card>
  );
}; */
const BankNotFound = () => {
  return (
    <Center>
      <PageHeader icon="🏚" title="Not Found" subtitle="You've hit a bank just robbed by unicorns." />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`; */

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

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
