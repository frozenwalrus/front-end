import React from 'react';
import Card from '../../components/Card';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Row from '../../components/Row';
import Column from '../../components/Column';
import lhb from '../../assets/img/cutout_50.png'; 
import { Box, Container, Typography, Grid, CardActions, CardContent, Button } from '@material-ui/core';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryImage from '../../assets/img/SVG_Icons_and_web_bg/bg.svg';
import { createGlobalStyle } from 'styled-components';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${CemeteryImage}) no-repeat !important;
    background-size: cover !important;
  }
`;
const VideoCard = styled.div`
  background: rgba(214, 211, 242, 0.55);
  border-radius: 25px;
  padding: 10px; 
  color: #4b4453;
`;

const Media = () => {
  const { account } = useWallet();

return (
<Page>

  <Container maxWidth="lg">
    <h2 align="center" style={{ fontSize: '3rem', marginBottom: '5%' }}><img src={lhb} style={{height:'50px'}} /> 
       FROZEN WALRUS MEDIA 
    <img src={lhb} style={{height:'50px'}} />

    </h2>
    <Grid container spacing={2} style={{ justifyContent: "center" }}>
    <Grid item xs={12} style={{ alignItems: 'center', marginBottom: '5%' }} >
        <Column>
        <Row style={{ justifyContent: 'center', marginBottom: '1%'}}>
          <iframe  width="560" height="315" src="https://www.youtube.com/embed/DlTsAhF0OS4" title="YouTube video player" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
        </Row>
        <Row style={{ justifyContent: 'center'}}>
          <VideoCard>
            <CardContent>
              <h2 style={{ textAlign: 'center', fontSize: '1.4rem' }}><i>Getting Back on Track!</i></h2> 
              <h2 style={{ textAlign: 'center', fontSize:'0.8rem' }}>
                Frozen Walrus' fearless leader explains how the protocol returns to strength </h2>
            </CardContent>
          </VideoCard>
        </Row>
        </Column>
      </Grid>
      <Grid item xs={12} style={{ alignItems: 'center', marginBottom: '5%' }} >
        <Column>
        <Row style={{ justifyContent: 'center', marginBottom: '1%'}}>
          <iframe  width="560" height="315" src="https://www.youtube.com/embed/ZoBbwGTpfGE" title="YouTube video player" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
        </Row>
        <Row style={{ justifyContent: 'center'}}>
          <VideoCard>
            <CardContent>
              <h2 style={{ textAlign: 'center', fontSize: '1.4rem' }}><i>How to use $100 in Frozen Walrus</i></h2> 
              <h2 style={{ textAlign: 'center', fontSize:'0.8rem' }}>
                A primer video for investors who are 
                new to the protocol and want to know where to start! </h2>
            </CardContent>
          </VideoCard>
        </Row>
        </Column>
      </Grid>

      <Grid item xs={12} style={{ alignItems: 'center', marginBottom: '5%' }} >
      <Row style={{ justifyContent: 'center', marginBottom: '1%'}}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/cQzy04Ff1Os" title="YouTube video player" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>                
        </Row> 
        <Row style={{ justifyContent: 'center' }}>
          <VideoCard>
            <CardContent>
            <h2 style={{ textAlign: 'center', fontSize: '1.4rem' }}><i>DeFi Basics: Frontrun Bots!</i></h2> 
                <h2 style={{ textAlign: 'center', fontSize:'0.8rem' }}>
                  Learn about frontrun bots and how to avoid them!  </h2>
            </CardContent>
          </VideoCard>
        </Row>
      </Grid>

      <Grid item xs={12} style={{ alignItems: 'center', marginBottom: '5%' }}>
      <Row style={{ justifyContent: 'center', marginBottom: '1%'}}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/cc-UAQDyLAg" title="YouTube video player" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>                
        </Row> 
        <Row style={{ justifyContent: 'center' }}>
          <VideoCard >
            <CardContent >
            <h2 style={{ textAlign: 'center', fontSize: '1.4rem' }}><i>Tomb Forks 101 </i></h2> 
                <h2 style={{ textAlign: 'center', fontSize:'0.8rem' }}>A primer video on 
                Tomb forks and how to grow your investment! </h2>
            </CardContent>
          </VideoCard>
        </Row> 
      </Grid>
    </Grid>
  </Container>
</Page>
);
};

export default Media;
