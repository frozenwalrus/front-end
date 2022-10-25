import React, { useCallback, useMemo } from 'react';
import PitImage from '../../assets/img/SVG_Icons_and_web_bg/bg.svg';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { Alert } from '@material-ui/lab';
import { Box } from '@material-ui/core';

import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import ExchangeStat from './components/ExchangeStat';

import useTombFinance from '../../hooks/useTombFinance';
import useBondStatsNrwl from '../../hooks/useBondStatsNrwl';
import useCashPriceInLastTWAPNrwl from '../../hooks/useCashPriceInLastTWAPNrwl';
import { useTransactionAdder } from '../../state/transactions/hooks';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondsPurchasableNrwl from '../../hooks/useBondsPurchasableNrwl';

import { getDisplayBalance } from '../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../tomb-finance/constants';
import config from '../../config';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${PitImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const NrwlBond: React.FC = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const tombFinance = useTombFinance();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStatsNrwl();
  const cashPrice = useCashPriceInLastTWAPNrwl();
  const bondsPurchasable = useBondsPurchasableNrwl();

  const bondBalance = useTokenBalance(tombFinance?.NBOND);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await tombFinance.buyBondsNrwl(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} NBOND with ${amount} NRWL`,
      });
    },
    [tombFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await tombFinance.redeemBondsNrwl(amount);
      addTransaction(tx, { summary: `Redeem ${amount} NBOND` });
    },
    [tombFinance, addTransaction],
  );
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);

  return (
    <Switch>
      <>
        
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="Purchase & Redeem NRWL Bonds" subtitle="Earn premiums upon redemption" />
            </Route>
            {
              Date.now() < config.nrwlBoardroomLaunchDate.getTime()
                ? (
                    <Box>
                      <Alert variant="filled" severity="success" style={{ maxWidth: '400px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                        NRWL Bonds page will be unlocked on July 27th at 14:00 UTC 
                      </Alert>
                    </Box>
                  )
                : (
                  <StyledBond>
                    <StyledCardWrapper>
                      <ExchangeCard
                        action="Purchase"
                        fromToken={tombFinance.NRWL}
                        fromTokenName="NRWL"
                        toToken={tombFinance.NBOND}
                        toTokenName="NBOND"
                        priceDesc={
                          !isBondPurchasable
                            ? 'NRWL is over peg'
                            : getDisplayBalance(bondsPurchasable, 18, 4) + ' NBONDs available for purchase'
                        }
                        onExchange={handleBuyBonds}
                        disabled={!bondStat || isBondRedeemable}
                      />
                    </StyledCardWrapper>
                    <StyledStatsWrapper>
                      <ExchangeStat
                        tokenName="NRWL"
                        description="Last-Hour TWAP Price"
                        price={getDisplayBalance(cashPrice, 18, 4)}
                      />
                      <Spacer size="md" />
                      <ExchangeStat
                        tokenName="NBOND"
                        description="Current Price: (NRWL)^2"
                        price={Number(bondStat?.tokenInFtm).toFixed(2) || '-'}
                      />
                    </StyledStatsWrapper>
                    <StyledCardWrapper>
                      <ExchangeCard
                        action="Redeem"
                        fromToken={tombFinance.NBOND}
                        fromTokenName="NBOND"
                        toToken={tombFinance.NRWL}
                        toTokenName="NRWL"
                        priceDesc={`${getDisplayBalance(bondBalance)} NBONDs Available in wallet`}
                        onExchange={handleRedeemBonds}
                        disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                        disabledDescription={!isBondRedeemable ? `Enabled when NRWL > ${BOND_REDEEM_PRICE} USDC` : null}
                      />
                    </StyledCardWrapper>
                  </StyledBond>
                )
            }
          </>
        ) : (
          <UnlockWallet />
        )}
      </>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default NrwlBond;
