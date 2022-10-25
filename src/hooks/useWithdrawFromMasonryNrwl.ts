import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromMasonryNrwl = () => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        tombFinance.withdrawShareFromMasonryNrwl(amount),
        `Withdraw ${amount} WSHARE from the boardroom`,
      );
    },
    [tombFinance, handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromMasonryNrwl;
