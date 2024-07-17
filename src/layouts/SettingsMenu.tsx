import { CogIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { Button, Menu, MenuItem, SvgIcon, Typography } from '@mui/material';
import React, { useState } from 'react';
import { DEFAULT_LOCALE } from 'src/libs/LanguageProvider';
import { useRootStore } from 'src/store/root';
import { SETTINGS } from 'src/utils/mixPanelEvents';

import { DarkModeSwitcher } from './components/DarkModeSwitcher';
import { LanguageListItem, LanguagesList } from './components/LanguageSwitcher';

export const LANG_MAP = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  el: 'Greek',
};
type LanguageCode = keyof typeof LANG_MAP;

// Define the type for the language codes

// Example usage

export function SettingsMenu() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const trackEvent = useRootStore((store) => store.trackEvent);
  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
    setSettingsOpen(true);
    setLanguagesOpen(false);
  };

  const handleLanguageClick = () => {
    const savedLocale = localStorage.getItem('LOCALE') || DEFAULT_LOCALE;
    const langCode = savedLocale as LanguageCode;
    setSettingsOpen(false);
    setLanguagesOpen(true);
    trackEvent(SETTINGS.LANGUAGE, { language: LANG_MAP[langCode] });
  };

  const handleCloseLanguage = () => {
    setSettingsOpen(true);
    setLanguagesOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSettingsOpen(false);
    setLanguagesOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        aria-label="settings"
        id="settings-button"
        aria-controls={settingsOpen ? 'settings-menu' : undefined}
        aria-expanded={settingsOpen ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleSettingsClick}
        sx={{
          p: '16px 24px',
          ml: 2,
          height: '52px',
          bgcolor: 'transparent',
          '&:hover': { bgcolor: 'transparent' },
          border: '1px solid #EACF5E',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.50498 12.75C2.18794 12.2017 1.94148 11.6155 1.77148 11.0055C2.14146 10.8173 2.45218 10.5304 2.66926 10.1766C2.88633 9.82283 3.00131 9.41588 3.00146 9.00079C3.00162 8.58571 2.88695 8.17867 2.67014 7.82471C2.45332 7.47075 2.14282 7.18366 1.77298 6.99521C2.11201 5.76932 2.75753 4.64992 3.64873 3.74246C3.9968 3.96875 4.4007 4.09433 4.81572 4.10529C5.23074 4.11626 5.6407 4.01218 6.00023 3.80458C6.35976 3.59698 6.65485 3.29396 6.85283 2.92904C7.05081 2.56412 7.14396 2.15154 7.12198 1.73696C8.35357 1.41868 9.64591 1.41919 10.8772 1.73846C10.8554 2.15303 10.9488 2.56555 11.1469 2.93036C11.3451 3.29518 11.6403 3.59806 11.9999 3.8055C12.3595 4.01294 12.7694 4.11685 13.1844 4.10572C13.5994 4.0946 14.0033 3.96887 14.3512 3.74246C14.7855 4.18496 15.171 4.68821 15.495 5.24996C15.8197 5.81171 16.0627 6.39746 16.2285 6.99446C15.8585 7.18263 15.5478 7.46949 15.3307 7.82329C15.1136 8.17709 14.9987 8.58404 14.9985 8.99912C14.9984 9.41421 15.113 9.82125 15.3298 10.1752C15.5466 10.5292 15.8571 10.8163 16.227 11.0047C15.888 12.2306 15.2424 13.35 14.3512 14.2575C14.0032 14.0312 13.5993 13.9056 13.1843 13.8946C12.7692 13.8837 12.3593 13.9877 11.9997 14.1953C11.6402 14.4029 11.3451 14.706 11.1471 15.0709C10.9492 15.4358 10.856 15.8484 10.878 16.263C9.6464 16.5812 8.35406 16.5807 7.12273 16.2615C7.14452 15.8469 7.05118 15.4344 6.85305 15.0696C6.65492 14.7047 6.35972 14.4019 6.00011 14.1944C5.64051 13.987 5.23053 13.8831 4.81553 13.8942C4.40053 13.9053 3.99671 14.031 3.64873 14.2575C3.20548 13.8052 2.82118 13.2987 2.50498 12.75V12.75ZM6.74998 12.897C7.5492 13.3579 8.15012 14.0977 8.43748 14.9745C8.81173 15.0097 9.18748 15.0105 9.56173 14.9752C9.84929 14.0983 10.4505 13.3585 11.25 12.8977C12.0489 12.4355 12.9904 12.2846 13.8937 12.474C14.1112 12.168 14.2987 11.8417 14.4547 11.5005C13.8393 10.813 13.4993 9.92261 13.5 8.99996C13.5 8.05496 13.8525 7.17221 14.4547 6.49946C14.2976 6.15832 14.1093 5.83243 13.8922 5.52596C12.9894 5.71519 12.0486 5.56457 11.25 5.10296C10.4508 4.64199 9.84985 3.9022 9.56248 3.02546C9.18823 2.99021 8.81248 2.98946 8.43823 3.02471C8.15068 3.90157 7.54949 4.64138 6.74998 5.10221C5.95107 5.56444 5.00959 5.71535 4.10623 5.52596C3.88916 5.83217 3.70133 6.15811 3.54523 6.49946C4.16066 7.18688 4.50065 8.0773 4.49998 8.99996C4.49998 9.94496 4.14748 10.8277 3.54523 11.5005C3.70234 11.8416 3.89064 12.1675 4.10773 12.474C5.01052 12.2847 5.95139 12.4353 6.74998 12.897ZM8.99998 11.25C8.40325 11.25 7.83095 11.0129 7.40899 10.5909C6.98704 10.169 6.74998 9.59669 6.74998 8.99996C6.74998 8.40322 6.98704 7.83092 7.40899 7.40897C7.83095 6.98701 8.40325 6.74996 8.99998 6.74996C9.59672 6.74996 10.169 6.98701 10.591 7.40897C11.0129 7.83092 11.25 8.40322 11.25 8.99996C11.25 9.59669 11.0129 10.169 10.591 10.5909C10.169 11.0129 9.59672 11.25 8.99998 11.25ZM8.99998 9.74996C9.1989 9.74996 9.38966 9.67094 9.53031 9.53029C9.67097 9.38964 9.74998 9.19887 9.74998 8.99996C9.74998 8.80105 9.67097 8.61028 9.53031 8.46963C9.38966 8.32898 9.1989 8.24996 8.99998 8.24996C8.80107 8.24996 8.61031 8.32898 8.46965 8.46963C8.329 8.61028 8.24998 8.80105 8.24998 8.99996C8.24998 9.19887 8.329 9.38964 8.46965 9.53029C8.61031 9.67094 8.80107 9.74996 8.99998 9.74996V9.74996Z"
            fill="#191919"
          />
        </svg>
      </Button>

      <Menu
        id="settings-menu"
        MenuListProps={{
          'aria-labelledby': 'settings-button',
        }}
        anchorEl={anchorEl}
        open={settingsOpen}
        onClose={handleClose}
        sx={{ '.MuiMenuItem-root.Mui-disabled': { opacity: 1 } }}
        keepMounted={true}
      >
        <MenuItem disabled sx={{ mb: '4px' }}>
          <Typography variant="subheader2" color="text.secondary">
            <Trans>Global settings</Trans>
          </Typography>
        </MenuItem>

        <DarkModeSwitcher component={MenuItem} />
        <LanguageListItem onClick={handleLanguageClick} component={MenuItem} />
      </Menu>

      <Menu
        id="settings-menu"
        MenuListProps={{
          'aria-labelledby': 'settings-button',
        }}
        anchorEl={anchorEl}
        open={languagesOpen}
        onClose={handleClose}
        keepMounted={true}
      >
        <LanguagesList onClick={handleCloseLanguage} component={MenuItem} />
      </Menu>
    </>
  );
}
