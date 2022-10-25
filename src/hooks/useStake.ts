import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import { Bank } from '../tomb-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
import {BigNumber} from 'ethers';

const useStake = (bank: Bank) => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = bank.sectionInUI !== 4 
      ? parseUnits(amount, bank.depositToken.decimal)
      : BigNumber.from(amount);
      handleTransactionReceipt(
        tombFinance.stake(bank.contract, bank.poolId, bank.sectionInUI, amountBn),
        `Stake ${amount} ${bank.depositTokenName}`,
      );
    },
    [bank, tombFinance, handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStake;
