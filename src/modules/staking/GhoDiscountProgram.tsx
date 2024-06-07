import { ChevronRightIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link, ROUTES } from 'src/components/primitives/Link';
import { useRootStore } from 'src/store/root';
import { CustomMarket, marketsData } from 'src/ui-config/marketsConfig';

export const GhoDiscountProgram = () => {
  const { breakpoints } = useTheme();
  const downToXsm = useMediaQuery(breakpoints.down('xsm'));
  const currentMarket = useRootStore((store) => store.currentMarket);

  const ghoTokenAddress = marketsData[
    CustomMarket.proto_rollux_v3
  ].addresses.GHO_TOKEN_ADDRESS?.toLowerCase() as string;

  return (
    <Box
      sx={{
        overflow: 'hidden',
        height: {
          xs: 132,
          xsm: 124,
        },
        display: 'flex',
      }}
    >
      <Box
        sx={(theme) => ({
          width: '100%',
          marginTop: 'auto',
          p: 4,
          borderRadius: {
            xs: 0,
            xsm: 4,
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: {
            xs: 'flex-start',
            xsm: 'center',
          },
          height: {
            xs: 120,
            xsm: 104,
          },
          background: theme.palette.mode === 'dark' ? '#1d2e49' : '#e5effb',
          color: theme.palette.mode === 'dark' ? '#FFF' : '#FFF',
          position: 'relative',
        })}
      >
        <Box
          component="img"
          src="/pegasys.svg"
          sx={{
            position: 'absolute',
            left: 10,
            // top: -33,
            width: 150,
            height: 150,
            overflow: 'hidden',
            display: {
              xs: 'none',
              xsm: 'block',
            },
            transform: 'matrix(1, -0.14, 0.14, 1, 0, 0)',
          }}
          width={150}
          height={150}
          alt="psys coin"
        />
        <Box display="flex" flexDirection="column" alignItems={['flex-start', 'center']} gap={3}>
          <Typography
            variant="subheader1"
            color="text.primary"
            width={['221px', '300px']}
            textAlign={['left', 'center']}
          >
            {downToXsm ? (
              <Trans>stkPSYS holders get a discount on GHO borrow rate</Trans>
            ) : (
              <Trans>Holders of stkPSYS receive a discount on the HOE borrowing rate</Trans>
            )}
          </Typography>
          <Button
            // variant="contained"
            component={Link}
            href={ROUTES.reserveOverview(ghoTokenAddress, currentMarket)}
            size={downToXsm ? 'medium' : 'small'}
            sx={(theme) => ({
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              gap: [2, 1],
              borderRadius: '20px',
              padding: '3px',
              background: theme.palette.mode === 'dark' ? '#1d2e49' : '#665de1',
              color: theme.palette.mode === 'dark' ? '#ffff' : '#ffff',
              '&:hover': {
                background: theme.palette.mode === 'dark' ? '#1d2e49' : '#665de1',
              },
            })}
          >
            <Trans>{downToXsm ? 'View details' : 'VIEW DETAILS'}</Trans>
            <ChevronRightIcon width={downToXsm ? 20 : 12} height={downToXsm ? 20 : 12} />
          </Button>
        </Box>
        <Box
          component="img"
          src="/purple-pegasys.svg"
          sx={{
            position: 'absolute',
            right: [-10, -35],
            bottom: [-55, -130],
            overflow: 'hidden',
            transform: 'scaleX(-1) scale(0.5)',
          }}
          alt="gho ghost"
          width={250}
        />
      </Box>
    </Box>
  );
};
