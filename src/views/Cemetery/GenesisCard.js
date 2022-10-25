import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import Card from '../../components/Card';

import TokenSymbol from '../../components/TokenSymbol';

const GenesisCard = () => {
  return (
    <Grid container spacing={3}>
     {/* <Grid item xs={12} sm={3}>
        <Card>
          <CardContent align="center">
            <Typography variant="h5" component="h2">
            SNO
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="SNO" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              size="small"
              style={{ width: '200px', height: '40px', marginBottom: '10%' }}
              variant="contained"
              component={Link}
              to={`/farms/WlrsSnoGenesisRewardPool/`}
            >
              Stake
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent align="center">
            <Typography variant="h5" component="h2">
            FOX
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="FOX" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              size="small"
              style={{ width: '200px', height: '40px', marginBottom: '10%' }}
              variant="contained"
              component={Link}
              to={`/farms/WlrsFoxGenesisRewardPool/`}
            >
              Stake
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent align="center">
            <Typography variant="h5" component="h2">
              SNOBOND
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="SNOBOND" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              size="small"
              style={{ width: '200px', height: '40px', marginBottom: '10%' }}
              variant="contained"
              component={Link}
              to={`/farms/WlrsSnobondGenesisRewardPool/`}
            >
              Stake
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent align="center">
            <Typography variant="h5" component="h2">
            DIBS
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="DIBS" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              size="small"
              style={{ width: '200px', height: '40px', marginBottom: '10%' }}
              variant="contained"
              component={Link}
              to={`/farms/WlrsDibsGenesisRewardPool/`}
            >
              Stake
            </Button>
          </CardActions>
        </Card>
  </Grid>*/}
      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent align="center">
            <Typography variant="h5" component="h2">
              wAVAX
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="WAVAX" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              size="small"
              style={{ width: '200px', height: '40px', marginBottom: '10%' }}
              variant="contained"
              component={Link}
              to={`/farms/WlrsAvaxGenesisRewardPool/`}
            >
              Stake
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent align="center">
            <Typography variant="h5" component="h2">
            USDC.e
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="USDC" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              size="small"
              style={{ width: '200px', height: '40px', marginBottom: '10%' }}
              variant="contained"
              component={Link}
              to={`/farms/WlrsUsdcGenesisRewardPool/`}
            >
              Stake
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card>
          <CardContent align="center">
            <Typography variant="h5" component="h2">
            GRAPE
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="GRAPE" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              size="small"
              style={{ width: '200px', height: '40px', marginBottom: '10%' }}
              variant="contained"
              component={Link}
              to={`/farms/WlrsGrapeGenesisRewardPool/`}
            >
              Stake
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        {/*<Card>
          <CardContent align="center">
            <Typography variant="h5" component="h2">
              USDT.e
            </Typography>
            <Box mt={2}>
              <TokenSymbol symbol="USDT" />
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              color="primary"
              size="small"
              style={{ width: '200px', height: '40px', marginBottom: '10%' }}
              variant="contained"
              component={Link}
              to={`/farms/WlrsUsdtGenesisRewardPool/`}
            >
              Stake
            </Button>
          </CardActions>
</Card>*/}
</Grid>
    </Grid>
  );
};

export default GenesisCard;
