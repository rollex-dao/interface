import { Trans } from '@lingui/macro';
import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { ChainId } from '@pollum-io/contract-helpers';
import { Warning } from 'src/components/primitives/Warning';
import { useRootStore } from 'src/store/root';
import { NetworkConfig } from 'src/ui-config/networksConfig';
import { GENERAL } from 'src/utils/mixPanelEvents';

import { Link } from '../../../../components/primitives/Link';

type WalletEmptyInfoProps = Pick<NetworkConfig, 'bridge' | 'name'> & {
  chainId: number;
  icon?: boolean;
  sx?: SxProps<Theme>;
};

export function WalletEmptyInfo({ bridge, name, chainId, icon }: WalletEmptyInfoProps) {
  const network = [ChainId.avalanche].includes(chainId) ? 'Ethereum & Bitcoin' : 'Ethereum';

  const trackEvent = useRootStore((store) => store.trackEvent);

  return (
    <Warning
      severity="info"
      icon={icon}
      sx={{
        background: '#EE177133',
        color: '#191919',
        borderRadius: '12px',
        fontWeight: 400,
      }}
    >
      {bridge ? (
        <Trans>
          Your {name} wallet is empty. Purchase or transfer assets or use{' '}
          {
            <Link
              onClick={() => {
                trackEvent(GENERAL.EXTERNAL_LINK, { bridge: bridge.name, Link: 'Bridge Link' });
              }}
              href={bridge.url}
            >
              {bridge.name}
            </Link>
          }{' '}
          to transfer your {network} assets.
        </Trans>
      ) : (
        <Trans>Your {name} wallet is empty. Purchase or transfer assets.</Trans>
      )}
    </Warning>
  );
}
