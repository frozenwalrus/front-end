import React from 'react';
import { useWallet } from 'use-wallet';
import styled from 'styled-components';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import Pit from '../Pit';
import NrwlBond from '../NrwlBond';
import TokenSymbol from '../../components/TokenSymbol';
import { Box, Container, Grid, CardActions, CardContent, Button } from '@material-ui/core';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

const HomeCardPurple = styled.div`
  background: #34363f;
  border-radius: 20px;
  box-shadow: 6px 6px 12px black;
  padding: 20px;
  color: #fcfcfc;
`;
const HomeCardBlue = styled.div`
  background: #23252e;
  border-radius: 20px;
  box-shadow: 6px 6px 12px black;
  padding: 20px;
  color: #fcfcfc;
`;
const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

const Bonds = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          {!!account ? (
            <Container maxWidth="lg">
              <h2 align="center" style={{ fontSize: '3rem', marginBottom: '5%' }}>
                BONDS
              </h2>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={3} />
                <Grid item xs={12} sm={3}>
                  <HomeCardBlue>
                    <CardContent align="center">
                      <h2 style={{ fontSize: '2rem', marginBottom: '2%' }}>WBOND</h2>
                      <h2 style={{ fontSize: '16px', marginBottom: '10%' }}>Bond Token for WLRS</h2>
                      <Box mt={2}>
                        <TokenSymbol symbol="WBOND" />
                      </Box>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                      <Button
                        style={{
                          fontWeight: '900',
                          fontSize: '16px',
                          textAlign: 'center',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          color: '#000000',
                          height: '50px',
                          width: '100%',
                          background: '#00f0e2',
                          borderRadius: '10px',
                        }}
                        component={Link}
                        to={`/bonds/wbond`}
                      >
                        View and Stake
                      </Button>
                    </CardActions>
                  </HomeCardBlue>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <HomeCardPurple>
                    <CardContent align="center">
                      <h2 style={{ fontSize: '2rem', marginBottom: '2%' }}>NBOND</h2>
                      <h2 style={{ fontSize: '16px', marginBottom: '10%' }}>Bond Token for NRWL</h2>

                      <Box mt={2}>
                        <TokenSymbol symbol="NBOND" />
                      </Box>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                      <Button
                        style={{
                          fontWeight: '900',
                          fontSize: '16px',
                          textAlign: 'center',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          color: '#000000',
                          height: '50px',
                          width: '100%',
                          background: '#9aa4da',
                          borderRadius: '10px',
                        }}
                        component={Link}
                        to={`/bonds/nbond`}
                      >
                        View and Stake
                      </Button>
                    </CardActions>
                  </HomeCardPurple>
                </Grid>
                <Grid item xs={12} sm={3} />
              </Grid>
              <h3 align="center" style={{ marginTop: '3%' }}>
                Learn About Frozen Walrus Bonds{' '}
                <StyledLink href="https://docs.frozenwalrus.finance/protocol-information/bonds ">Here!</StyledLink>
              </h3>
            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/wbond`}>
          <Pit />
        </Route>
        <Route path={`${path}/nbond`}>
          <NrwlBond />
        </Route>
      </Page>
    </Switch>
  );
};

export default Bonds;
