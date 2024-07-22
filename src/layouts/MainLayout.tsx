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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Gradient and Blur Layer - Top Right */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '738px',
          height: '272px',
          background: connected
            ? 'radial-gradient(circle at top right, #DBEF88, transparent)'
            : 'radial-gradient(circle at top right, #f08580, transparent)',
          filter: 'blur(30px)',
          zIndex: 1,
        }}
      />

      {/* Gradient and Blur Layer - Bottom Left */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '20%',
          height: '50%',
          background: connected
            ? 'radial-gradient(circle at bottom left, #DBEF88, transparent)'
            : 'radial-gradient(circle at bottom left, #f08580, transparent)',
          filter: 'blur(30px)',
          zIndex: 1,
        }}
      />

      {/* Main Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <AppHeader />

        <Box
          component="main"
          sx={{
            width: '1280px',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            position: 'relative',
          }}
        >
          {children}
        </Box>

        <AppFooter />
        {FORK_ENABLED ? null : <AnalyticsConsent />}
      </Box>
    </Box>
  );
}
