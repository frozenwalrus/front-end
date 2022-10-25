import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, Typography, Grid} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import TokenSymbol from '../../components/TokenSymbol';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';
import styled from 'styled-components';

const HomeCardPurple = styled.div`
  background: rgba(214, 211, 242, 0.9);
  border-radius: 50px;
  box-shadow: 6px 6px 12px black; 
  padding: 20px; 
  color: #4b4453;
`;

const PegLPCard = ({}) => {
    const tombBank = useBank('LPNrwlNode');
    const statsOnPool = useStatsForPool(tombBank);
  return (
    <Grid item xs={12} sm={5}>
      <HomeCardPurple>
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
              <TokenSymbol width={55} height={55} symbol={'NRWL-YUSD-LP'} />
            </Box>
            <Typography variant="h6" component="h2" style={{ color: '#2c2560' }}>
            NRWL-YUSD LP Node
            </Typography>
            <Typography style= {{color: '#2c2560', margin:'2%' }}>
              Lock NRWL-YUSD to earn daily yields<br></br>
              <div style={{ marginTop: '1%' }}><b>Daily APR:</b> {statsOnPool?.dailyAPR}%<br></br></div>
              <b>Yearly APR:</b> {statsOnPool?.yearlyAPR}%
            </Typography>
          </Box>
        </CardContent>
        <CardActions style={{justifyContent: 'flex-end'}}>
          <Button className="shinyButtonSecondary" style={{background: '#5686d6', borderRadius: '15px', boxShadow: '4px 6px 12px black'}} component={Link} to={'/nodes/LPNrwlNode'}>
            Stake
          </Button>
        </CardActions>
      </HomeCardPurple>
    </Grid>
  );
};

export default PegLPCard;