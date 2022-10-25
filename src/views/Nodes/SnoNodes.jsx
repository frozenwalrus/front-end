import {Grid, Button, useMediaQuery } from '@material-ui/core';
import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import Page from '../../components/Page';
import SnoNode from '../SnowyNode';
import SnoCard from './ShareLPCard';
import WlrsCard from './PegLPCard';
import GrapeLPCard from './GrapeLPCard';
import NrwlLPCard from './NrwlLPCard';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/SVG_Icons_and_web_bg/bg.svg';
import { makeStyles } from '@material-ui/core/styles';

const leaderboard =
'https://app.frozenwalrus.finance/leaderboard'

const BackgroundImage = createGlobalStyle`
  body, html {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;
const useStyles = makeStyles((theme) => ({
  leaderboardbutton: {},
  '@media only screen and (max-width: 600px)': {
    leaderboardbutton: {
      fontSize: '1.0rem',
      padding: '10px', 
      borderRadius: '20px',  
    },
  },
  '@media only screen and (min-width: 601px)': {
    leaderboardbutton: {
      fontSize: '1.1rem',
      padding: '10px', 
      borderRadius: '20px',  
    },
  },
}));
const SnoNodes = () => {
  const {path} = useRouteMatch();
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');
  return (
    <Page>
         
      <Switch>
        <Route exact path={path}>
        <h2 style={{
        textAlign: 'center', 
        ...(isDesktop ? { fontSize: '3rem' } : { fontSize: '2rem'}) }}>  
          NODES</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Button
          color="primary"
          target="_blank"
          href={leaderboard}
          variant="contained"
          style={{ marginTop: '5%' }}
          className={classes.leaderboardbutton} >
          Go To Leaderboard!
        </Button>
          </div>
          <Grid container spacing={3} style={{marginTop: '20px', justifyContent:'center'}}>
            <WlrsCard />
            <SnoCard /> 
            <NrwlLPCard />   
            <GrapeLPCard />     
          </Grid>
        </Route>
        <Route path={`${path}/:bankId`}>
          <SnoNode />
        </Route>
      </Switch>
    </Page>
  );
};

export default SnoNodes;