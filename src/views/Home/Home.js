import React, { useMemo, useState, useEffect } from 'react';
import Page from '../../components/Page';
import styled from 'styled-components';
import magikIcon from '../../assets/img/MAGIK.png';
import nrwlIcon from '../../assets/img/nrwl.png';
import wShareIcon from '../../assets/img/wshare.png';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsNrwl from '../../hooks/useLpStatsNrwl';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useNrwlStats from '../../hooks/useNrwlStats';
import xWlrsIcon from '../../assets/img/xWLRS.png';
import xWlrsDesatIcon from '../../assets/img/xWLRS-desaturated.png';
import MetamaskFox from '../../assets/img/SVG_Icons_and_web_bg/metamask-fox.svg';

import { Box, Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import Farms from './Farms';
import Boardrooms from './Boardrooms';
import Nodes from './Nodes';
import Bonds from './Bonds';
import wlrsBlueImg from '../../assets/img/blue-walrus.png';
import montainsImg from '../../assets/img/hero-banner-moutains.png';

import wlrsUsdcIcon from '../../assets/img/wlrs-usdc.png';
import wShareUSDCIcon from '../../assets/img/WSHARE-USDC.E.png';
import nrwlYusdIcon from '../../assets/img/nrwlYusd.png';

import wlrsIcon from '../../assets/img/SVG_Icons_and_web_bg/WLRS.svg';

import { useLocation } from 'react-router-dom';
import useGetTreasuryValue from '../../hooks/useGetTreasuryValue';

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
    backgroundColor: '#284C7B',
  },
  bannerMountains: {
    width: '100%',
    marginBottom: '-5px',
    borderBottomRightRadius: '20px',
  },
  topBanner: {
    background: 'linear-gradient(129.61deg, #07C4FF 14.12%, #00F0E2 88.39%)',
    borderRadius: '20px',
  },
  innerBanner: {},
  bannerTitle: {
    color: '#FFF',
    fontSize: '36px',
    lineHeight: '66px',
  },
  bannerDescription: {
    color: '#282C42',
    fontSize: '20px',
    lineHeight: '28px',
  },
  bannerFooter: {
    color: '#282C42',
    fontSize: '20px',
    marginTop: '30px',
    zIndex: 10,
  },
  tokenButton: {},
  '@media only screen and (max-width: 1200px)': {
    tokenButton: {
      fontSize: '0.8rem',
      marginRight: '4%',
      padding: '5px',
      borderRadius: '12px !important',
    },
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  tabs: {
    fontWeight: '700',
    fontSize: '18px',
  },
  tabItem: {
    cursor: 'pointer',
    color: '#9AA4DA',
    fontWeight: '700',
    fontSize: '18px',
  },
  tabItemActive: {
    textDecoration: 'underline',
    textUnderlineOffset: '10px',
    color: '#FCFCFC',
  },
  boxItem: {
    background: '#12141D',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: '#23252E',
    },
  },
  boxItemInner: {
    padding: '30px',
  },
  welcomeBox: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingBottom: '10px',
  },
  boxTitle: {
    fontSize: '21px',
    color: '#FCFCFC',
  },
  flex: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flexStart',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  '@media only screen and (max-width: 850px)': {
    tokenButton: {
      width: '40% !important',
    },
  },
  '@media only screen and (max-width: 670px)': {
    tokenButton: {
      width: '80% !important',
    },
  },
  card: {
    backgroundColor: '#12141D',
    borderRadius: '10px',
  },
  cardInner: {
    padding: '30px',
  },
  treasuryBox: {
    backgroundColor: '#282C42',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    minHeight: '150px',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  treasuryBoxTitle: {
    fontSize: '21px',
    color: '#FCFCFC',
    marginTop: '30px',
  },
  treasuryBoxBalance: {
    color: '#00F0E2',
    marginTop: '15px',
    fontWeight: '400',
    fontSize: '40px',
  },
  dashboardBoxTitle: {
    color: '#00F0E2',
    fontSize: '16px',
  },
  dashboardBoxLink: {
    color: '#FCFCFC',
    fontSize: '18px',
    fontWeight: '400',
    textDecoration: 'underline',
    textUnderlineOffset: '5px',
  },
  dashboardBox: {
    backgroundColor: '#12141D',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    height: '150px',
  },

  cardTitle: {
    fontSize: '21px',
  },
  cardAddToMetamask: {
    backgroundColor: '#282C42',
    borderRadius: '10px',
    height: '32px',
    cursor: 'pointer',
    width: '32px',
    textAlign: 'center',
  },
  cardAddToMetamaskInner: {
    verticalAlign: 'middle',
    lineHeight: '38px',
  },
  cardCurrentPrice: {
    color: '#9AA4DA',
    fontSize: '14px',
  },
  cardCurrentPriceValue: {
    color: '#FCFCFC',
    fontSize: '22px',
    fontWeight: '700',
  },
  cardStatTitle: {
    fontSize: '16px',
    color: '#FCFCFC',
  },
  cardStatValue: {
    fontWeight: '700',
    fontSize: '18px',
    color: '#FCFCFC',
  },

  // Footer
}));

const Home = () => {
  const isDesktop = useMediaQuery('(min-width:1000px)');
  const widthUnder600 = useMediaQuery('(max-width:600px)');
  const classes = useStyles();
  const tombFtmLpStats = useLpStats('WLRS-USDC-LP');
  const tShareFtmLpStats = useLpStats('WSHARE-USDC-LP');
  const nrwlLpStats = useLpStatsNrwl('NRWL-YUSD-LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const nrwlStats = useNrwlStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();
  const location = useLocation();
  const treasuryValue = useGetTreasuryValue();

  useEffect(() => {
    const hash = location.hash;
    if (hash === '#farms') {
      setActiveTab('Farms');
    } else if (hash === '#boardrooms') {
      setActiveTab('Boardrooms');
    } else if (hash === '#nodes') {
      setActiveTab('Nodes');
    } else if (hash === '#bonds') {
      setActiveTab('Bonds');
    }
  }, [location]);

  const buyTombAddress =
    'https://app.bogged.finance/avax/swap?tokenIn=0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664&tokenOut=0x395908aeb53d33A9B8ac35e148E9805D34A555D3';
  const buyTShareAddress =
    'https://app.bogged.finance/avax/swap?tokenIn=0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664&tokenOut=0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6';
  const buyNrwlAddress = `https://www.swapsicle.io/swap?inputCurrency=0x111111111111ed1D73f860F57b2798b683f2d325&outputCurrency=0x501012893eE88976AB8B5289B7a78E307d5d9DCb`;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const nrwlLPStats = useMemo(() => (nrwlLpStats ? nrwlLpStats : null), [nrwlLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const nrwlPriceInDollars = useMemo(
    () => (nrwlStats ? Number(nrwlStats.priceInDollars).toFixed(2) : null),
    [nrwlStats],
  );
  const nrwlPriceInFTM = useMemo(() => (nrwlStats ? Number(nrwlStats.tokenInFtm).toFixed(4) : null), [nrwlStats]);
  const nrwlCirculatingSupply = useMemo(() => (nrwlStats ? String(nrwlStats.circulatingSupply) : null), [nrwlStats]);
  const nrwlTotalSupply = useMemo(() => (nrwlStats ? String(nrwlStats.totalSupply) : null), [nrwlStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombBalance = useTokenBalance(tombFinance.TOMB);
  const displayTombBalance = useMemo(() => getDisplayBalance(tombBalance), [tombBalance]);
  const tombBalanceInDollars =
    tombPriceInDollars && tombBalance
      ? (Number(tombPriceInDollars) * tombBalance.div('1000000000000000000').toNumber()).toFixed(2)
      : null;

  const tShareBalance = useTokenBalance(tombFinance.TSHARE);
  const displayTShareBalance = useMemo(() => getDisplayBalance(tShareBalance), [tShareBalance]);
  const tShareBalanceInDollars =
    tSharePriceInDollars && tShareBalance
      ? (Number(tSharePriceInDollars) * tShareBalance.div('1000000000000000000').toNumber()).toFixed(2)
      : null;

  const nrwlBalance = useTokenBalance(tombFinance.NRWL);
  const displayNrwlBalance = useMemo(() => getDisplayBalance(nrwlBalance), [nrwlBalance]);
  const nrwlBalanceInDollars =
    nrwlPriceInDollars && nrwlBalance
      ? (Number(nrwlPriceInDollars) * nrwlBalance.div('1000000000000000000').toNumber()).toFixed(2)
      : null;

  const tBondBalance = useTokenBalance(tombFinance.TBOND);
  const displayTBondBalance = useMemo(() => getDisplayBalance(tBondBalance), [tBondBalance]);
  const tBondBalanceInDollars =
    tBondPriceInDollars && displayTBondBalance
      ? (Number(tBondPriceInDollars) * tBondBalance.div('1000000000000000000').toNumber()).toFixed(2)
      : null;

  const Row = styled.div`
    align-items: center;
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    margin-bottom: 8px;
  `;

  const [activeTab, setActiveTab] = useState('Farms');

  return (
    <Page>
      <Box className={classes.topBanner} mt={5}>
        <div className={classes.innerBanner}>
          <Grid container alignItems="flex-end">
            <Grid item xs={12} sm={8} md={6}>
              <div className={classes.welcomeBox}>
                <div className={classes.bannerTitle} style={{ fontWeight: 'bold' }}>
                  Welcome to FrozenWalrus
                </div>
                <div className={classes.bannerDescription} style={{ fontWeight: 'bold' }}>
                  <div>The advanced protocol</div>
                  <div>based on Leverage Yield Farming.</div>
                </div>
                <div className={classes.bannerFooter}>
                  If you want to know more,{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 'bold' }}
                    href="https://docs.frozenwalrus.finance/welcome"
                  >
                    check this website
                  </a>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} md={6}>
              <img src={montainsImg} className={classes.bannerMountains} alt="Mountains" />
            </Grid>
          </Grid>
        </div>
      </Box>

      <Box mt={7}>
        <Grid
          container
          justify={widthUnder600 ? 'space-between' : 'center'}
          spacing={widthUnder600 ? 1 : 6}
          className={`${classes.tabs} ${classes.uppercase}`}
        >
          <Grid
            item
            className={activeTab === 'Farms' ? classes.tabItemActive : classes.tabItem}
            onClick={() => setActiveTab('Farms')}
          >
            Farms
          </Grid>
          <Grid
            item
            className={activeTab === 'Boardrooms' ? classes.tabItemActive : classes.tabItem}
            onClick={() => setActiveTab('Boardrooms')}
          >
            Boardrooms
          </Grid>
          <Grid
            item
            className={activeTab === 'Nodes' ? classes.tabItemActive : classes.tabItem}
            onClick={() => setActiveTab('Nodes')}
          >
            Nodes
          </Grid>
          <Grid
            item
            className={activeTab === 'Bonds' ? classes.tabItemActive : classes.tabItem}
            onClick={() => setActiveTab('Bonds')}
          >
            Bonds
          </Grid>
          {/* <Grid
            item
            className={activeTab === 'Rebates' ? classes.tabItemActive : classes.tabItem}
            onClick={() => setActiveTab('Rebates')}
          >
            Rebates
          </Grid> */}
        </Grid>
      </Box>

      <Box hidden={activeTab !== 'Farms'} mt={4}>
        <Farms />
      </Box>
      <Box hidden={activeTab !== 'Boardrooms'} mt={4}>
        <Boardrooms />
      </Box>
      <Box hidden={activeTab !== 'Nodes'} mt={4}>
        <Nodes />
      </Box>
      <Box hidden={activeTab !== 'Bonds'} mt={4}>
        <Bonds />
      </Box>
      {/* <Box hidden={activeTab !== 'Rebates'} mt={4}>
        <Rebates />
      </Box> */}

      <Box mt={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <a
              href="https://magik.farm/#/avax"
              target="_blank"
              rel="noreferrer noopener"
              style={{ textDecoration: 'none' }}
            >
              <Box className={classes.boxItem}>
                <div className={classes.boxItemInner}>
                  <Grid container direction="column" spacing={3}>
                    <Grid item>
                      <img src={magikIcon} height={70} alt="Walrus" />
                    </Grid>
                    <Grid item>
                      <span className={classes.boxTitle}>Compound on Magik Farms</span>
                    </Grid>
                    <Grid item>
                      <span className="color-secondary">Stake your assets in Auto-Compounding Vaults</span>
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </a>
          </Grid>
          <Grid item xs={12} md={4}>
            <a
              href="https://xwlrs.frozenwalrus.finance"
              target="_blank"
              rel="noreferrer noopener"
              style={{ textDecoration: 'none' }}
            >
              <Box className={classes.boxItem}>
                <div className={classes.boxItemInner}>
                  <Grid container direction="column" spacing={3}>
                    <Grid item>
                      <img src={xWlrsIcon} height={70} alt="Walrus" />
                    </Grid>
                    <Grid item>
                      <span className={classes.boxTitle}>Mint xWlrs</span>
                    </Grid>
                    <Grid item>
                      <span className="color-secondary">Turn WLRS into XWLRS to get extra yield!</span>
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </a>
          </Grid>
          <Grid item xs={12} md={4}>
            <a
              href="https://win.frozenwalrus.finance"
              target="_blank"
              rel="noreferrer noopener"
              style={{ textDecoration: 'none' }}
            >
              <Box className={classes.boxItem}>
                <div className={classes.boxItemInner}>
                  <Grid container direction="column" spacing={3}>
                    <Grid item>
                      <img src={xWlrsDesatIcon} height={70} alt="Walrus" />
                    </Grid>
                    <Grid item>
                      <span className={classes.boxTitle}>Prize Pool</span>
                    </Grid>
                    <Grid item>
                      <span className="color-secondary">Buy tickets to win xWLRS pot!</span>
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </a>
          </Grid>
        </Grid>
      </Box>

      <Box mt={5}>
        <Grid container alignContent="center" alignItems="center">
          <Grid
            item
            xs={12}
            sm={6}
            className={classes.treasuryBox}
            style={{
              borderTopRightRadius: widthUnder600 ? '20px' : '0',
              borderBottomLeftRadius: widthUnder600 ? '0' : '20px',
            }}
          >
            <div className={classes.treasuryBoxTitle}>Total Treasury Balance</div>
            <div className={classes.treasuryBoxBalance}>
              ${treasuryValue ? treasuryValue.toLocaleString('en-US') : '---.---'}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={classes.dashboardBox}
            style={{
              borderBottomLeftRadius: widthUnder600 ? '20px' : '0',
              borderTopRightRadius: widthUnder600 ? '0' : '20px',
            }}
          >
            <Grid container style={{ height: '155px' }} wrap={'nowrap'} justifyContent="center" alignItems="flex-end">
              <Grid item xs={4}>
                <img src={wlrsBlueImg} alt="Walrus" style={{ width: '100%', marginLeft: '15px' }} />
              </Grid>
              <Grid item xs={8} style={{ paddingBottom: '40px', marginLeft: '20px' }}>
                <div className={classes.dashboardBoxTitle}>
                  Check out our financial dashboard to see more details of the treasury and other metrics
                </div>
                <div className={classes.dashboardBoxLink}>
                  <a
                    style={{ color: '#fcfcfc' }}
                    href="https://dashboard.frozenwalrus.finance"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Go to the dashboard
                  </a>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.card}>
              <Box className={classes.cardInner}>
                <Grid container justify="space-between" alignContent="center">
                  <Grid item>
                    <span className={classes.cardTitle}>WLRS-USDC.e LP</span>
                  </Grid>
                </Grid>
                <Box mt={2} style={{ textAlign: 'center' }}>
                  <img src={wlrsUsdcIcon} height={80} alt="Walrus" style={{ paddingTop: '10px' }} />
                </Box>
                <Box mt={3} style={{ textAlign: 'center' }}>
                  <Grid container direction="column" justify="center">
                    <Grid item className={classes.cardCurrentPrice}>
                      Current Price
                    </Grid>
                    <Grid item className={classes.cardCurrentPriceValue}>
                      ${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}
                    </Grid>
                  </Grid>
                  <Box mt={4}>
                    <Grid container direction="column" justify="center" spacing={1}>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Liquidity
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Total Supply
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            {tombLPStats?.totalSupply
                              ? Number(tombLPStats.totalSupply) < 1 / 10 ** 4
                                ? (Number(tombLPStats.totalSupply) * 10 ** 6).toFixed(4) + 'µ'
                                : tombLPStats.totalSupply
                              : '-.--'}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Box mt={4}>
                      <Grid container justify="space-between" spacing={2}>
                        <Grid item xs={6}>
                          <a
                            rel="noreferrer noopener"
                            target="_blank"
                            href="https://dexscreener.com/avalanche/0x82845B52b53c80595bbF78129126bD3E6Fc2C1DF"
                          >
                            <button className="secondary-button">Chart</button>
                          </a>
                        </Grid>
                        <Grid item xs={6}>
                          <a
                            rel="noreferrer noopener"
                            target="_blank"
                            href="https://traderjoexyz.com/pool/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0x395908aeb53d33A9B8ac35e148E9805D34A555D3#/"
                          >
                            <button className="primary-button">Add Liquidity</button>
                          </a>{' '}
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.card}>
              <Box className={classes.cardInner}>
                <Grid container justify="space-between" alignContent="center">
                  <Grid item>
                    <span className={classes.cardTitle}>WSHARE-USDC.e LP</span>
                  </Grid>
                </Grid>
                <Box mt={2} style={{ textAlign: 'center' }}>
                  <img src={wShareUSDCIcon} height={80} alt="Walrus" style={{ paddingTop: '10px' }} />
                </Box>
                <Box mt={3} style={{ textAlign: 'center' }}>
                  <Grid container direction="column" justify="center">
                    <Grid item className={classes.cardCurrentPrice}>
                      Current Price
                    </Grid>
                    <Grid item className={classes.cardCurrentPriceValue}>
                      ${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}
                    </Grid>
                  </Grid>
                  <Box mt={4}>
                    <Grid container direction="column" justify="center" spacing={1}>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Liquidity
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Total Supply
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            {tshareLPStats?.totalSupply
                              ? Number(tshareLPStats.totalSupply) < 1 / 10 ** 4
                                ? (Number(tshareLPStats.totalSupply) * 10 ** 6).toFixed(4) + 'µ'
                                : tshareLPStats.totalSupply
                              : '-.--'}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Box mt={4}>
                      <Grid container justify="space-between" spacing={2}>
                        <Grid item xs={6}>
                          <a
                            rel="noreferrer noopener"
                            target="_blank"
                            href="https://dexscreener.com/avalanche/0x03d15E0451e54Eec95ac5AcB5B0a7ce69638c62A"
                          >
                            <button className="secondary-button">Chart</button>
                          </a>
                        </Grid>
                        <Grid item xs={6}>
                          <a
                            rel="noreferrer noopener"
                            target="_blank"
                            href="https://traderjoexyz.com/pool/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6#/"
                          >
                            <button className="primary-button">Add Liquidity</button>
                          </a>{' '}
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.card}>
              <Box className={classes.cardInner}>
                <Grid container justify="space-between" alignContent="center">
                  <Grid item>
                    <span className={classes.cardTitle}>NRWL-YUSD LP</span>
                  </Grid>
                </Grid>
                <Box mt={2} style={{ textAlign: 'center' }}>
                  <img src={nrwlYusdIcon} height={80} alt="Walrus" style={{ paddingTop: '10px' }} />
                </Box>
                <Box mt={3} style={{ textAlign: 'center' }}>
                  <Grid container direction="column" justify="center">
                    <Grid item className={classes.cardCurrentPrice}>
                      Current Price
                    </Grid>
                    <Grid item className={classes.cardCurrentPriceValue}>
                      ${nrwlLPStats?.priceOfOne ? nrwlLPStats.priceOfOne : '-.--'}
                    </Grid>
                  </Grid>
                  <Box mt={4}>
                    <Grid container direction="column" justify="center" spacing={1}>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Liquidity
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            ${nrwlLPStats?.totalLiquidity ? nrwlLPStats.totalLiquidity : '-.--'}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Total Supply
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            {nrwlLPStats?.totalSupply
                              ? Number(nrwlLPStats.totalSupply) < 1 / 10 ** 4
                                ? (Number(nrwlLPStats.totalSupply) * 10 ** 6).toFixed(4) + 'µ'
                                : nrwlLPStats.totalSupply
                              : '-.--'}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Box mt={4}>
                      <Grid container justify="space-between" spacing={2}>
                        <Grid item xs={6}>
                          <a
                            rel="noreferrer noopener"
                            target="_blank"
                            href="https://dexscreener.com/avalanche/0xE4f4f9DD9cD45bC44FD517f4AE490591030274F6"
                          >
                            <button className="secondary-button">Chart</button>
                          </a>
                        </Grid>
                        <Grid item xs={6}>
                          <a
                            rel="noreferrer noopener"
                            target="_blank"
                            href="https://www.swapsicle.io/add/0x111111111111ed1D73f860F57b2798b683f2d325/0x501012893eE88976AB8B5289B7a78E307d5d9DCb"
                          >
                            <button className="primary-button">Add Liquidity</button>
                          </a>{' '}
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={4}>
            <div className={classes.card}>
              <Box className={classes.cardInner}>
                <Grid container justify="space-between" alignContent="center">
                  <Grid item>
                    <span className={classes.cardTitle}>USDC.e</span>
                  </Grid>
                  <Grid item>
                    <div className={classes.cardAddToMetamask}>
                      <span className={classes.cardAddToMetamaskInner}>+</span>
                    </div>
                  </Grid>
                </Grid>
                <Box mt={2} style={{ textAlign: 'center' }}>
                  <img src={wlrsIcon} height={80} alt="Walrus" style={{ paddingTop: '10px' }} />
                </Box>
                <Box mt={3} style={{ textAlign: 'center' }}>
                  <Grid container direction="column" justify="center">
                    <Grid item className={classes.cardCurrentPrice}>
                      Current Price
                    </Grid>
                    <Grid item className={classes.cardCurrentPriceValue}>
                      ${JOEPrice ? JOEPrice : '-.----'}
                    </Grid>
                  </Grid>
                  <Box mt={4}>
                    <Grid container direction="column" justify="center" spacing={1}>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Market Cap
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            $4,221,444.00
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Price change
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            +16.70%
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Total Supply
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            12,344
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Box mt={4}>
                      <Grid container justify="space-between" spacing={2}>
                        <Grid item xs={6}>
                          <button className="secondary-button">Chart</button>
                        </Grid>
                        <Grid item xs={6}>
                          <button className="primary-button">Buy</button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
          </Grid> */}

          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.card}>
              <Box className={classes.cardInner}>
                <Grid container justify="space-between" alignContent="center">
                  <Grid item>
                    <span className={classes.cardTitle}>WLRS</span>
                  </Grid>
                  <Grid item>
                    <div
                      className={classes.cardAddToMetamask}
                      onClick={() => {
                        tombFinance.watchAssetInMetamask('WLRS');
                      }}
                    >
                      <span className={classes.cardAddToMetamaskInner}>
                        <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                      </span>
                    </div>
                  </Grid>
                </Grid>
                <Box mt={2} style={{ textAlign: 'center' }}>
                  <img src={wlrsIcon} height={80} alt="Walrus" style={{ paddingTop: '10px' }} />
                </Box>
                <Box mt={3} style={{ textAlign: 'center' }}>
                  <Grid container direction="column" justify="center">
                    <Grid item className={classes.cardCurrentPrice}>
                      Current Price
                    </Grid>
                    <Grid item className={classes.cardCurrentPriceValue}>
                      ${tombPriceInFTM ? tombPriceInFTM : '-.----'}{' '}
                    </Grid>
                  </Grid>
                  <Box mt={4}>
                    <Grid container direction="column" justify="center" spacing={1}>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Market Cap
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Circulating Supply
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            {tombCirculatingSupply}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Total Supply
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            {tombTotalSupply}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt={4}>
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={12}>
                        <a
                          rel="noreferrer noopener"
                          target="_blank"
                          href="https://app.bogged.finance/avax/swap?tokenIn=0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664&tokenOut=0x395908aeb53d33A9B8ac35e148E9805D34A555D3"
                        >
                          <button className="primary-button">Buy</button>
                        </a>{' '}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.card}>
              <Box className={classes.cardInner}>
                <Grid container justify="space-between" alignContent="center">
                  <Grid item>
                    <span className={classes.cardTitle}>WSHARE</span>
                  </Grid>
                  <Grid item>
                    <div
                      className={classes.cardAddToMetamask}
                      onClick={() => {
                        tombFinance.watchAssetInMetamask('WSHARE');
                      }}
                    >
                      <span className={classes.cardAddToMetamaskInner}>
                        {' '}
                        <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                      </span>
                    </div>
                  </Grid>
                </Grid>
                <Box mt={2} style={{ textAlign: 'center' }}>
                  <img src={wShareIcon} height={80} alt="Walrus" style={{ paddingTop: '10px' }} />
                </Box>
                <Box mt={3} style={{ textAlign: 'center' }}>
                  <Grid container direction="column" justify="center">
                    <Grid item className={classes.cardCurrentPrice}>
                      Current Price
                    </Grid>
                    <Grid item className={classes.cardCurrentPriceValue}>
                      ${tSharePriceInFTM ? tSharePriceInFTM : '-.----'}{' '}
                    </Grid>
                  </Grid>
                  <Box mt={4}>
                    <Grid container direction="column" justify="center" spacing={1}>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Market Cap
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            ${(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Circulating Supply
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            {tShareCirculatingSupply}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Total Supply
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            {tShareTotalSupply}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt={4}>
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={12}>
                        <a
                          rel="noreferrer noopener"
                          target="_blank"
                          href="https://app.bogged.finance/avax/swap?tokenIn=0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664&tokenOut=0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6"
                        >
                          <button className="primary-button">Buy</button>
                        </a>{' '}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.card}>
              <Box className={classes.cardInner}>
                <Grid container justify="space-between" alignContent="center">
                  <Grid item>
                    <span className={classes.cardTitle}>NRWL</span>
                  </Grid>
                  <Grid item>
                    <div
                      className={classes.cardAddToMetamask}
                      onClick={() => {
                        tombFinance.watchAssetInMetamask('NRWL');
                      }}
                    >
                      <span className={classes.cardAddToMetamaskInner}>
                        {' '}
                        <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                      </span>
                    </div>
                  </Grid>
                </Grid>
                <Box mt={2} style={{ textAlign: 'center' }}>
                  <img src={nrwlIcon} height={80} alt="Walrus" style={{ paddingTop: '10px' }} />
                </Box>
                <Box mt={3} style={{ textAlign: 'center' }}>
                  <Grid container direction="column" justify="center">
                    <Grid item className={classes.cardCurrentPrice}>
                      Current Price
                    </Grid>
                    <Grid item className={classes.cardCurrentPriceValue}>
                      ${nrwlPriceInFTM ? nrwlPriceInFTM : '-.----'}{' '}
                    </Grid>
                  </Grid>
                  <Box mt={4}>
                    <Grid container direction="column" justify="center" spacing={1}>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Market Cap
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            ${(nrwlCirculatingSupply * nrwlPriceInDollars).toFixed(2)}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Circulating Supply
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            {nrwlCirculatingSupply}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container justify="space-between">
                          <Grid item className={classes.cardStatTitle}>
                            Total Supply
                          </Grid>
                          <Grid item className={classes.cardStatValue}>
                            {nrwlTotalSupply}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt={4}>
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={12}>
                        <a
                          rel="noreferrer noopener"
                          target="_blank"
                          href="https://www.swapsicle.io/swap?inputCurrency=0x111111111111ed1D73f860F57b2798b683f2d325&outputCurrency=0x501012893eE88976AB8B5289B7a78E307d5d9DCb"
                        >
                          <button className="primary-button">Buy</button>
                        </a>{' '}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default Home;
