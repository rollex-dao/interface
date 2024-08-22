import { useLingui } from '@lingui/react';
import { Button, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { useRootStore } from 'src/store/root';
import { NAV_BAR } from 'src/utils/mixPanelEvents';

import { Link } from '../../components/primitives/Link';
import { useProtocolDataContext } from '../../hooks/useProtocolDataContext';
import { navigation } from '../../ui-config/menu-items';
import { MoreMenu } from '../MoreMenu';

interface NavItemsProps {
  setOpen?: (value: boolean) => void;
}

export const NavItems = ({ setOpen }: NavItemsProps) => {
  const { i18n } = useLingui();
  const { currentMarketData } = useProtocolDataContext();
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));
  const trackEvent = useRootStore((store) => store.trackEvent);

  const handleClick = (title: string, isMd: boolean) => {
    if (isMd && setOpen) {
      trackEvent(NAV_BAR.MAIN_MENU, { nav_link: title });
      setOpen(false);
    } else {
      trackEvent(NAV_BAR.MAIN_MENU, { nav_link: title });
    }
  };

  return (
    <List
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        flexDirection: { xs: 'column', md: 'row' },
      }}
      disablePadding
    >
      {navigation
        .filter((item) => !item.isVisible || item.isVisible(currentMarketData))
        .map((item, index) => (
          <ListItem
            sx={{
              width: { xs: '100%', md: 'unset' },
              mr: { xs: 0, md: 2 },
            }}
            data-cy={item.dataCy}
            disablePadding
            key={index}
          >
            {md ? (
              <Typography
                component={Link}
                href={item.link}
                variant="h2"
                color="color.primary"
                sx={({ palette }) => ({
                  width: '100%',
                  p: 4,
                  color: palette.mode === 'dark' ? 'white' : '#7780A0',
                })}
                onClick={() => handleClick(item.title, true)}
              >
                {i18n._(item.title)}
              </Typography>
            ) : (
              <Button
                component={Link}
                onClick={() => handleClick(item.title, false)}
                href={item.link}
                disableRipple
                sx={() => ({
                  color: '#494949',
                  padding: '12px 14px',
                  fontSize: '16px',
                  fontWeight: 400,
                  borderRadius: '30px',
                  lineHeight: '16px',
                  '&:hover': { bgcolor: 'transparent' },
                  position: 'relative',
                  '.active&': {
                    width: '100%',
                    height: '100%',
                    color: '#191919',
                    fontWeight: 700,
                  },
                })}
              >
                {i18n._(item.title)}
              </Button>
            )}
          </ListItem>
        ))}

      <ListItem sx={{ display: { xs: 'none', md: 'flex' }, width: 'unset' }} disablePadding>
        <MoreMenu />
      </ListItem>
    </List>
  );
};
