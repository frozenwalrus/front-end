import { useCallback, useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import config from '../config';
import { BigNumber } from 'ethers';

const useCashPriceInLastTWAPNrwl = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const tombFinance = useTombFinance();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await tombFinance.getTombPriceInLastTWAPNrwl());
  }, [tombFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch WLRS price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, tombFinance, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAPNrwl;
