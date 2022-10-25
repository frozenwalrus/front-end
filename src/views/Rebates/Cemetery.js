import React, { useMemo, useState, useEffect } from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Web3 from 'web3';

import { CardContent, Button, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
import { createGlobalStyle } from 'styled-components';

import useBanks from '../../hooks/useBanks';
import useRebateTreasury from '../../hooks/useRebateTreasury';
import useTombStats from '../../hooks/useTombStats';
import useRebates from '../../hooks/useRebates';

import CemeteryImage from '../../assets/img/SVG_Icons_and_web_bg/bg.svg';
import Card from '../../components/Card';

import useTombFinance from '../../hooks/useTombFinance';

const web3 = new Web3();
const BN = (n) => new web3.utils.BN(n);

const BackgroundImage = createGlobalStyle`
body {
  background: url(${CemeteryImage}) no-repeat !important;
  background-size: cover !important;
}
`;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    color: 'black !important',
    height: '100%',
  },
  gridCard: {
    border: '1px solid #000000',
    color: 'black !important',
  },
  flex: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  alert: {
    maxWidth: '600px !important',
    marginLeft: 'auto !important',
    marginRight: 'auto !important',
  },
}));

const Cemetery = () => {
  const tombFinance = useTombFinance();
  const classes = useStyles();
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const tombStats = useTombStats();
  const { onClaim } = useRebates();
  const activeBanks = banks.filter((bank) => !bank.finished);

  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);

  const rebateStats = useRebateTreasury();
  const [claimable3omb, setClaimable3omb] = useState(0);
  const [vested, setVested] = useState(0);

  useEffect(() => {
    updateVesting();
    const interval = setInterval(updateVesting, 5000);
    return () => clearInterval(interval);
  }, []);

  async function updateVesting() {
    if (!window.ethereum) return;
    const address = tombFinance.myAccount;// (await window.ethereum.request({ method: 'eth_accounts' }))[0];
    if (!address) return;

    const claimable = await rebateStats.RebateTreasury.methods.claimableTomb(address).call();
    const vesting = await rebateStats.RebateTreasury.methods.vesting(address).call();
    setClaimable3omb(+web3.utils.fromWei(claimable));
    setVested(+web3.utils.fromWei(BN(vesting.amount).sub(BN(vesting.claimed))));
  }

  async function claimTomb() {
    if (!window.ethereum) return;
    const address = tombFinance.myAccount; // (await window.ethereum.request({ method: 'eth_accounts' }))[0];
    if (!address) return;

    onClaim();
    // window.ethereum.request({
    //   method: 'eth_sendTransaction',
    //   params: [
    //     {
    //       from: address,
    //       to: rebateStats.RebateTreasury._address,
    //       data: rebateStats.RebateTreasury.methods.claimRewards().encodeABI(),
    //     },
    //   ],
    // });
  }

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          
          {!!account ? (
            <Grid container direction="column" style={{ alignItems: 'center' }} spacing={5}>
              <Grid item>
                <Typography variant="h3">WLRSDAO</Typography>
              </Grid>
              <Grid item>
                <Alert variant="filled" severity="info" icon={false} style={{ textAlign: 'center' }}>
                  WLRS rewards from bonds are vested for 7 days linearly.
                </Alert>
              </Grid>
              <Grid item container md={10} spacing={5} style={{ justifyContent: 'center' }}>
                <Grid item xs={12} sm={8} md={6}>
                  <Card>
                    <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h5" component="p">
                        WLRS Price <small>(TWAP)</small>
                      </Typography>
                      <Typography variant="h6" component="p">
                        {tombPriceInFTM ? tombPriceInFTM : '-.----'} USDC.e
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                  <Card>
                    <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h5" component="p">
                        Bond Premium
                      </Typography>
                      <Typography variant="h6" component="p">
                        {rebateStats.bondPremium.toFixed(3)}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="h3" style={{ textAlign: 'center', wordBreak: 'break-word' }}>
                  Bondable assets
                </Typography>
              </Grid>
              <Grid item container md={10} spacing={5} style={{ justifyContent: 'center' }}>
                {activeBanks
                  .filter((bank) => bank.sectionInUI === 3)
                  .map((bank) => (
                    <Grid item xs={12} sm={8} md={6} key={bank.name}>
                      <CemeteryCard bank={bank} className={classes.gridCard} />
                    </Grid>
                  ))}
                <Grid item xs={12} sm={10} md={8}>
                  <Card>
                    <CardContent align="center">
                      <Typography variant="h5" component="p">
                        WLRS Vesting
                      </Typography>
                      <Typography variant="h6" component="p">
                        {vested.toFixed(4)} Total Vested
                      </Typography>
                      <Typography variant="h6" component="p">
                        {claimable3omb.toFixed(4)} Claimable
                      </Typography>
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={claimTomb}
                        style={{ marginTop: '8px' }}
                      >
                        CLAIM
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <UnlockWallet />
          )}
        </Route>
      </Page>
    </Switch>
  );
};

export default Cemetery;
