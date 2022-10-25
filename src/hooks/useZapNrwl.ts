import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import { Bank } from '../tomb-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useZapNrwl = (bank: Bank) => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleZap = useCallback(
    (zappingToken: string, tokenName: string, amount: string) => {
      handleTransactionReceipt(
        tombFinance.zapInNrwl(zappingToken, tokenName, amount),
        `Zap ${amount} in ${bank.depositTokenName}.`,
      );
    },
    [bank, tombFinance, handleTransactionReceipt],
  );
  return { onZapNrwl: handleZap };
};

export default useZapNrwl;
