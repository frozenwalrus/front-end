import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import useTombFinance from '../useTombFinance';

const usePegasaurusWithdrawFee = () => {
  const bombFinance = useTombFinance();
  const isUnlocked = bombFinance?.isUnlocked;
  const [withdrawFeePercent, setWithdrawFeePercent] = useState<number>(null);

  useEffect(() => {
    const updateFee = async () => {
      const twap: BigNumber = await bombFinance.contracts.Pegasaurus.getUpdatedTWAP();
      const twapNum = Number(formatEther(twap));

      if (twapNum >= 1.25) {
        setWithdrawFeePercent(0);
        return;
      }

      const brackets = [1.25, 1.2, 1.15, 1.10, 1.05, 1.00, 0.9, 0.8, 0.7, 0.6];
      for (let i = 0; i < brackets.length; i++) {
        if (twapNum >= brackets[i]) {
          setWithdrawFeePercent(Number(((1.25 - brackets[i]) * 100).toFixed(2)));
          return;
        }
      }
    };

    if (isUnlocked) {
      updateFee();
      const timer = setInterval(() => {
        updateFee();
      }, 1000 * 30);

      return () => clearInterval(timer);
    }
  }, [isUnlocked]);

  return { withdrawFeePercent };
};

export default usePegasaurusWithdrawFee;
