import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { formatEther, parseUnits } from 'ethers/lib/utils';
import { PegPool } from '../tomb-finance/types';
import usePegPool from './usePegPool';

const usePegPoolDeposit = (pool: PegPool) => {
  const bombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { refreshPool } = usePegPool();

  const handleDeposit = useCallback(
    async (amount: string) => {
      const amountBn = parseUnits(amount, pool.depositToken.decimal);
      handleTransactionReceipt(
        bombFinance.depositPegPool(amountBn).then((tx) => {
          refreshPool();
          return tx;
        }),
        `Deposit ${Number(amount).toFixed(2)} ${pool.depositTokenName} to pool`,
      );
    },
    [pool, bombFinance, handleTransactionReceipt],
  );

  return { onDeposit: handleDeposit };
};

export default usePegPoolDeposit;
