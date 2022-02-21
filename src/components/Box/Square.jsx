import React from 'react';
import Box from '@mui/material/Box';
import { STAGES } from '../../features/constants';
import { STAGE_COLORS } from '../../features/constants';

function Square({ onStageChange, square }) {
  const { id, stage } = square;

  const getStageColor = () => {
    switch (stage) {
      case STAGES.INIT:
        return STAGE_COLORS.INIT;
      case STAGES.RESERVED:
        return STAGE_COLORS.RESERVED;
      case STAGES.BOUGHT:
        return STAGE_COLORS.BOUGHT;
      default:
        return STAGE_COLORS.INIT;
    }
  }

  const handleStageChange = () => {
    if (stage === STAGES.INIT)
      onStageChange(id);
  }

  return (
    <Box
      sx={{
        width: 150,
        height: 150,
        backgroundColor: getStageColor(),
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      onClick={handleStageChange}
    />
  );
}

export default Square;