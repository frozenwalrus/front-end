import React, { useState, useContext, useMemo } from 'react';
import {useParams} from 'react-router-dom';
import { useWallet } from 'use-wallet';
import PageHeader from '../../components/PageHeader';
import { Box, Button, Card, CardContent, Typography, Grid, MenuItem, Select, withStyles } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useNodeText from '../../hooks/useNodeText';
import useBank from '../../hooks/useBank';
import useNodes from '../../hooks/useNodes';
import useStatsForPool from '../../hooks/useStatsForPool';
import {Context} from '../../contexts/TombFinanceProvider';
import useGrapeStats from '../../hooks/useTombStats';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import totalNodes from '../../hooks/useTotalNodes';
import useNodePrice from '../../hooks/useNodePrice';
import {getDisplayBalance} from '../../utils/formatBalance';
import useMaxPayout from '../../hooks/useMaxPayout';
import useUserDetails from '../../hooks/useUserDetails';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const SnowyNode = () => {
  const { bankId } = useParams();

  const bank = useBank(bankId);
  const { getNodeText } = useNodeText();
  const { account } = useWallet();
  
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);

  const classes = useStyles();
  const [poolId, setPoolId] = useState(0);
  const LOCK_ID = 'LOCK_ID';
  const statsOnPool = useStatsForPool(bank);
  const {grapeFinance} = useContext(Context);
  const nodes = useNodes(bank?.contract, bank?.sectionInUI, account);
  const nodePrice = useNodePrice(bank.contract, bank.poolId, bank.sectionInUI);
  const max = useMaxPayout(bank?.contract, bank?.sectionInUI, account);
  const userDetails = useUserDetails(bank?.contract, bank?.sectionInUI, account);
  const total = totalNodes(bank?.contract, bank?.sectionInUI);
  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );

  const dec = bank.depositTokenName === 'NRWL-YUSD-LP'? 18:12;

  return bank
  ? (
      <>
        <PageHeader icon="🏦" title={'PURCHASE NODES TO GENERATE YIELD'}/>
        {/* <Button onClick={setTierValues}>Set Tier Values</Button> */}
       {/* <Alert variant="filled" severity="info">/*
        Please read our Node Documentation to understand how to best use your rewards from nodes to perpetuate a healthy ecosystem and ensure long lasting high paying rewards!
        </Alert>*/}
        <Box>
          <Grid container justify="center" spacing={3} style={{marginBottom: '50px'}}>
            <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
         
                <Card className={classes.gridItem} style={{background: '#161414', borderRadius: '15px', height: '100px' }}>
                  <CardContent style={{ textAlign: 'center',color: '#5686d6'}}>
                    <Typography style={{color: '#5686d6', fontWeight: 'bold'}}>Your Nodes | TVL</Typography>
                    <Typography>
                      {
                        nodes[0] &&
                        <>
                          <b style={{ color: '#fff', marginRight: '0px' }}>
                            {nodes[0].toString()}
                          </b> |  <b style={{ color: '#fff', marginRight: '0px' }}>
                             ${(nodes[0] * (tokenPriceInDollars*getDisplayBalance(nodePrice, dec, 1))).toFixed(0)}
                          </b>
                         
                        </>
                      }
                    </Typography>
                  </CardContent>
                </Card>
           
            </Grid>
            <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
              <Card className={classes.gridItem} style={{background: '#161414', borderRadius: '15px', height: '100px' }}>
                <CardContent style={{textAlign: 'center'}}>
                  <Typography style={{color: '#5686d6'}}>Amount Claimed</Typography>
                  <Typography>{bank.depositTokenName === 'GRAPE-WLRS-LP' || bank.depositTokenName === 'NRWL-YUSD-LP' ? (Number(userDetails.total_claims)/1e18).toFixed(3) : (Number(userDetails.total_claims)/1e18).toFixed(10)} </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
              <Card className={classes.gridItem} style={{background: '#161414', borderRadius: '15px', height: '100px' }}>
                <CardContent style={{textAlign: 'center'}}>
                  <Typography style={{color: '#5686d6'}}>Max Possible Pay</Typography>
                  <Typography>{Number(max)/1e18} </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
              <Card className={classes.gridItem} style={{background: '#161414', borderRadius: '15px', height: '100px' }}>
                <CardContent style={{textAlign: 'center'}}>
                  <Typography style={{color: '#5686d6'}}>APR | Daily</Typography>
                  <Typography>{bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}% | {bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
              <Card className={classes.gridItem} style={{background: '#161414', borderRadius: '15px', height: '100px' }}>
                <CardContent style={{textAlign: 'center'}}>
                  <Typography style={{color: '#5686d6'}}>Total Nodes</Typography>
                  <Typography>{Number(total[0])}</Typography>
                </CardContent>
              </Card>
            </Grid>
          
            <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
              <Card className={classes.gridItem} style={{background: '#161414', borderRadius: '15px', height: '100px' }}>
                <CardContent style={{textAlign: 'center'}}>
                  <Typography style={{color: '#5686d6'}}>TVL</Typography>
                  <Typography>${statsOnPool?.TVL ? (Number((Number(statsOnPool?.TVL).toFixed(0)))).toLocaleString('en-US') : '-.--'}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
              <StyledBoardroom>
                <StyledCardsWrapper>
                  <StyledCardWrapper>
                  <Harvest bank={bank} />
                  </StyledCardWrapper>
                  <Spacer />
                  <StyledCardWrapper>
                  {<Stake bank={bank} />}
                  </StyledCardWrapper>
                </StyledCardsWrapper>
                {bank.depositTokenName === 'GRAPE-WLRS-LP' ?
                <Card style={{borderRadius: '15px', marginTop: '20px'}}>
                  <CardContent style={{background: 'linear-gradient(90deg, #8fbdeb 14%, #a2c8ee 100%)', borderRadius: '15px'}}>
                    <StyledLink href={'https://traderjoexyz.com/pool/0x395908aeb53d33a9b8ac35e148e9805d34a555d3/0x5541d83efad1f281571b343977648b75d95cdac2'} rel="noopener noreferrer" target="_blank">
                      <span style={{color: '#fff'}}>
                        Provide liquidity for GRAPE-WLRS on Joe
                      </span>     
                    </StyledLink>
                  </CardContent>
                </Card> 
                 : null }
              </StyledBoardroom>
              
            </Box>
       
      </>
    )
  : <BankNotFound/>
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader icon="🏚" title="Not Found" subtitle="You've hit a bank just robbed by unicorns." />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;


const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledOutline = styled.div`
  background: #1d48b6;
  background-size: 300% 300%;
  border-radius: 0px;
  filter: blur(8px);
  position: absolute;
  top: -6px;
  right: -6px;
  bottom: -6px;
  left: -6px;
  z-index: -1;
`;

const StyledOutlineWrapper = styled.div`    
    position: relative;
    background: #08090d;
    border-radius: 0px;
    box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)
`;

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledMenuItem = withStyles({
  root: {
    backgroundColor: 'white',
    color: '#2c2560',
    '&:hover': {
      backgroundColor: 'grey',
      color: '#2c2560',
    },
    selected: {
      backgroundColor: 'black',
    },
  },
})(MenuItem);

export default SnowyNode;