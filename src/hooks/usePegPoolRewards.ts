import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { PegPool, PegPoolToken } from '../tomb-finance/types';
import { getDexPriceFromPair } from '../utils/dexscreener';
import { getDisplayBalance } from '../utils/formatBalance';
import useTombFinance from './useTombFinance';

const usePegPoolRewards = (pegPool: PegPool) => {
  const bombFinance = useTombFinance();
  const isUnlocked = bombFinance?.isUnlocked;
  const [rewardTokens, setRewardTokens] = useState<PegPoolToken[]>([]);
  const [totalRewardValue, setTotalRewardValue] = useState<string>(null);
  const [compoundValue, setCompoundValue] = useState(null);

  const [apr, setApr] = useState<{
    daily: string;
    yearly: string;
  }>({
    daily: '0',
    yearly: '0',
  });

  const BSC_BLOCK_A_DAY = 28800;

  useEffect(() => {
    const getAPR = (tokens: PegPoolToken[]) => {
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

      const dailyTrimmed = Number(
        Number(pegPool.totalDesposits).toFixed(8)
      )
      console.log(dailyTrimmed)
      
      const perDay = Number(
        totalDollarValuePerDay.toFixed(8)
      )
      console.log(perDay)

      const balanceOfPool = Number(
        Number(pegPool.totalDesposits).toFixed(8))
      console.log(balanceOfPool)

      const daily = (perDay / dailyTrimmed) * 100;
      console.log(daily) 
      
      const yearly = (totalDollarValuePerYear / Number(pegPool.totalDesposits)) * 100;
      console.log(yearly)

      setApr({
        daily: ethers.utils.commify(Number.isFinite(daily) ? daily.toFixed(2) : '0'),
        yearly: ethers.utils.commify(Number.isFinite(yearly) ? yearly.toFixed(2) : '0'),
      });
    };

    const getTokens = async () => {
      const [tokens] = await Promise.all([bombFinance.getPegPoolPendingRewards()]);

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

      getAPR(tokens);
      setTotalRewardValue(totalValue.toFixed(2));
      setRewardTokens(tokens);
    };

    const loadData = async () => {
      await Promise.all([getTokens()]);
    };

    if (isUnlocked && pegPool) {
      loadData();
      const timer = setInterval(() => {
        loadData();
      }, 1000 * 15000);

      return () => clearInterval(timer);
    }
  }, [isUnlocked, pegPool]);

  return { rewardTokens, totalRewardValue, apr, compoundValue };
};

export default usePegPoolRewards;
