import { useCallback } from 'react';
import useTombFinance from '../useTombFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
import { formatEther, parseUnits } from 'ethers/lib/utils';
import { Pegasaurus } from '../../tomb-finance/types';
import usePegasaurus from './usePegasaurus';

const usePegasaurusDeposit = (pool: Pegasaurus) => {
  const bombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { refreshPool } = usePegasaurus();

  const handleDeposit = useCallback(
    async (amount: string) => {
      const amountBn = parseUnits(amount, pool.depositToken.decimal);
      handleTransactionReceipt(
        bombFinance.depositPegasaurus(amountBn).then((tx) => {
          refreshPool();
          return tx;
        }),
        `Deposit ${Number(amount).toFixed(8)} ${pool.depositTokenName} to pool`,
      );
    },
    [pool, bombFinance, handleTransactionReceipt],
  );

  return { onDeposit: handleDeposit };
};

export default usePegasaurusDeposit;
