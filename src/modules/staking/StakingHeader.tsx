import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ChainId } from '@pollum-io/contract-helpers';
import { ChainAvailabilityText } from 'src/components/ChainAvailabilityText';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { TopInfoPanel } from 'src/components/TopInfoPanel/TopInfoPanel';
import { useRootStore } from 'src/store/root';
import { GENERAL } from 'src/utils/mixPanelEvents';

import { Link } from '../../components/primitives/Link';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';

interface StakingHeaderProps {
  tvl: string;
  stkEmission: string;
  loading: boolean;
}

export const StakingHeader: React.FC<StakingHeaderProps> = ({ tvl, stkEmission, loading }) => {
  const theme = useTheme();
  const upToLG = useMediaQuery(theme.breakpoints.up('lg'));
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const symbolsTypographyVariant = downToSM ? 'secondary16' : 'secondary21';
  const trackEvent = useRootStore((store) => store.trackEvent);

  return (
    <TopInfoPanel
      titleComponent={
        <Box mb={4}>
          <ChainAvailabilityText wrapperSx={{ mb: 4 }} chainId={570 as ChainId} />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <img src={`/icons/tokens/rollex.svg`} width="62px" height="62px" alt="" />
            <Typography
              variant={downToXSM ? 'h2' : upToLG ? 'display1' : 'h1'}
              sx={{ ml: 2, mr: 3 }}
            >
              <Trans>Staking</Trans>
            </Typography>
          </Box>

          <Typography sx={{ color: 'text.primary', maxWidth: '824px' }}>
            <Trans>
              REX holders (Rollux network only) can stake their REX in the Safety Module to add more
              security to the protocol and earn Safety Incentives. In the case of a shortfall event,
              up to 30% of your stake can be slashed to cover the deficit, providing an additional
              layer of protection for the protocol.
            </Trans>{' '}
            <Link
              href="https://docs.aave.com/faq/migration-and-staking"
              sx={{ textDecoration: 'underline', color: '#8E92A3' }}
              onClick={() =>
                trackEvent(GENERAL.EXTERNAL_LINK, {
                  Link: 'Staking Risks',
                })
              }
            >
              <Trans>Learn more about risks involved</Trans>
            </Link>
          </Typography>
        </Box>
      }
    >
      <TopInfoPanelItem
        hideIcon
        title={<Trans>Funds in the Safety Module</Trans>}
        loading={loading}
      >
        {/** TBD value */}
        <FormattedNumber
          value={tvl || 0}
          symbol="USD"
          variant={valueTypographyVariant}
          symbolsVariant={symbolsTypographyVariant}
          symbolsColor="text.primary"
          visibleDecimals={2}
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem hideIcon title={<Trans>Total emission per day</Trans>} loading={loading}>
        {/** TBD value */}
        <FormattedNumber
          value={stkEmission || 0}
          symbol="REX"
          variant={valueTypographyVariant}
          symbolsVariant={symbolsTypographyVariant}
          symbolsColor="#A5A8B6"
          visibleDecimals={2}
        />
      </TopInfoPanelItem>
    </TopInfoPanel>
  );
};
