import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useTombFinance from './useTombFinance';

const useBondsPurchasableNrwl = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const tombFinance = useTombFinance();

  useEffect(() => {
    async function fetchBondsPurchasable() {
      try {
        setBalance(await tombFinance.getBondsPurchasableNrwl());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondsPurchasable();
  }, [setBalance, tombFinance]);

  return balance;
};

export default useBondsPurchasableNrwl;
