import { useCallback, useEffect, useState } from 'react';
import { Pegasaurus } from '../../tomb-finance/types';
import useTombFinance from '../useTombFinance';
import useRefresh from '../useRefresh';

const usePegasaurus = () => {
  const bombFinance = useTombFinance();
  const isUnlocked = bombFinance?.isUnlocked;
  const [Pegasaurus, setPegasaurus] = useState<Pegasaurus>(null);
  const { slowRefresh } = useRefresh();

  const fetchPool = useCallback(async () => {
    setPegasaurus(await bombFinance.getPegasaurus());
  }, [bombFinance]);

  const refreshPool = async () => {
    setPegasaurus(await bombFinance.getPegasaurus());
  };

  useEffect(() => {
    if (isUnlocked) {
      refreshPool().catch((err) => console.error(`Failed to fetch peg pool: ${err.stack}`));
    }
  }, [bombFinance, fetchPool, isUnlocked, slowRefresh]);

  return { Pegasaurus, refreshPool };
};

export default usePegasaurus;
