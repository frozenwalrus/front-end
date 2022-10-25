import nrlwBondIcon from '../../assets/img/nrwlBond.png';
import bondIcon from '../../assets/img/bond.png';
import wlrsIcon from '../../assets/img/SVG_Icons_and_web_bg/WLRS.svg';
import nrwlIcon from '../../assets/img/nrwl.png';

import chevronDown from '../../assets/img/chevrondown.png';
import React, { useState } from 'react';
import { Box, Grid, Accordion, AccordionDetails, AccordionSummary, useMediaQuery } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ApprovalState } from '../../hooks/useApprove';

interface BondCardProps {
  tokenName: string;
  bondName: string;
  price: number;
  availableForPurchase: number;
  walletBalance: number;
  bondBalance: number;
  approveStatus: ApprovalState;
  isRedeemable: boolean;
  isPurchasable: boolean;
  onPurchase: (amount: string) => Promise<void>;
  onRedeem: (amount: any) => Promise<void>;
  onApprove: () => Promise<void>;
}

const BondCard: React.FC<BondCardProps> = ({
  tokenName,
  bondName,
  price,
  availableForPurchase,
  walletBalance,
  bondBalance,
  approveStatus,
  isRedeemable,
  onPurchase,
  onRedeem,
  onApprove,
}) => {
  const widthUnder600 = useMediaQuery('(max-width:600px)');

  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState<string>();
  const [inputValueRedeem, setInputValueRedeem] = useState<string>();

  const maxClicked = () => {
    setInputValue(walletBalance.toString());
  };

  const maxClickedRedeem = () => {
    setInputValueRedeem(bondBalance.toString());
  };

  const depositTokenIcon = () => {
    if (bondName === 'WBOND') {
      return bondIcon;
    } else if (bondName === 'NBOND') {
      return nrlwBondIcon;
    }
  };

  const redeemTokenIcon = () => {
    if (bondName === 'WBOND') {
      return wlrsIcon;
    } else if (bondName === 'NBOND') {
      return nrwlIcon;
    }
  };

  const expand = () => {
    setExpanded(!expanded);
  };

  const purchase = () => {
    if (Number(inputValue) > 0) {
      onPurchase(inputValue);
    }
  };

  const approve = () => {
    onApprove();
  };

  const redeem = () => {
    if (Number(inputValueRedeem) > 0) {
      onRedeem(inputValueRedeem);
    }
  };

  const updateInput = (event: any) => {
    setInputValue(event.target.value);
  };

  const updateInputRedeem = (event: any) => {
    setInputValueRedeem(event.target.value);
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
                  <img src={depositTokenIcon()} height={38} alt={bondName} className="lineLogo" />
                  {bondName}
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">TWAP</div>
                  <div className="lineValue">{price.toFixed(4)}</div>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">Available for purchase</div>
                  <div className="lineValue">{availableForPurchase.toLocaleString('en-US')}</div>
                </Grid>
                <Grid
                  item
                  xs={widthUnder600 ? 3 : 2}
                  style={{ marginTop: widthUnder600 ? '15px' : '0', textAlign: widthUnder600 ? 'center' : 'left' }}
                >
                  <div className="lineLabel">Balance</div>
                  <div className="lineValueDeposited">{bondBalance}</div>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className="lineDetailsBox">
                    <div className="line-details-inner">
                      <Box>
                        <div className="pending-rewards">
                          Exchange {tokenName} for {bondName}
                        </div>
                      </Box>

                      <Box mt={4}>
                        <Grid container justify="center" alignItems="center" spacing={4}>
                          <Grid item style={{ textAlign: 'center' }}>
                            <img src={redeemTokenIcon()} height={82}></img>
                          </Grid>
                          <Grid item style={{ textAlign: 'center' }}>
                            <FontAwesomeIcon icon={faArrowRight} size="2x" />
                          </Grid>
                          <Grid item style={{ textAlign: 'center' }}>
                            <img src={depositTokenIcon()} height={82}></img>
                          </Grid>
                        </Grid>
                      </Box>
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
                            <span>
                              Balance: {walletBalance} {tokenName}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Box mt={4}>
                        <Grid container justify="center" spacing={3}>
                          <Grid item xs={6}>
                            {approveStatus !== ApprovalState.APPROVED ? (
                              <button
                                onClick={approve}
                                disabled={
                                  approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN
                                }
                                className="primary-button"
                                title="Purchase"
                              >
                                Approve
                              </button>
                            ) : (
                              <button
                                onClick={purchase}
                                disabled={isRedeemable}
                                className="primary-button"
                                title="Purchase"
                              >
                                Purchase {bondName}
                              </button>
                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box className="lineDetailsBox">
                    <div className="line-details-inner">
                      <Box>
                        <div className="pending-rewards">
                          Redeem {bondName} for {tokenName}
                        </div>
                      </Box>

                      <Box mt={4}>
                        <Grid container justify="center" alignItems="center" spacing={4}>
                          <Grid item style={{ textAlign: 'center' }}>
                            <img src={depositTokenIcon()} height={82}></img>
                          </Grid>
                          <Grid item style={{ textAlign: 'center' }}>
                            <FontAwesomeIcon icon={faArrowRight} size="2x" />
                          </Grid>
                          <Grid item style={{ textAlign: 'center' }}>
                            <img src={redeemTokenIcon()} height={82}></img>
                          </Grid>
                        </Grid>
                      </Box>
                      <div className="inputDetailsBox">
                        <div className="inputDetailsBoxInner">
                          <Grid container justify="space-between" alignItems="center" wrap="nowrap">
                            <Grid item xs={10} md={11}>
                              <input
                                type="number"
                                placeholder="Enter amount"
                                className="amount-input"
                                value={inputValueRedeem}
                                onChange={updateInputRedeem}
                              />
                            </Grid>
                            <Grid item xs={2} md={1} className="color-secondary">
                              <div onClick={maxClickedRedeem} className="max-button">
                                MAX
                              </div>
                            </Grid>
                          </Grid>
                          <div className="balance">
                            <span>
                              Balance: {bondBalance} {bondName}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Box mt={4}>
                        <Grid container justify="center" spacing={3}>
                          <Grid item xs={6}>
                            <button
                              disabled={bondBalance === 0 || !isRedeemable}
                              onClick={redeem}
                              className="primary-button"
                              title="Purchase"
                            >
                              {isRedeemable ? <>Redeem {tokenName}</> : <>Enabled when {tokenName} above PEG</>}
                            </button>
                          </Grid>
                        </Grid>
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

export default BondCard;
