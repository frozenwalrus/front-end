import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { Pegasaurus, PegasaurusToken } from '../../tomb-finance/types';
import { getDexPriceFromPair } from '../../utils/dexscreener';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTombFinance from '../useTombFinance';

const usePegasaurusRewards = (Pegasaurus: Pegasaurus) => {
  const bombFinance = useTombFinance();
  const isUnlocked = bombFinance?.isUnlocked;
  const [rewardTokensPS2, setRewardTokensPS2] = useState<PegasaurusToken[]>([]);
  const [totalRewardValuePS2, setTotalRewardValuePS2] = useState<string>(null);
  const [compoundValue, setCompoundValue] = useState(null);

  const [aprPS2, setAprPS2] = useState<{
    daily: string;
    yearly: string;
  }>({
    daily: '0',
    yearly: '0',
  });

  const BSC_BLOCK_A_DAY = 28800;

  useEffect(() => {
    const getaprPS2 = (tokens: PegasaurusToken[]) => {
      let totalDollarValuePerDay = 0;
      let totalDollarValuePerYear = 0;

      tokens.forEach((tk) => {
        const rpb = tk.rewardPerBlock;
        const dollarValuePerBlock = rpb * tk.currentPriceNum;
        const amountPerDay = dollarValuePerBlock * BSC_BLOCK_A_DAY;
        totalDollarValuePerDay += amountPerDay;
        console.log(amountPerDay)
        const amountPerYear = amountPerDay * 365;
        totalDollarValuePerYear += amountPerYear;
        console.log(amountPerYear); 
      });

      const dailyTrimmed = 
        Number(Number(Pegasaurus.totalDesposits))
      console.log(dailyTrimmed)
      
      const dailyTrimmed2 = 
      Number(Number(dailyTrimmed)  * 10**6).toFixed(8)
      console.log(dailyTrimmed2)
    
      const perDay = Number(
        totalDollarValuePerDay.toFixed(8))
      console.log(perDay)

      const balanceOfPool = Number(
        Number(Number(Pegasaurus.totalDesposits)* 10**6).toFixed(8))
      console.log(balanceOfPool)
// balance of pool and daily trimmed 2 are the same 
    //  const daily = (perDay / Number(dailyTrimmed2)) * 100;
    // console.log(daily) 
    const daily = ((totalDollarValuePerYear / Number(balanceOfPool)) * 100) / 365;
 //   const yearly = (totalDollarValuePerYear / Number(Pegasaurus.totalDesposits)) * 100;
    const yearly = (totalDollarValuePerYear / Number(balanceOfPool)) * 100;

      setAprPS2({
        daily: ethers.utils.commify(Number.isFinite(daily) ? daily.toFixed(2) : '0'),
        yearly: ethers.utils.commify(Number.isFinite(yearly) ? yearly.toFixed(2) : '0'),
      });
    };

    const getTokens = async () => {
      const [tokens] = await Promise.all([bombFinance.getPegasaurusPendingRewards()]);

      let totalValue = 0;
      for (const token of tokens) {
        const priceInfo = await getDexPriceFromPair('avalanche', token.pairAddress);
        console.log(priceInfo); 
        token.currentPrice = priceInfo.priceUI;
        token.currentPriceNum = priceInfo.priceNum;
        const pendingValue = priceInfo.priceNum * Number(token.amount);
        token.pendingValue = pendingValue.toFixed(2);
        totalValue += pendingValue;
      }

      getaprPS2(tokens);
      setTotalRewardValuePS2(totalValue.toFixed(2));
      setRewardTokensPS2(tokens);
    };

    const loadData = async () => {
      await Promise.all([getTokens()]);
    };

    if (isUnlocked && Pegasaurus) {
      loadData();
      const timer = setInterval(() => {
        loadData();
      }, 1000 * 15000);

      return () => clearInterval(timer);
    }
  }, [isUnlocked, Pegasaurus]);

  return { rewardTokensPS2, totalRewardValuePS2, aprPS2, compoundValue };
};

export default usePegasaurusRewards;
