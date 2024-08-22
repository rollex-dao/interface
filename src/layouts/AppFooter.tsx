import { Trans } from '@lingui/macro';
import { GitHub, Twitter } from '@mui/icons-material';
import { Box, Divider, styled, SvgIcon, Typography } from '@mui/material';
import { Link } from 'src/components/primitives/Link';
import { useRootStore } from 'src/store/root';

import DiscordIcon from '/public/icons/discord.svg';

interface StyledLinkProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const StyledLink = styled(Link)<StyledLinkProps>(() => ({
  color: '#191919',
  display: 'flex',
  alignItems: 'center',
}));

const FOOTER_ICONS = [
  {
    href: 'https://twitter.com/aave',
    icon: <Twitter />,
    title: 'Lens',
  },
  {
    href: 'https://discord.com/invite/aave',
    icon: <DiscordIcon />,
    title: 'Discord',
  },
  {
    href: 'https://github.com/aave',
    icon: <GitHub />,
    title: 'Github',
  },
];

export function AppFooter() {
  const [setAnalyticsConfigOpen] = useRootStore((store) => [store.setAnalyticsConfigOpen]);
  const FOOTER_LINKS = [
    {
      href: 'https://aave.com/term-of-use/',
      label: <Trans>Terms</Trans>,
      key: 'Terms',
    },
    {
      href: 'https://aave.com/privacy-policy/',
      label: <Trans>Privacy</Trans>,
      key: 'Privacy',
    },
    {
      href: 'https://docs.aave.com/hub/',
      label: <Trans>Docs</Trans>,
      key: 'Docs',
    },
    {
      href: 'https://docs.aave.com/faq/',
      label: <Trans>FAQS</Trans>,
      key: 'FAQS',
    },
    {
      href: 'https://discord.com/invite/aave',
      label: <Trans>Send feedback</Trans>,
      key: 'Send feedback',
    },
    {
      href: '',
      label: <Trans>Manage analytics</Trans>,
      key: 'Manage analytics',
      onClick: (event: React.MouseEvent) => {
        event.preventDefault();
        setAnalyticsConfigOpen(true);
      },
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '1280px',
          maxWidth: '100%',
          padding: '40px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '22px',
            flexDirection: ['column', 'column', 'row'],
            background: '#FFFFFF',
          }}
        >
          <Box>
            <img src="icons/tokens/rollex-logo.svg" alt="" />
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '70px' }}
          >
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}
            >
              {FOOTER_LINKS.slice(0, 2).map((link) => (
                <StyledLink onClick={link.onClick} key={link.key} href={link.href}>
                  <Typography variant="caption">{link.label}</Typography>
                </StyledLink>
              ))}
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}
            >
              {FOOTER_LINKS.slice(2, 4).map((link) => (
                <StyledLink onClick={link.onClick} key={link.key} href={link.href}>
                  <Typography variant="caption">{link.label}</Typography>
                </StyledLink>
              ))}
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}
            >
              {FOOTER_LINKS.slice(4, 6).map((link) => (
                <StyledLink onClick={link.onClick} key={link.key} href={link.href}>
                  <Typography variant="caption">{link.label}</Typography>
                </StyledLink>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {FOOTER_ICONS.map((icon) => (
              <StyledLink href={icon.href} key={icon.title} sx={{ color: '#A3A883' }}>
                <SvgIcon
                  sx={{
                    fontSize: [24, 24, 20],
                    width: '36px',
                    height: '36px',
                    padding: '8px',
                    borderRadius: '103px',
                    border: '1px solid #E0E0E0',
                  }}
                >
                  {icon.icon}
                </SvgIcon>
              </StyledLink>
            ))}
          </Box>
        </Box>
        <Divider sx={{ width: '100%', marginY: 2, borderColor: '#E0E0E0' }} />
        <Typography sx={{ color: '#494949', fontSize: '14px', fontWeight: 400 }}>
          ©2024 all rights reserved
        </Typography>
      </Box>
    </Box>
  );
}
