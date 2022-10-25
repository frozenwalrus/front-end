import React from 'react';

//Graveyard ecosystem logos
import tombLogo from '../../assets/img/SVG_Icons_and_web_bg/WLRS-Icon-01.svg';
import tShareLogo from '../../assets/img/wshare.png';
import tombLogoPNG from '../../assets/img/sno.png';
import tShareLogoPNG from '../../assets/img/snoshare.png';
import tBondLogo from '../../assets/img/bond.png';

import tombFtmLpLogo from '../../assets/img/wlrs-usdc.png';
import tshareFtmLpLogo from '../../assets/img/WSHARE-USDC.E.png';

import wftmLogo from '../../assets/img/USDC.png';
import wlrsLogo from '../../assets/img/wlrs-coin.png';
import booLogo from '../../assets/img/spooky.png';
import zooLogo from '../../assets/img/zoo_logo.svg';
import shibaLogo from '../../assets/img/shiba_logo.svg';
import snobondLogoPNG from '../../assets/img/snobond.png';
import foxLogoPNG from '../../assets/img/fox.png';
import dibsLogoPNG from '../../assets/img/dibs.png';
import usdtLogoPNG from '../../assets/img/usdt.png';
import usdcLogoPNG from '../../assets/img/USDC.png';
import avaxLogoPNG from '../../assets/img/avax.png';
import grapeLogoPNG from '../../assets/img/grape.png';
import grapeWlrsLP from '../../assets/img/wlrsGRAPE.png';
import wlrsUsdibsLP from '../../assets/img/wlrs-usdibs.png';
import nrwlPNG from '../../assets/img/nrwl.png';
import yusdPNG from '../../assets/img/yusd.png';
import nrwlSVG from '../../assets/img/nrwl.svg';
import nbondSVG from '../../assets/img/nrwlBond.png';
import nrwlYusdPNG from '../../assets/img/nrwlYusd.png';
import xWLRS from '../../assets/img/xWLRS.png';
import wlrsIcon from '../../assets/img/SVG_Icons_and_web_bg/WLRS.svg';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  WAVAX: avaxLogoPNG,
  TOMB: tombLogo,
  TOMBPNG: tombLogoPNG,
  TSHAREPNG: tShareLogoPNG,
  WSHARE: tShareLogo,
  WBOND: tBondLogo,
  WFTM: wftmLogo,
  WLRS: wlrsIcon,
  BOO: booLogo,
  SHIBA: shibaLogo,
  ZOO: zooLogo,
  SNO: tombLogoPNG,
  SNOSHARE: tShareLogoPNG,
  SNOBOND: snobondLogoPNG,
  FOX: foxLogoPNG,
  DIBS: dibsLogoPNG,
  GRAPE: grapeLogoPNG,
  USDT: usdtLogoPNG,
  USDC: usdcLogoPNG,
  'WLRS-USDC-LP': tombFtmLpLogo,
  'WSHARE-USDC-LP': tshareFtmLpLogo,
  'WLRS-USDIBS-LP': wlrsUsdibsLP,
  'GRAPE-WLRS-LP': grapeWlrsLP,
  'SNO-SNOSHARE-LP': tshareFtmLpLogo,

  YUSD: yusdPNG,
  NRWLPNG: nrwlPNG,
  NRWL: nrwlPNG,
  NBOND: nbondSVG,
  'NRWL-YUSD-LP': nrwlYusdPNG,
  XWLRS: xWLRS,
};

type LogoProps = {
  symbol: string;
  width?: number;
  height?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, width = 90, height = 90 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  if (symbol === 'GRAPE-WLRS-LP') {
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={95} height={60} />;
  } else {
    return (
      <img
        src={logosBySymbol[symbol]}
        alt={`${symbol} Logo`}
        width={width}
        height={height}
        style={
          {
            /*borderRadius: '50%'*/
          }
        }
      />
    );
  }
};

export default TokenSymbol;
