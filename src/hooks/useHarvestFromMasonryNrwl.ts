import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromMasonryNrwl = () => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(tombFinance.harvestCashFromMasonryNrwl(), 'Claim NRWL from Boardroom');
  }, [tombFinance, handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvestFromMasonryNrwl;
