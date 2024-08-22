import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Box, Skeleton, SvgIcon, useMediaQuery, useTheme } from '@mui/material';
import { CircleIcon } from 'src/components/CircleIcon';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Link } from 'src/components/primitives/Link';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useRootStore } from 'src/store/root';
import { GENERAL } from 'src/utils/mixPanelEvents';

import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import {
  ComputedReserveData,
  useAppDataContext,
} from '../../hooks/app-data-provider/useAppDataProvider';

interface ReserveTopDetailsProps {
  underlyingAsset: string;
}

export const ReserveTopDetails = ({ underlyingAsset }: ReserveTopDetailsProps) => {
  const { reserves, loading } = useAppDataContext();
  const { currentNetworkConfig } = useProtocolDataContext();
  const trackEvent = useRootStore((store) => store.trackEvent);

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  const poolReserve = reserves.find(
    (reserve) => reserve.underlyingAsset === underlyingAsset
  ) as ComputedReserveData;

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const symbolsTypographyVariant = downToSM ? 'secondary16' : 'secondary21';

  const iconStyling = {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#494949',
    cursor: 'pointer',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid #000000',
        borderRadius: '32px',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <TopInfoPanelItem
        title={<Trans>Reserve Size</Trans>}
        loading={loading}
        hideIcon
        withBorder={false}
      >
        <FormattedNumber
          value={Math.max(Number(poolReserve?.totalLiquidityUSD), 0)}
          symbol="USD"
          variant={valueTypographyVariant}
          symbolsVariant={symbolsTypographyVariant}
          symbolsColor="text.primary"
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem
        title={<Trans>Available liquidity</Trans>}
        loading={loading}
        hideIcon
        withBorder={false}
      >
        <FormattedNumber
          value={Math.max(Number(poolReserve?.availableLiquidityUSD), 0)}
          symbol="USD"
          variant={valueTypographyVariant}
          symbolsVariant={symbolsTypographyVariant}
          symbolsColor="text.primary"
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem
        title={<Trans>Utilization Rate</Trans>}
        loading={loading}
        hideIcon
        withBorder={false}
      >
        <FormattedNumber
          value={poolReserve?.borrowUsageRatio}
          percent
          variant={valueTypographyVariant}
          symbolsVariant={symbolsTypographyVariant}
          symbolsColor="text.primary"
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem
        title={<Trans>Oracle price</Trans>}
        loading={loading}
        hideIcon
        withBorder={false}
      >
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <FormattedNumber
            value={poolReserve?.priceInUSD}
            symbol="USD"
            variant={valueTypographyVariant}
            symbolsVariant={symbolsTypographyVariant}
            symbolsColor="text.primary"
          />
          {loading ? (
            <Skeleton width={16} height={16} sx={{ ml: 1, background: '#383D51' }} />
          ) : (
            <CircleIcon tooltipText="View oracle contract" downToSM={downToSM}>
              <Link
                onClick={() =>
                  trackEvent(GENERAL.EXTERNAL_LINK, {
                    Link: 'Oracle Price',
                    oracle: poolReserve?.priceOracle,
                    assetName: poolReserve.name,
                    asset: poolReserve.underlyingAsset,
                  })
                }
                href={currentNetworkConfig.explorerLinkBuilder({
                  address: poolReserve?.priceOracle,
                })}
                sx={iconStyling}
              >
                <SvgIcon sx={{ fontSize: downToSM ? '12px' : '14px' }}>
                  <ExternalLinkIcon />
                </SvgIcon>
              </Link>
            </CircleIcon>
          )}
        </Box>
      </TopInfoPanelItem>
    </Box>
  );
};
