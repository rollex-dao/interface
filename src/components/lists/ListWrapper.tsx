import { Trans } from '@lingui/macro';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, BoxProps, Paper, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useRootStore } from 'src/store/root';
import { DASHBOARD } from 'src/utils/mixPanelEvents';

import { toggleLocalStorageClick } from '../../helpers/toggle-local-storage-click';

interface ListWrapperProps {
  titleComponent: ReactNode;
  localStorageName?: string;
  subTitleComponent?: ReactNode;
  subChildrenComponent?: ReactNode;
  topInfo?: ReactNode;
  children: ReactNode;
  withTopMargin?: boolean;
  noData?: boolean;
  wrapperSx?: BoxProps['sx'];
  tooltipOpen?: boolean;
}

export const ListWrapper = ({
  children,
  localStorageName,
  titleComponent,
  subTitleComponent,
  subChildrenComponent,
  topInfo,
  withTopMargin,
  noData,
  wrapperSx,
  tooltipOpen,
}: ListWrapperProps) => {
  const [isCollapse, setIsCollapse] = useState(
    localStorageName ? localStorage.getItem(localStorageName) === 'true' : false
  );
  const trackEvent = useRootStore((store) => store.trackEvent);

  const handleTrackingEvents = () => {
    if (!isCollapse) {
      switch (localStorageName as string | boolean) {
        case 'borrowAssetsDashboardTableCollapse':
          trackEvent(DASHBOARD.TILE_VISBILITY, {
            visibility: 'Hidden',
            type: 'Available Borrow Assets',
          });
          break;
        case 'borrowedAssetsDashboardTableCollapse':
          trackEvent(DASHBOARD.TILE_VISBILITY, { visibility: 'Hidden', type: 'Borrowed Assets' });
          break;
        case 'supplyAssetsDashboardTableCollapse':
          trackEvent(DASHBOARD.TILE_VISBILITY, {
            visibility: 'Hidden',
            type: 'Available Supply Assets',
          });
          break;
        case 'suppliedAssetsDashboardTableCollapse':
          trackEvent(DASHBOARD.TILE_VISBILITY, { visibility: 'Hidden', type: 'Supplied Assets' });
        default:
          return null;
      }
    } else {
      switch (localStorageName as string | boolean) {
        case 'borrowAssetsDashboardTableCollapse':
          trackEvent(DASHBOARD.TILE_VISBILITY, {
            visibility: 'Show',
            type: 'Available Borrow Assets',
          });
          break;
        case 'borrowedAssetsDashboardTableCollapse':
          trackEvent(DASHBOARD.TILE_VISBILITY, { visibility: 'Show', type: 'Borrowed Assets' });
          break;
        case 'supplyAssetsDashboardTableCollapse':
          trackEvent(DASHBOARD.TILE_VISBILITY, {
            visibility: 'Show',
            type: 'Available Supply Assets',
          });
          break;
        case 'suppliedAssetsDashboardTableCollapse':
          trackEvent(DASHBOARD.TILE_VISBILITY, { visibility: 'Show', type: 'Supplied Assets' });
        default:
          return null;
      }
    }
  };

  const collapsed = isCollapse && !noData;

  return (
    <Paper
      sx={{
        mt: withTopMargin ? '44px' : 0,
        borderRadius: '20px',
        border: '1px solid #494949',
        width: '1280px',
        maxWidth: '100%',
      }}
    >
      <Box
        sx={{
          px: { xs: 4, xsm: 6 },
          py: { xs: 3.5, xsm: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...wrapperSx,
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: { xs: 'flex-start', xsm: 'center' },
            flexDirection: { xs: 'column', xsm: 'row' },
          }}
        >
          {titleComponent}
          {subTitleComponent}
        </Box>

        {!!localStorageName && !noData && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              minHeight: '28px',
              pl: 3,
            }}
            onClick={() => {
              handleTrackingEvents();

              !!localStorageName && !noData
                ? toggleLocalStorageClick(isCollapse, setIsCollapse, localStorageName)
                : undefined;
            }}
          >
            <Typography variant="buttonM" color="text.secondary">
              {collapsed ? <Trans>Hide</Trans> : <Trans>Show</Trans>}
            </Typography>
            <Box sx={{ width: 8 }} />
            {collapsed ? <Visibility /> : <VisibilityOff />}
          </Box>
        )}
      </Box>

      {topInfo && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: { xs: 4, xsm: 6 },
            pb: { xs: collapsed && !noData ? 6 : 2, xsm: collapsed && !noData ? 6 : 0 },
            overflowX: tooltipOpen ? 'hidden' : 'auto',
          }}
        >
          {topInfo}
        </Box>
      )}
      {subChildrenComponent && !collapsed && (
        <Box sx={{ marginBottom: { xs: 2, xsm: 0 } }}>{subChildrenComponent}</Box>
      )}
      <Box sx={{ display: collapsed ? 'none' : 'block' }}>{children}</Box>
    </Paper>
  );
};
