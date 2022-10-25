import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, Typography, Grid} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import TokenSymbol from '../../components/TokenSymbol';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';
import styled from 'styled-components';

const HomeCardBlue = styled.div`
  background: rgba(217, 238, 254, 0.95);
  border-radius: 50px;
  box-shadow: 6px 6px 12px black; 
  padding: 20px; 
  color: #4b4453;
   
`;
const PegLPCard = ({}) => {
    const tombBank = useBank('PegLPNode');
    const statsOnPool = useStatsForPool(tombBank);
  return (
    <Grid item xs={12} sm={5}>
      <HomeCardBlue>
        <CardContent>
          <Box style={{position: 'relative'}}>
            <Box
              style={{
                position: 'absolute',
                right: '-20px',
                top: '-30px',
                
                borderRadius: '40px',
                padding: '20px', 
                
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TokenSymbol width={55} height={55} symbol={'WLRS-USDC-LP'} />
            </Box>
            <Typography variant="h6" component="h2" style={{ color: '#2c2560' }}>
            WLRS-USDC.e LP Node
            </Typography>
            <Typography style= {{color: '#2c2560', margin:'2%' }}>
              Lock WLRS-USDC to earn daily yields<br></br>
              <div style={{ marginTop: '1%' }}><b>Daily APR:</b> {statsOnPool?.dailyAPR}%</div>
              <b>Yearly APR:</b> {statsOnPool?.yearlyAPR}%
            </Typography>
          </Box>
        </CardContent>
        <CardActions style={{justifyContent: 'flex-end'}}>
          <Button className="shinyButtonSecondary" style={{background: '#5686d6', padding: '5px', borderRadius: '15px', boxShadow: '4px 6px 12px black'}} component={Link} to={'/nodes/PegLPNode'}>
            Stake
          </Button>
        </CardActions>
      </HomeCardBlue>
    </Grid>
  );
};

export default PegLPCard;