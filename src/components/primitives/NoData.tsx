import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';

export const NoData = <C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }>
) => {
  return (
    <Typography {...props} sx={{ color: '#E0E0E0' }}>
      —
    </Typography>
  );
};
