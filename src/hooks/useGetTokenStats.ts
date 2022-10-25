import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';
import useTombStats from './useTombStats';
import useShareStats from './usetShareStats';
import useNrwlStats from './useNrwlStats';

const useGetTokenStats = (earnedTokenName: string) => {
  const [stat, setStat] = useState<TokenStat>();

  const wlrsStats = useTombStats();
  const wshareStats = useShareStats();
  const nrwlStats = useNrwlStats();

  useEffect(() => {
    async function getTokenStats() {
      if (earnedTokenName === 'WSHARE' && wshareStats) {
        setStat(wshareStats);
      } else if (earnedTokenName === 'WLRS' && wlrsStats) {
        setStat(wlrsStats);
      } else if (earnedTokenName === 'NRWL' && nrwlStats) {
        setStat(nrwlStats);
      }
    }
    getTokenStats();
  }, [setStat, wlrsStats, wshareStats, nrwlStats]);

  return stat;
};

export default useGetTokenStats;
