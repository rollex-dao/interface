import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Skeleton,
  SvgIcon,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { AvatarSize } from 'src/components/Avatar';
import { CompactMode } from 'src/components/CompactableTypography';
import { Warning } from 'src/components/primitives/Warning';
import { UserDisplay } from 'src/components/UserDisplay';
import { WalletModal } from 'src/components/WalletConnection/WalletModal';
import { useWalletModalContext } from 'src/hooks/useWalletModal';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { useRootStore } from 'src/store/root';
import { AUTH, GENERAL } from 'src/utils/mixPanelEvents';

import { Link } from '../components/primitives/Link';
import { ENABLE_TESTNET, getNetworkConfig, STAGING_ENV } from '../utils/marketsAndNetworksConfig';
import { DrawerWrapper } from './components/DrawerWrapper';
import { MobileCloseButton } from './components/MobileCloseButton';

interface WalletWidgetProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  headerHeight: number;
}

export default function WalletWidget({ open, setOpen, headerHeight }: WalletWidgetProps) {
  const { disconnectWallet, currentAccount, connected, chainId, loading, readOnlyModeAddress } =
    useWeb3Context();

  const { setWalletModalOpen } = useWalletModalContext();

  const { breakpoints, palette } = useTheme();
  const xsm = useMediaQuery(breakpoints.down('xsm'));
  const md = useMediaQuery(breakpoints.down('md'));
  const trackEvent = useRootStore((store) => store.trackEvent);

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const networkConfig = getNetworkConfig(chainId);
  // let networkColor = '';
  // if (networkConfig?.isFork) {
  //   networkColor = '#ff4a8d';
  // } else if (networkConfig?.isTestnet) {
  //   networkColor = '#7157ff';
  // } else {
  //   networkColor = '#65c970';
  // }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!connected) {
      trackEvent(GENERAL.OPEN_MODAL, { modal: 'Connect Waller' });
      setWalletModalOpen(true);
    } else {
      setOpen(true);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleDisconnect = () => {
    if (connected) {
      disconnectWallet();
      trackEvent(AUTH.DISCONNECT_WALLET);
      handleClose();
    }
  };

  const handleSwitchWallet = (): void => {
    setWalletModalOpen(true);
    trackEvent(AUTH.SWITCH_WALLET);
    handleClose();
  };

  const handleViewOnExplorer = (): void => {
    trackEvent(GENERAL.EXTERNAL_LINK, { Link: 'Etherscan for Wallet' });
    handleClose();
  };

  const hideWalletAccountText = xsm && (ENABLE_TESTNET || STAGING_ENV || readOnlyModeAddress);

  const Content = ({ component = ListItem }: { component?: typeof MenuItem | typeof ListItem }) => (
    <>
      <Box component={component} disabled>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ marginBottom: '10px' }} />
          <UserDisplay
            avatarProps={{ size: AvatarSize.XL }}
            titleProps={{
              typography: 'h4',
              addressCompactMode: CompactMode.MD,
            }}
            subtitleProps={{
              addressCompactMode: CompactMode.LG,
              typography: 'caption',
            }}
          />
          {readOnlyModeAddress && (
            <Warning
              icon={false}
              severity="warning"
              sx={{ mt: 5, mb: 0, ...(md ? { background: '#301E04', color: '#FFDCA8' } : {}) }}
            >
              <Trans>Read-only mode.</Trans>
            </Warning>
          )}
          {networkConfig?.explorerLinkBuilder && (
            <Link href={networkConfig.explorerLinkBuilder({ address: currentAccount })}>
              <Box
                component={component}
                sx={{ color: { xs: '#F1F1F3', md: 'text.primary' } }}
                onClick={handleViewOnExplorer}
              >
                <ListItemText sx={{ fontWeight: 400 }}>
                  <Trans>View on Explorer</Trans>
                </ListItemText>
              </Box>
            </Link>
          )}
        </Box>
      </Box>
      {!md && (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0 16px 10px', gap: '8px' }}>
          <Button
            sx={{
              padding: '6px 12px 6px 12px',
              marginRight: '10px',
              borderRadius: '4px',
              background: 'linear-gradient(90deg, #DBEF88 0%, #EACF5E 100%)',
            }}
            size="small"
            onClick={handleSwitchWallet}
          >
            Switch wallet
          </Button>
          <Button
            sx={{
              padding: '6px 12px 6px 12px',
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #DBEF88',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
            }}
            size="small"
            onClick={handleDisconnect}
            data-cy={`disconnect-wallet`}
          >
            Disconnect
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.93311 5.03999C6.13977 2.63999 7.37311 1.65999 10.0731 1.65999H10.1598C13.1398 1.65999 14.3331 2.85332 14.3331 5.83332V10.18C14.3331 13.16 13.1398 14.3533 10.1598 14.3533H10.0731C7.39311 14.3533 6.15977 13.3867 5.93977 11.0267"
                stroke="#191919"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.0002 8H2.41357"
                stroke="#191919"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.89984 5.76668L1.6665 8.00001L3.89984 10.2333"
                stroke="#191919"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </Box>
      )}
      <Divider sx={{ my: { xs: 7, md: 0 }, borderColor: { xs: '#FFFFFF1F', md: 'divider' } }} />

      <Divider sx={{ my: { xs: 7, md: 0 }, borderColor: { xs: '#FFFFFF1F', md: 'divider' } }} />

      {md && (
        <>
          <Divider sx={{ my: { xs: 7, md: 0 }, borderColor: { xs: '#FFFFFF1F', md: 'divider' } }} />
          <Box sx={{ padding: '16px 16px 10px' }}>
            <Button
              sx={{
                marginBottom: '16px',
                background: '#383D51',
                color: '#F1F1F3',
              }}
              fullWidth
              size="large"
              variant={palette.mode === 'dark' ? 'outlined' : 'text'}
              onClick={handleSwitchWallet}
            >
              Switch wallet
            </Button>
            <Button
              sx={{
                background: '#383D51',
                color: '#F1F1F3',
              }}
              fullWidth
              size="large"
              variant={palette.mode === 'dark' ? 'outlined' : 'text'}
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </Box>
        </>
      )}
    </>
  );

  return (
    <>
      {md && connected && open ? (
        <MobileCloseButton setOpen={setOpen} />
      ) : loading ? (
        <Skeleton height={36} width={126} sx={{ background: '#383D51' }} />
      ) : (
        <Button
          variant={connected ? 'surface' : 'gradient'}
          aria-label="wallet"
          id="wallet-button"
          aria-controls={open ? 'wallet-button' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          disableRipple
          sx={({ palette }) => ({
            p: connected ? '16px, 24px' : undefined,
            minWidth: hideWalletAccountText ? 'unset' : undefined,
            width: 'auto',
            height: '52px',
            background:
              palette.mode === 'dark'
                ? 'linear-gradient(90deg, #DBEF88 0%, #EACF5E 100%)'
                : 'linear-gradient(90deg, #DBEF88 0%, #EACF5E 100%)',
            borderRadius: '8px',
            border: 'none',
            color: '#191919',
            '&:hover': {
              background: 'linear-gradient(90deg, #DBEF88 0%, #EACF5E 100%)',
            },
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '28.8px',
          })}
          endIcon={
            connected &&
            !hideWalletAccountText &&
            !md && (
              <SvgIcon
                sx={{
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </SvgIcon>
            )
          }
        >
          {connected ? (
            <UserDisplay
              avatarProps={{ size: AvatarSize.SM }}
              oneLiner={true}
              titleProps={{ variant: 'buttonM' }}
            />
          ) : (
            <Trans>Connect wallet</Trans>
          )}
        </Button>
      )}

      {md ? (
        <DrawerWrapper open={open} setOpen={setOpen} headerHeight={headerHeight}>
          <List sx={{ px: 2, '.MuiListItem-root.Mui-disabled': { opacity: 1 } }}>
            <Content />
          </List>
        </DrawerWrapper>
      ) : (
        <Menu
          id="wallet-menu"
          MenuListProps={{
            'aria-labelledby': 'wallet-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          keepMounted={true}
        >
          <MenuList disablePadding sx={{ '.MuiMenuItem-root.Mui-disabled': { opacity: 1 } }}>
            <Content component={MenuItem} />
          </MenuList>
        </Menu>
      )}

      <WalletModal />
    </>
  );
}
