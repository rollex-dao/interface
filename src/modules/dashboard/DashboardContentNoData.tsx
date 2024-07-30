import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface DashboardContentNoDataProps {
  text: ReactNode;
}

export const DashboardContentNoData = ({ text }: DashboardContentNoDataProps) => {
  return (
    <Box sx={{ px: { xs: 4, xsm: 6 }, pt: { xs: 3, xsm: 2 }, pb: { xs: 3, sxm: 2 } }}>
      <Typography color="text.secondary">{text}</Typography>
    </Box>
  );
};
