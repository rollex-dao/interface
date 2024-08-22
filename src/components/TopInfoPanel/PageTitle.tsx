import { Trans } from '@lingui/macro';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

import { useRootStore } from '../../store/root';
import { selectIsMigrationAvailable } from '../../store/v3MigrationSelectors';
import { NetworkConfig } from '../../ui-config/networksConfig';
// import { BridgeButton } from '../BridgeButton';
import { MarketSwitcher } from '../MarketSwitcher';
import { Link, ROUTES } from '../primitives/Link';

export interface PageTitleProps extends Pick<NetworkConfig, 'bridge'> {
  pageTitle?: ReactNode;
  withMarketSwitcher?: boolean;
  withMigrateButton?: boolean;
}

export const PageTitle = ({ pageTitle, withMarketSwitcher, withMigrateButton }: PageTitleProps) => {
  const isMigrateToV3Available = useRootStore((state) => selectIsMigrationAvailable(state));

  const theme = useTheme();
  const upToLG = useMediaQuery(theme.breakpoints.up('lg'));
  // const upToMD = useMediaQuery(theme.breakpoints.up('md'));
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', xsm: 'center' },
        mb: pageTitle ? '22px' : 0,
        mt: '22px',
        flexDirection: { xs: 'column', xsm: 'row' },
      }}
    >
      {pageTitle && (downToXSM || !withMarketSwitcher) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            background: '#000000',
            padding: '8px 16px 8px 16px',
            justifyContent: 'center',
            borderRadius: '8px',
          }}
        >
          <Typography
            variant={downToXSM ? 'h2' : upToLG ? 'display1' : 'h1'}
            sx={{
              background: 'linear-gradient(90deg, #DBEF88 0%, #EACF5E 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: '40px',
              fontWeight: 600,
              lineHeight: '56px',
              fontFamily: 'Carbon',
            }}
          >
            {pageTitle}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          mb: !pageTitle ? 4 : 0,
        }}
      >
        {withMarketSwitcher && <MarketSwitcher disableSwitch={true} />}
        {/* <BridgeButton bridge={bridge} variant="surface" withoutIcon={!upToMD} /> */}
        {/* NOTE:// Removing for now  */}
        {isMigrateToV3Available && withMigrateButton && (
          <Link href={ROUTES.migrationTool} sx={{ mt: { xs: 2, xsm: 0 } }}>
            <Button variant="gradient" size="small">
              <Trans>Migrate to V3</Trans>
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};
