import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import Card from '../../components/Card';
import styled from 'styled-components';
import TokenSymbol from '../../components/TokenSymbol';

const HomeCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50px;
  padding: 20px; 
  color: #4b4453;
  box-shadow: 6px 6px 12px black; 
`;

const NrwlGenesisCard = () => {
  return (
    <Grid container spacing={3} style={{marginTop: '20px', justifyContent:'center'}}>
      <Grid item xs={12} sm={5}>
        <HomeCard>
          <CardContent align="center">
            <Typography variant="h5" component="h2">
              NRWL-YUSD-LP
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="NRWL-YUSD-LP" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              style={{ width: '150px', height: '40px', marginBottom: '5%', padding: '5px', borderRadius: '10px', textAlign: 'center'}}
              variant="contained"
              component={Link}
              to={`/farms/NrwlYusdGenesisNrwlRewardPool/`}
            >
              Stake
            </Button>
            <Button
              color="primary"
              target="_blank"
              style={{ width: '150px', height: '40px', marginBottom: '5%', padding: '5px', borderRadius: '10px', textAlign: 'center', }}
              variant="contained"
              href="https://www.swapsicle.io/add/0x111111111111ed1D73f860F57b2798b683f2d325/0x501012893eE88976AB8B5289B7a78E307d5d9DCb"
            >
              Add Liquidity 
            </Button>
          </CardActions>
        </HomeCard>
      </Grid>
      <Grid item xs={12} sm={5}>
        <HomeCard>
          <CardContent align="center">
            <Typography variant="h5" component="h2">
              WLRS-USDC.e LP
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="WLRS-USDC-LP" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              style={{ width: '150px', height: '40px', marginBottom: '5%', padding: '5px', borderRadius: '10px', textAlign: 'center'}}
              variant="contained"
              component={Link}
              to={`/farms/WlrsUsdcGenesisNrwlRewardPool/`}
            >
              Stake 
            </Button>
            <Button
              color="primary"
              target="_blank"
              style={{ width: '150px', height: '40px', marginBottom: '5%', padding: '5px', borderRadius: '10px', textAlign: 'center'}}
              variant="contained"
              href="https://traderjoexyz.com/pool/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0x395908aeb53d33A9B8ac35e148E9805D34A555D3#/"
            >
              Add Liquidity 
            </Button>
          </CardActions>
        </HomeCard>
      </Grid>
     
      <Grid item xs={12} sm={5}>
        <HomeCard >
          <CardContent align="center">
            <Typography variant="h5" component="h2" style={{ fontSize: '20px'}}>
              WSHARE-USDC.e LP
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="WSHARE-USDC-LP" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              style={{ width: '150px', height: '40px', marginBottom: '5%', padding: '5px', borderRadius: '10px', textAlign: 'center'}}
              variant="contained"
              component={Link}
              to={`/farms/WshareUsdcGenesisNrwlRewardPool/`}
            >
              Stake
              </Button>
              <Button
              color="primary"
              target="_blank"
              style={{ width: '150px', height: '40px', marginBottom: '5%', padding: '5px', borderRadius: '10px', textAlign: 'center'}}
              variant="contained"
              href="https://traderjoexyz.com/pool/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6#/"
            >
              Add Liquidity
            </Button>
          </CardActions>
        </HomeCard>
      </Grid>
      <Grid item xs={12} sm={5}>
        <HomeCard>
          <CardContent align="center">
            <Typography variant="h5" component="h2">
              WSHARE
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="WSHARE" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              style={{ width: '150px', height: '40px', marginBottom: '5%', padding: '5px', borderRadius: '10px', textAlign: 'center'}}
              variant="contained"
              component={Link}
              to={`/farms/WshareGenesisNrwlRewardPool/`}
            >
              Stake
            </Button>
            <Button
              color="primary"
              target="_blank"
              style={{ width: '150px', height: '40px', marginBottom: '5%', padding: '5px', borderRadius: '10px', textAlign: 'center'}}
              variant="contained"
              href="https://traderjoexyz.com/trade?inputCurrency=0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664&outputCurrency=0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6#/"
            >
              Buy WSHARE
            </Button>
          </CardActions>
        </HomeCard>
      </Grid>

    </Grid>
  );
};

export default NrwlGenesisCard;
