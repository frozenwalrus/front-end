import wlrsUsdcIcon from '../../assets/img/wlrs-usdc.png';
import wShareUSDCIcon from '../../assets/img/WSHARE-USDC.E.png';
import nrwlYusdIcon from '../../assets/img/nrwlYusd.png';
import grapeWlrsIcon from '../../assets/img/wlrsGRAPE.png';
import wlrsIcon from '../../assets/img/SVG_Icons_and_web_bg/WLRS.svg';
import nrwlIcon from '../../assets/img/nrwl.png';
import wshareIcon from '../../assets/img/wshare.png';

import moment from 'moment';
import ProgressCountdown from '../Masonry/components/ProgressCountdown';

import chevronDown from '../../assets/img/chevrondown.png';
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Grid, Accordion, Slider, AccordionDetails, AccordionSummary, useMediaQuery } from '@material-ui/core';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import { AllocationTime, Bank, PoolStats } from '../../tomb-finance/types';
import { stat } from 'fs';
import useNodeText from '../../hooks/useNodeText';
import useBank from '../../hooks/useBank';
import useNodes from '../../hooks/useNodes';
import useStatsForPool from '../../hooks/useStatsForPool';
import { Context } from '../../contexts/TombFinanceProvider';
import useGrapeStats from '../../hooks/useTombStats';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import totalNodes from '../../hooks/useTotalNodes';
import useNodePrice from '../../hooks/useNodePrice';
import { getDisplayBalance, getFullDisplayBalance } from '../../utils/formatBalance';
import useMaxPayout from '../../hooks/useMaxPayout';
import useUserDetails from '../../hooks/useUserDetails';
import useTokenBalance from '../../hooks/useTokenBalance';
import useStake from '../../hooks/useStake';
import useEarnings from '../../hooks/useEarnings';
import useHarvest from '../../hooks/useHarvest';
import useCompound from '../../hooks/useCompound';

interface NodeCardProps {
  nodeName: string;
  bank: Bank;
  pool: PoolStats;
  account: string;
}

const NodeCard: React.FC<NodeCardProps> = ({ nodeName, bank, pool, account }) => {
  const nodes = useNodes(bank?.contract, bank?.sectionInUI, account);
  const nodePrice = useNodePrice(bank.contract, bank.poolId, bank.sectionInUI);
  const max = useMaxPayout(bank?.contract, bank?.sectionInUI, account);
  const userDetails = useUserDetails(bank?.contract, bank?.sectionInUI, account);
  const total = totalNodes(bank?.contract, bank?.sectionInUI);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );
  const nodeTokenBalance = useTokenBalance(bank.depositToken);
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
  const earnedInDollars = (Number(stakedTokenPriceInDollars) * 1e6 * Number(earnings)).toFixed(2);
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);
  const dec = bank?.depositTokenName === 'NRWL-YUSD-LP' ? 1e24 : 1e18;
  const nodeCost = (Number(tokenPriceInDollars) * Number(getDisplayBalance(nodePrice, 12))).toFixed(2);
  const { onStake } = useStake(bank);
  const { onReward } = useHarvest(bank);
  const { onCompound } = useCompound(bank);

  const widthUnder600 = useMediaQuery('(max-width:600px)');
  const [expanded, setExpanded] = useState(false);
  const expand = () => {
    setExpanded(!expanded);
  };

  const [inputValue, setInputValue] = useState<string>();
  const maxClicked = () => {
    setInputValue(Math.floor(Number(nodeTokenBalance) / 1e18 / (Number(nodePrice) / 1e18)).toString());
  };

  const stake = () => {
    if (Number(inputValue) > 0) {
      onStake(inputValue.toString());
    }
  };

  const updateInput = (event: any) => {
    setInputValue(event.target.value);
  };

  const rewardTokenIcon = () => {
    if (nodeName === 'WLRS-USDC.e LP Node') {
      return wlrsUsdcIcon;
    } else if (nodeName === 'WSHARE-USDC.e LP Node') {
      return wShareUSDCIcon;
    } else if (nodeName === 'NRWL-YUSD LP Node') {
      return nrwlYusdIcon;
    } else if (nodeName === 'GRAPE-WLRS LP Node') {
      return grapeWlrsIcon;
    }
    return wlrsIcon;
  };

  const getLiquidityLink = () => {
    if (bank.depositTokenName === 'WLRS-USDC-LP') {
      return 'https://traderjoexyz.com/pool/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0x395908aeb53d33A9B8ac35e148E9805D34A555D3#/';
    } else if (bank.depositTokenName === 'WSHARE-USDC-LP') {
      return 'https://traderjoexyz.com/pool/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664/0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6#/';
    } else if (bank.depositTokenName === 'NRWL-YUSD-LP') {
      return 'https://www.swapsicle.io/add/0x111111111111ed1D73f860F57b2798b683f2d325/0x501012893eE88976AB8B5289B7a78E307d5d9DCb';
    } else if (bank.depositTokenName === 'GRAPE-WLRS-LP') {
      return 'https://traderjoexyz.com/pool/0x395908aeb53d33a9b8ac35e148e9805d34a555d3/0x5541d83efad1f281571b343977648b75d95cdac2#/';
    }
    return null;
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
                  <img src={rewardTokenIcon()} alt="WLRS-USDC.E" height={38} className="lineLogo" />
                  {nodeName}
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">DAILY APR</div>
                  <div className="lineValue">{pool ? pool.dailyAPR : '--.--'}%</div>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">YEARLY APR</div>
                  <div className="lineValue">{pool ? pool.yearlyAPR : '--.--'}%</div>
                </Grid>
                <Grid
                  item
                  xs={widthUnder600 ? 3 : 2}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">Your Nodes</div>
                  <div className="lineValueDeposited">
                    <span style={{ color: '#fcfcfc' }}>{nodes[0] ? Number(nodes[0]) : '--.--'}</span>
                    <span style={{ marginLeft: '5px', fontSize: '14px' }}>
                      ($
                      {nodes[0]
                        ? (
                            Number(nodes[0]) *
                            (Number(tokenPriceInDollars) *
                              Number(
                                getDisplayBalance(nodePrice, bank.depositTokenName === 'NRWL-YUSD-LP' ? 18 : 12, 1),
                              ))
                          ).toFixed(0)
                        : '--.--'}
                      )
                    </span>
                  </div>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Grid container spacing={1} justify="space-between">
                    <Grid item xs={6} sm={6} md={3}>
                      <div className="statBox">
                        <div className="statBoxInner">
                          <div className="lineLabel">Amount Claimed</div>
                          <div className="lineValue">
                            {bank.depositTokenName === 'GRAPE-WLRS-LP' || bank.depositTokenName === 'NRWL-YUSD-LP'
                              ? (Number(userDetails[1]) / 1e18).toFixed(3)
                              : (Number(userDetails[1]) / 1e18).toFixed(10)}
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <div className="statBox">
                        <div className="statBoxInner">
                          <div className="lineLabel">Max Possible Pay</div>
                          <div className="lineValue">{Number(max) / 1e18}</div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <div className="statBox">
                        <div className="statBoxInner">
                          <div className="lineLabel">Total Nodes</div>
                          <div className="lineValue">{Number(total[0])}</div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <div className="statBox">
                        <div className="statBoxInner">
                          <div className="lineLabel">TVL</div>
                          <div className="lineValue">
                            ${pool?.TVL ? Number(Number(pool?.TVL).toFixed(0)).toLocaleString('en-US') : '-.--'}
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Box className="node-lineDetailsBox">
                        <div className="node-line-details-inner">
                          <Box>
                            <div className="pending-rewards">
                              1 Node Costs{' '}
                              {bank.depositTokenName === 'GRAPE-WLRS-LP' || bank.depositTokenName === 'NRWL-YUSD-LP'
                                ? getDisplayBalance(nodePrice, bank.depositToken.decimal, 0)
                                : getDisplayBalance(nodePrice, bank.depositToken.decimal, 8)}
                              &nbsp;{bank.depositTokenName}
                            </div>
                            <div className="rewardTokenValue">
                              $
                              {bank.depositTokenName === 'NRWL-YUSD-LP'
                                ? (Number(nodeCost) / 1e6).toFixed(2)
                                : nodeCost}
                            </div>
                          </Box>
                          <div className="inputDetailsBox">
                            <div className="inputDetailsBoxInner">
                              <Grid container justify="space-between" alignItems="center" wrap="nowrap">
                                <Grid item xs={10} md={11}>
                                  <input
                                    type="number"
                                    placeholder="Enter amount of Nodes"
                                    className="amount-input"
                                    value={inputValue}
                                    onChange={updateInput}
                                  />{' '}
                                </Grid>
                                <Grid item xs={2} md={1} className="color-secondary">
                                  <div onClick={maxClicked} className="max-button">
                                    MAX
                                  </div>
                                </Grid>
                              </Grid>
                              <div className="balance">
                                Balance: {getFullDisplayBalance(nodeTokenBalance, bank.depositToken.decimal, false)}{' '}
                                {bank.depositTokenName}
                              </div>
                            </div>
                          </div>
                          <Box mt={6}>
                            <Grid container justify="center" spacing={3}>
                              <Grid item xs={6}>
                                {approveStatus !== ApprovalState.APPROVED ? (
                                  <button
                                    disabled={
                                      bank.closedForStaking ||
                                      approveStatus === ApprovalState.PENDING ||
                                      approveStatus === ApprovalState.UNKNOWN
                                    }
                                    className="primary-button"
                                    title="Approve"
                                    onClick={approve}
                                  >
                                    Approve
                                  </button>
                                ) : (
                                  <button
                                    disabled={bank.closedForStaking}
                                    className="primary-button"
                                    title="Deposit"
                                    onClick={stake}
                                  >
                                    Create Nodes
                                  </button>
                                )}
                              </Grid>
                            </Grid>
                          </Box>
                          <Box mt={2}>
                            {getLiquidityLink() != null && (
                              <a
                                style={{ textDecoration: 'none' }}
                                rel="noopener noreferrer"
                                target="_blank"
                                href={getLiquidityLink()}
                              >
                                <div className="addRemoveLiquidity color-secondary">Get {bank.depositTokenName}</div>
                              </a>
                            )}
                          </Box>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Box className="node-lineDetailsBox">
                        <div className="node-line-details-inner">
                          <Box>
                            <div className="pending-rewards">PENDING REWARDS</div>
                          </Box>
                          <Box style={{ textAlign: 'center' }} mt={6}>
                            <img src={rewardTokenIcon()} height={40} alt="Walrus" />
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
                                {bank.depositTokenName === 'GRAPE-WLRS-LP' || bank.depositTokenName === 'NRWL-YUSD-LP'
                                  ? (Number(earnings) / 1e18).toFixed(4)
                                  : (Number(earnings) / 1e18).toFixed(10)}
                                &nbsp;{bank.earnTokenName}
                              </Grid>
                              <Grid item className="rewardTokenValue">
                                {`≈$${(Number(earnedInDollars) / dec).toFixed(2)}`}
                              </Grid>
                            </Grid>
                          </Box>
                          <Box mt={6}>
                            <Grid container justify="space-between" spacing={3}>
                              <Grid item xs={6}>
                                <button
                                  disabled={earnings.eq(0)}
                                  className="primary-button"
                                  title="Claim"
                                  onClick={onReward}
                                >
                                  Claim
                                </button>
                              </Grid>
                              <Grid item xs={6}>
                                <button
                                  disabled={Number(earnings) < Number(nodePrice)}
                                  className="secondary-button"
                                  title="Compound"
                                  onClick={onCompound}
                                >
                                  Compound
                                </button>
                              </Grid>
                            </Grid>
                          </Box>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
    </>
  );
};

export default NodeCard;
