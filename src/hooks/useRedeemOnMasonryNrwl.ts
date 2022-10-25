import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnMasonryNrwl = (description?: string) => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem WSHARE from boardroom';
    handleTransactionReceipt(tombFinance.exitFromMasonryNrwl(), alertDesc);
  }, [tombFinance, description, handleTransactionReceipt]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnMasonryNrwl;
