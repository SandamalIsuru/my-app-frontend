import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularSpinner = ({ size, color = 'var(--theme-button-primary-color)' }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress style={{ color: color }} size={size} />
    </Box>
  );
};

export default CircularSpinner;
