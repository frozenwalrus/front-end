import {useEffect, useState} from 'react';
import useTombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const useGetTreasuryValue = () => {
  const [treasuryValue, setTreasuryValue] = useState<Number>(0);
  const tombFinance = useTombFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchTreasuryValue() {
      try {
        setTreasuryValue(await tombFinance.getTreasuryValue());
      } catch (err) {
        console.error(err);
      }
    }
    fetchTreasuryValue();
  }, [treasuryValue, tombFinance, slowRefresh]);

  return treasuryValue;
};

export default useGetTreasuryValue;
