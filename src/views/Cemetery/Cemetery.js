import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';
import { Alert } from '@material-ui/lab';
import { Box, Container, Typography, Grid, useMediaQuery } from '@material-ui/core';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
import GenesisCard from './GenesisCard';
import NrwlGenesisCard from './NrwlGenesisCard';
import CemeteryImage from '../../assets/img/SVG_Icons_and_web_bg/bg.svg';
import { createGlobalStyle } from 'styled-components';
import useBanks from '../../hooks/useBanks';
import config from '../../config';
import styled from 'styled-components';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${CemeteryImage}) no-repeat !important;
    background-size: cover !important;
  }
`;


const Cemetery = () => {
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const activeBanks = banks.filter((bank) => !bank.finished);
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          
          {!!account ? (
            <Container maxWidth="lg">
               <h2 style={{
                textAlign: 'center', 
                ...(isDesktop ? { fontSize: '3rem' } : { fontSize: '2rem'}) }}>  
                  FARMS</h2>
              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography
                    align="center"
                    variant="h4"
                    gutterBottom
                    style={{ marginTop: '-25px', marginBottom: '50px', 
                    ...(isDesktop ? { fontSize: '1.8rem' } : { fontSize: '1.4rem'}) }}> 
                    Deposit LPs to earn WSHARE 
                  </Typography>
                  {/* <Alert variant="filled" severity="info" style={{ marginTop: '-25px', marginBottom: '35px' }}>
                    All below pools have ended. Please unstake and stake at{' '}
                    <a style={{ color: '#fff' }} href="https://arctic-fox.finance/farms">
                      Arctic Fox.
                    </a>
                  </Alert> */}
                  <Grid container spacing={3}>
                    <CemeteryCard />
                  </Grid>
                </div>
              </Box>

              {/* <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                <Typography variant="h4" gutterBottom style={{marginTop: '20px', color: '5#A381A'}}>
                  Genesis Pools
                </Typography>
                {
                  config.baseLaunchDate.getTime() + 48 * 60 * 60 * 1000 < new Date().getTime()
                    ? (
                        <Alert variant="filled" severity="error" >
                          Genesis pools have ended. Please claim all rewards and remove funds from Genesis pools.
                        </Alert>
                      )
                    : null
                }
                <Grid container spacing={3} style={{marginTop: '20px'}}>
                  <GenesisCard />
                </Grid>
              </div> */}

              <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 5).length === 0}>
                <Typography variant="h4" gutterBottom style={{marginTop: '10%', color: '5#A381A', textAlign: 'center' }}>
                  NRWL Genesis Pools
                </Typography>
                {
                  1659456000 * 1000 < new Date().getTime()
                    ? (
                        <Alert variant="filled" severity="error" >
                          NRWL Genesis pools have ended and will soon be removed from the site. 
                          Please claim all rewards and remove funds from Genesis pools immediately. 
                        </Alert>
                      )
                    : (
                        <Alert variant="filled" severity="error">
                          The NRWL genesis pools will end on August 2nd at 16:00 UTC - Please claim your rewards and move your LP to the above share farms to continue earning. <b>Any rewards not claimed before the pools end will be lost.</b> <br/><br/><b>Please note:</b> LPs can be removed safely after this time, the lock applies to rewards only.
                        </Alert>
                      )
                }
                {
                  config.nrwlLaunchDate.getTime() > new Date().getTime()
                    ? (
                        <Alert variant="filled" severity="success">
                          NRWL Genesis pools start on July 24th at 14:00 UTC. Pre-staking is open.
                        </Alert>
                      )
                    : null
                }
                <Grid container spacing={3} style={{marginTop: '10px', marginBottom: '20px'}}>
                  <NrwlGenesisCard />
                </Grid>
              </div>
            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Cemetery;
