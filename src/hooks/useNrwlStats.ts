import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useNrwlStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const tombFinance = useTombFinance();

  useEffect(() => {
    async function fetchNrwlPrice() {
      try {
        setStat(await tombFinance.getNrwlStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchNrwlPrice();
  }, [setStat, tombFinance, slowRefresh]);

  return stat;
};

export default useNrwlStats;
