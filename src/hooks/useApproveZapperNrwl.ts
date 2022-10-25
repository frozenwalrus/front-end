import { BigNumber, ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useHasPendingApproval, useTransactionAdder } from '../state/transactions/hooks';
import useAllowance from './useAllowance';
import ERC20 from '../tomb-finance/ERC20';
import { YUSD_TICKER, NRWL_TICKER, NRWL_ZAPPER_ADDR } from '../utils/constants';
import useTombFinance from './useTombFinance';

const APPROVE_AMOUNT = ethers.constants.MaxUint256;
const APPROVE_BASE_AMOUNT = BigNumber.from('1000000000000000000000000');

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApproveZapperNrwl(zappingToken: string): [ApprovalState, () => Promise<void>] {
  const tombFinance = useTombFinance();
  let token: ERC20;
  if (zappingToken === YUSD_TICKER) token = tombFinance.YUSD;
  else if (zappingToken === NRWL_TICKER) token = tombFinance.NRWL;

  const pendingApproval = useHasPendingApproval(token.address, NRWL_ZAPPER_ADDR);
  const currentAllowance = useAllowance(token, NRWL_ZAPPER_ADDR, pendingApproval);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    // we might not have enough data to know whether or not we need to approve
    // if (token === tombFinance.FTM) return ApprovalState.APPROVED;
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(APPROVE_BASE_AMOUNT)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [currentAllowance, pendingApproval, token, tombFinance]);

  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }

    const response = await token.approve(NRWL_ZAPPER_ADDR, APPROVE_AMOUNT);
    addTransaction(response, {
      summary: `Approve ${token.symbol}`,
      approval: {
        tokenAddress: token.address,
        spender: NRWL_ZAPPER_ADDR,
      },
    });
  }, [approvalState, token, addTransaction]);

  return [approvalState, approve];
}

export default useApproveZapperNrwl;
