import { useContext } from 'react';
import { Context as BanksContext } from '../contexts/Banks';
import { Bank, ContractName } from '../tomb-finance';

const useBank = (contractName: ContractName): Bank => {
  const { banks } = useContext(BanksContext);
  if (contractName === 'WlrsSnoGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'SNO');
  } else if (contractName === 'WlrsFoxGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'FOX');
  } else if (contractName === 'WlrsSnobondGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'SNOBOND');
  } else if (contractName === 'WlrsDibsGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'DIBS');
  } else if (contractName === 'WlrsAvaxGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'WAVAX');
  } else if (contractName === 'WlrsUsdcGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'USDC');
  } else if (contractName === 'WlrsGrapeGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'GRAPE');
  } else if (contractName === 'WlrsUsdtGenesisRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'USDT');
  }else if (contractName === 'WBondWShareRewardPool') {
      return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'WBOND');
  }else if (contractName === 'XWLRSShareRewardPool') {
      return banks.find((bank) => bank.sectionInUI === 0 && bank.depositTokenName === 'XWLRS');
  }

  if (contractName === 'PegLPNode') {
    return banks.find((bank) => bank.sectionInUI === 4 && bank.depositTokenName === 'WLRS-USDC-LP');
  } else if (contractName === 'ShareLPNode') {
    return banks.find((bank) => bank.sectionInUI === 4 && bank.depositTokenName === 'WSHARE-USDC-LP');
  } else if (contractName === 'LPWlrsNode') {
    return banks.find((bank) => bank.sectionInUI === 4 && bank.depositTokenName === 'GRAPE-WLRS-LP');
  }

  

  if (contractName === 'WShareUsdcLPWShareRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 2 && bank.depositTokenName === 'WSHARE-USDC-LP');
  } else if (contractName === 'WlrsUsdcLPWShareRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 2 && bank.depositTokenName === 'WLRS-USDC-LP');
  } else if (contractName === 'WlrsUSDibsLPWShareRewardPool') {
    return banks.find((bank) => bank.sectionInUI === 2 && bank.depositTokenName === 'WLRS-USDIBS-LP');
  } else {
    // return null;
    return banks.find((bank) => bank.contract === contractName);
  }
};

export default useBank;
