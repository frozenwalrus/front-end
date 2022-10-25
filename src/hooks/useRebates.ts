import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRebates = () => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleBond = useCallback(
    (token: string, amount: string) => {
      handleTransactionReceipt(
        tombFinance.rebatesBond(token, amount),
        `Bond ${Number(amount) / 10**18}.`,
      );
    },
    [tombFinance, handleTransactionReceipt],
  );

  const handleClaim = useCallback(
    () => {
      handleTransactionReceipt(
        tombFinance.rebatesClaim(),
        `Claim Reward.`,
      );
    },
    [tombFinance, handleTransactionReceipt],
  );

  return { onBond: handleBond, onClaim: handleClaim };
};

export default useRebates;
