import React, { useEffect, useMemo, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import BondCard from './BondCard';
import useBondStats from '../../hooks/useBondStats';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import useBondStatsNrwl from '../../hooks/useBondStatsNrwl';
import useCashPriceInLastTWAPNrwl from '../../hooks/useCashPriceInLastTWAPNrwl';
import useBondsPurchasableNrwl from '../../hooks/useBondsPurchasableNrwl';
import useTokenBalance from '../../hooks/useTokenBalance';
import useTombFinance from '../../hooks/useTombFinance';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../tomb-finance/constants';
import { useTransactionAdder } from '../../state/transactions/hooks';

const Bonds = () => {
  const frozenWlrs = useTombFinance();
  const addTransaction = useTransactionAdder();
  const {
    contracts: { Treasury },
  } = useTombFinance();

  // WLRS BOND
  const bcashPrice = useCashPriceInLastTWAP();
  const bbondsPurchasable = useBondsPurchasable();
  const bWlrsBalance = useTokenBalance(frozenWlrs?.TOMB);
  const bbondBalance = useTokenBalance(frozenWlrs?.TBOND);
  const [bApproveStatus, bApprove] = useApprove(frozenWlrs?.TOMB, Treasury.address);
  const bIsBondRedeemable = useMemo(() => bcashPrice.gt(BOND_REDEEM_PRICE_BN), [bcashPrice]);

  const bBuyBonds = useCallback(
    async (amount) => {
      const tx = await frozenWlrs.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} NBOND with ${amount} NRWL`,
      });
    },
    [frozenWlrs, addTransaction],
  );

  const bRedeemBonds = useCallback(
    async (amount) => {
      const tx = await frozenWlrs.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} NBOND` });
    },
    [frozenWlrs, addTransaction],
  );

  // NRWL BOND
  const ncashPrice = useCashPriceInLastTWAPNrwl();
  const nbondsPurchasable = useBondsPurchasableNrwl();
  const nNrwlBalance = useTokenBalance(frozenWlrs?.NRWL);
  const nbondBalance = useTokenBalance(frozenWlrs?.NBOND);
  const [nApproveStatus, nApprove] = useApprove(frozenWlrs?.NRWL, Treasury.address);
  const nIsBondRedeemable = useMemo(() => bcashPrice.gt(BOND_REDEEM_PRICE_BN), [bcashPrice]);

  const nBuyBonds = useCallback(
    async (amount) => {
      const tx = await frozenWlrs.buyBondsNrwl(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} NBOND with ${amount} NRWL`,
      });
    },
    [frozenWlrs, addTransaction],
  );

  const nRedeemBonds = useCallback(
    async (amount) => {
      const tx = await frozenWlrs.redeemBondsNrwl(amount);
      addTransaction(tx, { summary: `Redeem ${amount} NBOND` });
    },
    [frozenWlrs, addTransaction],
  );
  return (
    <Grid container direction="column" spacing={2}>
      <BondCard
        tokenName="WLRS"
        bondName="WBOND"
        price={Number(bcashPrice) / 1e18}
        availableForPurchase={Number(bbondsPurchasable) / 1e18}
        walletBalance={Number(bWlrsBalance) / 1e18}
        bondBalance={Number(bbondBalance) / 1e18}
        approveStatus={bApproveStatus}
        isRedeemable={bIsBondRedeemable}
        onPurchase={bBuyBonds}
        onApprove={bApprove}
        onRedeem={bRedeemBonds}
      />
      <BondCard
        tokenName="NRWL"
        bondName="NBOND"
        price={Number(ncashPrice) / 1e18}
        availableForPurchase={Number(nbondsPurchasable) / 1e18}
        walletBalance={Number(nNrwlBalance) / 1e18}
        bondBalance={Number(nbondBalance) / 1e18}
        approveStatus={nApproveStatus}
        isRedeemable={nIsBondRedeemable}
        onPurchase={nBuyBonds}
        onApprove={nApprove}
        onRedeem={nRedeemBonds}
      />{' '}
    </Grid>
  );
};
export default Bonds;
