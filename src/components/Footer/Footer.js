import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, useMediaQuery } from '@material-ui/core';
import Nav from '../Nav';
import discordIcon from '../../assets/img/SVG_Icons_and_web_bg/discord.svg';
import youtubeIcon from '../../assets/img/SVG_Icons_and_web_bg/youtube.svg';
import telegramIcon from '../../assets/img/SVG_Icons_and_web_bg/telegram.svg';
import githubIcon from '../../assets/img/SVG_Icons_and_web_bg/github.svg';
import twitterIcon from '../../assets/img/SVG_Icons_and_web_bg/twitter.svg';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#12141D',
  },
  footerInner: {
    color: '#9AA4DA',
    padding: '20px',
  },
  copyright: {
    color: '#FCFCFC',
  },
  bottomLine: {
    paddingLeft: '30px',
    paddingRight: '30px',
  },
}));

const Footer = () => {
  const widthUnder600 = useMediaQuery('(max-width:600px)');

  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.footerInner}>
        <Nav fromParent="footer" />
        <Box mt={3}>
          <Grid container justify="center">
            <Grid item>
              Frozen Walrus Finance is an algorithmic stable coin protocol pegged 1:1 to USDC on Avalanche via
              seigniorage.
            </Grid>
          </Grid>
          <Box mt={5} className={classes.bottomLine}>
            <Grid
              container
              justify={widthUnder600 ? 'center' : 'space-between'}
              alignContent="center"
              alignItems="center"
            >
              <Grid item>
                <Grid container justify="space-between" spacing={4} wrap={'nowrap'}>
                  <Grid item>
                    <a href="https://discord.gg/gGWGR9UDkm">
                      <img src={discordIcon} alt="Discord" width={40} height={40} />
                    </a>
                  </Grid>
                  <Grid item>
                    <a href="https://www.youtube.com/c/LameHillbilly">
                      <img src={youtubeIcon} alt="Youtube" width={40} height={40} />
                    </a>
                  </Grid>

                  <Grid item>
                    <a href="https://github.com/frozenwalrus/interface">
                      <img src={githubIcon} alt="Github" width={40} height={40} />
                    </a>
                  </Grid>
                  <Grid item>
                    <a href="https://twitter.com/WalrusFinance">
                      <img src={twitterIcon} alt="Twitter" width={40} height={40} />
                    </a>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: widthUnder600 ? '20px' : '0' }} className={classes.copyright}>
                Copyright © frozenwalrus.finance 2022
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </footer>
  );
};

export default Footer;
