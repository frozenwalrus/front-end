import wlrsUsdcIcon from '../../assets/img/wlrs-usdc.png';
import xWlrsIcon from '../../assets/img/xWLRS.png';
import wShareUSDC from '../../assets/img/WSHARE-USDC.E.png';
import nrwlYusd from '../../assets/img/nrwlYusd.png';
import wlrsIcon from '../../assets/img/SVG_Icons_and_web_bg/WLRS.svg';
import nrwlIcon from '../../assets/img/nrwl.png';
import wshareIcon from '../../assets/img/wshare.png';

import moment from 'moment';
import ProgressCountdown from '../Masonry/components/ProgressCountdown';

import chevronDown from '../../assets/img/chevrondown.png';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Accordion, Slider, AccordionDetails, AccordionSummary, useMediaQuery } from '@material-ui/core';
import { ApprovalState } from '../../hooks/useApprove';
import { AllocationTime } from '../../tomb-finance/types';

interface BoardroomCardProps {
  boardroomName: string;
  currentEpoch: number;
  nextEpoch: Date;
  twap: number;
  apr: number;
  dailyApr: number;
  abovePeg: number;
  totalStaked: number;
  stakedBalance: number;
  stakedBalanceValue: number;
  wshareBalance: number;
  canWithdraw: boolean;
  canClaim: boolean;
  approveStatus: ApprovalState;
  earnings: number;
  earningsTokenPrice: number;
  claimTimerTo: Date;
  claimTimerFrom: Date;
  withdrawTimerTo: Date;
  withdrawTimerFrom: Date;
  onApprove: () => Promise<void>;
  onStake: (amount: string) => void;
  onWithdraw: (amount: string) => void;
  onClaim: () => Promise<void>;
  onRedeem: () => Promise<void>;
}

const BoardroomCard: React.FC<BoardroomCardProps> = ({
  boardroomName,
  currentEpoch,
  nextEpoch,
  twap,
  apr,
  dailyApr,
  abovePeg,
  totalStaked,
  stakedBalance,
  stakedBalanceValue,
  wshareBalance,
  canWithdraw,
  canClaim,
  approveStatus,
  earnings,
  earningsTokenPrice,
  claimTimerTo,
  claimTimerFrom,
  withdrawTimerTo,
  withdrawTimerFrom,
  onApprove,
  onStake,
  onWithdraw,
  onClaim,
  onRedeem,
}) => {
  const widthUnder600 = useMediaQuery('(max-width:600px)');
  const [expanded, setExpanded] = useState(false);
  const expand = () => {
    setExpanded(!expanded);
  };

  const [inputValue, setInputValue] = useState<string>();
  const [sliderValue, setSliderValue] = useState(0);

  const changeSliderValue = (event: any, newValue: any) => {
    setSliderValue(newValue);
    if (activeDetailsBoxTab === 'Deposit') {
      setInputValue((Number(wshareBalance) * (newValue / 100)).toString());
    } else if (activeDetailsBoxTab === 'Withdraw') {
      setInputValue((Number(stakedBalance) * (newValue / 100)).toString());
    }
  };

  const maxClicked = () => {
    if (activeDetailsBoxTab === 'Deposit') {
      setInputValue(wshareBalance.toString());
    } else if (activeDetailsBoxTab === 'Withdraw') {
      setInputValue(stakedBalance.toString());
    }
    setSliderValue(100);
  };

  const [activeDetailsBoxTab, setActiveDetailsBoxTab] = useState('Deposit');

  useEffect(() => {
    setInputValue('0');
  }, [activeDetailsBoxTab]);

  const stake = () => {
    if (Number(inputValue) > 0) {
      onStake(inputValue.toString());
    }
  };

  const withdraw = () => {
    if (Number(inputValue) > 0) {
      onWithdraw(inputValue.toString());
    }
  };

  const approve = () => {
    onApprove();
  };

  const claim = () => {
    onClaim();
  };

  const redeem = () => {
    onRedeem();
  };

  const rewardTokenIcon = () => {
    if (boardroomName === 'NRWL BOARDROOM') {
      return nrwlIcon;
    }
    return wlrsIcon;
  };

  const updateInput = (event: any) => {
    setInputValue(event.target.value);
  };

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
              <Grid container justify="space-between" className="lineItemInner">
                <Grid item className="lineName" xs={12} sm={4} style={{ textAlign: widthUnder600 ? 'center' : 'left' }}>
                  <img src={rewardTokenIcon()} alt="WLRS-USDC.E" height={38} width={38} className="lineLogo" />
                  {boardroomName}
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">APR</div>
                  <div className="lineValue">{apr}%</div>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">Daily APR</div>
                  <div className="lineValue">{dailyApr}%</div>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={2}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">TWAP</div>
                  <div className="lineValue">{twap}</div>
                </Grid>
                <Grid item xs={3} sm={4} style={{ marginTop: '15px', textAlign: widthUnder600 ? 'center' : 'left' }}>
                  <div className="lineLabel" style={{ paddingLeft: widthUnder600 ? '0' : '60px' }}>
                    Current Epoch
                  </div>
                  <div className="lineValue" style={{ paddingLeft: widthUnder600 ? '0' : '60px' }}>
                    {currentEpoch}
                  </div>
                </Grid>
                <Grid item xs={3} sm={3} style={{ marginTop: '15px', textAlign: widthUnder600 ? 'center' : 'left' }}>
                  <div className="lineLabel">Next Epoch</div>
                  <div className="lineValue">
                    {' '}
                    <ProgressCountdown
                      base={moment().toDate()}
                      hideBar={true}
                      deadline={nextEpoch}
                      description="Next Epoch"
                    />
                  </div>
                </Grid>
                <Grid item xs={4} sm={3} style={{ marginTop: '15px', textAlign: widthUnder600 ? 'center' : 'left' }}>
                  <div className="lineLabel">WSHARE Staked</div>
                  <div className="lineValue">{totalStaked}</div>
                </Grid>
                <Grid item xs={3} sm={2} style={{ marginTop: '15px', textAlign: widthUnder600 ? 'center' : 'left' }}>
                  <div className="lineLabel">Deposited</div>
                  <div className="lineValueDeposited">
                    <span style={{ color: '#fcfcfc' }}>{stakedBalance ? stakedBalance : '--.--'}</span>
                    <span style={{ marginLeft: '5px', fontSize: '14px' }}>
                      (${Number(stakedBalanceValue).toFixed(0)})
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
                            {activeDetailsBoxTab === 'Deposit' && <span>Balance: {wshareBalance} WSHARE</span>}
                            {activeDetailsBoxTab === 'Withdraw' && (
                              <span>
                                Staked: {stakedBalance} WSHARE{' '}
                                <span className="lineValueDeposited" style={{ fontSize: '14px' }}>
                                  (${stakedBalanceValue})
                                </span>
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
                              {approveStatus !== ApprovalState.APPROVED ? (
                                <>
                                  <Grid item xs={6}>
                                    <button onClick={approve} className="secondary-button" title="Approve">
                                      Approve
                                    </button>
                                  </Grid>
                                </>
                              ) : (
                                <>
                                  <Grid item xs={6}>
                                    <button
                                      disabled={Number(inputValue) === 0}
                                      onClick={stake}
                                      className="secondary-button"
                                      title="Deposit"
                                    >
                                      Deposit
                                    </button>
                                  </Grid>
                                </>
                              )}
                            </>
                          )}
                          {activeDetailsBoxTab === 'Withdraw' && (
                            <>
                              <Grid item xs={6}>
                                {activeDetailsBoxTab === 'Withdraw' && (
                                  <button
                                    disabled={Number(inputValue) <= 0 || !canWithdraw}
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
                        {!canWithdraw && withdrawTimerFrom && withdrawTimerTo && (
                          <Box mt={2}>
                            <div className="pending-rewards">
                              Withdraw possible in{' '}
                              <span className="withdraw-time-left">
                                <ProgressCountdown
                                  hideBar={true}
                                  base={withdrawTimerFrom}
                                  deadline={withdrawTimerTo}
                                  description="Withdraw available in"
                                />
                              </span>
                            </div>
                          </Box>
                        )}
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
                            {earnings} {boardroomName === 'NRWL BOARDROOM' ? 'NRWL' : 'WLRS'}
                          </Grid>
                          <Grid item className="rewardTokenValue">
                            <span className="lineValueDeposited">
                              ${Number((earnings > 0 ? earnings : 0) * earningsTokenPrice).toFixed(3)}
                            </span>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box mt={2}>
                        <Grid container justify="space-between" spacing={3}>
                          <Grid item xs={6}>
                            <button
                              disabled={earnings <= 0 || (!canClaim && !canWithdraw)}
                              className="secondary-button"
                              title="Claim & Withdraw"
                              onClick={redeem}
                            >
                              CLAIM & WITHDRAW
                            </button>
                          </Grid>
                          <Grid item xs={6}>
                            <button
                              disabled={earnings <= 0 || !canClaim}
                              className="primary-button"
                              title="Claim"
                              onClick={claim}
                            >
                              CLAIM
                            </button>
                          </Grid>
                        </Grid>
                      </Box>
                      {!canClaim && claimTimerFrom && claimTimerTo && (
                        <Box mt={2}>
                          <div className="pending-rewards">
                            Claim possible in
                            <span className="time-left">
                              <ProgressCountdown
                                hideBar={true}
                                base={claimTimerFrom}
                                deadline={claimTimerTo}
                                description="Withdraw available in"
                              />
                            </span>
                          </div>
                        </Box>
                      )}
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

export default BoardroomCard;
