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
import usePegasaurus from '../../hooks/Pegasaurus/usePegasaurus';
import PegasaurusInfo from './components/PegasaurusInfo';
import usePegasaurusRewards from '../../hooks/Pegasaurus/usePegasaurusRewards'; 
import tvl from '../../assets/img/tvl.png'; 
import { AlignCenter } from 'react-feather';


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
const HomeCardPurple = styled.div`
  background: rgba(214, 211, 242, 0.8);
  border-radius: 50px;
  box-shadow: 6px 6px 12px black; 
  padding: 20px; 
  color: #4b4453;
`;

const HomeCardBlue = styled.div`
  background: rgba(217, 238, 254, 0.95);
  border-radius: 50px;
  box-shadow: 6px 6px 12px black; 
  padding: 20px; 
  color: #4b4453;
`;

const HomeCardPegasaurus = styled.div`
background: rgba(217, 238, 254, 0.95);
border-radius: 50px;
box-shadow: 0px 0px 12px black; 
padding: 20px; 
color: #4b4453;
   
`;

const HomeCardPegasaurus2 = styled.div`
background: rgba(217, 238, 254, 0.95);
border-radius: 50px;
box-shadow:
0 0 8px 3px #fff,  /* inner white */
0 0 12px 7px #f0f, /* middle magenta */
0 0 16px 11px #0ff; /* outer cyan */
padding: 20px; 
color: #4b4453;
   
`;


const Pegasaurus: React.FC = () => {
  const matches = useMediaQuery('(min-width:600px)');
  const { account } = useWallet();
  const { path } = useRouteMatch();
  const { Pegasaurus } = usePegasaurus(); 
  const { rewardTokensPS2, totalRewardValuePS2, aprPS2 } = usePegasaurusRewards(Pegasaurus);
console.log(Pegasaurus)

  return (
<Switch>
  <Page>
    <Route exact path={path}>
    
         <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '5px' }}>PEG DEFENDER </h2>
      {!!account ? (
        <Container maxWidth="xl">
          <div></div>
          
          {Pegasaurus && rewardTokensPS2 &&  (
                
<Grid container spacing={3} direction="column" style= {{alignItems: "center", justifyContent: "center", marginTop:"2px"}} >
  <Grid item xs={12} lg={7} style={{alignItems: "center", justifyContent: "center"}}>
    <HomeCard>
    <Grid container spacing={2} style= {{marginTop: '5px', justifyContent: 'center'}}>           
      <Grid item>
        <TokenSymbol width={100} height={100} symbol={'WLRS-USDC-LP'} />
      </Grid>            
    </Grid>
    <div>
        <h2 style={{ textTransform: 'none', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '5px', 
        textAlign: 'center' }}>
          WLRS Peg Defender! <br /> 
        </h2>
        <h2 style={{ textTransform: 'none', fontSize: '1.3rem', marginTop: '5px', 
        textAlign: 'center' }}>
        Deposit WLRS-USDC-LP and earn WSHARE Rewards
        </h2>

    <Grid container spacing={2} style={{marginTop: '5px', justifyContent: 'center', alignItems: 'center' }} >               
        <Grid item style={{ textAlign:'center', alignItems: 'center', justifyContent: 'center'}}>
          <TokenSymbol width={72} height={72} symbol={'WSHARE'} />
        </Grid>        
    </Grid>
    <h2 style={{ marginTop: '12px', textAlign: 'center', fontSize: '1.0rem',   }}>
        Withdrawal fees are based on TWAP. Fees decrease as WLRS increases, and are eliminated at 1.25 TWAP. More information 
        will be included in our documentation before the Peg Defender is opened! 
        </h2> 
    <h2 style={{ textTransform: 'capitalize', fontSize: '1.5rem', marginTop: '15px', textAlign: 'center' }}>
      Total Value Locked: ${Number(Pegasaurus.totalDesposits) * 10**6}
    </h2> 
  </div>
  </HomeCard>
</Grid>

<Grid container spacing={3} style={{alignItems: 'center', justifyContent: 'center',  }}>
    <div
      style={{
        marginTop: '35px',}} >
      <PegasaurusInfo
        Pegasaurus={Pegasaurus}
        rewardTokens={rewardTokensPS2}
        totalRewardValue={totalRewardValuePS2}
        apr={aprPS2}
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

export default Pegasaurus;
