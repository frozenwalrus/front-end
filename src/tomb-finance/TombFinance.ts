import axios from 'axios';
// import { Fetcher, Route, Token } from '@uniswap/sdk';
import { Fetcher as FetcherSpirit, Token as TokenSpirit } from '@traderjoe-xyz/sdk';
import { Fetcher, Route, Token } from '@traderjoe-xyz/sdk';

import {
  Token as TokenSwapsicle,
  Route as RouteSwapsicle,
  Trade as TradeSwapsicle,
  Pair as PairSwapsicle,
  CurrencyAmount as CurrencyAmountSwapsicle,
  TradeType as TradeTypeSwapsicle,
} from '@bitgraphix/swapsicle-core-main-sdk';

// const { Token, WETH9, CurrencyAmount, TradeType } = require('@bitgraphix/swapsicle-core-main-sdk')
// const { Route, Trade, Pair } = require('@uniswap/v2-sdk')

// import { Fetcher as FetcherSpirit, Token as TokenSpirit } from 'quickswap-sdk';
// import { Fetcher, Route, Token } from 'quickswap-sdk';
import { Configuration } from './config';
import {
  ContractName,
  TokenStat,
  AllocationTime,
  LPStat,
  Bank,
  PoolStats,
  TShareSwapperStat,
  PegPoolToken,
  PegPool,
  PegPoolUserInfo,
  ExtinctionRewardToken,
  Pegasaurus,
  PegasaurusToken,
  PegasaurusUserInfo,
} from './types';
import { BigNumber, Contract, ethers, EventFilter } from 'ethers';
import { decimalToBalance } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getFullDisplayBalance, getDisplayBalance } from '../utils/formatBalance';
import { getDefaultProvider } from '../utils/provider';
import IUniswapV2PairABI from './IUniswapV2Pair.abi.json';
import { /*config,*/ bankDefinitions } from '../config';
import moment from 'moment';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { commify, formatEther } from 'ethers/lib/utils';
import {
  FTM_TICKER,
  NRWL_TICKER,
  SPOOKY_ROUTER_ADDR,
  SWAPSICLE_ROUTER_ADDR,
  TOMB_TICKER,
  TSHARE_TICKER,
} from '../utils/constants';
// import { CompareArrowsOutlined } from '@material-ui/icons';
// import { CompareArrowsOutlined, CompassCalibrationOutlined } from '@material-ui/icons';
/**
 * An API module of Tomb Finance contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class TombFinance {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };
  masonryVersionOfUser?: string;

  TOMBWFTM_LP: Contract;
  WSHAREUSDC: Contract;
  NRWLYUSD: Contract;
  TOMB: ERC20;
  TSHARE: ERC20;
  TBOND: ERC20;
  FTM: ERC20;
  WAVAX: ERC20;
  SNO: ERC20;
  FOX: ERC20;
  DIBS: ERC20;
  GRAPE: ERC20;
  USDIBS: ERC20;

  YUSD: ERC20;
  NRWL: ERC20;
  NBOND: ERC20;
  XWLRS: ERC20;

  yUSDStats: TokenStat = {
    circulatingSupply: null,
    priceInDollars: null,
    tokenInFtm: null,
    totalSupply: null,
  };
  usdtStats: TokenStat = {
    circulatingSupply: null,
    priceInDollars: null,
    tokenInFtm: null,
    totalSupply: null,
  };
  usdcStats: TokenStat = {
    circulatingSupply: null,
    priceInDollars: null,
    tokenInFtm: null,
    totalSupply: null,
  };

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      if (this.isCustomFarm(deployment.address)) {
        this.contracts[name] = new Contract(
          deployment.address,
          '[{"inputs":[{"internalType":"address","name":"token_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"shareholder","type":"address"}],"name":"pendingShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reward","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"totalExcluded","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token_","type":"address"}],"name":"withdrawForeignToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
          provider,
        );
      } else {
        this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
      }
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal);
    }
    this.TOMB = new ERC20(deployments.tomb.address, provider, 'WLRS');
    this.TSHARE = new ERC20(deployments.tShare.address, provider, 'WSHARE');
    this.TBOND = new ERC20(deployments.tBond.address, provider, 'WBOND');
    this.FTM = this.externalTokens['USDC'];
    this.WAVAX = this.externalTokens['WAVAX'];
    this.SNO = this.externalTokens['SNO'];
    this.FOX = this.externalTokens['FOX'];
    this.DIBS = this.externalTokens['DIBS'];
    this.GRAPE = this.externalTokens['GRAPE'];
    this.USDIBS = this.externalTokens['USDIBS'];
    this.YUSD = this.externalTokens['YUSD'];
    this.NRWL = this.externalTokens['NRWL'];
    this.NBOND = this.externalTokens['NBOND'];
    this.XWLRS = this.externalTokens['XWLRS'];
    // Uniswap V2 Pair
    this.TOMBWFTM_LP = new Contract(externalTokens['WLRS-USDC-LP'][0], IUniswapV2PairABI, provider);
    this.WSHAREUSDC = new Contract(externalTokens['WSHARE-USDC-LP'][0], IUniswapV2PairABI, provider);
    this.NRWLYUSD = new Contract(externalTokens['NRWL-YUSD-LP'][0], IUniswapV2PairABI, provider);
    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);
    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [this.TOMB, this.TSHARE, this.TBOND, ...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
    this.TOMBWFTM_LP = this.TOMBWFTM_LP.connect(this.signer);
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
    this.fetchMasonryVersionOfUser()
      .then((version) => (this.masonryVersionOfUser = version))
      .catch((err) => {
        console.error(`Failed to fetch boardroom version: ${err.stack}`);
        this.masonryVersionOfUser = 'latest';
      });
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  //===================================================================
  //===================== GET ASSET STATS =============================
  //===================FROM SPOOKY TO DISPLAY =========================
  //=========================IN HOME PAGE==============================
  //===================================================================

  async getTombStat(): Promise<TokenStat> {
    // const { TombFtmRewardPool, TombFtmLpTombRewardPool, TombFtmLpTombRewardPoolOld } = this.contracts;

    const [supply, priceInFTM, priceOfOneFTM] = await Promise.all([
      this.TOMB.totalSupply(),
      this.getTokenPriceFromPancakeswap(this.TOMB),
      this.getWFTMPriceFromPancakeswap(),
    ]);
    const tombCirculatingSupply = supply.sub(25000);
    const priceOfTombInDollars = (Number(priceInFTM) * Number(priceOfOneFTM)).toFixed(18);
    return {
      tokenInFtm: priceInFTM,
      priceInDollars: priceOfTombInDollars,
      totalSupply: getDisplayBalance(supply, this.TOMB.decimal, 0),
      circulatingSupply: getDisplayBalance(tombCirculatingSupply, this.TOMB.decimal, 0),
    };
  }

  async getXWalrusStat(): Promise<TokenStat> {
    // const { TombFtmRewardPool, TombFtmLpTombRewardPool, TombFtmLpTombRewardPoolOld } = this.contracts;
    const { xwlrs } = this.contracts;

    const [supply, redeemRate, priceInFTM, priceOfOneFTM] = await Promise.all([
      this.XWLRS.totalSupply(),
      xwlrs.redeemRate(),
      this.getTokenPriceFromPancakeswap(this.TOMB),
      this.getWFTMPriceFromPancakeswap(),
    ]);

    const tombCirculatingSupply = supply.sub(25000);
    const priceOfTombInDollars = (Number(priceInFTM) * Number(redeemRate / 1e18)).toFixed(18);
    console.log('s', priceOfTombInDollars);
    return {
      tokenInFtm: priceInFTM,
      priceInDollars: priceOfTombInDollars,
      totalSupply: getDisplayBalance(supply, this.TOMB.decimal, 0),
      circulatingSupply: getDisplayBalance(tombCirculatingSupply, this.TOMB.decimal, 0),
    };
  }

  async getBoardroomPrintRate(): Promise<number> {
    const { Masonry } = this.contracts;
    const snapshotIndex = await Masonry.latestSnapshotIndex();
    const currentEpoch = await Masonry.epoch();
    return (snapshotIndex * 100) / currentEpoch;
  }

  async getNrwlBoardroomPrintRate(): Promise<number> {
    const { NrwlBoardroom } = this.contracts;
    const snapshotIndex = await NrwlBoardroom.latestSnapshotIndex();
    const currentEpoch = await NrwlBoardroom.epoch();
    return (snapshotIndex * 100) / currentEpoch;
  }

  /**
   * Calculates various stats for the requested LP
   * @param name of the LP token to load stats for
   * @returns
   */
  async getLPStat(name: string): Promise<LPStat> {
    let lpToken = this.externalTokens[name];
    let lpTokenSupplyBN = await lpToken.totalSupply();
    let lpTokenSupply = getDisplayBalance(lpTokenSupplyBN, lpToken.decimal, lpToken.decimal / 2);
    let token0 = name.startsWith('WLRS') ? this.TOMB : this.TSHARE; // name === 'WLRS-USDC-LP' ? this.TOMB : this.TSHARE;
    let isTomb = name.startsWith('WLRS'); // name === 'WLRS-USDC-LP';
    let tokenAmountBN = await token0.balanceOf(lpToken.address);
    let tokenAmount = getDisplayBalance(tokenAmountBN, token0.decimal);
    let ftmAmountBN = await this.FTM.balanceOf(lpToken.address);
    let ftmAmount = getDisplayBalance(ftmAmountBN, this.FTM.decimal);
    let tokenAmountInOneLP = Number(tokenAmount) / Number(lpTokenSupply) / 10 ** 6;
    let ftmAmountInOneLP = Number(ftmAmount) / Number(lpTokenSupply) / 10 ** 6;
    let lpTokenPrice = await this.getLPTokenPrice(lpToken, token0, isTomb);
    let lpTokenPriceFixed = Number(lpTokenPrice).toFixed(2).toString();
    let liquidity = (Number(lpTokenSupply) * Number(lpTokenPrice) * 10 ** 6).toFixed(2).toString();

    // if (name === 'SNO-SNOSHARE-LP') {
    //   ftmAmountBN = await this.TOMB.balanceOf(lpToken.address);
    //   ftmAmount = getDisplayBalance(ftmAmountBN, 18);
    //   ftmAmountInOneLP = Number(ftmAmount) / Number(lpTokenSupply);
    // }
    if (name === 'WLRS-USDIBS-LP') {
      tokenAmountInOneLP = Number(tokenAmount) / Number(lpTokenSupply);
      ftmAmountBN = await this.USDIBS.balanceOf(lpToken.address);
      ftmAmount = getDisplayBalance(ftmAmountBN, 18);
      ftmAmountInOneLP = Number(ftmAmount) / Number(lpTokenSupply);
      liquidity = (Number(lpTokenSupply) * Number(lpTokenPrice)).toFixed(2).toString();
    }

    return {
      tokenAmount: tokenAmountInOneLP.toFixed(2).toString(),
      ftmAmount: ftmAmountInOneLP.toFixed(2).toString(),
      priceOfOne: lpTokenPriceFixed,
      totalLiquidity: liquidity,
      totalSupply: Number(lpTokenSupply).toFixed(9).toString(),
    };
  }

  async getLPStatNrwl(name: string): Promise<LPStat> {
    const lpToken = this.externalTokens[name];
    const lpTokenSupplyBN = await lpToken.totalSupply();
    const lpTokenSupply = getDisplayBalance(lpTokenSupplyBN, 18);
    const token0 = this.NRWL;
    const isDibs = true;
    const tokenAmountBN = await token0.balanceOf(lpToken.address);
    const tokenAmount = getDisplayBalance(tokenAmountBN, 18);
    const ftmAmountBN = await this.YUSD.balanceOf(lpToken.address);
    const ftmAmount = getDisplayBalance(ftmAmountBN, 18);
    const tokenAmountInOneLP = Number(tokenAmount) / Number(lpTokenSupply);
    const ftmAmountInOneLP = Number(ftmAmount) / Number(lpTokenSupply);
    const lpTokenPrice = await this.getLPTokenPrice(lpToken, token0, isDibs);
    const lpTokenPriceFixed = Number(lpTokenPrice).toFixed(2).toString();
    const liquidity = (Number(lpTokenSupply) * Number(lpTokenPrice)).toFixed(2).toString();
    return {
      tokenAmount: tokenAmountInOneLP.toFixed(2).toString(),
      ftmAmount: ftmAmountInOneLP.toFixed(2).toString(),
      priceOfOne: lpTokenPriceFixed,
      totalLiquidity: liquidity,
      totalSupply: Number(lpTokenSupply).toFixed(2).toString(),
    };
  }

  async sendTomb(amount: string | number, recepient: string): Promise<TransactionResponse> {
    const { tomb } = this.contracts;

    return await tomb.transfer(recepient, decimalToBalance(amount));
  }
  async sendNRWL(amount: string | number, recepient: string): Promise<TransactionResponse> {
    const { NRWL } = this.contracts;

    return await NRWL.transfer(recepient, decimalToBalance(amount));
  }

  async getRaffleStat(account: string, raffleAddress: string): Promise<TokenStat> {
    let total = 0;
    const { tomb } = this.contracts;
    const priceInBTC = await this.getTokenPriceFromPancakeswap(this.TOMB);
    const balOfRaffle = await tomb.balanceOf(raffleAddress);
    const currentBlockNumber = await this.provider.getBlockNumber();
    const filterTo = tomb.filters.Transfer(account, raffleAddress);
    const startBlock = currentBlockNumber - 100000;
    let allEvents: any = [];
    for (let i = startBlock; i < currentBlockNumber; i += 2000) {
      const _startBlock = i;
      const _endBlock = Math.min(currentBlockNumber, i + 1999);
      const events = await tomb.queryFilter(filterTo, _startBlock, _endBlock);
      allEvents = [...allEvents, ...events];
    }
    if (allEvents.length !== 0 && account !== null) {
      for (let i = 0; i < allEvents.length; i++) {
        total = total + Number(allEvents[i].args.value);
      }
      total = total / 1e18;
    } else {
      total = 0;
    }

    return {
      tokenInFtm: priceInBTC.toString(),
      priceInDollars: total.toString(),
      totalSupply: getDisplayBalance(balOfRaffle, 18, 0),
      circulatingSupply: raffleAddress.toString(),
    };
  }

  async getnrwlRaffleStat(account: string, nrwlRaffleAddress: string): Promise<TokenStat> {
    let total = 0;
    const { NRWL } = this.contracts;
    const priceInBTC = await this.getTokenPriceFromPancakeswap(this.NRWL);
    const balOfNRWLRaffle = await NRWL.balanceOf(nrwlRaffleAddress);
    const currentBlockNumber = await this.provider.getBlockNumber();
    const filterTo = NRWL.filters.Transfer(account, nrwlRaffleAddress);
    const startBlock = currentBlockNumber - 100000;
    let allEvents: any = [];
    for (let i = startBlock; i < currentBlockNumber; i += 2000) {
      const _startBlock = i;
      const _endBlock = Math.min(currentBlockNumber, i + 1999);
      const events = await NRWL.queryFilter(filterTo, _startBlock, _endBlock);
      allEvents = [...allEvents, ...events];
    }
    if (allEvents.length !== 0 && account !== null) {
      for (let i = 0; i < allEvents.length; i++) {
        total = total + Number(allEvents[i].args.value);
      }
      total = total / 1e18;
    } else {
      total = 0;
    }

    return {
      tokenInFtm: priceInBTC.toString(),
      priceInDollars: total.toString(),
      totalSupply: getDisplayBalance(balOfNRWLRaffle, 18, 0),
      circulatingSupply: nrwlRaffleAddress.toString(),
    };
  }

  /*Nodes*/
  async getNodes(contract: string, user: string): Promise<BigNumber[]> {
    return await this.contracts[contract].getNodes(user);
  }

  async getTotalNodes(contract: string): Promise<BigNumber[]> {
    return await this.contracts[contract].getTotalNodes();
  }

  async getMaxPayout(contract: string, user: string): Promise<BigNumber[]> {
    return await this.contracts[contract].maxPayout(user);
  }

  async getUserDetails(contract: string, user: string): Promise<BigNumber[]> {
    return await this.contracts[contract].users(user);
  }

  async compound(poolName: ContractName, poolId: Number, sectionInUI: Number): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    //By passing 0 as the amount, we are asking the contract to only redeem the reward and not the currently staked token
    return sectionInUI !== 4 ? await pool.withdraw(poolId, 0) : await pool.compound();
  }

  async claimedBalanceNode(poolName: ContractName, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      let userInfo = await pool.users(account);
      return await userInfo.total_claims;
    } catch (err) {
      console.error(`Failed to call userInfo() on pool ${pool.address}: ${err}`);
      return BigNumber.from(0);
    }
  }

  async getNodePrice(poolName: ContractName, poolId: Number): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.tierAmounts(poolId);
    } catch (err) {
      console.error(`Failed to call tierAmounts on contract ${pool.address}: ${err}`);
      return BigNumber.from(0);
    }
  }

  /**
   * Use this method to get price for Tomb
   * @returns TokenStat for TBOND
   * priceInFTM
   * priceInDollars
   * TotalSupply
   * CirculatingSupply (always equal to total supply for bonds)
   */
  async getBondStat(): Promise<TokenStat> {
    const { Treasury } = this.contracts;
    const tombStat = await this.getTombStat();
    const bondTombRatioBN = await Treasury.getBondPremiumRate();
    const modifier = bondTombRatioBN / 1e18 > 1 ? bondTombRatioBN / 1e18 : 1;
    const bondPriceInFTM = (Number(tombStat.tokenInFtm) * modifier).toFixed(2);
    const priceOfTBondInDollars = (Number(tombStat.priceInDollars) * modifier).toFixed(2);
    const supply = await this.TBOND.displayedTotalSupply();
    return {
      tokenInFtm: bondPriceInFTM,
      priceInDollars: priceOfTBondInDollars,
      totalSupply: supply,
      circulatingSupply: supply,
    };
  }

  async getBondStatNrwl(): Promise<TokenStat> {
    const { NrwlTreasury } = this.contracts;
    const tombStat = await this.getNrwlStat();
    const bondTombRatioBN = await NrwlTreasury.getBondPremiumRate();
    const modifier = bondTombRatioBN / 1e18 > 1 ? bondTombRatioBN / 1e18 : 1;
    const bondPriceInFTM = (Number(tombStat.tokenInFtm) * modifier).toFixed(2);
    const priceOfTBondInDollars = (Number(tombStat.priceInDollars) * modifier).toFixed(2);
    const supply = await this.NBOND.displayedTotalSupply();
    return {
      tokenInFtm: bondPriceInFTM,
      priceInDollars: priceOfTBondInDollars,
      totalSupply: supply,
      circulatingSupply: supply,
    };
  }

  /**
   * @returns TokenStat for TSHARE
   * priceInFTM
   * priceInDollars
   * TotalSupply
   * CirculatingSupply (always equal to total supply for bonds)
   */
  async getShareStat(): Promise<TokenStat> {
    const { WShareRewardPool } = this.contracts;

    const supply = await this.TSHARE.totalSupply();

    const priceInFTM = await this.getTokenPriceFromPancakeswap(this.TSHARE);
    const tombRewardPoolSupply = await this.TSHARE.balanceOf(WShareRewardPool.address);
    const tShareCirculatingSupply = supply.sub(tombRewardPoolSupply);
    const priceOfOneFTM = await this.getWFTMPriceFromPancakeswap();
    const priceOfSharesInDollars = (Number(priceInFTM) * Number(priceOfOneFTM)).toFixed(2);

    return {
      tokenInFtm: priceInFTM,
      priceInDollars: priceOfSharesInDollars,
      totalSupply: getDisplayBalance(supply, this.TSHARE.decimal, 0),
      circulatingSupply: getDisplayBalance(tShareCirculatingSupply, this.TSHARE.decimal, 0),
    };
  }

  async getTombStatInEstimatedTWAP(): Promise<TokenStat> {
    const { SeigniorageOracle, TombFtmRewardPool } = this.contracts;
    const expectedPrice = await SeigniorageOracle.twap(
      this.TOMB.address,
      ethers.utils.parseEther('1'),
    ); /*.mul(10**12)*/

    const supply = await this.TOMB.totalSupply();
    const tombRewardPoolSupply = await this.TOMB.balanceOf(TombFtmRewardPool.address);
    const tombCirculatingSupply = supply.sub(tombRewardPoolSupply);

    return {
      tokenInFtm: getDisplayBalance(expectedPrice),
      priceInDollars: getDisplayBalance(expectedPrice),
      totalSupply: getDisplayBalance(supply, this.TOMB.decimal, 0),
      circulatingSupply: getDisplayBalance(tombCirculatingSupply, this.TOMB.decimal, 0),
    };
  }

  async getTombStatInEstimatedTWAPNrwl(): Promise<TokenStat> {
    const { NrwlOracle } = this.contracts;
    const expectedPrice = await NrwlOracle.twap(this.NRWL.address, ethers.utils.parseEther('1')); /*.mul(10**12)*/
    const nrwlStats = await this.getNrwlStat();
    return {
      tokenInFtm: getDisplayBalance(expectedPrice),
      priceInDollars: getDisplayBalance(expectedPrice),
      totalSupply: nrwlStats.totalSupply,
      circulatingSupply: nrwlStats.circulatingSupply,
    };
  }

  async getTombPriceInLastTWAP(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getWlrsUpdatedPrice();
  }

  async getTombPriceInLastTWAPNrwl(): Promise<BigNumber> {
    const { NrwlTreasury } = this.contracts;
    return NrwlTreasury.getWlrsUpdatedPrice();
  }

  async getBondsPurchasable(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getBurnableWlrsLeft();
  }

  async getBondsPurchasableNrwl(): Promise<BigNumber> {
    const { NrwlTreasury } = this.contracts;
    return NrwlTreasury.getBurnableWlrsLeft();
  }

  /**
   * Calculates the TVL, APR and daily APR of a provided pool/bank
   * @param bank
   * @returns
   */
  async getPoolAPRs(bank: Bank): Promise<PoolStats> {
    if (this.myAccount === undefined) return;
    const depositToken = bank.depositToken;
    const poolContract = this.contracts[bank.contract];

    if (bank.sectionInUI === 4) {
      const [depositTokenPrice, points, totalPoints, tierAmount, poolBalance, totalBalance, dripRate, dailyUserDrip] =
        await Promise.all([
          this.getDepositTokenPriceInDollars(bank.depositTokenName, depositToken),
          poolContract.tierAllocPoints(bank.poolId),
          poolContract.totalAllocPoints(),
          poolContract.tierAmounts(bank.poolId),
          poolContract.getBalancePool(),
          depositToken.balanceOf(bank.address),
          poolContract.dripRate(),
          poolContract.getDayDripEstimate(this.myAccount),
        ]);
      const stakeAmount = Number(tierAmount) / 1e18;

      const dailyDrip =
        totalPoints && +totalPoints > 0
          ? poolBalance.mul(BigNumber.from(86400)).mul(points).div(totalPoints).div(dripRate) / 1e18
          : 0;
      const dailyDripAPR = (Number(dailyDrip) / stakeAmount) * 100;
      const yearlyDripAPR = ((Number(dailyDrip) * 365) / stakeAmount) * 100;
      const dailyDripUser = Number(getDisplayBalance(dailyUserDrip));
      const yearlyDripUser = Number(dailyDripUser) * 365;

      const TVL =
        bank.earnTokenName === 'NRWL-YUSD-LP'
          ? (Number(depositTokenPrice) * Number(totalBalance)) / 1e18
          : (Number(depositTokenPrice) * Number(totalBalance)) / 1e12;

      return {
        userDailyBurst: dailyDripUser.toFixed(2).toString(),
        userYearlyBurst: yearlyDripUser.toFixed(2).toString(),
        dailyAPR: dailyDripAPR.toFixed(2).toString(),
        yearlyAPR: yearlyDripAPR.toFixed(2).toString(),
        TVL: TVL.toFixed(2).toString(),
      };
    } else {
      const depositTokenPrice = await this.getDepositTokenPriceInDollars(bank.depositTokenName, depositToken);
      const stakeInPool = (await depositToken.balanceOf(bank.address)).mul(
        bank.depositTokenName.endsWith('USDC-LP') ? 10 ** 6 : 1,
      );
      const TVL =
        Number(depositTokenPrice) *
        Number(getDisplayBalance(stakeInPool, depositToken.decimal, depositToken.decimal === 6 ? 3 : 9));
      const stat =
        bank.earnTokenName === 'WLRS'
          ? await this.getTombStat()
          : bank.earnTokenName === 'NRWL'
          ? await this.getNrwlStat()
          : await this.getShareStat();
      const tokenPerSecond = await this.getTokenPerSecond(
        bank.earnTokenName,
        bank.contract,
        poolContract,
        bank.depositTokenName,
      );
      let tokenPerHour = tokenPerSecond.mul(60).mul(60);
      const totalRewardPricePerYear =
        Number(stat.priceInDollars) * Number(getDisplayBalance(tokenPerHour.mul(24).mul(365)));
      const totalRewardPricePerDay = Number(stat.priceInDollars) * Number(getDisplayBalance(tokenPerHour.mul(24)));
      const totalStakingTokenInPool =
        Number(depositTokenPrice) * Number(getDisplayBalance(stakeInPool, depositToken.decimal));
      const dailyAPR = (totalRewardPricePerDay / totalStakingTokenInPool) * 100;
      const yearlyAPR = (totalRewardPricePerYear / totalStakingTokenInPool) * 100;
      return {
        dailyAPR: dailyAPR.toFixed(2).toString(),
        yearlyAPR: yearlyAPR.toFixed(2).toString(),
        TVL: TVL.toFixed(2).toString(),
      };
    }
  }

  /**
   * Method to return the amount of tokens the pool yields per second
   * @param earnTokenName the name of the token that the pool is earning
   * @param contractName the contract of the pool/bank
   * @param poolContract the actual contract of the pool
   * @returns
   */
  async getTokenPerSecond(
    earnTokenName: string,
    contractName: string,
    poolContract: Contract,
    depositTokenName: string,
  ) {
    if (this.isCustomFarm(poolContract.address)) {
      const { dripper } = this.contracts;
      return await dripper.amountPerSecond();
    }
    if (earnTokenName === 'WLRS') {
      if (contractName.endsWith('GenesisRewardPool')) {
        const rewardPerSecond = await poolContract.wlrsPerSecond();
        // if (depositTokenName === 'WAVAX') {
        //   return rewardPerSecond.mul(6000).div(11000).div(24);
        // } else if (depositTokenName === 'BOO') {
        //   return rewardPerSecond.mul(2500).div(11000).div(24);
        // } else if (depositTokenName === 'ZOO') {
        //   return rewardPerSecond.mul(1000).div(11000).div(24);
        // } else if (depositTokenName === 'SHIBA') {
        //   return rewardPerSecond.mul(1500).div(11000).div(24);
        // }
        return rewardPerSecond /*.div(24)*/;
      }

      const poolStartTime = await poolContract.poolStartTime();
      const startDateTime = new Date(poolStartTime.toNumber() * 1000);
      const FOUR_DAYS = 4 * 24 * 60 * 60 * 1000;
      if (Date.now() - startDateTime.getTime() > FOUR_DAYS) {
        return await poolContract.epochTombPerSecond(1);
      }

      return await poolContract.epocTombPerSecond(0);
    }

    if (earnTokenName === 'NRWL') {
      if (contractName.endsWith('WlrsUsdcGenesisNrwlRewardPool')) {
        const rewardPerSecond = await poolContract.wlrsPerSecond();
        return rewardPerSecond;
      } else if (contractName.endsWith('NrwlYusdGenesisNrwlRewardPool')) {
        const rewardPerSecond = await poolContract.wlrsPerSecond();
        return rewardPerSecond;
      } else if (contractName.endsWith('WshareUsdcGenesisNrwlRewardPool')) {
        const rewardPerSecond = await poolContract.wlrsPerSecond();
        return rewardPerSecond;
      } else if (contractName.endsWith('WshareGenesisNrwlRewardPool')) {
        const rewardPerSecond = await poolContract.wlrsPerSecond();
        return rewardPerSecond;
      }

      const poolStartTime = await poolContract.poolStartTime();
      const startDateTime = new Date(poolStartTime.toNumber() * 1000);
      const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;
      if (Date.now() - startDateTime.getTime() > FOURTEEN_DAYS) {
        return await poolContract.epochTombPerSecond(1);
      }

      return await poolContract.epochTombPerSecond(0);
    }

    const rewardPerSecond = await poolContract.wSharePerSecond();
    if (depositTokenName === 'WLRS-USDC-LP') {
      return rewardPerSecond.mul(3000).div(10000);
    } else if (depositTokenName === 'WLRS-USDIBS-LP') {
      return rewardPerSecond.mul(0).div(10000);
    } else if (depositTokenName === 'WSHARE-USDC-LP') {
      return rewardPerSecond.mul(300).div(10000);
    } else if (depositTokenName === 'NRWL-YUSD-LP') {
      return rewardPerSecond.mul(1000).div(10000);
    } else if (depositTokenName === 'WBOND') {
      return rewardPerSecond.mul(1000).div(10000);
    } else if (depositTokenName === 'XWLRS') {
      return rewardPerSecond.mul(4700).div(10000);
    }
  }
  /**
   * Method to calculate the tokenPrice of the deposited asset in a pool/bank
   * If the deposited token is an LP it will find the price of its pieces
   * @param tokenName
   * @param pool
   * @param token
   * @returns
   */
  async getDepositTokenPriceInDollars(tokenName: string, token: ERC20) {
    let tokenPrice;
    const priceOfOneFtmInDollars = await this.getWFTMPriceFromPancakeswap();
    if (tokenName === 'USDC') {
      tokenPrice = (await this.getUsdcStat()).priceInDollars;
    } else if (tokenName === 'NRWL') {
      tokenPrice = (await this.getNrwlStat()).priceInDollars;
    } else if (tokenName === 'YUSD') {
      tokenPrice = (await this.getYusdStat()).priceInDollars;
    } else if (tokenName === 'WLRS') {
      tokenPrice = (await this.getTombStat()).priceInDollars;
    } else if (tokenName === 'WSHARE') {
      tokenPrice = (await this.getShareStat()).priceInDollars;
    } else if (tokenName === 'WBOND') {
      tokenPrice = (await this.getBondStat()).priceInDollars;
    } else if (!tokenName.includes('-LP')) {
      tokenPrice = (await this.getTokenStat(tokenName)).priceInDollars;
    } else if (tokenName === 'WLRS-USDC-LP') {
      tokenPrice = await this.getLPTokenPrice(token, this.TOMB, true);
    } else if (tokenName === 'WSHARE-USDC-LP') {
      tokenPrice = await this.getLPTokenPrice(token, this.TSHARE, false);
    } else if (tokenName === 'WLRS-USDIBS-LP') {
      tokenPrice = await this.getLPTokenPrice(token, this.TOMB, false);
    } else if (tokenName === 'GRAPE-WLRS-LP') {
      tokenPrice = await this.getLPTokenPrice(token, this.TOMB, true);
    } else if (tokenName === 'NRWL-YUSD-LP') {
      tokenPrice = await this.getLPTokenPrice(token, this.NRWL, false);
    } else if (tokenName === 'XWLRS') {
      tokenPrice = (await this.getXWalrusStat()).priceInDollars;
    } else {
      tokenPrice = await this.getTokenPriceFromPancakeswap(token);
      tokenPrice = (Number(tokenPrice) * Number(priceOfOneFtmInDollars)).toString();
    }
    return tokenPrice;
  }

  //===================================================================
  //===================== GET ASSET STATS =============================
  //=========================== END ===================================
  //===================================================================

  async getCurrentEpoch(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.epoch();
  }

  async getCurrentEpochNrwl(): Promise<BigNumber> {
    const { NrwlTreasury } = this.contracts;
    return NrwlTreasury.epoch();
  }

  async getBondOraclePriceInLastTWAP(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getBondPremiumRate();
  }

  /**
   * Buy bonds with cash.
   * @param amount amount of cash to purchase bonds with.
   */
  async buyBonds(amount: string | number): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    const treasuryTombPrice = await Treasury.getWlrsPrice();
    return await Treasury.buyBonds(decimalToBalance(amount), treasuryTombPrice);
  }

  async buyBondsNrwl(amount: string | number): Promise<TransactionResponse> {
    const { NrwlTreasury } = this.contracts;
    const treasuryTombPrice = await NrwlTreasury.getWlrsPrice();
    return await NrwlTreasury.buyBonds(decimalToBalance(amount), treasuryTombPrice);
  }

  /**
   * Redeem bonds for cash.
   * @param amount amount of bonds to redeem.
   */
  async redeemBonds(amount: string): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    const priceForTomb = await Treasury.getWlrsPrice();
    return await Treasury.redeemBonds(decimalToBalance(amount), priceForTomb);
  }

  async redeemBondsNrwl(amount: string): Promise<TransactionResponse> {
    const { NrwlTreasury } = this.contracts;
    const priceForTomb = await NrwlTreasury.getWlrsPrice();
    return await NrwlTreasury.redeemBonds(decimalToBalance(amount), priceForTomb);
  }

  async getTotalValueLocked(): Promise<number> {
    let totalValue = 0;
    for (const bankInfo of Object.values(bankDefinitions)) {
      const pool = this.contracts[bankInfo.contract];
      const token = this.externalTokens[bankInfo.depositTokenName];
      // const tokenPrice = await this.getDepositTokenPriceInDollars(bankInfo.depositTokenName, token);
      // const tokenAmountInPool = await token.balanceOf(pool.address);

      const [tokenPrice, tokenAmountInPool] = await Promise.all([
        this.getDepositTokenPriceInDollars(bankInfo.depositTokenName, token),
        token.balanceOf(pool.address),
      ]);
      const value = Number(getDisplayBalance(tokenAmountInPool, token.decimal, 6)) * Number(tokenPrice);
      let poolValue = Number.isNaN(value) ? 0 : value;
      if (bankInfo.depositTokenName.endsWith('-USDC-LP')) {
        poolValue = poolValue * 10 ** 6;
      }
      totalValue += poolValue;
    }

    // const TSHAREPrice = (await this.getShareStat()).priceInDollars;
    // const masonrytShareBalanceOf = await this.TSHARE.balanceOf(this.currentMasonry().address);

    const [shareStat, masonrytShareBalanceOf, nrwlShares] = await Promise.all([
      this.getShareStat(),
      this.TSHARE.balanceOf(this.currentMasonry().address),
      this.TSHARE.balanceOf(this.currentMasonryNrwl().address),
    ]);
    const TSHAREPrice = shareStat.priceInDollars;
    const masonryTVL = Number(getDisplayBalance(masonrytShareBalanceOf, this.TSHARE.decimal)) * Number(TSHAREPrice);
    const masonryTVL2 = Number(getDisplayBalance(nrwlShares, this.TSHARE.decimal)) * Number(TSHAREPrice);

    return totalValue + masonryTVL + masonryTVL2;
  }

  /**
   * Calculates the price of an LP token
   * Reference https://github.com/DefiDebauchery/discordpricebot/blob/4da3cdb57016df108ad2d0bb0c91cd8dd5f9d834/pricebot/pricebot.py#L150
   * @param lpToken the token under calculation
   * @param token the token pair used as reference (the other one would be FTM in most cases)
   * @param isTomb sanity check for usage of tomb token or tShare
   * @returns price of the LP token
   */
  async getLPTokenPrice(lpToken: ERC20, token: ERC20, isTomb: boolean): Promise<string> {
    const totalSupply = getFullDisplayBalance(await lpToken.totalSupply(), lpToken.decimal);
    //console.log(totalSupply) // 0.424748198

    //Get amount of tokenA
    const tokenSupply = getFullDisplayBalance(await token.balanceOf(lpToken.address), token.decimal);
    //console.log(tokenSupply) // 771165
    // const stat = isTomb === true ? await this.getTombStat() : await this.getShareStat();
    const stat = await this.getTokenStat(token.symbol);
    const priceOfToken = stat.priceInDollars;
    //console.log(priceOfToken) // 0.36 - wlrs correct
    const divider =
      ['WLRS', 'WSHARE', 'USDC', 'USDT'].includes(token.symbol) && !['WLRS-USDIBS-LP'].includes(lpToken.symbol)
        ? 10 ** 6
        : 1;
    const tokenInLP = Number(tokenSupply) / Number(totalSupply) / divider;
    //console.log(tokenInLP) // NOTE: hot fix 1.8155826389045446
    const tokenPrice = (Number(priceOfToken) * tokenInLP * 2) //We multiply by 2 since half the price of the lp token is the price of each piece of the pair. So twice gives the total
      .toString();
    //console.log(tokenPrice)
    return tokenPrice;
  }

  async getNrwlStat(): Promise<TokenStat> {
    const { chainId } = this.config;
    const pairAddress = this.config.externalTokens['NRWL-YUSD-LP'][0];
    const contract = new Contract(
      pairAddress,
      [
        'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
        'function token0() external view returns (address)',
        'function token1() external view returns (address)',
      ],
      this.provider,
    );
    const reserves = await contract.getReserves();
    const token0Address = await contract.token0();
    const token1Address = await contract.token1();
    const { YUSD, NRWL } = this.config.externalTokens;
    const tokenA = new TokenSwapsicle(chainId, YUSD[0], YUSD[1]);
    const tokenB = new TokenSwapsicle(chainId, NRWL[0], NRWL[1]);
    const token0 = [tokenA, tokenB].find((token) => token.address === token0Address);
    const token1 = [tokenA, tokenB].find((token) => token.address === token1Address);
    const pair = new PairSwapsicle(
      CurrencyAmountSwapsicle.fromRawAmount(token1, reserves.reserve1.toString()),
      CurrencyAmountSwapsicle.fromRawAmount(token0, reserves.reserve0.toString()),
    );
    const route = new RouteSwapsicle([pair], tokenA, tokenB);
    const tokenAmount = CurrencyAmountSwapsicle.fromRawAmount(tokenA, '1000000000000000000');
    const trade = new TradeSwapsicle(route, tokenAmount, TradeTypeSwapsicle.EXACT_INPUT);
    const yusdStat = await this.getYusdStat();
    const {
      NrwlYusdGenesisNrwlRewardPool,
      WlrsUsdcGenesisNrwlRewardPool,
      WshareUsdcGenesisNrwlRewardPool,
      WshareGenesisNrwlRewardPool,
    } = this.contracts;
    const supply = await this.NRWL.totalSupply();
    const [supply1, supply2, supply3, supply4] = await Promise.all([
      this.NRWL.balanceOf(NrwlYusdGenesisNrwlRewardPool.address),
      this.NRWL.balanceOf(WlrsUsdcGenesisNrwlRewardPool.address),
      this.NRWL.balanceOf(WshareGenesisNrwlRewardPool.address),
      this.NRWL.balanceOf(WshareUsdcGenesisNrwlRewardPool.address),
    ]);
    const tombRewardPoolSupply = supply1.add(supply2).add(supply3).add(supply4);
    const circulatingSupply = supply.sub(tombRewardPoolSupply);

    return {
      tokenInFtm: (1 / Number(trade.executionPrice.toSignificant(18))).toFixed(4),
      priceInDollars: ((1 / Number(trade.executionPrice.toSignificant(18))) * Number(yusdStat.priceInDollars)).toFixed(
        18,
      ),
      totalSupply: getDisplayBalance(supply, this.NRWL.decimal, 0),
      circulatingSupply: getDisplayBalance(circulatingSupply, this.NRWL.decimal, 0),
    };
  }

  async getTokenStat(tokenName: string): Promise<TokenStat> {
    switch (tokenName) {
      case 'YUSD':
        return this.getYusdStat();
      case 'NRWL':
        return this.getNrwlStat();
      case 'USDT':
        return this.getUsdtStat();
      case 'USDC':
        return this.getUsdcStat();
      case 'WLRS':
        return this.getTombStat();
      case 'WSHARE':
        return this.getShareStat();
      case 'DIBS':
        return this.getDibsStat();
      case 'SNO':
      case 'SNOBOND':
        return this.getSnoStat();
      case 'WAVAX':
        return this.getAvaxStat();
      case 'FOX':
        return this.getFoxStat();
      case 'GRAPE':
        return this.getGrapeStat();
      case 'USDIBS':
        return this.getUSDibsStat();
      case 'WBOND':
        return this.getBondStat();
      case 'XWLRS':
        return this.getXWalrusStat();
      default:
        throw new Error(`Unknown token name: ${tokenName}`);
    }
  }

  async getYusdStat(): Promise<TokenStat> {
    try {
      if (!this.yUSDStats.priceInDollars) {
        console.log('getYusdStat');
        const { data } = await axios(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=yusd-stablecoin',
        );
        this.yUSDStats = {
          tokenInFtm: data[0].current_price,
          priceInDollars: data[0].current_price,
          totalSupply: '0',
          circulatingSupply: '0',
        };
      }
    } catch (err) {
      console.error(err);
    }
    return this.yUSDStats;
  }

  async getUsdtStat(): Promise<TokenStat> {
    try {
      if (!this.usdtStats.priceInDollars) {
        console.log('getUsdtStat');
        const { data } = await axios(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether-avalanche-bridged-usdt-e',
        );
        this.usdtStats = {
          tokenInFtm: data[0].current_price,
          priceInDollars: data[0].current_price,
          totalSupply: '0',
          circulatingSupply: '0',
        };
      }
    } catch (err) {
      console.error(err);
    }
    return this.usdtStats;
  }

  async getTreasuryValue(): Promise<Number> {
    const treasuryWalletAddress = '0x2bA4Da735d3cE9177216102E9FDABae67E1ac524';
    const { WSHARE, USDC } = this.externalTokens;
    const wlrsUsdcLP = this.externalTokens['WLRS-USDC-LP'];
    const wshareUsdcLP = this.externalTokens['WSHARE-USDC-LP'];
    const nrwlYusdLP = this.externalTokens['NRWL-YUSD-LP'];

    const usdcBalance = Number(await USDC.balanceOf(treasuryWalletAddress)) / 1e6;
    const wshareBalance = Number(await WSHARE.balanceOf(treasuryWalletAddress)) / 1e18;
    const usdcPrice = Number(await this.getDepositTokenPriceInDollars('USDC', null));
    const wsharePrice = Number(await this.getDepositTokenPriceInDollars('WSHARE', null));

    const wlrsUSDCNodes = Number((await this.getNodes('PegLPNode', treasuryWalletAddress))[0]);
    const wshareUSDCNodes = Number((await this.getNodes('ShareLPNode', treasuryWalletAddress))[0]);
    const nrwlYusdNodes = Number((await this.getNodes('LPNrwlNode', treasuryWalletAddress))[0]);
    const wlrsUSDCPrice = Number(await this.getDepositTokenPriceInDollars('WLRS-USDC-LP', wlrsUsdcLP));
    const wshareUSDCPrice = Number(await this.getDepositTokenPriceInDollars('WSHARE-USDC-LP', wshareUsdcLP));
    const nrwlYUSDPrice = Number(await this.getDepositTokenPriceInDollars('NRWL-YUSD-LP', nrwlYusdLP));
    const wlrsUSDCNodePrice = Number(await this.getNodePrice('PegLPNode', 0));
    const wshareUSDCNodePrice = Number(await this.getNodePrice('ShareLPNode', 0));
    const nrwlYUDNodePrice = Number(await this.getNodePrice('LPNrwlNode', 0));

    const stakedWSHAREBalance = Number((await this.contracts.Masonry.balanceOf(treasuryWalletAddress)) / 1e18);

    const totalInWallet = usdcBalance * usdcPrice + wshareBalance * wsharePrice;
    const totalInBR = stakedWSHAREBalance * wsharePrice;
    const totalInNodes =
      (wlrsUSDCNodes * wlrsUSDCPrice * wlrsUSDCNodePrice +
        wshareUSDCNodes * wshareUSDCPrice * wshareUSDCNodePrice +
        nrwlYusdNodes * nrwlYUSDPrice * nrwlYUDNodePrice) /
      1e12;

    return totalInWallet + totalInBR + totalInNodes;
  }

  async getUsdcStat(): Promise<TokenStat> {
    try {
      if (!this.usdcStats.priceInDollars) {
        console.log('getUsdcStat');
        const { data } = await axios(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=usd-coin-avalanche-bridged-usdc-e',
        );
        this.usdcStats = {
          tokenInFtm: data[0].current_price,
          priceInDollars: data[0].current_price,
          totalSupply: '0',
          circulatingSupply: '0',
        };
      }
    } catch (err) {
      console.error(err);
    }
    return this.usdcStats;
  }

  async getDibsStat(): Promise<TokenStat> {
    const { WAVAX } = this.config.externalTokens;
    const [priceInAvax, priceOfOneAvax] = await Promise.all([
      this.getTokenPriceFromPancakeswap(this.DIBS, new Token(this.config.chainId, WAVAX[0], WAVAX[1], 'WAVAX')),
      this.getAvaxPriceFromPancakeswap(),
    ]);

    const priceInDollars = (Number(priceInAvax) * Number(priceOfOneAvax)).toFixed(12);
    return {
      tokenInFtm: priceInAvax,
      priceInDollars,
      totalSupply: '0',
      circulatingSupply: '0',
    };
  }

  async getSnoStat(): Promise<TokenStat> {
    const { JOE } = this.config.externalTokens;
    const [priceInJoe, priceOfOneJoe] = await Promise.all([
      this.getTokenPriceFromPancakeswap(this.SNO, new Token(this.config.chainId, JOE[0], JOE[1], 'JOE')),
      this.getJoePriceFromPancakeswap(),
    ]);

    const priceInDollars = (Number(priceInJoe) * Number(priceOfOneJoe)).toFixed(12);
    return {
      tokenInFtm: priceInJoe,
      priceInDollars,
      totalSupply: '0',
      circulatingSupply: '0',
    };
  }

  async getFoxStat(): Promise<TokenStat> {
    const { JOE } = this.config.externalTokens;
    const [priceInJoe, priceOfOneJoe] = await Promise.all([
      this.getTokenPriceFromPancakeswap(this.FOX, new Token(this.config.chainId, JOE[0], JOE[1], 'JOE')),
      this.getJoePriceFromPancakeswap(),
    ]);

    const priceInDollars = (Number(priceInJoe) * Number(priceOfOneJoe)).toFixed(12);
    return {
      tokenInFtm: priceInJoe,
      priceInDollars,
      totalSupply: '0',
      circulatingSupply: '0',
    };
  }

  async getGrapeStat(): Promise<TokenStat> {
    const { MIM } = this.config.externalTokens;
    const [priceInMim, priceOfOneMim] = await Promise.all([
      this.getTokenPriceFromPancakeswap(this.GRAPE, new Token(this.config.chainId, MIM[0], MIM[1], 'MIM')),
      this.getMimPriceFromPancakeswap(),
    ]);

    const priceInDollars = (Number(priceInMim) * Number(priceOfOneMim)).toFixed(12);
    return {
      tokenInFtm: priceInMim,
      priceInDollars,
      totalSupply: '0',
      circulatingSupply: '0',
    };
  }

  async getAvaxStat(): Promise<TokenStat> {
    const priceInDollars = await this.getAvaxPriceFromPancakeswap();
    return {
      tokenInFtm: priceInDollars,
      priceInDollars,
      totalSupply: '0',
      circulatingSupply: '0',
    };
  }

  async getUSDibsStat(): Promise<TokenStat> {
    const [priceInFTM, priceOfOneFTM] = await Promise.all([
      this.getTokenPriceFromPancakeswap(this.USDIBS),
      this.getUsdcStat(),
    ]);

    const priceInDollars = (Number(priceInFTM) * Number(priceOfOneFTM.tokenInFtm)).toFixed(12);
    return {
      tokenInFtm: priceInFTM,
      priceInDollars,
      totalSupply: '0',
      circulatingSupply: '0',
    };
  }

  async getAvaxPriceFromPancakeswap(): Promise<string> {
    const ready = await this.provider.ready;
    if (!ready) return;
    const { WAVAX, USDC } = this.externalTokens;
    try {
      const busd_eth_lp_pair = this.externalTokens['USDC-WAVAX-LP'];
      let eth_amount_BN = await WAVAX.balanceOf(busd_eth_lp_pair.address);
      let eth_amount = Number(getFullDisplayBalance(eth_amount_BN, WAVAX.decimal));
      let busd_amount_BN = await USDC.balanceOf(busd_eth_lp_pair.address);
      let busd_amount = Number(getFullDisplayBalance(busd_amount_BN, USDC.decimal));
      return (busd_amount / eth_amount).toString();
    } catch (err) {
      console.error(`Failed to fetch token price of ETH: ${err}`);
    }
  }

  async getMimPriceFromPancakeswap(): Promise<string> {
    const ready = await this.provider.ready;
    if (!ready) return;
    const avaxPrice = await this.getAvaxPriceFromPancakeswap();
    const { MIM, WAVAX } = this.externalTokens;
    try {
      const busd_eth_lp_pair = this.externalTokens['MIM-WAVAX-LP'];
      let eth_amount_BN = await WAVAX.balanceOf(busd_eth_lp_pair.address);
      let eth_amount = Number(getFullDisplayBalance(eth_amount_BN, WAVAX.decimal));
      let busd_amount_BN = await MIM.balanceOf(busd_eth_lp_pair.address);
      let busd_amount = Number(getFullDisplayBalance(busd_amount_BN, MIM.decimal));
      return (busd_amount / eth_amount / Number(avaxPrice)).toString();
    } catch (err) {
      console.error(`Failed to fetch token price of ETH: ${err}`);
    }
  }

  async getJoePriceFromPancakeswap(): Promise<string> {
    const ready = await this.provider.ready;
    if (!ready) return;
    const { JOE, USDC } = this.externalTokens;
    try {
      const busd_eth_lp_pair = this.externalTokens['USDC-JOE-LP'];
      let eth_amount_BN = await JOE.balanceOf(busd_eth_lp_pair.address);
      let eth_amount = Number(getFullDisplayBalance(eth_amount_BN, JOE.decimal));
      let busd_amount_BN = await USDC.balanceOf(busd_eth_lp_pair.address);
      let busd_amount = Number(getFullDisplayBalance(busd_amount_BN, USDC.decimal));
      return (busd_amount / eth_amount).toString();
    } catch (err) {
      console.error(`Failed to fetch token price of ETH: ${err}`);
    }
  }

  async earnedFromBank(
    poolName: ContractName,
    earnTokenName: String,
    poolId: Number,
    account = this.myAccount,
  ): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      if (this.isCustomFarm(pool.address)) {
        console.log('IS CUSTOM FARM');
        return await pool.pendingShare(account);
      }
      if (earnTokenName === 'WLRS-USDC-LP' && poolName.includes('Node')) {
        return await pool.getTotalRewards(account);
      }
      if (earnTokenName === 'WSHARE-USDC-LP' && poolName.includes('Node')) {
        return await pool.getTotalRewards(account);
      }
      if (earnTokenName === 'GRAPE-WLRS-LP' && poolName.includes('Node')) {
        return await pool.getTotalRewards(account);
      }
      if (earnTokenName === 'NRWL-YUSD-LP' && poolName.includes('Node')) {
        return await pool.getTotalRewards(account);
      }
      if (earnTokenName === 'WLRS') {
        return await pool.pendingWLRS(poolId, account);
      }
      if (earnTokenName === 'NRWL') {
        return await pool.pendingWLRS(poolId, account);
      } else {
        return await pool.pendingShare(poolId, account);
      }
    } catch (err) {
      console.error(`Failed to call earned() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async stakedBalanceOnBank(poolName: ContractName, poolId: Number, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      if (this.isCustomFarm(pool.address)) {
        return await pool.balanceOf(account);
      }
      let userInfo = await pool.userInfo(poolId, account);
      return await userInfo.amount;
    } catch (err) {
      console.error(`Failed to call balanceOf() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  isCustomFarm = (poolAddress: string): boolean => {
    return poolAddress === '0x1472bA4257Fe551274bC46d09F826ab7979dE43a';
  };

  /**
   * Deposits token to given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async stake(
    poolName: ContractName,
    poolId: Number,
    sectionInUI: Number,
    amount: BigNumber,
  ): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    if (this.isCustomFarm(pool.address)) {
      return await pool.deposit(amount);
    }
    return sectionInUI !== 4 ? await pool.deposit(poolId, amount) : await pool.create(poolId, amount);
  }

  /**
   * Withdraws token from given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async unstake(poolName: ContractName, poolId: Number, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    if (this.isCustomFarm(pool.address)) {
      return await pool.withdraw(amount);
    }
    return await pool.withdraw(poolId, amount);
  }

  /**
   * Transfers earned token reward from given pool to my account.
   */
  async harvest(poolName: ContractName, poolId: Number, sectionInUI: Number): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    if (this.isCustomFarm(pool.address)) {
      return await pool.claimRewards();
    }
    //By passing 0 as the amount, we are asking the contract to only redeem the reward and not the currently staked token
    return sectionInUI !== 4 ? await pool.withdraw(poolId, 0) : await pool.claim();
  }

  /**
   * Harvests and withdraws deposited tokens from the pool.
   */
  async exit(poolName: ContractName, poolId: Number, account = this.myAccount): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    if (this.isCustomFarm(pool.address)) {
      let balance = await pool.balanceOf(account);
      return await pool.withdraw(balance);
    }
    let userInfo = await pool.userInfo(poolId, account);
    return await pool.withdraw(poolId, userInfo.amount);
  }

  async fetchMasonryVersionOfUser(): Promise<string> {
    return 'latest';
  }

  currentMasonry(): Contract {
    if (!this.masonryVersionOfUser) {
      //throw new Error('you must unlock the wallet to continue.');
    }
    return this.contracts.Masonry;
  }

  currentMasonryNrwl(): Contract {
    if (!this.masonryVersionOfUser) {
      //throw new Error('you must unlock the wallet to continue.');
    }
    return this.contracts.NrwlBoardroom;
  }

  isOldMasonryMember(): boolean {
    return this.masonryVersionOfUser !== 'latest';
  }

  async getTokenPriceFromPancakeswap(tokenContract: ERC20, baseToken?: Token): Promise<string> {
    const ready = await this.provider.ready;
    if (!ready) return;
    const { chainId } = this.config;
    const { USDC } = this.config.externalTokens;

    const wftm = baseToken || new Token(chainId, USDC[0], USDC[1]);
    const token = new Token(chainId, tokenContract.address, tokenContract.decimal, tokenContract.symbol);
    try {
      const wftmToToken = await Fetcher.fetchPairData(wftm, token, this.provider);
      const priceInBUSD = new Route([wftmToToken], token);
      return priceInBUSD.midPrice.toFixed(18);
    } catch (err) {
      console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }
  }

  async getTokenPriceFromSpiritswap(tokenContract: ERC20): Promise<string> {
    const ready = await this.provider.ready;
    if (!ready) return;
    const { chainId } = this.config;
    const { WFTM } = this.externalTokens;

    const wftm = new TokenSpirit(chainId, WFTM.address, WFTM.decimal);
    const token = new TokenSpirit(chainId, tokenContract.address, tokenContract.decimal, tokenContract.symbol);
    try {
      const wftmToToken = await FetcherSpirit.fetchPairData(wftm, token, this.provider);
      const liquidityToken = wftmToToken.liquidityToken;
      let ftmBalanceInLP = await WFTM.balanceOf(liquidityToken.address);
      let ftmAmount = Number(getFullDisplayBalance(ftmBalanceInLP, WFTM.decimal));
      let shibaBalanceInLP = await tokenContract.balanceOf(liquidityToken.address);
      let shibaAmount = Number(getFullDisplayBalance(shibaBalanceInLP, tokenContract.decimal));
      const priceOfOneFtmInDollars = await this.getWFTMPriceFromPancakeswap();
      let priceOfShiba = (ftmAmount / shibaAmount) * Number(priceOfOneFtmInDollars);
      return priceOfShiba.toString();
    } catch (err) {
      console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }
  }

  async getWFTMPriceFromPancakeswap(): Promise<string> {
    const ready = await this.provider.ready;
    if (!ready) return;
    return (await this.getUsdcStat()).priceInDollars;
    // const { WFTM, FUSDT } = this.externalTokens;
    // try {
    //   const fusdt_wftm_lp_pair = this.externalTokens['WAVAX-USDC-LP'];
    //   let ftm_amount_BN = await WFTM.balanceOf(fusdt_wftm_lp_pair.address);
    //   let ftm_amount = Number(getFullDisplayBalance(ftm_amount_BN, WFTM.decimal));
    //   let fusdt_amount_BN = await FUSDT.balanceOf(fusdt_wftm_lp_pair.address);
    //   let fusdt_amount = Number(getFullDisplayBalance(fusdt_amount_BN, FUSDT.decimal));
    //   return (fusdt_amount / ftm_amount).toString();
    // } catch (err) {
    //   console.error(`Failed to fetch token price of WAVAX: ${err}`);
    // }
  }

  //===================================================================
  //===================================================================
  //===================== MASONRY METHODS =============================
  //===================================================================
  //===================================================================

  async getMasonryAPR() {
    const Masonry = this.currentMasonry();
    const latestSnapshotIndex = await Masonry.latestSnapshotIndex();
    const lastHistory = await Masonry.boardroomHistory(latestSnapshotIndex);

    const lastRewardsReceived = lastHistory[1];

    const TSHAREPrice = (await this.getShareStat()).priceInDollars;
    const TOMBPrice = (await this.getTombStat()).priceInDollars;
    const epochRewardsPerShare = lastRewardsReceived / 1e18;

    //Mgod formula
    const amountOfRewardsPerDay = epochRewardsPerShare * Number(TOMBPrice) * 4;
    const masonrytShareBalanceOf = await this.TSHARE.balanceOf(Masonry.address);
    const masonryTVL = Number(getDisplayBalance(masonrytShareBalanceOf, this.TSHARE.decimal)) * Number(TSHAREPrice);
    const realAPR = ((amountOfRewardsPerDay * 100) / masonryTVL) * 365;
    return realAPR;
  }

  async getMasonryAPRNrwl() {
    const Masonry = this.currentMasonryNrwl();
    const latestSnapshotIndex = await Masonry.latestSnapshotIndex();
    const lastHistory = await Masonry.boardroomHistory(latestSnapshotIndex);

    const lastRewardsReceived = lastHistory[1];

    const TSHAREPrice = (await this.getShareStat()).priceInDollars;
    const TOMBPrice = (await this.getNrwlStat()).priceInDollars;
    const epochRewardsPerShare = lastRewardsReceived / 1e18;

    //Mgod formula
    const amountOfRewardsPerDay = epochRewardsPerShare * Number(TOMBPrice) * 4;
    const masonrytShareBalanceOf = await this.TSHARE.balanceOf(Masonry.address);
    const masonryTVL = Number(getDisplayBalance(masonrytShareBalanceOf, this.TSHARE.decimal)) * Number(TSHAREPrice);
    const realAPR = ((amountOfRewardsPerDay * 100) / masonryTVL) * 365;
    return realAPR;
  }

  /**
   * Checks if the user is allowed to retrieve their reward from the Masonry
   * @returns true if user can withdraw reward, false if they can't
   */
  async canUserClaimRewardFromMasonry(): Promise<boolean> {
    const Masonry = this.currentMasonry();
    return await Masonry.canClaimReward(this.myAccount);
  }

  async canUserClaimRewardFromMasonryNrwl(): Promise<boolean> {
    const Masonry = this.currentMasonryNrwl();
    return await Masonry.canClaimReward(this.myAccount);
  }

  /**
   * Checks if the user is allowed to retrieve their reward from the Masonry
   * @returns true if user can withdraw reward, false if they can't
   */
  async canUserUnstakeFromMasonry(): Promise<boolean> {
    const Masonry = this.currentMasonry();
    const canWithdraw = await Masonry.canWithdraw(this.myAccount);
    const stakedAmount = await this.getStakedSharesOnMasonry();
    const notStaked = Number(getDisplayBalance(stakedAmount, this.TSHARE.decimal)) === 0;
    const result = notStaked ? true : canWithdraw;
    return result;
  }

  async canUserUnstakeFromMasonryNrwl(): Promise<boolean> {
    const Masonry = this.currentMasonryNrwl();
    const canWithdraw = await Masonry.canWithdraw(this.myAccount);
    const stakedAmount = await this.getStakedSharesOnMasonryNrwl();
    const notStaked = Number(getDisplayBalance(stakedAmount, this.TSHARE.decimal)) === 0;
    const result = notStaked ? true : canWithdraw;
    return result;
  }

  async timeUntilClaimRewardFromMasonry(): Promise<BigNumber> {
    // const Masonry = this.currentMasonry();
    // const mason = await Masonry.members(this.myAccount);
    return BigNumber.from(0);
  }

  async getTotalStakedInMasonry(): Promise<BigNumber> {
    const Masonry = this.currentMasonry();
    return await Masonry.totalSupply();
  }

  async getTotalStakedInMasonryNrwl(): Promise<BigNumber> {
    const Masonry = this.currentMasonryNrwl();
    return await Masonry.totalSupply();
  }

  async stakeShareToMasonry(amount: string): Promise<TransactionResponse> {
    if (this.isOldMasonryMember()) {
      throw new Error("you're using old boardroom. please withdraw and deposit the WSHARE again.");
    }
    const Masonry = this.currentMasonry();
    return await Masonry.stake(decimalToBalance(amount));
  }

  async stakeShareToMasonryNrwl(amount: string): Promise<TransactionResponse> {
    if (this.isOldMasonryMember()) {
      throw new Error("you're using old boardroom. please withdraw and deposit the WSHARE again.");
    }
    const Masonry = this.currentMasonryNrwl();
    return await Masonry.stake(decimalToBalance(amount));
  }

  async getStakedSharesOnMasonry(): Promise<BigNumber> {
    const Masonry = this.currentMasonry();
    return await Masonry.balanceOf(this.myAccount);
  }

  async getStakedSharesOnMasonryNrwl(): Promise<BigNumber> {
    const Masonry = this.currentMasonryNrwl();
    return await Masonry.balanceOf(this.myAccount);
  }

  async getEarningsOnMasonry(): Promise<BigNumber> {
    const Masonry = this.currentMasonry();
    return await Masonry.earned(this.myAccount);
  }

  async getEarningsOnMasonryNrwl(): Promise<BigNumber> {
    const Masonry = this.currentMasonryNrwl();
    return await Masonry.earned(this.myAccount);
  }

  async withdrawShareFromMasonry(amount: string): Promise<TransactionResponse> {
    const Masonry = this.currentMasonry();
    return await Masonry.withdraw(decimalToBalance(amount));
  }

  async withdrawShareFromMasonryNrwl(amount: string): Promise<TransactionResponse> {
    const Masonry = this.currentMasonryNrwl();
    return await Masonry.withdraw(decimalToBalance(amount));
  }

  async harvestCashFromMasonry(): Promise<TransactionResponse> {
    const Masonry = this.currentMasonry();
    return await Masonry.claimReward();
  }

  async harvestCashFromMasonryNrwl(): Promise<TransactionResponse> {
    const Masonry = this.currentMasonryNrwl();
    return await Masonry.claimReward();
  }

  async exitFromMasonry(): Promise<TransactionResponse> {
    const Masonry = this.currentMasonry();
    return await Masonry.exit();
  }

  async exitFromMasonryNrwl(): Promise<TransactionResponse> {
    const Masonry = this.currentMasonryNrwl();
    return await Masonry.exit();
  }

  async getTreasuryNextAllocationTime(): Promise<AllocationTime> {
    const { Treasury } = this.contracts;
    const nextEpochTimestamp: BigNumber = await Treasury.nextEpochPoint();
    const nextAllocation = new Date(nextEpochTimestamp.mul(1000).toNumber());
    const prevAllocation = new Date(Date.now());

    return { from: prevAllocation, to: nextAllocation };
  }

  async getTreasuryNextAllocationTimeNrwl(): Promise<AllocationTime> {
    const { NrwlTreasury } = this.contracts;
    const nextEpochTimestamp: BigNumber = await NrwlTreasury.nextEpochPoint();
    const nextAllocation = new Date(nextEpochTimestamp.mul(1000).toNumber());
    const prevAllocation = new Date(Date.now());

    return { from: prevAllocation, to: nextAllocation };
  }

  /**
   * This method calculates and returns in a from to to format
   * the period the user needs to wait before being allowed to claim
   * their reward from the masonry
   * @returns Promise<AllocationTime>
   */
  async getUserClaimRewardTime(): Promise<AllocationTime> {
    const { Masonry, Treasury } = this.contracts;
    const nextEpochTimestamp = await Masonry.nextEpochPoint(); //in unix timestamp
    const currentEpoch = await Masonry.epoch();
    const mason = await Masonry.members(this.myAccount);
    const startTimeEpoch = mason.epochTimerStart;
    const period = await Treasury.PERIOD();
    const periodInHours = period / 60 / 60; // 6 hours, period is displayed in seconds which is 21600
    const rewardLockupEpochs = await Masonry.rewardLockupEpochs();
    const targetEpochForClaimUnlock = Number(startTimeEpoch) + Number(rewardLockupEpochs);

    const fromDate = new Date(Date.now());
    if (targetEpochForClaimUnlock - currentEpoch <= 0) {
      return { from: fromDate, to: fromDate };
    } else if (targetEpochForClaimUnlock - currentEpoch === 1) {
      const toDate = new Date(nextEpochTimestamp * 1000);
      return { from: fromDate, to: toDate };
    } else {
      const toDate = new Date(nextEpochTimestamp * 1000);
      const delta = targetEpochForClaimUnlock - currentEpoch - 1;
      const endDate = moment(toDate)
        .add(delta * periodInHours, 'hours')
        .toDate();
      return { from: fromDate, to: endDate };
    }
  }

  async getUserClaimRewardTimeNrwl(): Promise<AllocationTime> {
    const Masonry = this.currentMasonryNrwl();
    const { NrwlTreasury } = this.contracts;
    const nextEpochTimestamp = await Masonry.nextEpochPoint(); //in unix timestamp
    const currentEpoch = await Masonry.epoch();
    const mason = await Masonry.members(this.myAccount);
    const startTimeEpoch = mason.epochTimerStart;
    const period = await NrwlTreasury.PERIOD();
    const periodInHours = period / 60 / 60; // 6 hours, period is displayed in seconds which is 21600
    const rewardLockupEpochs = await Masonry.rewardLockupEpochs();
    const targetEpochForClaimUnlock = Number(startTimeEpoch) + Number(rewardLockupEpochs);

    const fromDate = new Date(Date.now());
    if (targetEpochForClaimUnlock - currentEpoch <= 0) {
      return { from: fromDate, to: fromDate };
    } else if (targetEpochForClaimUnlock - currentEpoch === 1) {
      const toDate = new Date(nextEpochTimestamp * 1000);
      return { from: fromDate, to: toDate };
    } else {
      const toDate = new Date(nextEpochTimestamp * 1000);
      const delta = targetEpochForClaimUnlock - currentEpoch - 1;
      const endDate = moment(toDate)
        .add(delta * periodInHours, 'hours')
        .toDate();
      return { from: fromDate, to: endDate };
    }
  }

  /**
   * This method calculates and returns in a from to to format
   * the period the user needs to wait before being allowed to unstake
   * from the masonry
   * @returns Promise<AllocationTime>
   */
  async getUserUnstakeTime(): Promise<AllocationTime> {
    const { Masonry, Treasury } = this.contracts;
    const nextEpochTimestamp = await Masonry.nextEpochPoint();
    const currentEpoch = await Masonry.epoch();
    const mason = await Masonry.members(this.myAccount);
    const startTimeEpoch = mason.epochTimerStart;
    const period = await Treasury.PERIOD();
    const PeriodInHours = period / 60 / 60;
    const withdrawLockupEpochs = await Masonry.withdrawLockupEpochs();
    const fromDate = new Date(Date.now());
    const targetEpochForClaimUnlock = Number(startTimeEpoch) + Number(withdrawLockupEpochs);
    const stakedAmount = await this.getStakedSharesOnMasonry();
    if (currentEpoch <= targetEpochForClaimUnlock && Number(stakedAmount) === 0) {
      return { from: fromDate, to: fromDate };
    } else if (targetEpochForClaimUnlock - currentEpoch === 1) {
      const toDate = new Date(nextEpochTimestamp * 1000);
      return { from: fromDate, to: toDate };
    } else {
      const toDate = new Date(nextEpochTimestamp * 1000);
      const delta = targetEpochForClaimUnlock - Number(currentEpoch) - 1;
      const endDate = moment(toDate)
        .add(delta * PeriodInHours, 'hours')
        .toDate();
      return { from: fromDate, to: endDate };
    }
  }

  async getUserUnstakeTimeNrwl(): Promise<AllocationTime> {
    const Masonry = this.currentMasonryNrwl();
    const { NrwlTreasury } = this.contracts;
    const nextEpochTimestamp = await Masonry.nextEpochPoint();
    const currentEpoch = await Masonry.epoch();
    const mason = await Masonry.members(this.myAccount);
    const startTimeEpoch = mason.epochTimerStart;
    const period = await NrwlTreasury.PERIOD();
    const PeriodInHours = period / 60 / 60;
    const withdrawLockupEpochs = await Masonry.withdrawLockupEpochs();
    const fromDate = new Date(Date.now());
    const targetEpochForClaimUnlock = Number(startTimeEpoch) + Number(withdrawLockupEpochs);
    const stakedAmount = await this.getStakedSharesOnMasonryNrwl();
    if (currentEpoch <= targetEpochForClaimUnlock && Number(stakedAmount) === 0) {
      return { from: fromDate, to: fromDate };
    } else if (targetEpochForClaimUnlock - currentEpoch === 1) {
      const toDate = new Date(nextEpochTimestamp * 1000);
      return { from: fromDate, to: toDate };
    } else {
      const toDate = new Date(nextEpochTimestamp * 1000);
      const delta = targetEpochForClaimUnlock - Number(currentEpoch) - 1;
      const endDate = moment(toDate)
        .add(delta * PeriodInHours, 'hours')
        .toDate();
      return { from: fromDate, to: endDate };
    }
  }

  async watchAssetInMetamask(assetName: string): Promise<boolean> {
    const { ethereum } = window as any;

    let asset;
    let assetUrl;
    if (assetName === 'WLRS') {
      asset = this.TOMB;
      assetUrl = 'https://github.com/frozenwalrus/interface/blob/7bfbca5e1a18a763f46165b0ed0c45960fcdece1/public/wlrs-resize.png?raw=true';
    } else if (assetName === 'WSHARE') {
      asset = this.TSHARE;
      assetUrl = 'https://github.com/frozenwalrus/interface/blob/main/public/wshare-resize.png?raw=true';
    } else if (assetName === 'NRWL') {
      asset = this.NRWL;
      assetUrl = 'https://github.com/frozenwalrus/interface/blob/main/public/nrwl-resize.png?raw=true';
    } else if (assetName === 'WBOND') {
      asset = this.TBOND;
      assetUrl = 'https://github.com/frozenwalrus/interface/blob/7bfbca5e1a18a763f46165b0ed0c45960fcdece1/public/bond-resize.png?raw=true';
    } else if (assetName === 'WLRS-USDC.e LP') {
      asset = this.TOMBWFTM_LP;
      // assetUrl = 'https://gateway.pinata.cloud/ipfs/QmVCNLxo6vRUr3qCaNHJPwVL7jMGBf18FSa65zkeaHSbua';
    } else if (assetName === 'WSHARE-USDC.e LP') {
      asset = this.WSHAREUSDC;
      // assetUrl = 'https://gateway.pinata.cloud/ipfs/QmVCNLxo6vRUr3qCaNHJPwVL7jMGBf18FSa65zkeaHSbua';
    } else if (assetName === 'NRWL-YUSD LP') {
      asset = this.NRWLYUSD;
      // assetUrl = 'https://gateway.pinata.cloud/ipfs/QmVCNLxo6vRUr3qCaNHJPwVL7jMGBf18FSa65zkeaHSbua';
    }

    await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: asset.address,
          symbol: assetName,
          decimals: 18,
          image: assetUrl,
        },
      },
    });

    return true;
  }

  async provideTombFtmLP(ftmAmount: string, tombAmount: BigNumber): Promise<TransactionResponse> {
    const { TaxOffice } = this.contracts;
    let overrides = {
      value: parseUnits(ftmAmount, 18),
    };
    return await TaxOffice.addLiquidityETHTaxFree(
      tombAmount,
      tombAmount.mul(992).div(1000),
      parseUnits(ftmAmount, 18).mul(992).div(1000),
      overrides,
    );
  }

  async quoteFromSpooky(tokenAmount: string, tokenName: string): Promise<string> {
    const { SpookyRouter } = this.contracts;
    const { _reserve0, _reserve1 } = await this.TOMBWFTM_LP.getReserves();
    let quote;
    if (tokenName === 'TOMB') {
      quote = await SpookyRouter.quote(parseUnits(tokenAmount), _reserve1, _reserve0);
    } else {
      quote = await SpookyRouter.quote(parseUnits(tokenAmount), _reserve0, _reserve1);
    }
    return (quote / 1e18).toString();
  }

  /**
   * @returns an array of the regulation events till the most up to date epoch
   */
  async listenForRegulationsEvents(): Promise<any> {
    const { Treasury } = this.contracts;

    const treasuryDaoFundedFilter = Treasury.filters.DaoFundFunded();
    const treasuryDevFundedFilter = Treasury.filters.DevFundFunded();
    const treasuryMasonryFundedFilter = Treasury.filters.MasonryFunded();
    const boughtBondsFilter = Treasury.filters.BoughtBonds();
    const redeemBondsFilter = Treasury.filters.RedeemedBonds();

    let epochBlocksRanges: any[] = [];
    let masonryFundEvents = await Treasury.queryFilter(treasuryMasonryFundedFilter);
    var events: any[] = [];
    masonryFundEvents.forEach(function callback(value, index) {
      events.push({ epoch: index + 1 });
      events[index].masonryFund = getDisplayBalance(value.args[1]);
      if (index === 0) {
        epochBlocksRanges.push({
          index: index,
          startBlock: value.blockNumber,
          boughBonds: 0,
          redeemedBonds: 0,
        });
      }
      if (index > 0) {
        epochBlocksRanges.push({
          index: index,
          startBlock: value.blockNumber,
          boughBonds: 0,
          redeemedBonds: 0,
        });
        epochBlocksRanges[index - 1].endBlock = value.blockNumber;
      }
    });

    epochBlocksRanges.forEach(async (value, index) => {
      events[index].bondsBought = await this.getBondsWithFilterForPeriod(
        boughtBondsFilter,
        value.startBlock,
        value.endBlock,
      );
      events[index].bondsRedeemed = await this.getBondsWithFilterForPeriod(
        redeemBondsFilter,
        value.startBlock,
        value.endBlock,
      );
    });
    let DEVFundEvents = await Treasury.queryFilter(treasuryDevFundedFilter);
    DEVFundEvents.forEach(function callback(value, index) {
      events[index].devFund = getDisplayBalance(value.args[1]);
    });
    let DAOFundEvents = await Treasury.queryFilter(treasuryDaoFundedFilter);
    DAOFundEvents.forEach(function callback(value, index) {
      events[index].daoFund = getDisplayBalance(value.args[1]);
    });
    return events;
  }

  /**
   * Helper method
   * @param filter applied on the query to the treasury events
   * @param from block number
   * @param to block number
   * @returns the amount of bonds events emitted based on the filter provided during a specific period
   */
  async getBondsWithFilterForPeriod(filter: EventFilter, from: number, to: number): Promise<number> {
    const { Treasury } = this.contracts;
    const bondsAmount = await Treasury.queryFilter(filter, from, to);
    return bondsAmount.length;
  }

  async estimateZapIn(tokenName: string, lpName: string, amount: string): Promise<number[]> {
    const { zapper } = this.contracts;
    const lpToken = this.externalTokens[lpName];
    let estimate;
    if (parseFloat(amount) === 0) {
      return [0, 0];
    }
    /*if (tokenName === FTM_TICKER) {
      estimate = await zapper.estimateZapIn(lpToken.address, SPOOKY_ROUTER_ADDR, parseUnits(amount, 18));
    } else {*/
    const token = tokenName === TOMB_TICKER ? this.TOMB : tokenName === TSHARE_TICKER ? this.TSHARE : this.FTM;
    estimate = await zapper.estimateZapInToken(
      token.address,
      lpToken.address,
      SPOOKY_ROUTER_ADDR,
      parseUnits(amount, 18),
    );
    /*}*/
    return [estimate[0] / 1e18, estimate[1] / 1e18];
  }

  async estimateZapInNrwl(tokenName: string, lpName: string, amount: string): Promise<number[]> {
    const { NrwlZap } = this.contracts;
    const lpToken = this.externalTokens[lpName];
    let estimate;
    if (parseFloat(amount) === 0) {
      return [0, 0];
    }

    const token = tokenName === NRWL_TICKER ? this.NRWL : this.YUSD;
    estimate = await NrwlZap.estimateZapInToken(
      token.address,
      lpToken.address,
      SWAPSICLE_ROUTER_ADDR,
      parseUnits(amount, 18),
    );

    return [estimate[0] / 1e18, estimate[1] / 1e18];
  }

  async zapIn(tokenName: string, lpName: string, amount: string): Promise<TransactionResponse> {
    const { zapper } = this.contracts;
    const lpToken = this.externalTokens[lpName];
    /*if (tokenName === FTM_TICKER) {
      let overrides = {
        value: parseUnits(amount, 18),
      };
      return await zapper.zapIn(lpToken.address, SPOOKY_ROUTER_ADDR, this.myAccount, overrides);
    } else {*/
    const token =
      tokenName === TOMB_TICKER
        ? this.TOMB
        : tokenName === TSHARE_TICKER
        ? this.TSHARE
        : tokenName === FTM_TICKER
        ? this.FTM
        : null;
    return await zapper.zapInToken(
      token.address,
      parseUnits(amount, token.decimal),
      lpToken.address,
      SPOOKY_ROUTER_ADDR,
      this.myAccount,
    );
    /*}*/
  }

  async zapInNrwl(tokenName: string, lpName: string, amount: string): Promise<TransactionResponse> {
    const { NrwlZap } = this.contracts;
    const lpToken = this.externalTokens[lpName];

    const token = tokenName === NRWL_TICKER ? this.NRWL : this.YUSD;
    // console.log(parseUnits(amount, token.decimal).toString(), NrwlZap.address, token.address, lpToken.address, SWAPSICLE_ROUTER_ADDR);
    return await NrwlZap.zapInToken(
      token.address,
      parseUnits(amount, token.decimal),
      lpToken.address,
      SWAPSICLE_ROUTER_ADDR,
      this.myAccount,
    );
  }

  async swapTBondToTShare(tbondAmount: BigNumber): Promise<TransactionResponse> {
    const { TShareSwapper } = this.contracts;
    return await TShareSwapper.swapTBondToTShare(tbondAmount);
  }
  async estimateAmountOfTShare(tbondAmount: string): Promise<string> {
    const { TShareSwapper } = this.contracts;
    try {
      const estimateBN = await TShareSwapper.estimateAmountOfTShare(parseUnits(tbondAmount, 18));
      return getDisplayBalance(estimateBN, 18, 6);
    } catch (err) {
      console.error(`Failed to fetch estimate tshare amount: ${err}`);
    }
  }

  async getTShareSwapperStat(address: string): Promise<TShareSwapperStat> {
    const { TShareSwapper } = this.contracts;
    const tshareBalanceBN = await TShareSwapper.getTShareBalance();
    const tbondBalanceBN = await TShareSwapper.getTBondBalance(address);
    // const tombPriceBN = await TShareSwapper.getWlrsPrice();
    // const tsharePriceBN = await TShareSwapper.getTSharePrice();
    const rateTSharePerTombBN = await TShareSwapper.getTShareAmountPerTomb();
    const tshareBalance = getDisplayBalance(tshareBalanceBN, 18, 5);
    const tbondBalance = getDisplayBalance(tbondBalanceBN, 18, 5);
    return {
      tshareBalance: tshareBalance.toString(),
      tbondBalance: tbondBalance.toString(),
      // tombPrice: tombPriceBN.toString(),
      // tsharePrice: tsharePriceBN.toString(),
      rateTSharePerTomb: rateTSharePerTombBN.toString(),
    };
  }

  async rebatesBond(token: string, amount: string): Promise<TransactionResponse> {
    const { RebateTreasury } = this.contracts;
    return await RebateTreasury.bond(token, amount);
  }

  async rebatesClaim(): Promise<TransactionResponse> {
    const { RebateTreasury } = this.contracts;
    return await RebateTreasury.claimRewards();
  }

  // Peg Pool

  async getPegPool(): Promise<PegPool> {
    const contract = this.contracts.PegPool;
    const busd = new ERC20('0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', this.signer, 'USDC', 6);
    const [depositsEnabled, totalDepositTokenAmount, userInfo, approval] = await Promise.all([
      contract.depositsEnabled(),
      contract.totalDepositTokenAmount(),
      this.getPegPoolUserInfo(),
      busd.allowance(this.myAccount, contract.address),
    ]);

    return {
      depositsEnabled,
      totalDesposits: Number(formatUnits(totalDepositTokenAmount, 6)).toFixed(2),
      depositTokenName: 'USDC',
      depositToken: busd,
      userInfo,
      approved: approval.gt(0),
    };
  }

  async getPegPoolUserInfo(): Promise<PegPoolUserInfo> {
    const amount: BigNumber = await this.contracts.PegPool.userInfo(this.myAccount);
    return {
      amountDeposited: getDisplayBalance(amount, 6),
      isDeposited: amount.gt(0),
      amountDepositedBN: amount,
    };
  }

  async getPegPoolPendingRewards(): Promise<PegPoolToken[]> {
    const tokenMap: {
      [key: string]: {
        name: string;
        pair: string;
        injection: number;
      };
    } = {
      '0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6': {
        name: 'WSHARE',
        pair: '0x03d15E0451e54Eec95ac5AcB5B0a7ce69638c62A',
        injection: 0,
      },
      '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7': {
        name: 'WAVAX',
        pair: '0xA389f9430876455C36478DeEa9769B7Ca4E3DDB1',
        injection: 0,
      },
    };

    const [tks, tokens] = await Promise.all([
      this.contracts.PegPool.getRewardTokens(),
      this.contracts.PegPool.pendingRewards(this.myAccount),
    ]);
    const addresses = tokens[0];
    const amounts = tokens[1];
    const rewards: PegPoolToken[] = [];

    for (let i = 0; i < addresses.length; i++) {
      const info = tokenMap[addresses[i]];
      rewards.push({
        token: new ERC20(addresses[i], this.provider.getSigner(), info.name),
        name: info.name,
        pairAddress: info.pair,
        amount: Number(formatUnits(amounts[i])).toFixed(8),
        pendingValueBN: amounts[i],
        rewardPerBlock: Number(formatEther(tks[i].rewardPerBlock)),
        canCompound: info.name != 'AALTO',
      });
    }
    return rewards;
  }
  async depositPegPool(amount: BigNumber) {
    return this.contracts.PegPool.deposit(amount);
  }

  async compoundRewardsPegPool() {
    return this.contracts.PegPool.compound();
  }

  async compoundTokenPegPool() {
    return this.contracts.PegPool.compound();
  }

  async withdrawPegPool(amount: BigNumber) {
    return this.contracts.PegPool.withdraw(amount);
  }

  async claimPegPool() {
    return this.contracts.PegPool.claim();
  }
  // pegasaurus
  async getPegasaurus(): Promise<Pegasaurus> {
    const contract = this.contracts.Pegasaurus;
    const busd = new ERC20('0x82845B52b53c80595bbF78129126bD3E6Fc2C1DF', this.signer, 'WLRS-USDC-LP', 18);
    const [depositsEnabled, totalDepositTokenAmount, userInfo, approval] = await Promise.all([
      contract.depositsEnabled(),
      contract.totalDepositTokenAmount(),
      this.getPegasaurusUserInfo(),
      busd.allowance(this.myAccount, contract.address),
    ]);

    return {
      depositsEnabled,
      totalDesposits: Number(formatUnits(totalDepositTokenAmount, 18)).toFixed(12),
      depositTokenName: 'WLRS-USDC-LP',
      depositToken: busd,
      userInfo,
      approved: approval.gt(0),
    };
  }

  async getPegasaurusUserInfo(): Promise<PegasaurusUserInfo> {
    const amount: BigNumber = await this.contracts.Pegasaurus.userInfo(this.myAccount);
    return {
      amountDeposited: getDisplayBalance(amount, 18),
      isDeposited: amount.gt(0),
      amountDepositedBN: amount,
    };
  }

  async getPegasaurusPendingRewards(): Promise<PegasaurusToken[]> {
    const tokenMap: {
      [key: string]: {
        name: string;
        pair: string;
        injection: number;
      };
    } = {
      '0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6': {
        name: 'WSHARE',
        pair: '0x03d15E0451e54Eec95ac5AcB5B0a7ce69638c62A',
        injection: 0,
      },
      '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7': {
        name: 'WAVAX',
        pair: '0xA389f9430876455C36478DeEa9769B7Ca4E3DDB1',
        injection: 0,
      },
    };

    const [tks, tokens] = await Promise.all([
      this.contracts.Pegasaurus.getRewardTokens(),
      this.contracts.Pegasaurus.pendingRewards(this.myAccount),
    ]);
    const addresses = tokens[0];
    const amounts = tokens[1];
    const rewards: PegasaurusToken[] = [];

    for (let i = 0; i < addresses.length; i++) {
      const info = tokenMap[addresses[i]];
      rewards.push({
        token: new ERC20(addresses[i], this.provider.getSigner(), info.name),
        name: info.name,
        pairAddress: info.pair,
        amount: Number(formatUnits(amounts[i])).toFixed(8),
        pendingValueBN: amounts[i],
        rewardPerBlock: Number(formatEther(tks[i].rewardPerBlock)),
        canCompound: info.name != 'AALTO',
      });
    }

    return rewards;
  }

  async depositPegasaurus(amount: BigNumber) {
    return this.contracts.Pegasaurus.deposit(amount);
  }

  async compoundRewardsPegasaurus() {
    return this.contracts.Pegasaurus.compound();
  }

  async compoundTokenPegasaurus() {
    return this.contracts.Pegasaurus.compound();
  }

  async withdrawPegasaurus(amount: BigNumber) {
    return this.contracts.Pegasaurus.withdraw(amount);
  }

  async claimPegasaurus() {
    return this.contracts.Pegasaurus.claim();
  }
}
