import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import Card from '../../components/Card';
import TokenSymbol from '../../components/TokenSymbol';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsNrwl from '../../hooks/useLpStatsNrwl';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';
import useBondStats from '../../hooks/useBondStats';
import usexWlrsStats from '../../hooks/useXwlrsStats';
import useTombFinance from '../../hooks/useTombFinance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTokenBalance from '../../hooks/useTokenBalance';
// import useCashStat from '../../hooks/useCashPriceInEstimatedTWAP.ts';
import styled from 'styled-components';
import usePegasaurus from '../../hooks/Pegasaurus/usePegasaurus';
import usePegasaurusRewards from '../../hooks/Pegasaurus/usePegasaurusRewards';
import Row from '../../components/Row';

const HomeCardPurple = styled.div`
  background: rgba(214, 211, 242, 0.9);
  border-radius: 50px;
  box-shadow: 0px 0px 18px black; 
  padding: 25px; 
  color: #4b4453;
`;
const HomeCardBlue = styled.div`
  background: rgba(217, 238, 254, 0.95);
  border-radius: 50px;
  box-shadow: 0px 0px 18px black; 
  padding: 25px; 
  color: #4b4453;
   
`;
const HomeCardPegasaurus = styled.div`
  background: rgba(217, 238, 254, 0.95);
  border-radius: 50px;
  box-shadow:
  0 0 8px 3px #fff,  /* inner white */
  0 0 12px 7px #a97ddb, /* middle magenta */
  0 0 16px 11px #0ff; /* outer cyan */
  padding: 20px; 
  color: #4b4453;
  margin: 10px; 
   
`;
const CemeteryCard = () => {
  const tombFtmLpStats = useLpStats('WLRS-USDC-LP');
  const tShareFtmLpStats = useLpStats('WSHARE-USDC-LP');
  const tDibsFtmLpStats = useLpStats('WLRS-USDIBS-LP');
  const nrwlFtmLpStats = useLpStatsNrwl('NRWL-YUSD-LP');
  // const snoSnoShareLpStats = useLpStats('SNO-SNOSHARE-LP');
  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tDibsLpStats = useMemo(() => (tDibsFtmLpStats ? tDibsFtmLpStats : null), [tDibsFtmLpStats]);
  const nrwlLpStats = useMemo(() => (nrwlFtmLpStats ? nrwlFtmLpStats : null), [nrwlFtmLpStats]);
  const tombFinance = useTombFinance();

  
  const tombBank = useBank('WlrsUsdcLPWShareRewardPool');
  const tombStatsOnPool = useStatsForPool(tombBank);
  const { Pegasaurus } = usePegasaurus(); 
  const { rewardTokensPS2, totalRewardValuePS2, aprPS2 } = usePegasaurusRewards(Pegasaurus);

  const tShareBank = useBank('WShareUsdcLPWShareRewardPool');
  const tShareStatsOnPool = useStatsForPool(tShareBank);

  const tDibsBank = useBank('WlrsUSDibsLPWShareRewardPool');
  const tDibsStatsOnPool = useStatsForPool(tDibsBank);

  const newBank = useBank('WShareUSDCWLRSRewardPool');
  const newBankStatsOnPool = useStatsForPool(newBank);

  const xBank = useBank('XWLRSShareRewardPool');
  const xBankStatsOnPool = useStatsForPool(xBank);
  
  const nrwlBank = useBank('NrwlYusdLPWShareRewardPool');
  const nrwlStatsOnPool = useStatsForPool(nrwlBank);
  const tBondStats = useBondStats();
  const xwlrsStats = usexWlrsStats();
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
  const tBondPriceInDollars = useMemo(() => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null), [tBondStats]);
  const xwlrsPriceInDollars = useMemo(() => (xwlrsStats ? Number(xwlrsStats.priceInDollars).toFixed(2) : null), [xwlrsStats]);
  const tbondBank = useBank('WBondWShareRewardPool');
  const tBondStatsonPool = useStatsForPool(tbondBank);
  console.log(tombFinance)


  // const snoSnoShareLPStats = useMemo(() => (snoSnoShareLpStats ? snoSnoShareLpStats : null), [snoSnoShareLpStats]);
  // const snoPrice = useCashStat();
  return (
<Grid spacing={3} container direction="row" alignItems="center" justifyContent="center"> 
<Grid item xs={12} md={4} lg={4}>
    <HomeCardBlue>
      <CardContent
        style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', textAlign: 'center' }} >
        <div>
              <Typography variant="h5" component="h2">
                WLRS-USDC.e LP
              </Typography>
              <TokenSymbol width={60} height={60} symbol="WLRS-USDC-LP" />
        </div>
        <div>
          <span style={{ fontSize: '20px' }}>
            {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} WLRS /{' '}
            {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'} USDC.e
          </span>
          <Box>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
          <span style={{ fontSize: '12px' }}>
            Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />
            Total supply: {tombLPStats?.totalSupply ? (Number(tombLPStats.totalSupply) < 1/10**4 ? (Number(tombLPStats.totalSupply) * 10**6).toFixed(4) + 'µ' : tombLPStats.totalSupply) : '-.--'} <br />
            APR: {tombStatsOnPool?.yearlyAPR ? tombStatsOnPool?.yearlyAPR : '----.--'}%
          </span>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          color="primary"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          component={Link}
          to={`/farms/WlrsUsdcLPWShareRewardPool/`}
        >
          Farm
        </Button>
        <Button
          color="primary"
          target="_blank"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          href="https://traderjoexyz.com/pool/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0x395908aeb53d33A9B8ac35e148E9805D34A555D3#/" >
          Add Liquidity
        </Button>
      </CardActions>
    </HomeCardBlue>
  </Grid>
<Grid item xs={12} md={4} lg={4}>
    <HomeCardPegasaurus>
      <CardContent mt={0}
        style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', textAlign: 'center', marginBottom: '10px' }} >
        <div style={{ width: '100%', marginBottom: '5%'}}>
            <Typography variant="h5" component="h2">
              XWLRS  
              
              </Typography>
            <TokenSymbol width={60} height={60} symbol="XWLRS" />
        </div>
        <div style={{ marginBottom: '10px', }}>
          <span style={{ fontSize: '18px'}}>Price of xWLRS: 
          </span>
          <Box>${xwlrsPriceInDollars ? xwlrsPriceInDollars : '-.--'}</Box>
          <span style={{ fontSize: '12px' }}>
            APR: {xBankStatsOnPool?.yearlyAPR ? xBankStatsOnPool?.yearlyAPR : '----.--'}%
          </span>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          color="primary"
          style={{ width: '150px', height: '45px', marginBottom: '2%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          component={Link}
          to={`/farms/XWLRSShareRewardPool/`}
        >
          Farm
        </Button>
        <Button
          color="primary"
          target="_blank"
          style={{ width: '150px', height: '45px', marginBottom: '2%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          href="https://xwlrs.frozenwalrus.finance/
          " >
          Mint xWLRS 
        </Button>
      </CardActions>
    </HomeCardPegasaurus>
  </Grid>

  <Grid item xs={12} md={4} lg={4}>
    <HomeCardPegasaurus>
      <CardContent
        style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', textAlign: 'center' }}
      >
        <div>
          <Typography variant="h5" component="h2" style={{ marginLeft:'-8px'}} >
            WSHARE-USDC.e LP, earning WLRS
          </Typography>
          <TokenSymbol width={60} height={60} symbol="WSHARE-USDC-LP" />
        </div>
        <div>
          <span style={{ fontSize: '19px',}}>
            {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} WSHARE /{' '}
            {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'} USDC.e
          </span>

          <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
          <span style={{ fontSize: '12px' }}>
            Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'} <br />
            Total supply: {tshareLPStats?.totalSupply ? (Number(tshareLPStats.totalSupply) < 1/10**4 ? (Number(tshareLPStats.totalSupply) * 10**6).toFixed(4) + 'µ' : tshareLPStats.totalSupply) : '-.--'} <br />
            APR: {newBankStatsOnPool?.yearlyAPR ? newBankStatsOnPool?.yearlyAPR : '----.--'}%
          </span>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          color="primary"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          component={Link}
          to={`/farms/WShareUSDCWLRSRewardPool/`}
        >
          Farm
        </Button>
        <Button
          color="primary"
          target="_blank"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          href="https://traderjoexyz.com/pool/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6#/"
        >
          Add Liquidity
        </Button>
      </CardActions>
    </HomeCardPegasaurus>
  </Grid>

  <Grid item xs={12} md={4} lg={4}>
    <HomeCardBlue>
      <CardContent
        style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', textAlign: 'center' }}
      >
        <div>
          <Typography variant="h5" component="h2" style={{ marginLeft:'-8px'}} >
            WSHARE-USDC.e LP
          </Typography>
          <TokenSymbol width={60} height={60} symbol="WSHARE-USDC-LP" />
        </div>
        <div>
          <span style={{ fontSize: '19px',}}>
            {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} WSHARE /{' '}
            {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'} USDC.e
          </span>

          <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
          <span style={{ fontSize: '12px' }}>
            Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'} <br />
            Total supply: {tshareLPStats?.totalSupply ? (Number(tshareLPStats.totalSupply) < 1/10**4 ? (Number(tshareLPStats.totalSupply) * 10**6).toFixed(4) + 'µ' : tshareLPStats.totalSupply) : '-.--'} <br />
            APR: {tShareStatsOnPool?.yearlyAPR ? tShareStatsOnPool?.yearlyAPR : '----.--'}%
          </span>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          color="primary"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          component={Link}
          to={`/farms/WShareUsdcLPWShareRewardPool/`}
        >
          Farm
        </Button>
        <Button
          color="primary"
          target="_blank"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          href="https://traderjoexyz.com/pool/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6#/"
        >
          Add Liquidity
        </Button>
      </CardActions>
    </HomeCardBlue>
  </Grid>

  <Grid item xs={12} md={4} lg={4}>
    <HomeCardPurple>
      <CardContent
        style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', textAlign: 'center' }}
      >
        <div>
          <Typography variant="h5" component="h2">
            NRWL-YUSD LP
          </Typography>
          <TokenSymbol width={60} height={60} symbol="NRWL-YUSD-LP" />
        </div>
        <div>
          <span style={{ fontSize: '20px' }}>
            {nrwlLpStats?.tokenAmount ? nrwlLpStats?.tokenAmount : '-.--'} NRWL /{' '}
            {nrwlLpStats?.ftmAmount ? nrwlLpStats?.ftmAmount : '-.--'} YUSD
          </span>

          <Box>${nrwlLpStats?.priceOfOne ? nrwlLpStats.priceOfOne : '-.--'}</Box>
          <span style={{ fontSize: '12px' }}>
            Liquidity: ${nrwlLpStats?.totalLiquidity ? nrwlLpStats.totalLiquidity : '-.--'} <br />
            Total supply:{' '}
            {nrwlLpStats?.totalSupply
              ? Number(nrwlLpStats.totalSupply) < 1 / 10 ** 4
                ? (Number(nrwlLpStats.totalSupply) * 10 ** 6).toFixed(4) + 'µ'
                : nrwlLpStats.totalSupply
              : '-.--'}{' '}
            <br />
            APR: {nrwlStatsOnPool?.yearlyAPR && nrwlStatsOnPool?.yearlyAPR !== 'Infinity' ? nrwlStatsOnPool?.yearlyAPR : '----.--'}%
          </span>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          color="primary"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          component={Link}
          to={`/farms/NrwlYusdLPWShareRewardPool/`}
        >
          Farm
        </Button>
        <Button
          color="primary"
          target="_blank"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          href="https://www.swapsicle.io/add/0x111111111111ed1D73f860F57b2798b683f2d325/0x501012893eE88976AB8B5289B7a78E307d5d9DCb"
        >
          Add Liquidity
        </Button>
      </CardActions>
    </HomeCardPurple>
  </Grid>

  

  <Grid item xs={12} md={4} lg={4}>
    <HomeCardPurple>
      <CardContent
        style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', textAlign: 'center' }}
      >
        <div>
          <Typography variant="h5" component="h2">
            WLRS-USDibs LP
          </Typography>
          <TokenSymbol width={60} height={60} symbol="WLRS-USDIBS-LP" />
        </div>
        <div>
          <span style={{ fontSize: '20px' }}>
            {tDibsLpStats?.tokenAmount ? tDibsLpStats?.tokenAmount : '-.--'} WLRS /{' '}
            {tDibsLpStats?.ftmAmount ? tDibsLpStats?.ftmAmount : '-.--'} USDibs
          </span>

          <Box>${tDibsLpStats?.priceOfOne ? tDibsLpStats.priceOfOne : '-.--'}</Box>
          <span style={{ fontSize: '12px' }}>
            Liquidity: ${tDibsLpStats?.totalLiquidity ? tDibsLpStats.totalLiquidity : '-.--'} <br />
            Total supply:{' '}
            {tDibsLpStats?.totalSupply
              ? Number(tDibsLpStats.totalSupply) < 1 / 10 ** 4
                ? (Number(tDibsLpStats.totalSupply) * 10 ** 6).toFixed(4) + 'µ'
                : tDibsLpStats.totalSupply
              : '-.--'}{' '}
            <br />
            APR: {tDibsStatsOnPool?.yearlyAPR && tDibsStatsOnPool?.yearlyAPR !== 'Infinity' ? tDibsStatsOnPool?.yearlyAPR : '----.--'}%
          </span>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          color="primary"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          component={Link}
          to={`/farms/WlrsUSDibsLPWShareRewardPool/`}
        >
          Farm
        </Button>
        <Button
          color="primary"
          target="_blank"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          href="https://traderjoexyz.com/pool/0x0efa5328fefce96c8d10661bd97403764d477853/0x395908aeb53d33a9b8ac35e148e9805d34a555d3#/"
        >
          Add Liquidity
        </Button>
      </CardActions>
    </HomeCardPurple>
  </Grid>
  
  <Grid item xs={12} md={4} lg={4}>
    <HomeCardPurple>
      <CardContent
        style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center',  minHeight: '18vh' }}>
        <div>
          <Typography variant="h5" component="h2">
            WBOND 
          </Typography>
        </div>
        <div>
          <TokenSymbol width={60} height={60} symbol="WBOND" />
        </div>
        <div>
          <span style={{ fontSize: '20px' }}>
          ${tBondPriceInDollars} WBOND
          </span>

          <Box></Box>
          <span style={{ fontSize: '12px' }}>
            Total supply:{' '}
            {tBondTotalSupply} 
            <br />
            APR: {tBondStatsonPool?.yearlyAPR && tBondStatsonPool?.yearlyAPR !== 'Infinity' ? tBondStatsonPool?.yearlyAPR : '----.--'}%
          </span>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          color="primary"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          component={Link}
          to={`/farms/WBondWShareRewardPool/`}
        >
          Farm
        </Button>
        <Button
          color="primary"
          target="_blank"
          style={{ width: '150px', height: '45px', marginBottom: '5%', padding: '5px', borderRadius: '10px', boxShadow: '4px 6px 12px black' }}
          variant="contained"
          href="https://app.frozenwalrus.finance/bonds"
        >
          Buy Bond 
        </Button>
      </CardActions>
    </HomeCardPurple>
  </Grid> 

            
  {/* <Grid item xs={12} sm={6}>
    <Card>
      <CardContent
        style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', textAlign: 'center' }}
      >
        <div>
          <Typography variant="h5" component="h2">
            WLRS-WSHARE-LP
          </Typography>
          <TokenSymbol symbol="WLRS-WSHARE-LP" size={60} />
        </div>
        <div>
          <span style={{ fontSize: '20px' }}>
            {snoSnoShareLPStats?.ftmAmount ? snoSnoShareLPStats?.ftmAmount : '-.--'} WLRS /{' '}
            {snoSnoShareLPStats?.tokenAmount ? snoSnoShareLPStats?.tokenAmount : '-.--'} WSHARE
          </span>
          <Box>${snoSnoShareLPStats?.priceOfOne ? snoSnoShareLPStats.priceOfOne : '-.--'}</Box>
          <span style={{ fontSize: '12px' }}>
            Liquidity: ${snoSnoShareLPStats?.totalLiquidity ? snoSnoShareLPStats.totalLiquidity : '-.--'}
            <br />
            Total supply: {snoSnoShareLPStats?.totalSupply ? snoSnoShareLPStats.totalSupply : '-.--'}
          </span>
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          color="primary"
          style={{ width: '150px', height: '45px', marginBottom: '5%' }}
          variant="contained"
          component={Link}
          to={`/farms/SnoSnoShareLPSnoShareRewardPool/`}
        >
          Farm
        </Button>
        <Button
          color="primary"
          target="_blank"
          style={{ width: '150px', height: '45px', marginBottom: '5%' }}
          variant="contained"
          href="https://traderjoexyz.com/pool/0x1fE4869f2C5181b9CD780a7E16194FA2c4C4293D/0xe7A102Fbc8AB3581d62830DdB599eCCaae5e7875"
        >
          Add Liquidity
        </Button>
      </CardActions>
    </Card>
  </Grid>
  */}
</Grid>
  );
};

export default CemeteryCard;
