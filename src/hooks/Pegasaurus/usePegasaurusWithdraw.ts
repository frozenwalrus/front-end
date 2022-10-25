import { useCallback } from 'react';
import useTombFinance from '../useTombFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
import { Pegasaurus } from '../../tomb-finance/types';
import usePegasaurus from './usePegasaurus';

const usePegasaurusWithdraw = (pool: Pegasaurus) => {
  const bombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { refreshPool } = usePegasaurus();

  const handleWithdraw = useCallback(
    async (amount: string) => {
      const amountBn = parseUnits(amount, 18);
      handleTransactionReceipt(
        bombFinance.withdrawPegasaurus(amountBn).then(async (tx) => {
          await refreshPool();
          return tx;
        }),
        `Withdraw ${amount} ${pool.depositTokenName} to pool`,
      );
    },
    [pool, bombFinance, handleTransactionReceipt],
  );

  return { onWithdraw: handleWithdraw };
};

export default usePegasaurusWithdraw;
