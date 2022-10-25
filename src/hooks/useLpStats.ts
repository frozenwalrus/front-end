import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { LPStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useLpStats = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const { fastRefresh } = useRefresh();
  const tombFinance = useTombFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try {
        setStat(await tombFinance.getLPStat(lpTicker));
      } catch (err) {
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, tombFinance, fastRefresh, lpTicker]);

  return stat;
};

export default useLpStats;
