import React, { useCallback, useMemo } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import Column from '../../components/Column';
import Row from '../../components/Row';
import { Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import ExchangeCard from './components/ExchangeCard';
import ExchangeCardNRWL from './components/ExchangeCardNRWL'; 
import useNrwlStats from '../../hooks/useNrwlStats';
import useTombStats from '../../hooks/useTombStats';
import styled from 'styled-components';
import useRaffleStats from '../../hooks/useRaffleBalance';
import useNRWLRaffleStats from '../../hooks/useRaffleBalanceNRWL';
import useGrapeFinance from '../../hooks/useTombFinance';
import { useTransactionAdder } from '../../state/transactions/hooks';
import HomeImage from '../../assets/img/SVG_Icons_and_web_bg/bg.svg';
import { Card, Grid, Box, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LaunchCountdown from '../../components/LaunchCountdown';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
const BondCard = styled.div`
  background: rgba(255, 255, 255, 0.65);
  border-radius: 50px;
  box-shadow: 6px 6px 12px black; 
  padding: 20px; 
  color: #4b4453;
`;

const HomeCardBlue = styled.div`
  background: rgba(217, 238, 254, 0.75);
  border-radius: 50px;  
  box-shadow: 6px 6px 12px black; 
  padding: 20px; 
  color: #4b4453;
`;
const HomeCardPurple = styled.div`
  background: rgba(214, 211, 242, 0.6);
  border-radius: 50px;
  box-shadow: 6px 6px 12px black; 
  padding: 20px; 
  color: #4b4453;
`;
const LotteryText = styled.h2`
  text-align: center; 
  margin-bottom: 2%; 
  font-size: 2rem; 
`; 
const LotterySubText = styled.h2`
  text-align: center; 
  font-size: 1.2rem; 
`; 
const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'absolute',
    bottom: '0',
    paddingTop: '15px',
    paddingBottom: '15px',
    width: '100%',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    height: '1.3rem',
    fontFamily: 'superstar',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  link: {
    width: '24px',
    height: '24px',
    display: 'inline',
    marginLeft: '20px',
  },

  img: {
    width: '24px',
    height: '24px',
  },
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Lottery: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width:1000px)');
  const startDate = new Date('2022-8-2 21:00:00Z');
  const endDate = new Date('2022-8-8 21:00:00Z');
  const raffleAddress = '0x4b8d4EAe1Bff52113d7DA8a7103e6fF9f2611A86';
  const nrwlRaffleAddress = '0x4b8d4EAe1Bff52113d7DA8a7103e6fF9f2611A86';
  const { account } = useWallet();
  const grapeFinance = useGrapeFinance();
  const addTransaction = useTransactionAdder();
  const raffleStats = useRaffleStats(account, raffleAddress);
  const nrwlRaffleStats= useNRWLRaffleStats(account, nrwlRaffleAddress);
  const nrwlStats = useNrwlStats();
  const tombStats = useTombStats();
  const tombPriceInDollars = useMemo(() => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null), [tombStats]);
  const nrwlPriceInDollars = useMemo(() => (nrwlStats ? Number(nrwlStats.priceInDollars).toFixed(2) : null), [nrwlStats]);
  const nrwlPriceInFTM = useMemo(() => (nrwlStats ? Number(nrwlStats.tokenInFtm).toFixed(4) : null), [nrwlStats]);
  const startTime = Number(startDate);
  const endTime = Number(endDate);
  const grapePrice = useMemo(() => (raffleStats ? Number(raffleStats.tokenInFtm).toFixed(2) : null), [raffleStats]);
  const nrwlPrice = useMemo(() => (nrwlRaffleStats ? Number(nrwlRaffleStats.tokenInFtm).toFixed(2) : null), [nrwlRaffleStats]);
  const raffleBals = useMemo(() => (raffleStats ? Number(raffleStats.totalSupply).toFixed(0) : null), [raffleStats]);
  const nrwlRaffleBals = useMemo(() => (nrwlRaffleStats ? Number(nrwlRaffleStats.totalSupply).toFixed(0) : null), [nrwlRaffleStats]);
  const userBals = useMemo(() => (raffleStats ? Number(raffleStats.priceInDollars).toFixed(0) : null), [raffleStats]);
  const nrwluserBals = useMemo(() => (nrwlRaffleStats ? Number(nrwlRaffleStats.priceInDollars).toFixed(0) : null), [nrwlRaffleStats]);
  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await grapeFinance.sendTomb(amount, raffleAddress);
      addTransaction(tx, {
        summary: `SEND ${Number(amount).toFixed(2)} WLRS TO THE LOTTERY ${amount} `,
      });
    },
    [grapeFinance, addTransaction],
  );
  const handleBuyBondsNRWL = useCallback(
    async (amount: string) => {
      const tx = await grapeFinance.sendNRWL(amount, raffleAddress);
      addTransaction(tx, {
        summary: `SEND ${Number(amount).toFixed(2)} NRWL TO THE LOTTERY ${amount} `,
      });
    },
    [grapeFinance, addTransaction],
  );


  return (
<Switch>
  <Page>
    
    {!!account ? (
      <>
      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '1%', 
        ...(isDesktop ? { fontSize: '3rem' } : { fontSize: '2rem'})}}>
        LOTTERY 
        </h2>
      </div>

<Grid container justify="center" spacing={3}  >
<Grid alignItems='center' item xs={10} style={{ width: '70%'}}>
<BondCard>
<h2 style={{ textAlign: 'center', marginBottom: '8%', marginTop: '2%', margin: '1%', textTransform: 'capitalize', 
        ...(isDesktop ? { fontSize: '2.0rem' } : { fontSize: '1.5rem'}) }}>
        WIN USDC BY DEPOSITING FROZEN WALRUS TOKENS! <br /><br />
</h2>
<h2 style={{ textAlign: 'center',  marginBottom: '3%',
        ...(isDesktop ? { fontSize: '1.4rem' } : { fontSize: '1.1rem'}) }}>
        TOTAL WLRS tokens entered: {Number(raffleBals)} <br />
        TOTAL Lottery entries: {Number((raffleBals))/(5)} <br /> <br />

       {/* Total Lottery entries: {Number(raffleBals)} <br /> */}
        Your WLRS tokens entered: {Number(userBals)} <br /> 
        Your Lottery entries: {Number((userBals))/(5)} <br /> <br />
        Should you have any issues 
      sending WLRS via the modal below, you can send WLRS directly to the Lottery address, found <a href="https://snowtrace.io/address/0x4b8d4EAe1Bff52113d7DA8a7103e6fF9f2611A86">here!</a>
        </h2>
</BondCard>
</Grid>
<Grid alignItems='center' item xs={12} sm={4}>
<HomeCardBlue>
<h2 style={{ textAlign: 'left', marginBottom: '5%', marginTop: '5%', 
        ...(isDesktop ? { fontSize: '1.3rem' } : { fontSize: '1.1rem'}) }}>
      <i>How does it work?  <br /></i>
        Deposit WLRS to be eligible to win USDC prizes. The current price of WLRS is ${tombPriceInDollars} 
        &nbsp;and 5 WLRS = 1 Lottery entry. Winners are randomly selected! 
        
</h2>
</HomeCardBlue>
</Grid>

<Grid alignItems='center' item xs={12} sm={4}>
<HomeCardPurple>
<h2 style={{ textAlign: 'left', marginBottom: '5%', marginTop: '5%', 
        ...(isDesktop ? { fontSize: '1.3rem' } : { fontSize: '1.1rem'}) }}>

      <i>What are current prizes?<br /></i>
      The next Lottery opens 11 August at 1900 UTC and runs until 17 August at 1900 UTC. Three winners will be selected, earning $1000 USDC each! <br />
      </h2>
</HomeCardPurple>
</Grid>

<Grid alignItems='center' item xs={12} sm={4}>
<HomeCardBlue>
<h2 style={{ textAlign: 'left', marginBottom: '5%', marginTop: '5%', 
        ...(isDesktop ? { fontSize: '1.3rem' } : { fontSize: '1.1rem'}) }}>
      <i>How do I enter? <br /> </i>
      Click the "Enter Lottery" button below and send at least 5 WLRS. 5 WLRS = 1 Lottery entry. The more 
      entries you have, the greater your chances are to win! 
      
</h2>
</HomeCardBlue>
</Grid>

<Grid item xs={12} sm={6}>
  <BondCard>
  <ExchangeCard
        action="Enter Lottery"
        fromToken={grapeFinance.TOMB}
        fromTokenName="WLRS"
        toToken={grapeFinance.TBOND}
        toTokenName="TBOND"
        priceDesc="SEND ME TO THE LOTTERY"
       disabled
        onExchange={handleBuyBonds}>
        </ExchangeCard>
        <LotterySubText style={{ textAlign: 'center',  marginTop: '5%', width:'95%', 
        ...(isDesktop ? { fontSize: '1.2rem' } : { fontSize: '1.0rem'}) }}>The Frozen Walrus lottery is now closed. Winners 
        will be announced shortly! <br /> <br /> Your account: <br />

{account}
</LotterySubText>
    </BondCard>

    {/*
        <h2 style={{ textAlign: 'left', marginBottom: '5%', marginTop: '5%', 
        ...(isDesktop ? { fontSize: '1.3rem' } : { fontSize: '1.1rem'}) }}>
<i>The first inaugural Frozen Walrus has concluded and winners notified!   
    First prize won 2500 USDC. Second prize won 500 USDC. Third prize won 250 USDC.</i> </h2> */}
</Grid>


  

{/*   <div>             {Date.now() > endTime ? (
            <h2 style={{ fontSize: '3rem', textAlign: 'center' }}>Lottery Closed</h2>
          ) : (
            <h2 style={{ fontSize: '3rem', textAlign: 'center' }}>Lottery Open</h2>
          )}  
          {Date.now() < startTime ? (
  <LaunchCountdown
    deadline={startDate}
    description={'Lottery Starts In'}
    descriptionLink={''}
  ></LaunchCountdown>
) : (
  <h2>
  <LaunchCountdown
    deadline={endDate}
    description={''}
    descriptionLink={''}
  ></LaunchCountdown> </h2>
)}
</div> */}


{/*
<Grid container spacing={3} direction="row" item  xs={12} sm={6}  md={3}  style={{ height: '100%', justifyContent: 'space-between', alignItems: 'center', }}>
  <StyledCardWrapper>
    <ExchangeCardNRWL
      action="Enter Lottery"
      fromToken={grapeFinance.NRWL}
      fromTokenName="NRWL"
      toToken={grapeFinance.TBOND}
      toTokenName="TBOND"
      priceDesc="5 NRWL = 1 ENTRY"
        
      onExchange={handleBuyBondsNRWL}>
      </ExchangeCardNRWL>
  </StyledCardWrapper>
</Grid>
*/}

</Grid>
      </>
    ) : (
      <UnlockWallet />
    )}
  </Page>
</Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
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

export default Lottery;
