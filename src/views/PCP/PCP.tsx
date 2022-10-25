import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, useMediaQuery } from '@material-ui/core';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import TokenSymbol from '../../components/TokenSymbol';
import CemeteryImage from '../../assets/img/SVG_Icons_and_web_bg/bg.svg';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import PegPoolInfo from './components/PegPoolInfo';
import usePegPool from '../../hooks/usePegPool';
import usePegPoolRewards from '../../hooks/usePegPoolRewards';
import CountUp from 'react-countup';
import useAxios from 'axios-hooks'; 


const TITLE = 'ames.defi | Peg Pool';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${CemeteryImage}) no-repeat !important;
    background-size: cover !important;
  }
`;
const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};`; 

const HomeCard = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50px;
  padding: 20px; 
  box-shadow: 6px 6px 12px black; 
  color: #4b4453;
`;

const PCP: React.FC = () => {
  const { account } = useWallet();
  const { path } = useRouteMatch();
  const { pegPool } = usePegPool();
  const { rewardTokens, totalRewardValue, apr } = usePegPoolRewards(pegPool);
 {/* const [{ data, loading, error }, refetch] = useAxios (
    'https://openapi.debank.com/v1/user/total_balance?id=0x2ba4da735d3ce9177216102e9fdabae67e1ac524'
  )
  if (loading) return <p>Firing up the walrus...</p>
 if (error) return <p>error! </p>; */}
  return (
<Switch>
  <Page>
    <Route exact path={path}>
    
    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '5px' }}>PEG CAMPAIGN POOL </h2>
      {!!account ? (
        <Container maxWidth="xl">
          <div></div>
          
          {pegPool && rewardTokens &&  (
                
<Grid container spacing={3} direction="column" style= {{alignItems: "center", justifyContent: "center", marginTop:"2px"}} >
<Grid item xs={12} lg={7} style={{alignItems: "center", justifyContent: "center"}}>
  <HomeCard>
  <Grid container spacing={2} style= {{marginTop: '5px', justifyContent: 'center'}}>           
      <Grid item>
          <TokenSymbol width={100} height={100} symbol={'WLRS'} />
      </Grid>
  </Grid>
  <div>
        <h2 style={{ textTransform: 'none', fontSize: '2.0rem', fontWeight: 'bold', marginTop: '10px', 
        textAlign: 'center' }}>
          WLRS Peg Campaign Pool is now closed <br /> 
        </h2>
        {/* <h2 style={{ textTransform: 'none', fontSize: '1.3rem', marginTop: '5px', 
        textAlign: 'center' }}>
        Deposit USDC.e and get WSHARE Rewards
        </h2> */}

        <Grid container spacing={2} style={{marginTop: '5px', justifyContent: 'center', alignItems: 'center' }} >               
          <Grid item style={{ textAlign:'center', alignItems: 'center', justifyContent: 'center'}}>
            <TokenSymbol width={72} height={72} symbol={'WSHARE'} />
        </Grid>              
  </Grid>
  {/* <h2 style={{ marginTop: '12px', textAlign: 'center', fontSize: '1.0rem',   }}>
      Withdrawal fees are now static and will be adjusted downward over next several weeks as the Peg 
      Campaign Pool concludes.   
      </h2> 
      <h2 style={{ textTransform: 'capitalize', fontSize: '1.5rem', marginTop: '15px', textAlign: 'center' }}>  
      Total Deposited To-Date: ${Number(pegPool.totalDesposits)}
      </h2>  */}
      
  </div>
  </HomeCard>
</Grid>

<Grid container spacing={3} style={{alignItems: 'center', justifyContent: 'center',  }}>
   <div
     style={{
        marginTop: '35px',}} >
      <PegPoolInfo
        pegPool={pegPool}
        rewardTokens={rewardTokens}
        totalRewardValue={totalRewardValue}
        apr={apr}
      />
  </div> 
  </Grid>
   
</Grid>
)}
    </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
      </Page>
    </Switch>
  );
};

export default PCP;
