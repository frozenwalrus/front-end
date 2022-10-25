import React from 'react';
import { Box, Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import useModal from '../../../hooks/useModal';
import DepositModal from '../../Bank/components/DepositModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import usePegPoolDeposit from '../../../hooks/usePegPoolDeposit';
import { PegPool, PegPoolToken } from '../../../tomb-finance/types';
import { ApprovalState } from '../../../hooks/useApprove';
import PegPoolRewards from './PegPoolRewards';
import usePegPoolApprove from '../../../hooks/usePegPoolApproval';
import TokenSymbol from '../../../components/TokenSymbol';
import usePegPoolWithdrawFee from '../../../hooks/usePegPoolWithdrawFee';
import { Skeleton } from '@material-ui/lab';
import usePegPoolWithdraw from '../../../hooks/usePegPoolWithdraw';
import WithdrawModal from '../../Bank/components/WithdrawModal';
import { useMediaQuery } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { formatEther } from 'ethers/lib/utils';


const HomeCardBlue = styled.div`
  background: rgba(217, 238, 254, 0.95);
  border-radius: 50px;
  box-shadow: 6px 6px 12px black; 
  padding: 20px; 
  color: #4b4453;
   
`;
const PegPoolInfo: React.FC<{
  pegPool: PegPool;
  rewardTokens: PegPoolToken[];
  totalRewardValue: string;
  apr: { daily: string; yearly: string };
}> = ({ pegPool, rewardTokens, totalRewardValue, apr }) => {
  const tokenBalance = useTokenBalance(pegPool.depositToken);
  console.log(pegPool.depositToken)
  const { onDeposit } = usePegPoolDeposit(pegPool);
  const { onWithdraw } = usePegPoolWithdraw(pegPool);
  const [approveStatus, approve] = usePegPoolApprove(pegPool);
  const { withdrawFeePercent } = usePegPoolWithdrawFee();
 // console.log(pegPool.depositToken)
 console.log(withdrawFeePercent)
  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={pegPool.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onDeposit(amount);
        onDismissDeposit();
      }}
      tokenName={pegPool.depositTokenName}
    />,
  );
  
  const useStyles = makeStyles((theme) => ({
    tokenButton: {
        fontSize: '1.0rem',
        padding: '6px', 
        borderRadius: '12px !important', 
        backgroundColor: '#4b4453'
      },
  }));

 const classes = useStyles(); 


  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={pegPool.userInfo.amountDepositedBN}
      decimals={pegPool.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={pegPool.depositTokenName}
    />,
  );

  return (
    <Grid container spacing={3} style={{ justifyContent: 'center', alignItems: 'center',  }}>
      <Grid item xs={12} sm={6} lg={4}>
        <HomeCardBlue >
          <CardContent>
          <h2 style={{textAlign: 'center', marginBottom: '8%' }}> DEPOSITS CLOSED </h2>

          <Grid container style={{ marginTop: '10px',  justifyContent:'center', alignItems: 'center', }}>
                <div  style={{ justifyContent: 'center', alignItems:'center'}}>
                      <TokenSymbol width={72} height={72} symbol={'USDC'} />
                </div>     

              <Grid item xs={12} style={{ marginTop: '10px'}}>
                  <h2 style={{ textAlign: 'center', fontSize: '1.1rem' }}> All deposits have been 
                  airdropped to investors in form of USDC.e and WLRS </h2>
                  {/* <h2 style={{ textAlign: 'center' }} > 
                      {pegPool.userInfo?.amountDeposited}</h2> */}
              </Grid>
          </Grid>
              
          <Grid container  style={{ marginTop: '20px', justifyContent:'center', alignItems: 'center' }}>
                {/* {approveStatus != ApprovalState.APPROVED ? (
                  <Button
                    className={classes.tokenButton}                    
                    disabled={!pegPool.depositsEnabled}
                    onClick={approve}
                    fullWidth={true}
                  >
                    Approve
                  </Button>
                ) : (
                  <Button
                    className={classes.tokenButton}
                     
                   disabled
                    onClick={onPresentDeposit}
                    fullWidth={true}
                  >
                    {pegPool.depositsEnabled ? 'Deposit' : 'Above Peg'}
                  </Button>
                )} */}
              </Grid>

              <Grid container style={{ marginTop: '20px', justifyContent:'center'  }}>
                {/* <h2 style={{ fontSize:'14px'}}> */}
                  {/* Current TWAP withdraw fee ={' 12% '} */}
            {/*      {withdrawFeePercent || withdrawFeePercent == 0 ? withdrawFeePercent : <Skeleton />}% */}
                {/* </h2> */}

                {/* <Button
                  className={pegPool.userInfo?.isDeposited ? 'classes.tokenButton' : 'shinyButtonDisabled'}
                  fullWidth={true}
                  
                  disabled
                  onClick={onPresentWithdraw}
                >
                  Withdraw
                </Button> */}
                {/* <h2 style={{ fontSize:'14px', textAlign: 'center', marginTop: '10%'}}>
                  You will receive WLRS-USDC.e LP tokens when you withdraw
                </h2> */}
              </Grid>
          </CardContent>
        </HomeCardBlue>
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        {rewardTokens && <PegPoolRewards rewardTokens={rewardTokens} totalRewardValue={totalRewardValue} apr={apr} />}
      </Grid>
    </Grid>
  );
};

export default PegPoolInfo;
