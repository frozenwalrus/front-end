import wlrsUsdcIcon from '../../assets/img/wlrs-usdc.png';
import xWlrsIcon from '../../assets/img/xWLRS.png';
import bondIcon from '../../assets/img/bond.png';
import wShareUSDC from '../../assets/img/WSHARE-USDC.E.png';
import nrwlYusd from '../../assets/img/nrwlYusd.png';
import wlrsIcon from '../../assets/img/SVG_Icons_and_web_bg/WLRS.svg';
import wshareIcon from '../../assets/img/wshare.png';

import chevronDown from '../../assets/img/chevrondown.png';
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Grid, Accordion, AccordionDetails, AccordionSummary, Slider, useMediaQuery } from '@material-ui/core';
import { Bank, PoolStats, TokenStat } from '../../tomb-finance/types';
import useEarnings from '../../hooks/useEarnings';
import useHarvest from '../../hooks/useHarvest';
import { getDisplayBalance, getFullDisplayBalance } from '../../utils/formatBalance';
import useGetTokenStats from '../../hooks/useGetTokenStats';
import useTokenBalance from '../../hooks/useTokenBalance';
import useStakedBalance from '../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useStake from '../../hooks/useStake';
import useZap from '../../hooks/useZap';
import useZapNrwl from '../../hooks/useZapNrwl';
import useWithdraw from '../../hooks/useWithdraw';
import ZapModal from '../Bank/components/ZapModal';
import ZapModalNrwl from '../Bank/components/ZapModalNrwl';
import useModal from '../../hooks/useModal';
import useApprove, { ApprovalState } from '../../hooks/useApprove';

interface FarmCardProps {
  bankName: string;
  bank: Bank;
  tokenStats: TokenStat;
  poolStats: PoolStats;
  account: string;
}

const FarmCard: React.FC<FarmCardProps> = ({ bankName, bank, poolStats, account }) => {
  const widthUnder600 = useMediaQuery('(max-width:600px)');

  const [activeDetailsBoxTab, setActiveDetailsBoxTab] = useState('Deposit');
  const [expanded, setExpanded] = useState(false);
  const [rewardsPerDay, setRewardsPerDay] = useState(0);
  const [inputValue, setInputValue] = useState<string>();
  const [sliderValue, setSliderValue] = useState(0);

  // Custom Hooks functinos
  const { onReward } = useHarvest(bank);
  const { onStake } = useStake(bank);
  const { onZap } = useZap(bank);
  const { onZapNrwl } = useZapNrwl(bank);
  const { onWithdraw } = useWithdraw(bank);

  // Custom Hooks
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
  const earnedTokenStats = useGetTokenStats(bank.earnTokenName);
  const walletTokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  // Memos
  const earnedTokenPriceOfOneInDollars = useMemo(
    () => (earnedTokenStats ? Number(earnedTokenStats.priceInDollars).toFixed(2) : null),
    [earnedTokenStats],
  );
  const depositedTokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );

  // Custom variables
  const multiplier =
    (bank.depositTokenName.includes('WLRS') || bank.depositTokenName.includes('WSHARE-USDC-LP')) &&
    !bank.depositTokenName.includes('XWLRS')
      ? 10 ** 6
      : 1;
  const stakedBalanceNumber = Number(
    getDisplayBalance(stakedBalance, bank.depositToken.decimal, bank.depositToken.decimal === 6 ? 3 : 9),
  );
  const totalEarnedInDollars = (Number(earnedTokenPriceOfOneInDollars) * Number(getDisplayBalance(earnings))).toFixed(
    2,
  );
  const depositedInDollars = (
    Number(depositedTokenPriceInDollars) *
    Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal, bank.depositToken.decimal === 6 ? 3 : 9)) *
    multiplier
  ).toFixed(2);

  const marks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 25,
      label: '25%',
    },
    {
      value: 50,
      label: '50%',
    },
    {
      value: 75,
      label: '75%',
    },
    {
      value: 100,
      label: '100%',
    },
  ];

  // UseEffects
  useEffect(() => {
    if (poolStats && depositedInDollars && earnedTokenPriceOfOneInDollars) {
      const rewardsTokenInDollar = Number(depositedInDollars) * (Number(poolStats.dailyAPR) / 100);
      setRewardsPerDay(rewardsTokenInDollar / Number(earnedTokenPriceOfOneInDollars));
    }
  }, [poolStats, depositedInDollars, earnedTokenPriceOfOneInDollars]);

  // Custom functions
  const expand = () => {
    setExpanded(!expanded);
  };

  const withdraw = () => {
    if (Number(inputValue) > 0) {
      onWithdraw(inputValue.toString());
    }
  };
  const stake = () => {
    console.log('Staking ' + inputValue);
    if (Number(inputValue) > 0) {
      onStake(inputValue.toString());
    }
  };

  const changeSliderValue = (event: any, newValue: any) => {
    setSliderValue(newValue);
    if (activeDetailsBoxTab === 'Deposit') {
      setInputValue(((Number(walletTokenBalance) / 1e18) * (newValue / 100)).toString());
    } else if (activeDetailsBoxTab === 'Withdraw') {
      setInputValue((Number(stakedBalanceNumber) * (newValue / 100)).toString());
    }
  };

  const maxClicked = () => {
    if (activeDetailsBoxTab === 'Deposit') {
      setInputValue(getFullDisplayBalance(walletTokenBalance, bank.depositToken.decimal, false));
    } else if (activeDetailsBoxTab === 'Withdraw') {
      setInputValue(Number(stakedBalanceNumber).toString());
    }
    setSliderValue(100);
  };

  const updateInput = (event: any) => {
    setInputValue(event.target.value);
  };

  const getLiquidityLink = () => {
    if (bank.depositTokenName === 'WLRS-USDC-LP') {
      return 'https://traderjoexyz.com/pool/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0x395908aeb53d33A9B8ac35e148E9805D34A555D3#/';
    } else if (bank.depositTokenName === 'WSHARE-USDC-LP') {
      return 'https://traderjoexyz.com/pool/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6#/';
    } else if (bank.depositTokenName === 'NRWL-YUSD-LP') {
      return 'https://www.swapsicle.io/add/0x111111111111ed1D73f860F57b2798b683f2d325/0x501012893eE88976AB8B5289B7a78E307d5d9DCb';
    } else if (bank.depositTokenName === 'WLRS-USDIBS-LP') {
      return 'https://traderjoexyz.com/pool/0x0efa5328fefce96c8d10661bd97403764d477853/0x395908aeb53d33a9b8ac35e148e9805d34a555d3#/';
    }
    return null;
  };

  const [onPresentZap, onDissmissZap] = useModal(
    <ZapModal
      decimals={bank.depositToken.decimal}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onZap(zappingToken, tokenName, amount);
        onDissmissZap();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentZapNrwl, onDissmissZapNrwl] = useModal(
    <ZapModalNrwl
      decimals={bank.depositToken.decimal}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onZapNrwl(zappingToken, tokenName, amount);
        onDissmissZapNrwl();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const zap = () => {
    if (bank.depositTokenName === 'NRWL-YUSD-LP') {
      onPresentZapNrwl();
    } else {
      onPresentZap();
    }
  };

  const rewardTokenIcon = () => {
    if (bank.earnTokenName === 'WLRS') {
      return wlrsIcon;
    }
    return wshareIcon;
  };

  const depositTokenIcon = () => {
    if (bank.depositTokenName === 'WLRS-USDC-LP') {
      return wlrsUsdcIcon;
    } else if (bank.depositTokenName === 'XWLRS') {
      return xWlrsIcon;
    } else if (bank.depositTokenName === 'WSHARE-USDC-LP') {
      return wShareUSDC;
    } else if (bank.depositTokenName === 'NRWL-YUSD-LP') {
      return nrwlYusd;
    } else if (bank.depositTokenName === 'WBOND') {
      return bondIcon;
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <div className="lineItem">
          <Accordion
            expanded={expanded}
            onChange={expand}
            style={{ backgroundColor: 'transparent', padding: widthUnder600 ? '10px 0 10px 0' : '15px' }}
          >
            <AccordionSummary
              expandIcon={<img src={chevronDown} alt="down" className="dropdown" />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid container justify={'space-between'} alignItems="center" className="lineItemInner">
                <Grid
                  item
                  className="lineName"
                  xs={12}
                  sm={4}
                  md={4}
                  style={{ textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <img src={depositTokenIcon()} height={38} alt={bankName} className="lineLogo" />
                  {bankName}
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">APR</div>
                  <div className="lineValue">{poolStats?.yearlyAPR ? poolStats?.yearlyAPR : '--.--'}%</div>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">TVL</div>
                  <div className="lineValue">
                    ${poolStats?.TVL ? Number(poolStats?.TVL).toLocaleString('en-US') : '--.--'}
                  </div>
                </Grid>
                <Grid
                  item
                  xs={widthUnder600 ? 3 : 2}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">Deposited</div>
                  <div className="lineValueDeposited">
                    <span style={{ color: '#fcfcfc' }}>{stakedBalanceNumber ? stakedBalanceNumber : '--.--'}</span>
                    <span style={{ marginLeft: '5px', fontSize: '14px' }}>
                      (${Number(depositedInDollars).toFixed(0)})
                    </span>
                  </div>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className="lineDetailsBox">
                    <div className="line-details-inner">
                      <Grid container justify="space-evenly">
                        <Grid
                          item
                          className={activeDetailsBoxTab === 'Deposit' ? 'tabDetailsItemActive' : 'tabDetailsItem'}
                          onClick={() => setActiveDetailsBoxTab('Deposit')}
                        >
                          DEPOSIT
                        </Grid>
                        <Grid
                          item
                          className={activeDetailsBoxTab === 'Withdraw' ? 'tabDetailsItemActive' : 'tabDetailsItem'}
                          onClick={() => setActiveDetailsBoxTab('Withdraw')}
                        >
                          WITHDRAW
                        </Grid>
                      </Grid>
                      <div className="inputDetailsBox">
                        <div className="inputDetailsBoxInner">
                          <Grid container justify="space-between" alignItems="center" wrap="nowrap">
                            <Grid item xs={10} md={11}>
                              <input
                                type="number"
                                placeholder="Enter amount"
                                className="amount-input"
                                value={inputValue}
                                onChange={updateInput}
                              />
                            </Grid>
                            <Grid item xs={2} md={1} className="color-secondary">
                              <div onClick={maxClicked} className="max-button">
                                MAX
                              </div>
                            </Grid>
                          </Grid>
                          <div className="balance">
                            {activeDetailsBoxTab === 'Deposit' && (
                              <span>
                                Balance: {getFullDisplayBalance(walletTokenBalance, bank.depositToken.decimal, false)}{' '}
                                {bank.depositTokenName}
                              </span>
                            )}
                            {activeDetailsBoxTab === 'Withdraw' && (
                              <span>
                                Staked: {stakedBalanceNumber} {bank.depositTokenName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Box mt={2}>
                        <div className="sliderValue">{sliderValue}%</div>
                        <div className="sliderBox">
                          <Slider
                            defaultValue={0}
                            onChange={changeSliderValue}
                            valueLabelDisplay={'off'}
                            marks={marks}
                            value={sliderValue}
                          />
                        </div>
                      </Box>
                      <Box mt={0}>
                        <Grid container justify="center" spacing={3}>
                          {activeDetailsBoxTab === 'Deposit' && (
                            <>
                              {bank.depositTokenName.includes('LP') && (
                                <Grid item xs={6}>
                                  <button onClick={zap} className="primary-button" title="Zap">
                                    Zap
                                  </button>
                                </Grid>
                              )}
                              {activeDetailsBoxTab === 'Deposit' && (
                                <Grid item xs={6}>
                                  {approveStatus !== ApprovalState.APPROVED ? (
                                    <button
                                      disabled={Number(inputValue) === 0}
                                      onClick={approve}
                                      className="secondary-button"
                                      title="Approve"
                                    >
                                      Approve
                                    </button>
                                  ) : (
                                    <button
                                      disabled={Number(inputValue) === 0}
                                      onClick={stake}
                                      className="secondary-button"
                                      title="Deposit"
                                    >
                                      Deposit
                                    </button>
                                  )}
                                </Grid>
                              )}
                            </>
                          )}

                          {activeDetailsBoxTab === 'Withdraw' && (
                            <>
                              <Grid item xs={6}>
                                {activeDetailsBoxTab === 'Withdraw' && (
                                  <button
                                    disabled={Number(inputValue) === 0}
                                    onClick={withdraw}
                                    className="secondary-button"
                                    title="Withdraw"
                                  >
                                    Withdraw
                                  </button>
                                )}
                              </Grid>
                            </>
                          )}
                        </Grid>
                        <Box mt={3}>
                          {getLiquidityLink() != null && (
                            <a
                              style={{ textDecoration: 'none' }}
                              rel="noopener noreferrer"
                              target="_blank"
                              href={getLiquidityLink()}
                            >
                              <div className="addRemoveLiquidity color-secondary">Add / Remove Liquidity</div>
                            </a>
                          )}
                        </Box>
                      </Box>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className="lineDetailsBox">
                    <div className="line-details-inner">
                      <Box>
                        <div className="pending-rewards">PENDING REWARDS</div>
                      </Box>
                      <Box style={{ textAlign: 'center' }} mt={6}>
                        <img src={rewardTokenIcon()} width={82} height={82} alt="Walrus" />
                      </Box>
                      <Box mt={2}>
                        <Grid
                          container
                          direction="column"
                          spacing={0}
                          justify="center"
                          alignContent="center"
                          alignItems="center"
                        >
                          <Grid item className="rewardTokenAmount">
                            {getDisplayBalance(earnings)} {bank.earnTokenName}
                          </Grid>
                          <Grid item className="rewardTokenValue">
                            ${totalEarnedInDollars}
                          </Grid>
                        </Grid>
                      </Box>
                      <Box mt={2}>
                        <Grid container justify="center">
                          <Grid item xs={6}>
                            <button
                              className="primary-button"
                              title="Claim"
                              onClick={onReward}
                              disabled={earnings.eq(0)}
                            >
                              CLAIM
                            </button>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box mt={2}>
                        <div className="rewards-per-day color-secondary">
                          <span>
                            {rewardsPerDay.toFixed(2)} {bank.earnTokenName} per day
                            <span style={{ marginLeft: '5px', fontSize: '14px' }} className="rewardTokenValue">
                              ($
                              {(rewardsPerDay * Number(earnedTokenPriceOfOneInDollars)).toFixed(3)})
                            </span>
                          </span>
                        </div>
                      </Box>
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
    </>
  );
};

export default FarmCard;
