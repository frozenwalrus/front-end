import React, {useMemo} from 'react';
import styled from 'styled-components';

import {Button, Card, CardContent, Typography} from '@material-ui/core';
// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';
import useCompound from '../../../hooks/useCompound';
import {getDisplayBalance} from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';
import {Bank} from '../../../tomb-finance';
import useGrapeStats from '../../../hooks/useTombStats';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useNodePrice from '../../../hooks/useNodePrice';

const Harvest = ({bank}) => {
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
  const grapeStats = useGrapeStats();
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
  const nodePrice = useNodePrice(bank.contract, bank.poolId, bank.sectionInUI);
  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );
  const dec = bank.depositTokenName === 'NRWL-YUSD-LP'? 1e24:1e18;
  const earnedInDollars = (Number(tokenPriceInDollars*1e6) * Number(earnings)).toFixed(2);
  const { onReward } = useHarvest(bank);
  const { onCompound } = useCompound(bank);
  return (
    <Card style={{borderRadius: '15px'}}>
      <CardContent style={{background: 'linear-gradient(90deg, #8fbdeb 14%, #a2c8ee 100%)', borderRadius: '15px'}}>
        <StyledCardContentInner >
          <StyledCardHeader>
            <CardIcon>
           <TokenSymbol symbol={bank.depositTokenName} />
           
            </CardIcon>
            <Typography style={{textTransform: 'uppercase', color: '#fff'}}>
              <Value value={bank.depositTokenName === 'GRAPE-WLRS-LP' || bank.depositTokenName === 'NRWL-YUSD-LP' ? (Number(earnings)/1e18).toFixed(4) : (Number(earnings)/1e18).toFixed(10)} />
            </Typography>
            <Label text={`≈ $${(earnedInDollars/dec).toFixed(2)}`} />
            <Typography style={{textTransform: 'uppercase', color: '#fff'}}>{`Earned`}</Typography>
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              onClick={onReward}
              disabled={earnings.eq(0)}          
              style={{background: '#5686d6', borderRadius: '15px'}}
            >
              Claim
            </Button>
            </StyledCardActions>
          <Button
              onClick={onCompound}
              disabled={Number(earnings) < Number(nodePrice)}
              style={{background: '#5686d6', borderRadius: '15px', marginTop: '10px'}}
            
            >
              Compound {(Number(earnings)/Number(nodePrice))|0} Nodes
          </Button>
          
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;