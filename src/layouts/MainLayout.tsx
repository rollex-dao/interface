import { Box } from '@mui/material';
import React, { ReactNode } from 'react';
import AnalyticsConsent from 'src/components/Analytics/AnalyticsConsent';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import TopBarNotify from 'src/layouts/TopBarNotify';
import { FORK_ENABLED } from 'src/utils/marketsAndNetworksConfig';

import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';

export function MainLayout({ children }: { children: ReactNode }) {
  const { currentMarket } = useProtocolDataContext();

  const notifyText =
    'An issue in a certain feature of the Pegasys Protocol was identified. Some markets or assets are temporarily paused. No funds are at risk.';

  const unPauseText =
    'Implementation of the approved governance proposal is underway for V2 markets. Your funds are secure.';

  return (
    <Box
      sx={({ palette }) => ({
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundPosition: '0 -50vh',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `radial-gradient(60% 50% at 50% 45% , #56BED8, ${palette.background.default})`,
      })}
    >
      {currentMarket === 'proto_rollux_v3' ? (
        <TopBarNotify
          learnMoreLink="https://governance.aave.com/t/aave-v2-v3-security-incident-04-11-2023/15335"
          notifyText={currentMarket === 'proto_rollux_v3' ? notifyText : unPauseText}
        />
      ) : null}

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
