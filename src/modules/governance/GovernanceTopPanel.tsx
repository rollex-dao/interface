import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Box, Button, SvgIcon, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ChainId } from '@pollum-io/contract-helpers';
import * as React from 'react';
import { ChainAvailabilityText } from 'src/components/ChainAvailabilityText';
import { Link } from 'src/components/primitives/Link';
import { useRootStore } from 'src/store/root';
import { GENERAL } from 'src/utils/mixPanelEvents';

import { TopInfoPanel } from '../../components/TopInfoPanel/TopInfoPanel';

interface ExternalLinkProps {
  text: string;
  href: string;
}

function ExternalLink({ text, href }: ExternalLinkProps) {
  const trackEvent = useRootStore((store) => store.trackEvent);

  return (
    <Button
      variant="surface"
      size="small"
      sx={{
        minWidth: 'unset',
        background: 'linear-gradient(90deg, #DBEF88 0%, #EACF5E 100%)',
        color: '#191919',
      }}
      component={Link}
      href={href}
      target="_blank"
      rel="noopener"
      onClick={() => trackEvent(GENERAL.EXTERNAL_LINK, { Link: text })}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(90deg, #DBEF88 0%, #EACF5E 100%)',
        }}
      >
        {text}
        <SvgIcon sx={{ ml: 1, fontSize: 14 }}>
          <ExternalLinkIcon />
        </SvgIcon>
      </Box>
    </Button>
  );
}

export const GovernanceTopPanel = () => {
  const theme = useTheme();
  const upToLG = useMediaQuery(theme.breakpoints.up('lg'));
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const trackEvent = useRootStore((store) => store.trackEvent);

  return (
    <TopInfoPanel
      titleComponent={
        <Box mb={4}>
          <ChainAvailabilityText wrapperSx={{ mb: 4 }} chainId={570 as ChainId} />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <img src={`/icons/tokens/rollex.svg`} width="32px" height="32px" alt="" />
            <Typography
              variant={downToXSM ? 'h2' : upToLG ? 'display1' : 'h1'}
              sx={{ ml: 2, mr: 3 }}
            >
              <Trans>Rollex Governance</Trans>
            </Typography>
          </Box>

          <Typography sx={{ color: 'text.primary', maxWidth: '824px' }}>
            <Trans>
              Rollex is a fully decentralized, community governed protocol by the RLX token-holders.
              RLX token-holders collectively discuss, propose, and vote on upgrades to the protocol.
              RLX token-holders (Rollux network only) can either vote themselves on new proposals or
              delagate to an address of choice. To learn more check out the Governance
            </Trans>{' '}
            <Link
              onClick={() => trackEvent(GENERAL.EXTERNAL_LINK, { Link: 'FAQ Docs Governance' })}
              href="https://docs.aave.com/faq/governance"
              sx={{ textDecoration: 'underline', color: '#8E92A3' }}
            >
              <Trans>documentation</Trans>
            </Link>
            .
          </Typography>
        </Box>
      }
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          maxWidth: 'sm',
        }}
      >
        <ExternalLink text="SNAPSHOTS" href="https://snapshot.org/#/aave.eth" />
        <ExternalLink text="FORUM" href="https://governance.aave.com/" />
        <ExternalLink text="FAQ" href="https://docs.aave.com/faq/governance" />
      </Box>
    </TopInfoPanel>
  );
};
