import { Trans } from '@lingui/macro';
import { Button, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { useWalletModalContext } from 'src/hooks/useWalletModal';
import { useRootStore } from 'src/store/root';
import { AUTH } from 'src/utils/mixPanelEvents';

const WalletModal = dynamic(() => import('./WalletModal').then((module) => module.WalletModal));

export interface ConnectWalletProps {
  funnel?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletProps> = ({ funnel }) => {
  const { setWalletModalOpen } = useWalletModalContext();
  const { palette } = useTheme();
  const trackEvent = useRootStore((store) => store.trackEvent);

  return (
    <>
      <Button
        // variant="gradient"
        onClick={() => {
          trackEvent(AUTH.CONNECT_WALLET, { funnel: funnel });
          setWalletModalOpen(true);
        }}
        sx={{
          background:
            palette.mode === 'dark'
              ? 'linear-gradient(90deg, #DBEF88 0%, #EACF5E 100%)'
              : 'linear-gradient(90deg, #DBEF88 0%, #EACF5E 100%)',
          color: 'white',
          borderRadius: '20px',
        }}
      >
        <Trans>Connect wallet</Trans>
      </Button>
      <WalletModal />
    </>
  );
};
