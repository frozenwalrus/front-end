import { useCallback } from 'react';
import useTombFinance from '../useTombFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
import usePegasaurus from './usePegasaurus';

const usePegasaurusCompound = () => {
  const bombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { refreshPool } = usePegasaurus();

  const handleCompound = useCallback(async () => {
    handleTransactionReceipt(
      bombFinance.compoundTokenPegasaurus().then(async (tx) => {
        await refreshPool();
        return tx;
      }),
      `Rewards compounded`,
    );
  }, [bombFinance, handleTransactionReceipt, refreshPool]);

  return { onCompound: () => handleCompound() };
};

export default usePegasaurusCompound;
