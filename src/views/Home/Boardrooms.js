import React, { useMemo, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import BoardroomCard from './BaordroomCard';

import useCurrentEpochNrwl from '../../hooks/useCurrentEpochNrwl';
import useFetchMasonryAPRNrwl from '../../hooks/useFetchMasonryAPRNrwl';
import useCashPriceInEstimatedTWAPNrwl from '../../hooks/useCashPriceInEstimatedTWAPNrwl';
import useTreasuryAllocationTimesNrwl from '../../hooks/useTreasuryAllocationTimesNrwl';
import useTotalStakedOnMasonryNrwl from '../../hooks/useTotalStakedOnMasonryNrwl';

import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchMasonryAPR from '../../hooks/useFetchMasonryAPR';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnMasonry from '../../hooks/useTotalStakedOnMasonry';
import useGetNrwlBoardroomPrintRate from '../../hooks/useGetNrwlBoardroomPrintRate';
import useGetBoardroomPrintRate from '../../hooks/useGetBoardroomPrintRate';
import useStakedBalanceOnMasonry from '../../hooks/useStakedBalanceOnMasonry';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useStakedBalanceOnMasonryNrwl from '../../hooks/useStakedBalanceOnMasonryNrwl';
import useTombFinance from '../../hooks/useTombFinance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTokenBalance from '../../hooks/useTokenBalance';
import useApprove from '../../hooks/useApprove';
import useStakeToMasonry from '../../hooks/useStakeToMasonry';
import useWithdrawFromMasonry from '../../hooks/useWithdrawFromMasonry';
import useWithdrawCheckWlrs from '../../hooks/masonry/useWithdrawCheck';
import useStakeToMasonrNrwl from '../../hooks/useStakeToMasonrNrwl';
import useWithdrawFromMasonryNrwl from '../../hooks/useWithdrawFromMasonryNrwl';
import useWithdrawCheckNrwl from '../../hooks/masonryNrwl/useWithdrawCheck';
import useRedeemOnMasonry from '../../hooks/useRedeemOnMasonry';
import useHarvestFromMasonry from '../../hooks/useHarvestFromMasonry';
import useEarningsOnMasonry from '../../hooks/useEarningsOnMasonry';
import useEarningsOnMasonryNrwl from '../../hooks/useEarningsOnMasonryNrwl';
import useRedeemOnMasonryNrwl from '../../hooks/useRedeemOnMasonryNrwl';
import useHarvestFromMasonryNrwl from '../../hooks/useHarvestFromMasonryNrwl';
import useClaimRewardTimerMasonry from '../../hooks/masonry/useClaimRewardTimerMasonry';
import useUnstakeTimerMasonry from '../../hooks/masonry/useUnstakeTimerMasonry';
import useClaimRewardCheck from '../../hooks/masonry/useClaimRewardCheck';
import useClaimRewardCheckNrwl from '../../hooks/masonryNrwl/useClaimRewardCheck';

const Boardrooms = () => {
  const tombFinance = useTombFinance();
  const wsharePrice = useStakedTokenPriceInDollars('WSHARE', tombFinance.TSHARE);
  const wlrsPrice = useStakedTokenPriceInDollars('WLRS', tombFinance.FTM);
  const nrwlPrice = useStakedTokenPriceInDollars('NRWL', tombFinance.NRWL);
  const wshareBalance = useTokenBalance(tombFinance.TSHARE);

  // WLRS
  const wlrsCurrentEpoch = useCurrentEpoch();
  const wlrsBRStat = useCashPriceInEstimatedTWAP();
  const wlrsTotalStaked = useTotalStakedOnMasonry();
  const wlrsAPR = useFetchMasonryAPR();
  const wlrsTwap = useMemo(() => (wlrsBRStat ? Number(wlrsBRStat.priceInDollars).toFixed(4) : null), [wlrsBRStat]);
  const wlrsNextEpochTimer = useTreasuryAllocationTimes();
  const wlrsNextEpochDate = useMemo(() => (wlrsNextEpochTimer ? wlrsNextEpochTimer.to : null), [wlrsNextEpochTimer]);
  const wlrsAbovePeg = useGetBoardroomPrintRate();
  const wlrsStakedBalance = useStakedBalanceOnMasonry();
  const wlrsTokenPriceInDollars = useMemo(
    () =>
      wsharePrice ? (Number(wsharePrice) * Number(getDisplayBalance(wlrsStakedBalance))).toFixed(2).toString() : null,
    [wsharePrice, wlrsStakedBalance],
  );
  const [wlrsApproveStatus, wlrsApprove] = useApprove(tombFinance.TSHARE, tombFinance.contracts.Masonry.address);
  const wlrsOnStake = useStakeToMasonry();
  const wlrsOnWithdraw = useWithdrawFromMasonry();
  const wlrsCanWithdrawFromMasonry = useWithdrawCheckWlrs();
  const wlrsCanClaimReward = useClaimRewardCheck();

  const wlrsEarnings = useEarningsOnMasonry();
  const wlrsOnRedeem = useRedeemOnMasonry();
  const wlrsOnClaim = useHarvestFromMasonry();
  const wlrsClaimTimers = useClaimRewardTimerMasonry();
  const wlrsClaimTimerTo = useMemo(() => (wlrsClaimTimers ? wlrsClaimTimers.to : null), [wlrsClaimTimers]);
  const wlrsClaimTimerFrom = useMemo(() => (wlrsClaimTimers ? wlrsClaimTimers.from : null), [wlrsClaimTimers]);

  const wlrsWithdrawTimers = useUnstakeTimerMasonry();
  const wlrsWithdrawTimerTo = useMemo(() => (wlrsWithdrawTimers ? wlrsWithdrawTimers.to : null), [wlrsWithdrawTimers]);
  const wlrsWithdrawTimerFrom = useMemo(
    () => (wlrsWithdrawTimers ? wlrsWithdrawTimers.from : null),
    [wlrsWithdrawTimers],
  );

  // NRWL
  const nrwlCurrentEpoch = useCurrentEpochNrwl();
  const nrwlBRStat = useCashPriceInEstimatedTWAPNrwl();
  const nrwlTotalStaked = useTotalStakedOnMasonryNrwl();
  const nrwlAPR = useFetchMasonryAPRNrwl();
  const nrwlTwap = useMemo(() => (nrwlBRStat ? Number(nrwlBRStat.priceInDollars).toFixed(4) : null), [nrwlBRStat]);
  const nrwlEpochTimer = useTreasuryAllocationTimesNrwl();
  const nrwlNextEpochDate = useMemo(() => (nrwlEpochTimer ? nrwlEpochTimer.to : null), [nrwlEpochTimer]);
  const nrwlAbovePeg = useGetNrwlBoardroomPrintRate();
  const nrwlStakedBalance = useStakedBalanceOnMasonryNrwl();
  const nrwlTokenPriceInDollars = useMemo(
    () =>
      wsharePrice ? (Number(wsharePrice) * Number(getDisplayBalance(nrwlStakedBalance))).toFixed(2).toString() : null,
    [wsharePrice, nrwlStakedBalance],
  );
  const [nrwlApproveStatus, nrwlApprove] = useApprove(tombFinance.TSHARE, tombFinance.contracts.NrwlBoardroom.address);
  const nrwlOnStake = useStakeToMasonrNrwl();
  const nrwlOnWithdraw = useWithdrawFromMasonryNrwl();
  const nrwlCanWithdrawFromMasonry = useWithdrawCheckNrwl();
  const nrwlCanClaimReward = useClaimRewardCheckNrwl();
  const nrwlEarnings = useEarningsOnMasonryNrwl();
  const nrwlOnRedeem = useRedeemOnMasonryNrwl();
  const nrwlOnClaim = useHarvestFromMasonryNrwl();

  return (
    <Grid container direction="column" spacing={2}>
      <BoardroomCard
        boardroomName="WLRS BOARDROOM"
        currentEpoch={Number(wlrsCurrentEpoch)}
        nextEpoch={wlrsNextEpochDate}
        twap={wlrsTwap}
        apr={wlrsAPR.toFixed(2)}
        dailyApr={(wlrsAPR / 365).toFixed(2)}
        abovePeg={wlrsAbovePeg.toFixed(2)}
        totalStaked={(Number(wlrsTotalStaked) / 1e18).toFixed(2)}
        stakedBalance={Number(wlrsStakedBalance / 1e18).toFixed(3)}
        stakedBalanceValue={wlrsTokenPriceInDollars}
        wshareBalance={Number(wshareBalance) / 1e18}
        approveStatus={wlrsApproveStatus}
        canWithdraw={wlrsCanWithdrawFromMasonry}
        canClaim={wlrsCanClaimReward}
        earnings={Number(wlrsEarnings) / 1e18}
        earningsTokenPrice={wlrsPrice}
        claimTimerTo={wlrsClaimTimerTo}
        claimTimerFrom={wlrsClaimTimerFrom}
        withdrawTimerTo={wlrsWithdrawTimerTo}
        withdrawTimerFrom={wlrsWithdrawTimerFrom}
        onApprove={wlrsApprove}
        onStake={wlrsOnStake.onStake}
        onWithdraw={wlrsOnWithdraw.onWithdraw}
        onRedeem={wlrsOnRedeem.onRedeem}
        onClaim={wlrsOnClaim.onReward}
      />
      <BoardroomCard
        boardroomName="NRWL BOARDROOM"
        currentEpoch={Number(nrwlCurrentEpoch)}
        nextEpoch={nrwlNextEpochDate}
        twap={nrwlTwap}
        apr={nrwlAPR.toFixed(2)}
        dailyApr={(nrwlAPR / 365).toFixed(2)}
        abovePeg={nrwlAbovePeg.toFixed(2)}
        totalStaked={(Number(nrwlTotalStaked) / 1e18).toFixed(2)}
        stakedBalance={Number(nrwlStakedBalance / 1e18).toFixed(3)}
        stakedBalanceValue={nrwlTokenPriceInDollars}
        wshareBalance={Number(wshareBalance) / 1e18}
        approveStatus={nrwlApproveStatus}
        canWithdraw={nrwlCanWithdrawFromMasonry}
        canClaim={nrwlCanClaimReward}
        earnings={Number(nrwlEarnings).toFixed(3)}
        earningsTokenPrice={nrwlPrice}
        onApprove={nrwlApprove}
        onStake={nrwlOnStake.onStake}
        onWithdraw={nrwlOnWithdraw.onWithdraw}
        onRedeem={nrwlOnRedeem.onRedeem}
        onClaim={nrwlOnClaim.onReward}
      />
    </Grid>
  );
};
export default Boardrooms;
