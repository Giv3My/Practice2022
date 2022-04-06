import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTimer } from 'use-timer';

import { resetStage } from '../../redux/slices/boxesSlice';

import { STAGES, STAGE_COLORS } from '../../common/constants';

import Box from '@mui/material/Box';

import './Square.css';

function Square({ onStageChange, square }) {
  const dispatch = useDispatch();

  const { id, stage, timer } = square;

  const { time, start, reset } = useTimer({
    initialTime: 120,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      dispatch(resetStage(id));
    }
  });

  // useEffect(() => {
  //   if (stage === STAGES.RESERVED)
  //     dispatch(resetStage(id));
  // }, [])

  useEffect(() => {
    if (stage === STAGES.RESERVED) {
      start();
    }
    else if (stage === STAGES.INIT || stage === STAGES.BOUGHT) {
      reset();
    }
  }, [stage]);

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
  };

  const handleStageChange = () => {
    if (stage === STAGES.INIT) {
      onStageChange(id);
    }
  };

  const formatTime = (value) => {
    const sec = parseInt(value, 10);
    let minutes = Math.floor(sec / 60);
    let seconds = sec - (minutes * 60);

    if (minutes < 10)
      minutes = "0" + minutes;
    if (seconds < 10)
      seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
  };

  return (
    <Box
      className='square'
      sx={{
        width: 150,
        height: 150,
        backgroundColor: getStageColor(),
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      onClick={handleStageChange}
    >
      {stage === STAGES.RESERVED &&
        <p>
          {formatTime(time)}
        </p>}
    </Box>
  );
};

export default Square;