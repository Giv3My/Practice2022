import React from 'react';
import Box from '@mui/material/Box';

function Square() {
  return (
    <Box
      sx={{
        width: 150,
        height: 150,
        backgroundColor: '#1eeb77',
        '&:hover': {
          backgroundColor: '#169c50',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
}

export default Square;