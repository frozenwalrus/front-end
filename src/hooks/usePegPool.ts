import { useCallback, useEffect, useState } from 'react';
import { PegPool } from '../tomb-finance/types';
import useTombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const usePegPool = () => {
  const bombFinance = useTombFinance();
  const isUnlocked = bombFinance?.isUnlocked;
  const [pegPool, setPegPool] = useState<PegPool>(null);
  const { slowRefresh } = useRefresh();

  const fetchPool = useCallback(async () => {
    setPegPool(await bombFinance.getPegPool());
  }, [bombFinance]);

  const refreshPool = async () => {
    setPegPool(await bombFinance.getPegPool());
  };

  useEffect(() => {
    if (isUnlocked) {
      refreshPool().catch((err) => console.error(`Failed to fetch peg pool: ${err.stack}`));
    }
  }, [bombFinance, fetchPool, isUnlocked, slowRefresh]);

  return { pegPool, refreshPool };
};

export default usePegPool;
