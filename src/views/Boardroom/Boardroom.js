import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import Masonry from '../Masonry';
import NrwlBoardroom from '../NrwlBoardroom';
import styled from 'styled-components';
import TokenSymbol from '../../components/TokenSymbol';
import Card from '../../components/Card';
import { Box, Container, Typography, Grid, CardActions, CardContent, Button, useMediaQuery } from '@material-ui/core';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryImage from '../../assets/img/SVG_Icons_and_web_bg/bg.svg';
import { createGlobalStyle } from 'styled-components';


const BackgroundImage = createGlobalStyle`
  body {
    background: url(${CemeteryImage}) no-repeat !important;
    background-size: cover !important;
  }
`;
const HomeCardPurple = styled.div`
  background: rgba(214, 211, 242, 0.9);
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

const Boardroom = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const isDesktop = useMediaQuery('(min-width:600px)');


  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          
          {!!account ? (
            <Container maxWidth="lg">
              <h2 style={{
                    textAlign: 'center', marginBottom: '10px', 
                    ...(isDesktop ? { fontSize: '3rem' } : { fontSize: '2rem'}) }}>  
                    BOARDROOMS</h2>
              
              <Grid container spacing={3} style={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={4} >
                  <HomeCardBlue>
                    <CardContent align="center">
                    <h2 style={{
                    textAlign: 'center', marginBottom: '1px', 
                    ...(isDesktop ? { fontSize: '2.0rem' } : { fontSize: '1.8rem'}) }}>  
                    WALRUS</h2>   
                         
                      <Typography variant="h5" component="h2">
                         WLRS
                      </Typography>
                      <Box mt={2}>
                        <TokenSymbol symbol="WLRS" style={{ height: "100%"}} />
                      </Box>
                      <p style={{marginBottom: '0', fontSize: "1.2rem", fontWeight: "600" }}> Stake WSHARE <br /> Earn WLRS</p>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                      <Button
                        color="primary"
                        size="large"
                        style={{ width: '200px', height: '40px', marginBottom: '10%', borderRadius: '10px', boxShadow: '4px 4px 12px black' }}
                        variant="contained"
                        component={Link}
                        to={`/boardroom/wlrs`}
                      >
                      <b>  View and Stake </b>
                      </Button>
                    </CardActions>
                  </HomeCardBlue>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <HomeCardPurple>
                    <CardContent align="center">
                    <h2 style={{
                    textAlign: 'center', marginBottom: '1px', 
                    ...(isDesktop ? { fontSize: '2rem' } : { fontSize: '1.8rem'}) }}>  
                    NARWHAL</h2>
                      <Typography variant="h5" component="h2">
                       NRWL
                      </Typography>
                      <Box mt={2}>
                      <TokenSymbol symbol="NRWL" />
                      </Box>
                      <p style={{marginBottom: '0', fontSize: "1.2rem", fontWeight: "600" }}>Stake WSHARE<br /> Earn NRWL</p>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                      <Button
                        color="primary"
                        size="large"
                        style={{ width: '200px', height: '40px', marginBottom: '10%', borderRadius: '10px', boxShadow: '4px 4px 12px black'}}
                        variant="contained"
                        component={Link}
                        to={`/boardroom/nrwl`}
                      >
                        <b>View and Stake </b>
                      </Button>
                    </CardActions>
                  </HomeCardPurple>
                </Grid> 
              </Grid>
            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/wlrs`}>
          <Masonry />
        </Route>
        <Route path={`${path}/nrwl`}>
          <NrwlBoardroom />
        </Route>
      </Page>
    </Switch>
  );
};

export default Boardroom;
