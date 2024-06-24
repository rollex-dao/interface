import { Box, Typography, useMediaQuery, useScrollTrigger, useTheme } from '@mui/material';
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
  const trigger = useScrollTrigger({ threshold: md ? 160 : 80 });

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

  const bgHeader = {
    dark: 'rgba(8, 17, 32, 0.72)',
    light: 'rgba(255, 255, 255, 0.72)',
  };

  return (
    <Box
      component="header"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      sx={(theme) => ({
        height: headerHeight,
        position: 'sticky',
        top: 0,
        transition: theme.transitions.create('all'),
        zIndex: theme.zIndex.appBar,
        padding: {
          xs: mobileMenuOpen || walletWidgetOpen ? '8px 20px' : '20px 12px',
          xsm: '20px 12px',
        },
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'space-between',
        bgcolor: 'transparent',
        ...(trigger && {
          boxShadow: 'inset 0px -1px 0px rgba(242, 243, 247, 0.16)',
          bgcolor: trigger ? bgHeader[theme.palette.mode] : 'transparent',
        }),
      })}
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
              <img src={`/icons/networks/rollux.svg`} width="24px" height="24px" alt="" />
              <Typography fontSize={16} color="text.primary">
                Rollux
              </Typography>
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
  );
}
