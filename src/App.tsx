import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as TP } from '@material-ui/core/styles';
import { ThemeProvider as TP1 } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';
import usePromptNetwork from './hooks/useNetworkPrompt';
import BanksProvider from './contexts/Banks';
import TombFinanceProvider from './contexts/TombFinanceProvider';
import ModalsProvider from './contexts/Modals';
import store from './state';
import theme from './theme';
import newTheme from './newTheme';
import config from './config';
import Updaters from './state/Updaters';
import Loader from './components/Loader';
import Popups from './components/Popups';
import { RefreshContextProvider } from './contexts/RefreshContext';

const Home = lazy(() => import('./views/Home'));
const Cemetery = lazy(() => import('./views/Cemetery'));
// const Farm = lazy(() => import('./views/Farm'));
const Boardroom = lazy(() => import('./views/Boardroom'));
// const Masonry = lazy(() => import('./views/Masonry'));
const Bonds = lazy(() => import('./views/Bonds'));
// const SBS = lazy(() => import('./views/Sbs'));
// const Liquidity = lazy(() => import('./views/Liquidity'));
const Rebates = lazy(() => import('./views/Rebates'));
// const Raffle = lazy(() => import('./views/Raffle'));
const Compound = lazy(() => import('./views/Compound'));
const Nodes = lazy(() => import('./views/Nodes'));
const Lottery = lazy(() => import('./views/Lottery'));
const NodeLeaderboard = lazy(() => import('./views/NodeLeaderboard'));
const Media = lazy(() => import('./views/Media'));
const PCP = lazy(() => import('./views/PCP'));
const PegDefender = lazy(() => import('./views/Pegasaurus'));

const NoMatch = () => (
  <h3 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    URL Not Found. <a href="/">Go back home.</a>
  </h3>
);

const App: React.FC = () => {
  // Clear localStorage for mobile users
  if (typeof localStorage.version_app === 'undefined' || localStorage.version_app !== '1.1') {
    localStorage.clear();
    localStorage.setItem('connectorId', '');
    localStorage.setItem('version_app', '1.1');
  }

  usePromptNetwork();

  return (
    <Providers>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/farms">
              <Cemetery />
            </Route>
            <Route path="/boardroom">
              <Boardroom />
            </Route>
            {/* <Route path="/boardroom/wshare">
              <Masonry />
            </Route> */}
            <Route path="/bonds">
              <Bonds />
            </Route>
            <Route path="/rebates">
              <Rebates />
            </Route>
            <Route path="/nodes">
              <Nodes />
            </Route>
            <Route path="/media">
              <Media />
            </Route>
            {/* <Route path="/sbs">
              <SBS />
            </Route>
            <Route path="/regulations">
              <Regulations />
            </Route>
            <Route path="/liquidity">
              <Liquidity />
            </Route> */}
            <Route path="/compound">
              <Compound />
            </Route>
            <Route path="/lottery">
              <Lottery />
            </Route>
            <Route path="/pcp">
              <PCP />
            </Route>
            <Route path="/pegdefender">
              <PegDefender />
            </Route>
            <Route path="/leaderboard">
              <NodeLeaderboard />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <TP1 theme={theme}>
      <TP theme={newTheme}>
        <UseWalletProvider
          chainId={config.chainId}
          connectors={{
            walletconnect: { rpcUrl: config.defaultProvider },
            walletlink: {
              url: config.defaultProvider,
              appName: 'Frozen Walrus Finance',
              appLogoUrl: 'https://github.com/tombfinance/tombfinance-assets/blob/master/logo_tomb_NoBG.png',
            },
          }}
        >
          <Provider store={store}>
            <Updaters />
            <RefreshContextProvider>
              <TombFinanceProvider>
                <ModalsProvider>
                  <BanksProvider>
                    <>
                      <Popups />
                      {children}
                    </>
                  </BanksProvider>
                </ModalsProvider>
              </TombFinanceProvider>
            </RefreshContextProvider>
          </Provider>
        </UseWalletProvider>
      </TP>
    </TP1>
  );
};

export default App;
