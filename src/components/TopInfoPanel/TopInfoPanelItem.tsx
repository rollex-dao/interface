import { Box, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface TopInfoPanelItemProps {
  icon?: ReactNode;
  title: ReactNode;
  titleIcon?: ReactNode;
  children: ReactNode;
  hideIcon?: boolean;
  withoutIconWrapper?: boolean;
  variant?: 'light' | 'dark' | undefined; // default dark
  withLine?: boolean;
  loading?: boolean;
}

export const TopInfoPanelItem = ({
  icon,
  title,
  titleIcon,
  children,
  hideIcon,
  withLine,
  loading,
  withoutIconWrapper,
}: TopInfoPanelItemProps) => {
  const theme = useTheme();
  const upToSM = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '348px',
        height: '107px',
        border: '1px solid #000000',
        padding: '24px',
        borderRadius: '32px',
      }}
    >
      {withLine && (
        <Box
          sx={{
            mr: 8,
            my: 'auto',
            width: '1px',
            bgcolor: '#F2F3F729',
            height: '37px',
          }}
        />
      )}

      {!hideIcon &&
        (withoutIconWrapper ? (
          icon && icon
        ) : (
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #EBEBED1F',
              borderRadius: '12px',
              bgcolor: '#383D51',
              boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)',
              width: 42,
              height: 42,
              mr: 3,
            }}
          >
            {icon && icon}
          </Box>
        ))}

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <Typography
            sx={{
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
            }}
            variant={upToSM ? 'description' : 'caption'}
            component="div"
          >
            <svg
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 13C25 15.0711 20.5228 16.75 15 16.75C9.47715 16.75 5 15.0711 5 13M25 18C25 20.0711 20.5228 21.75 15 21.75C9.47715 21.75 5 20.0711 5 18M25 23C25 25.0711 20.5228 26.75 15 26.75C9.47715 26.75 5 25.0711 5 23M25 8C25 10.0711 20.5228 11.75 15 11.75C9.47715 11.75 5 10.0711 5 8C5 5.92893 9.47715 4.25 15 4.25C20.5228 4.25 25 5.92893 25 8Z"
                stroke="black"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>

            {title}
          </Typography>
          {titleIcon && titleIcon}
        </Box>

        {loading ? (
          <Skeleton
            width={60}
            height={upToSM ? 28 : 24}
            sx={{ background: 'linear-gradient(90deg, #DBEF88 0%, #EACF5E 100%)' }}
          />
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};
