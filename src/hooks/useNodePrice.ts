import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useTombFinance from './useTombFinance';
import { ContractName } from '../tomb-finance';
import config from '../config';

const useNodePrice = (poolName: ContractName, poolId: Number, sectionInUI: Number) => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const tombFinance = useTombFinance();

  const fetchAmount = useCallback(async () => {
    const balance = sectionInUI === 4 ? await tombFinance.getNodePrice(poolName, poolId) : BigNumber.from(0);
    setAmount(balance);
  }, [poolName, poolId, sectionInUI, tombFinance]);

  useEffect(() => {
    if (sectionInUI === 4) {
      fetchAmount().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchAmount, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [poolName, setAmount, tombFinance, fetchAmount]);

  return amount;
};

export default useNodePrice;