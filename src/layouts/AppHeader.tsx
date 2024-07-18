import { Box, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { RollexLogo } from 'src/components/icons/RollexLogo';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { useRootStore } from 'src/store/root';

import { Link } from '../components/primitives/Link';
import { NavItems } from './components/NavItems';
import { MobileMenu } from './MobileMenu';
import { SettingsMenu } from './SettingsMenu';
import WalletWidget from './WalletWidget';

export function AppHeader() {
  const { currentAccount, chainId } = useWeb3Context();
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));

  const [mobileDrawerOpen, setMobileDrawerOpen] = useRootStore((state) => [
    state.mobileDrawerOpen,
    state.setMobileDrawerOpen,
  ]);

  const [walletWidgetOpen, setWalletWidgetOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileDrawerOpen && !md) {
      setMobileDrawerOpen(false);
    }
    if (walletWidgetOpen) {
      setWalletWidgetOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [md]);

  const headerHeight = 72;

  const toggleWalletWigit = (state: boolean) => {
    if (md) setMobileDrawerOpen(state);
    setWalletWidgetOpen(state);
  };

  const toggleMobileMenu = (state: boolean) => {
    if (md) setMobileDrawerOpen(state);
    setMobileMenuOpen(state);
  };

  return (
    <Box
      component="header"
      sx={(theme) => ({
        height: headerHeight,
        position: 'sticky',
        top: 0,
        transition: theme.transitions.create('all'),
        zIndex: theme.zIndex.appBar,
        bgcolor: '#FFFFFF',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Centraliza verticalmente o conteúdo
      })}
    >
      <Box
        sx={{
          width: '1280px',
          maxWidth: '100%',
          padding: '40px 112px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          component={Link}
          href="/"
          aria-label="Go to homepage"
          sx={{
            lineHeight: 0,
            mr: 3,
            transition: '0.3s ease all',
            '&:hover': { opacity: 0.7 },
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <RollexLogo height={44} />
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <NavItems />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {!mobileMenuOpen && (
          <>
            {currentAccount && chainId === 570 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 3 }}>
                <img src={`/icons/networks/rollux-logo.svg`} alt="" />
              </Box>
            )}
            <WalletWidget
              open={walletWidgetOpen}
              setOpen={toggleWalletWigit}
              headerHeight={headerHeight}
            />
          </>
        )}

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <SettingsMenu />
        </Box>

        {!walletWidgetOpen && (
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MobileMenu
              open={mobileMenuOpen}
              setOpen={toggleMobileMenu}
              headerHeight={headerHeight}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
