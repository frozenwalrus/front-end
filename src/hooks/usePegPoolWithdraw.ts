import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
import { PegPool } from '../tomb-finance/types';
import usePegPool from './usePegPool';

const usePegPoolWithdraw = (pool: PegPool) => {
  const bombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { refreshPool } = usePegPool();

  const handleWithdraw = useCallback(
    async (amount: string) => {
      const amountBn = parseUnits(amount, 6);
      handleTransactionReceipt(
        bombFinance.withdrawPegPool(amountBn).then(async (tx) => {
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

export default usePegPoolWithdraw;
