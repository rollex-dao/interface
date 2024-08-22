import { Box } from '@mui/material';
import { blo } from 'blo';
import { useMemo } from 'react';
import { useRootStore } from 'src/store/root';
import shallow from 'zustand/shallow';

import { Avatar, AvatarProps } from './Avatar';
import { UserNameText, UserNameTextProps } from './UserNameText';

type UserDisplayProps = {
  oneLiner?: boolean;
  avatarProps?: AvatarProps;
  titleProps?: Omit<UserNameTextProps, 'address' | 'domainName'>;
  subtitleProps?: Omit<UserNameTextProps, 'address' | 'domainName'>;
  withLink?: boolean;
  funnel?: string;
};

export const UserDisplay: React.FC<UserDisplayProps> = ({
  oneLiner = false,
  titleProps,
  subtitleProps,
  withLink,
  funnel,
}) => {
  const { account, defaultDomain, domainsLoading, accountLoading } = useRootStore(
    (state) => ({
      account: state.account,
      defaultDomain: state.defaultDomain,
      domainsLoading: state.domainsLoading,
      accountLoading: state.accountLoading,
    }),
    shallow
  );

  const loading = domainsLoading || accountLoading;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {!oneLiner && defaultDomain?.name ? (
          <>
            <UserNameText
              address={account}
              loading={loading}
              domainName={defaultDomain.name}
              variant="h4"
              link={withLink ? `https://etherscan.io/address/${account}` : undefined}
              funnel={funnel}
              {...titleProps}
            />
            <UserNameText
              address={account}
              loading={loading}
              variant="caption"
              {...subtitleProps}
            />
          </>
        ) : (
          <UserNameText
            address={account}
            domainName={defaultDomain?.name}
            loading={loading}
            variant="h4"
            link={withLink ? `https://etherscan.io/address/${account}` : undefined}
            funnel={funnel}
            {...titleProps}
          />
        )}
      </Box>
    </Box>
  );
};

interface ExternalUserDisplayProps {
  avatarProps?: AvatarProps;
  titleProps?: Omit<UserNameTextProps, 'address'>;
  address: string;
}

export const ExternalUserDisplay: React.FC<ExternalUserDisplayProps> = ({
  avatarProps,
  titleProps,
  address,
}) => {
  // const { name, avatar } = useGetEns(address);

  const fallbackImage = useMemo(
    () => (address ? blo(address as `0x${string}`) : undefined),
    [address]
  );
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar image={undefined} fallbackImage={fallbackImage} {...avatarProps} />
      <UserNameText
        variant="h4"
        address={address}
        domainName={undefined}
        link={`https://etherscan.io/address/${address}`}
        iconSize={14}
        {...titleProps}
        funnel={'Delegation power panel: Governance'}
      />
    </Box>
  );
};
