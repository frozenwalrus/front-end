import React from 'react';
import { Grid } from '@material-ui/core';
import NodeCard from './NodeCard';
import useStatsForPool from '../../hooks/useStatsForPool';
import useBank from '../../hooks/useBank';
import { useWallet } from 'use-wallet';

const Nodes = () => {

  const { account } = useWallet();

  // WLRS-USDC.e LP Node
  const wlrsUSDCBank = useBank('PegLPNode');
  const wlrsUSDCPool = useStatsForPool(wlrsUSDCBank);

  // WSHARE-USDC.e LP Node
  const wshareUSDCBank = useBank('ShareLPNode');
  const wshareUSDCPool = useStatsForPool(wshareUSDCBank);

  // NRWL-YUSD LP Node
  const nrwlYUSDBank = useBank('LPNrwlNode');
  const nrwlYUSDPool = useStatsForPool(nrwlYUSDBank);

  // GRAPE-WLRS LP Node
  const grapeWLRSBank = useBank('LPWlrsNode');
  const grapeWLRSPool = useStatsForPool(grapeWLRSBank);
  
  return (
    <Grid container direction="column" spacing={2}>
      <NodeCard nodeName="WLRS-USDC.e LP Node" bank={wlrsUSDCBank} pool={wlrsUSDCPool} account={account}/>
      <NodeCard nodeName="WSHARE-USDC.e LP Node" bank={wshareUSDCBank} pool={wshareUSDCPool} account={account} />
      <NodeCard nodeName="NRWL-YUSD LP Node" bank={nrwlYUSDBank} pool={nrwlYUSDPool}  account={account}/>
      <NodeCard nodeName="GRAPE-WLRS LP Node" bank={grapeWLRSBank} pool={grapeWLRSPool}  account={account}/>
    </Grid>
  );
};
export default Nodes;
