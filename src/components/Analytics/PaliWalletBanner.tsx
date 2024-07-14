import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import PaliMobile from 'public/icons/pali-banner.png';
import React, { useEffect, useState } from 'react';

export default function PaliWalletBanner() {
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const checkAnalyticsAcceptance = () => {
      const userAcceptedAnalytics = localStorage.getItem('userAcceptedAnalytics');
      if (userAcceptedAnalytics) {
        const lastBannerShown = localStorage.getItem('lastBannerShown');
        if (!lastBannerShown) {
          setBannerVisible(true);
        }
      }
    };

    checkAnalyticsAcceptance();

    const intervalId = setInterval(checkAnalyticsAcceptance, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClose = () => {
    const now = new Date();
    localStorage.setItem('lastBannerShown', now.toISOString());
    setBannerVisible(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {bannerVisible && (
        <Box
          sx={{
            background: 'linear-gradient(90deg, #DBEF88 0%, #EACF5E 100%)',
            bottom: '24px',
            right: '24px',
            position: 'fixed',
            width: isMobile ? '90%' : '386px',
            height: '168px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: theme.palette.text.primary,
            marginBottom: '16px',
            fontSize: '14px',
            lineHeight: '20.02px',
            padding: '16px',
            zIndex: 100,
            borderRadius: '12px',
            border: '0.5px solid rgba(235, 235, 239, 0.42)',
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            transform: 'translateX(100%) translateY(100%)',
            transition: 'transform 0.5s ease-out',
          }}
          style={{
            transform: bannerVisible
              ? 'translateX(0%) translateY(0%)'
              : 'translateX(100%) translateY(100%)',
          }}
        >
          <button
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              top: '8px',
              right: '8px',
              cursor: 'pointer',
              color: '#191919',
              background: 'transparent',
              border: 'none',
              padding: '8px',
              zIndex: 101,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '16px' }}>
              Your Crypto, Anywhere
              <br /> with Pali
            </Typography>
            <Button
              sx={{
                padding: '10px 12px',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                color: theme.palette.text.primary,
                transition: 'filter 0.3s ease-out',
                '&:hover': {
                  filter: 'brightness(90%)',
                  background: '#FFFFFF',
                },
              }}
            >
              Learn more
            </Button>
          </Box>
          <Box sx={{ position: 'relative', width: '185.42px', height: '209.67px' }}>
            <img
              src={PaliMobile.src}
              alt="description"
              style={{
                width: '185.42px',
                height: '209.67px',
                objectFit: 'cover',
                marginTop: '40px',
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
