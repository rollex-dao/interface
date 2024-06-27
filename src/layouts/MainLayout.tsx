import { Box } from '@mui/material';
import React, { ReactNode } from 'react';
import AnalyticsConsent from 'src/components/Analytics/AnalyticsConsent';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
// import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
// import TopBarNotify from 'src/layouts/TopBarNotify';
import { FORK_ENABLED } from 'src/utils/marketsAndNetworksConfig';

import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';

export function MainLayout({ children }: { children: ReactNode }) {
  // const { currentMarket } = useProtocolDataContext();
  const { connected } = useWeb3Context();

  // const notifyText =
  //   'An issue in a certain feature of the Rollex Protocol was identified. Some markets or assets are temporarily paused. No funds are at risk.';

  // const unPauseText =
  //   'Implementation of the approved governance proposal is underway for V2 markets. Your funds are secure.';

  return (
    <Box
      sx={({ palette }) => ({
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundPosition: '0 -50vh',
        backgroundRepeat: 'bottom',
        backgroundImage: connected
          ? `radial-gradient(60% 50% at 50% 45% , #DBEF88, ${palette.background.default})`
          : `radial-gradient(60% 50% at 50% 45% , #f08580, ${palette.background.default})`,
      })}

      //EE1771 FD5249
    >
      {/* {currentMarket === 'proto_rollux_v3' ? (
        <TopBarNotify
          learnMoreLink="https://governance.aave.com/t/aave-v2-v3-security-incident-04-11-2023/15335"
          notifyText={currentMarket === 'proto_rollux_v3' ? notifyText : unPauseText}
        />
      ) : null} */}

      <AppHeader />

      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {children}
      </Box>

      <AppFooter />
      {FORK_ENABLED ? null : <AnalyticsConsent />}
    </Box>
  );
}
