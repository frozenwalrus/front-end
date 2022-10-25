import React, { useEffect, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import useBank from '../../hooks/useBank';
import useWallet from 'use-wallet';
import FarmCard from './FarmCard';
import useLpStats from '../../hooks/useLpStats';
import useStatsForPool from '../../hooks/useStatsForPool';

const Farms = () => {
  const { account } = useWallet();

  // WLRS USDC
  const wlrsUSDCBank = useBank('WlrsUsdcLPWShareRewardPool');
  const wlrsUSDCPoolStats = useStatsForPool(wlrsUSDCBank);

  // XWLRS
  const xWLRSBank = useBank('XWLRSShareRewardPool');
  const xWLRSBankStatsPool = useStatsForPool(xWLRSBank);

  // WSHARE-USDC earning WLRS
  const wShareUSDCEarningWLRSBank = useBank('WShareUSDCWLRSRewardPool');
  const wShareUSDCEarningWLRSStatsPool = useStatsForPool(wShareUSDCEarningWLRSBank);

  // WSHARE-USDC
  const wShareUSDCBank = useBank('WShareUsdcLPWShareRewardPool');
  const wShareUSDCPoolStats = useStatsForPool(wShareUSDCBank);

  // NRWL
  const nrwlBank = useBank('NrwlYusdLPWShareRewardPool');
  const nrwlPoolStats = useStatsForPool(nrwlBank);

  // BOND
  const bondBank = useBank('WBondWShareRewardPool');
  const bondPool = useStatsForPool(bondBank);

  return (
    <Grid container direction="column" spacing={2}>
      <FarmCard bankName="WLRS-USDC.e LP" bank={wlrsUSDCBank} poolStats={wlrsUSDCPoolStats} account={account} />
      <FarmCard bankName="xWLRS" bank={xWLRSBank} poolStats={xWLRSBankStatsPool} account={account} />
      <FarmCard
        bankName="WSHARE-USDC.e LP (WLRS)"
        bank={wShareUSDCEarningWLRSBank}
        poolStats={wShareUSDCEarningWLRSStatsPool}
        account={account}
      />
      <FarmCard bankName="WSHARE-USDC.e LP" bank={wShareUSDCBank} poolStats={wShareUSDCPoolStats} account={account} />
      <FarmCard bankName="NRWL-YUSD LP" bank={nrwlBank} poolStats={nrwlPoolStats} account={account} />
      <FarmCard bankName="WBOND" bank={bondBank} poolStats={bondPool} account={account} />
    </Grid>
  );
};
export default Farms;
