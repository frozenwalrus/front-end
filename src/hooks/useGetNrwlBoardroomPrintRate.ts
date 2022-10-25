import {useEffect, useState} from 'react';
import useTombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const useGetNrwlBoardroomPrintRate = () => {
  const [printRate, setPrintRate] = useState<number>(0);
  const tombFinance = useTombFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCurrentEpoch() {
      try {
        setPrintRate(await tombFinance.getNrwlBoardroomPrintRate());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCurrentEpoch();
  }, [printRate, tombFinance, slowRefresh]);

  return printRate;
};

export default useGetNrwlBoardroomPrintRate;
