import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface DashboardContentNoDataProps {
  text: ReactNode;
}

export const DashboardContentNoData = ({ text }: DashboardContentNoDataProps) => {
  return (
    <Box
      sx={{
        px: { xs: 4, xsm: 6 },
        py: { xs: 3.5, xsm: 4 },
        pt: { xs: 3, xsm: 2 },
      }}
    >
      <Typography color="text.secondary">{text}</Typography>
    </Box>
  );
};
