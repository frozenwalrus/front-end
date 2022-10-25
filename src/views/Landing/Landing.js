import './Landing.css'; 
import React, {useState} from 'react'
import Fade from 'react-reveal/Fade'; 
import Accordion from './components/Accordion'; 
import Flip from 'react-reveal/Flip'; 
import Slide from 'react-reveal/Slide'; 
import { Zoom } from 'react-reveal'; 
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import CountUp from 'react-countup';
import useAxios from 'axios-hooks'; 



const Landing = () => {
    const TVL = useTotalValueLocked();
    const [show, setShow]=React.useState(false); 
    const [show2, setShow2]=React.useState(true); 
    const [{ data, loading, error }, refetch] = useAxios (
      'https://openapi.debank.com/v1/user/total_balance?id=0x2ba4da735d3ce9177216102e9fdabae67e1ac524'
    )
    if (loading) return <p>Firing up the walrus...</p>
    if (error) return <p>error! </p>; 

    return (
        <div className="app">
    {  
    show? <Slide left> 
   <div className="men">
      <a href="https://store.frozenwalrus.finance" target="_blank" className="men-button">STORE</a>
      <a href="https://snapshot.org/#/frozenwalrus.eth" target="_blank" className="men-button">VOTE</a>
      <a href="https://frozenwalrus.academy" target="_blank" className="men-button">ACADEMY</a>
      <a href="https://docs.frozenwalrus.finance" target="_blank" className="men-button">DOCUMENTATION</a>
    </div></Slide>:null
    }
    <Fade>
    <img className="back-model-1" src='https://i.imgur.com/oJthubf.png%27/%3E'/>
    </Fade>

    <img className="front-model-1" src='https://i.imgur.com/m8jiFUW.png'/>
    <img className="front-model-2" src='https://i.imgur.com/jQQLy3C.png'/>

    <img className="front-model-4" src='https://i.imgur.com/NFgoC65.png'/>
    <img className="front-model-5" src='https://i.imgur.com/m8jiFUW.png'/>
    <img className="front-model-6" src='https://i.imgur.com/J28TtBy.png'/>
    <img className="front-model-7" src='https://i.imgur.com/m8jiFUW.png'/>


    <img className="front-model-10" src='https://i.imgur.com/BY5zTd0.png'/>
    <img className="front-model-11" src='https://i.imgur.com/jQQLy3C.png'/>
    

    
      <div className="navigation-bar">
        <div className="navigation-logo">
          <img className="navigation-image" src='https://svgshare.com/i/itH.svg'/>
          <div className="navigation-logo-text">
            <span></span>
          </div>
        </div>
        <div className="navigation-buttons">
          <a href="https://store.frozenwalrus.finance" target="_blank" className="navigation-button2">
            <span>Store</span>
          </a>
          <a href="https://snapshot.org/#/frozenwalrus.eth" target="_blank" className="navigation-button2">
            <span>Vote</span>
          </a>
          <a href="https://frozenwalrus.academy" target="_blank" className="navigation-button2">
            <span>Learn</span>
          </a>
          <a href="https://docs.frozenwalrus.finance" target="_blank" className="navigation-button2">
            <span>Documentation</span>
          </a>
          
          {
            show?<div onClick={()=> {setShow(false); setShow2(true)}} className="menu-button">
            <img className="menu" src="https://i.imgur.com/WlqfIz4.png"/>
            </div>:null
          }
          {
          show2?<div onClick={()=> {setShow(true); setShow2(false)}} className="menu-button-2">
            <img className="menu" src="https://i.imgur.com/FtjTOzk.png"/>
          </div>:null
          }
          <a href="https://app.frozenwalrus.finance" target="_blank" className="navigation-button">
            <span>ENTER APP</span>
          </a>
        </div>
      </div>
      <div className="padding-container">
        <div className="front-container">
          <Fade left>
          <span className="front-title">High Yield APRs With Long Term Sustainability</span>
          <span className="front-desc">Frozen Walrus is a seigniorage protocol at it's core built with sustainable yields to last with community support. We are expanding our ecosystem into avenues that allow users utility with our tokens to give them constant value through GameFi and TradeFi mechanics.</span>
          
          <div className="front-buttons">
          
          <a href="https://app.frozenwalrus.finance" target="_blank" className="front-button">
            <span>ENTER APP</span>
          </a>

        </div>
        </Fade>
        </div>
      </div>
      <div className="padding-container">
        <div className="stats-container">
        <Fade>
          <div className="stats-box-1">
            <span className="stats-title2">Protocol Stats</span>
          </div>
          </Fade>
          <Fade>
          <div className="stats-box-2">
            <span className="stats-title">Total Value Locked</span>
            <CountUp style={{ fontSize: '4vw', fontFamily: 'Medium' }} end={TVL} separator="," prefix="$" />
          </div>
          </Fade>
          <Fade>
          <div className="stats-box-3">
            <span className="stats-title">Number Of Holders</span>
            <span className="stats-number">1,000+</span>
          </div>
          </Fade>
          <Fade>
          <div className="stats-box-4">
            <span className="stats-title">Treasury Value</span>
            <span> 
              <CountUp
                style={{fontSize: '4vw', fontFamily: 'Medium'  }} end={Number(data.total_usd_value, null)} separator="," prefix='$'>
              </CountUp>

              {/* ${Number(data.total_usd_value, null).toFixed(2)}</span> */} 
              </span> 
          </div>
          </Fade>
          <Fade>
          <div className="stats-box-5">
            <span className="stats-title">Time Over Peg</span>
            <span className="stats-number">97.7%</span>
          </div>
          </Fade>
          
        </div>
      </div>

      <div className="padding-container">
        <div className="token-title">
        <Fade>
          <span >Frozen Walrus Tokens</span>
          </Fade>
        </div>
        <div className="token-container">
        
          <div className="token-boxes">
          <Fade bottom>
            <div className="token-box-1">
              <div className="token-first">
                <span className="token-top-text">Walrus</span>
                <img className="token-image" src="https://i.imgur.com/sHm0qMH.png"/>
              </div>
              <div className="token-second">
                <span className="token-top-middle">$WLRS</span>
                <span className="token-top-bottom">Walrus token ($WLRS) is designed to be used as a medium of exchange. The built-in stability mechanism in the protocol aims to maintain $WLRS's peg of 1 $WLRS : 1 $USDC.e in the long run. </span>
                <a href="https://app.frozenwalrus.finance/farms" target="_blank" className="front-button">
                <span>ENTER APP</span>
              </a>
              </div>
            </div> 
            </Fade>
            <Fade bottom>
            <div className="token-box-2">
              <div className="token-first">
                <span className="token-top-text">Walrus Share</span>
                <img className="token-image" src="https://i.imgur.com/QLIAOiK.png"/>
              </div>
              <div className="token-second">
                <span className="token-top-middle">$WSHARE</span>
                <span className="token-top-bottom">Walrus Shares ($WSHARE) are one of the ways to measure the value of the Frozen Walrus Protocol and shareholder trust in its ability to maintain $WLRS close to peg. During epoch expansions, the protocol mints $WLRS and distributes it proportionally to all $WSHARE holders who have staked their tokens in the Boardroom.</span>
                <a href="https://app.frozenwalrus.finance/boardroom" target="_blank" className="front-button">
                <span>ENTER APP</span>
              </a>
              </div>
            </div>  
            </Fade>
            <Fade bottom>
            <div className="token-box-3">
              <div className="token-first">
                <span className="token-top-text">Walrus Bonds</span>
                <img className="token-image" src="https://i.imgur.com/HOI9pjr.png"/>
              </div>
              <div className="token-second">
                <span className="token-top-middle">$WBOND</span>
                <span className="token-top-bottom">Bonds are unique tokens that can be utilized to help stabilize WLRS price around peg by reducing the circulating supply of WLRS if the TWAP goes below peg</span>
                <a href="https://app.frozenwalrus.finance/bonds" target="_blank" className="front-button">
                <span>ENTER APP</span>
              </a>
              </div>
            </div> 
            </Fade>
        </div>

        </div>
        
      </div>

      <div className="padding-container">
        <div className="com-divide">
          <div className="com-first">
            <Fade>
            <span className="com-title-1">Community</span>
            <span className="com-title-2">Stats</span>
            </Fade>
          </div>
          <div className="com-second">
          <div className="com-middle-hid"></div>
            <div className="com-box-1">
            <Fade>
            <img className="com-image" src="https://i.imgur.com/MOdBFfg.png"/>
            <div className="com-main-title">
              <span className="com-stats-title">Twitter Followers</span>
              
                <span className="com-stats-number">1,400+ </span>

              
            </div>
            </Fade>
            </div>

            <div className="com-middle"></div>
            
            <div className="com-box-2">
            <Fade>
            <img className="com-image" src="https://i.imgur.com/MOdBFfg.png"/>
            <div className="com-main-title">
              <span className="com-stats-title">Discord Members</span>
              
                <span className="com-stats-number">3,300+ </span>

              
            </div>
            
            </Fade>
            </div>
            <div className="com-middle"></div>
            
          </div>
        </div>
      </div>

      <div className="padding-container">
        <div className="up">
          <div className="com-first">
          <Fade>
            <span className="com-title-1">Releases and</span>
            <span className="com-title-2">Product Updates</span>
          </Fade>
          </div>
          
          <div className="up-boxes">
            <Fade bottom>
            <a href="https://app.frozenwalrus.finance/boardroom" target="_blank" className="up-box">
              <div className="up-first">
                <span className="up-top-text">|</span>
                <img className="up-image" src="https://i.imgur.com/QLIAOiK.png"/>
              </div>
              <div className="up-second">
                <span className="up-top-middle">Staking</span>
                <span className="up-top-bottom">Utilize your share tokens in the boardroom to earn a percentage of the expansion of WLRS tokens when the protocol is healthy!</span>
                <div className="up-button">
                <img className="up-arrow" src="https://i.imgur.com/jEiRTFm.png"/>
              </div>
              </div>
            </a>
</Fade>
<Fade bottom>
            <a href="https://app.frozenwalrus.finance/farms" target="_blank" className="up-box">
              <div className="up-first">
                <span className="up-top-text">|</span>
                <img className="up-image" src="https://i.imgur.com/BY5zTd0.png"/>
              </div>
              <div className="up-second">
                <span className="up-top-middle">Farming</span>
                <span className="up-top-bottom">Deepen liquidity and be rewarded! Adding liquidity to the Frozen Walrus ecosystem is easy and can be used to farm new Share tokens!</span>
                <div className="up-button">
                <img className="up-arrow" src="https://i.imgur.com/jEiRTFm.png"/>
              </div>
              </div>
            </a>
</Fade>
<Fade bottom>
           <a href="https://app.frozenwalrus.finance/nodes" target="_blank" className="up-box">
              <div className="up-first">
                <span className="up-top-text">|</span>
                <img className="up-image" src="https://i.imgur.com/Rq4U96J.png"/>
              </div>
              <div className="up-second">
                <span className="up-top-middle">Nodes</span>
                <span className="up-top-bottom">Lock your liquidity into a node that can pay up to 500% back to you over a period of time. This can greatly impact the stability of our protocol and comes with weekly rewards for noders.</span>
                <div className="up-button">
                <img className="up-arrow" src="https://i.imgur.com/jEiRTFm.png"/>
              </div>
              </div>
            </a>

            </Fade>

          </div>

        </div>
      </div>

      <div className="padding-container">
        <div className="news-divide">
          <div className="news-1">
          <Fade>
            <span className="com-title-1">In The News</span>
            <a href="https://app.frozenwalrus.finance" target="_blank" className="news-button">
                <span>VIEW ALL NEWS</span>
              </a>
            </Fade>
          </div>
          <div className="news-2">
            <Fade bottom>
            <a href="https://medium.com/@frozenwalrusfinance/nrwl-933a784d6f51" target="_blank" className="news-box">
              <div className="news-content-1">
                <span className="news-title">Everything you need to know about the new $NRWL token!</span>
              </div>
              <div className="news-content-2">
                <img className="up-arrow" src="https://i.imgur.com/jEiRTFm.png"/>
              </div>
              <div className="news-content-3">
                <span className="news-date">July 4th, 2022</span>
              </div>
            </a>
            </Fade>

<Fade bottom>
            <a href="https://snapshot.org/#/frozenwalrus.eth/proposal/0x789273a18c775630f2a98c7ee4d10c6bc4e898c9df8382b58933afb55ed67839" target="_blank" className="news-box">
              <div className="news-content-1">
                <span className="news-title">Let your voice be heard!</span>
              </div>
              <div className="news-content-2">
                <img className="up-arrow" src="https://i.imgur.com/jEiRTFm.png"/>
              </div>
              <div className="news-content-3">
                <span className="news-date">July 3rd, 2022</span>
              </div>
              <div className="news-content-4">
                <span className="news-desc">Vote on the new launch of $NRWL and how we will decide to bring it to life!</span>
              </div>
            </a>
            </Fade>

<Fade bottom>

            </Fade>
          </div>
        </div>
      </div>

      <div className="padding-container">
        <div className="news-divide">
          <div className="news-1">
          <Fade>
            <span className="com-title-1">FAQ</span>
            <a href="https://docs.frozenwalrus.finance" target="_blank" className="news-button">
                <span>ALL QUESTIONS</span>
              </a>
            </Fade>
          </div>
          <div className="news-2">

            
            <div className="accordion-1" style={{}}>
          <Fade right>
         <Accordion
            title="What is Frozen Walrus?"
            content="Frozen Walrus is a DeFi protocol built on Avalanche Network. We offer high yields when providing liquidity to the platform via a reward token. Please read our documentation to get the full picture of the"
            content2="mechanics behind Frozen Walrus as it can be complicated for new users!"

          />
          </Fade>
      <div className="acc-middle"></div>
          <Fade right>
      <Accordion
            title="What does peg mean?"
            content="We refer to peg when speaking specifically about the $WLRS token, this is a mechanic the protocol uses to constantly gauge the inflation or deflation of it. We are pegged to USDC.e or $1, this means that when "
            content2="over that amount of $1 the protocol will INFLATE the supply of $WLRS and when under we will attempt to deflate the supply so that we are always inching towards keeping $WLRS at $1 in the market. "

          />
          </Fade>
      <div className="acc-middle"></div>
          <Fade right>
        <Accordion
            title="What is Farming?"
            content="Farming is used in DeFi as a incentive to providing liquidity. You provide us a pair of tokens in return we give you rewards for doing so. This allows our tokens to strengthen its trading pair in the market and"
            content2="reducing volatility surrounding illiquid tokens. This is a healthy means of allowing the community to back the tokens longevity in the market."

          />
          </Fade>
      <div className="acc-middle"></div>
      <Fade right>
        <Accordion
            title="What chain is Frozen Walrus built on?"
            content="We are built using the power of Avalanche, a fast secure network."
          />
          </Fade>
     <div className="acc-middle"></div>
      <Fade right>
        <Accordion
            title="What is a seignorage protocol?"
            content="It's best to think of it as an elastic supply token, it constantly expands and contracts to try and meet a goal. In this case its taking $WLRS to $1."
          />
          </Fade>
     <div className="acc-middle"></div>
      <Fade right>
        <Accordion
            title="How long will Frozen Walrus be here?"
            content="We will always strive to find utility and use cases for our tokens. We plan to be around as long as DeFi allows, constantly upgrading and expanding the ecosystem for the user to have more options to use their native tokens."
          />
          </Fade>
      <div className="acc-middle"></div>
      <Fade right>
        <Accordion
            title="Who runs Frozen Walrus?"
            content="The founder of Frozen Walrus Finance is Austin A.K.A Lamehillbilly."
          />
          </Fade>
      <div className="acc-middle"></div>


            
          </div>
        </div>
      </div>
      </div>

      <div className="footer">
        <div className="padding-container">
          <div className="horizontal-container">
            <div className="footer-container">
              <div className="footer-box-1">
                <div className="navigation-logo">
                  <img className="navigation-image" src='https://app.frozenwalrus.finance/static/media/WLRS-Icon-01.098f91c6.svg'/>
                  <div className="navigation-logo-text">
                  <span className="footer-logo-text">FROZEN WALRUS</span>
                  </div>
                </div>
                <Fade>
                <span className="footer-desc">A seignorage protocol built on AVAX</span>

                <div className="footer-buttons">
                  <a href="https://twitter.com/WalrusFinance" className="footer-button-1">
                    <img className="footer-media" src="https://i.imgur.com/JfyvJEl.png"/>
                  </a>
                  <a href="https://discord.gg/gGWGR9UDkm" className="footer-button-1">
                    <img className="footer-media" src="https://i.imgur.com/XBYEEjN.png"/>
                  </a>
                  <a href="https://medium.com/@frozenwalrusfinance" className="footer-button-1">
                    <img className="footer-media" src="https://i.imgur.com/WAQDgCR.png"/>
                  </a>
                </div>
                </Fade>
              </div> 
              <Fade>
              <div className="footer-box-2">
              
                <span className="footer-title">Products</span>
                <a href="https://frozenwalrus.finance/boardroom" className="footer-button">
                  <span>Staking</span>
                </a>
                <a href="https://frozenwalrus.finance/farms" className="footer-button">
                  <span>Farming</span>
                </a>
                <a href="https://frozenwalrus.finance/nodes" className="footer-button">
                  <span>Nodes</span>
                </a>
                
              </div> 

              <div className="footer-box-2">
                <span className="footer-title">Learn</span>
                <a href="https://docs.frozenwalrus.finance" className="footer-button">
                  <span>Documentation</span>
                </a>
                <a href="https://www.youtube.com/channel/UCpe4SHY57W2Ck04cN4YzPaw" className="footer-button">
                  <span>Youtube Videos</span>
                </a>
              </div> 


              <div className="footer-box-2">
                <span className="footer-title">Contact</span>
                <a href="https://discord.gg/gGWGR9UDkm" className="footer-button">
                  <span>JOIN DISCORD</span>
                </a>
                <a href="mailto:frozenwalrusfinance@protonmail.com" className="footer-button">
                  <span>MEDIA INQUIRIES</span>
                </a>

              </div>
              </Fade> 
            </div>
          </div>
        </div>
      </div>
    </div>

  );


}



export default Landing; 