import { useCallback } from 'react';
import useTombFinance from '../useTombFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
import usePegasaurus from './usePegasaurus';

const usePegasaurusRewardsClaim = () => {
  const bombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();
  const { refreshPool } = usePegasaurus();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      bombFinance.claimPegasaurus().then(async (tx) => {
        await refreshPool();
        return tx;
      }),
      ` Claim rewards from Peg Pool `,
    );
  }, [bombFinance, handleTransactionReceipt]);

  return { doClaim: handleReward };
};

export default usePegasaurusRewardsClaim;
