import React from 'react';
import { Box, Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import useModal from '../../../hooks/useModal';
import DepositModal from '../../Bank/components/DepositModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { Pegasaurus, PegasaurusToken } from '../../../tomb-finance/types';
import { ApprovalState } from '../../../hooks/useApprove';
import TokenSymbol from '../../../components/TokenSymbol';
import { Skeleton } from '@material-ui/lab';
import WithdrawModal from '../../Bank/components/WithdrawModal';
import { useMediaQuery } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { formatEther } from 'ethers/lib/utils';

import PegasaurusRewards from './PegasaurusRewards'; 
import usePegasaurusDeposit from '../../../hooks/Pegasaurus/usePegasaurusDeposit';
import usePegasaurusApprove from '../../../hooks/Pegasaurus/usePegasaurusApproval';
import usePegasaurusWithdrawFee from '../../../hooks/Pegasaurus/usePegasaurusWithdrawFee'; 
import usePegasaurusWithdraw from '../../../hooks/Pegasaurus/usePegasaurusWithdraw'; 

const HomeCardBlue = styled.div`
  background: rgba(217, 238, 254, 0.95);
  border-radius: 50px;
  box-shadow: 6px 6px 12px black; 
  padding: 20px; 
  color: #4b4453;
`;
const PegasaurusInfo: React.FC<{
  Pegasaurus: Pegasaurus;
  rewardTokens: PegasaurusToken[];
  totalRewardValue: string;
  apr: { daily: string; yearly: string };

}> = ({ Pegasaurus, rewardTokens, totalRewardValue, apr }) => {
  const tokenBalance  = useTokenBalance(Pegasaurus.depositToken);
  console.log(Pegasaurus.depositToken)
  const { onDeposit } = usePegasaurusDeposit(Pegasaurus);
  const { onWithdraw } = usePegasaurusWithdraw(Pegasaurus);
  const [approveStatus, approve] = usePegasaurusApprove(Pegasaurus);
  const { withdrawFeePercent } = usePegasaurusWithdrawFee();
  // console.log(Pegasaurus.withdrawFeePercent)
  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={Pegasaurus.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onDeposit(amount);
        onDismissDeposit();
      }}
      tokenName={Pegasaurus.depositTokenName}
    />,
  );
  console.log(Pegasaurus.depositTokenName)
  console.log(Pegasaurus.depositToken.decimal)

  
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
      max={Pegasaurus.userInfo.amountDepositedBN}
      decimals={Pegasaurus.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={Pegasaurus.depositTokenName}
    />,
  );

  return (
    <Grid container spacing={3} style={{ justifyContent: 'center', alignItems: 'center',  }}>
      <Grid item xs={12} sm={6} lg={4}>
        <HomeCardBlue >
          <CardContent>
            <h2 style={{textAlign: 'center', marginBottom: '8%' }}> DEPOSIT WLRS-USDC-LP </h2>
            
              <Grid container style={{ marginTop: '10px',  justifyContent:'center', alignItems: 'center', }}>
                <div  style={{ justifyContent: 'center', alignItems:'center'}}>
                      <TokenSymbol width={72} height={72} symbol={'WLRS-USDC-LP'} /> <br />
                     
                </div>
               
                  <Grid item xs={12} style={{ marginTop: '10px'}}>
                    <h2 style={{ textAlign: 'center', }}> Your Deposits:</h2>
                    <h2 style={{ textAlign: 'center' }} > 
                      {(Number(Pegasaurus.userInfo?.amountDeposited) * 10**6).toFixed(2)  + 'µ'} WLRS-USDC-LP
                    </h2>
                  </Grid>
              </Grid>
              <Grid container  style={{ marginTop: '20px', justifyContent:'center', alignItems: 'center' }}>
                {approveStatus != ApprovalState.APPROVED ? (
                 
                  <Button
                  className={classes.tokenButton}                   
                    disabled
                   // disabled={!Pegasaurus.depositsEnabled}
                    onClick={approve}
                    fullWidth={true} >
                    Approve
                  </Button>
                ) : (
                  <Button
                    className={classes.tokenButton}
                     
                   disabled={!Pegasaurus.depositsEnabled}
                    onClick={onPresentDeposit}
                    fullWidth={true}
                  >
                    {Pegasaurus.depositsEnabled ? 'Deposit' : 'Above Peg'}
                  </Button>
                )}
              </Grid>

              <Grid container style={{ marginTop: '20px', justifyContent:'center'  }}>
                <h2 style={{ fontSize:'14px'}}>
                  Current TWAP withdraw fee ={' '}
                  {withdrawFeePercent || withdrawFeePercent == 0 ? withdrawFeePercent : <Skeleton />}%
                </h2>

                <Button
                  className={Pegasaurus.userInfo?.isDeposited ? 'classes.tokenButton' : 'shinyButtonDisabled'}
                  fullWidth={true}
                  disabled={!Pegasaurus.userInfo?.isDeposited}
                  onClick={onPresentWithdraw}
                >
                  Withdraw
                </Button>
                <h2 style={{ fontSize:'14px', textAlign: 'center', marginTop: '10%'}}>
                  You will receive WLRS-USDC.e LP tokens when you withdraw
                </h2>
              </Grid>
            
          </CardContent>
        </HomeCardBlue>
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        {rewardTokens && <PegasaurusRewards rewardTokens={rewardTokens} totalRewardValue={totalRewardValue} apr={apr} />}
      </Grid>
    </Grid>
  );
};

export default PegasaurusInfo;
