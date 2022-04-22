import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTimer } from 'use-timer';

import { resetStage, updateTime } from '../../redux/slices/boxesSlice';

import formatTime from './../../common/helpers/formatTime';
import { role } from '../../common/constants/roles';
import { STAGES, STAGE_COLORS } from '../../common/constants/squareConstants';

import Box from '@mui/material/Box';

const squareStyle = {
  width: '150px',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  cursor: 'pointer',
  '&:hover': {
    opacity: [0.9, 0.8, 0.7],
  },
};

const getStageColor = (stage) => {
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

const textStyle = {
  fontSize: '18px'
};

function Square({ onStageChange, square, user, usersWhoBooked }) {
  const dispatch = useDispatch();

  const { id, stage, timer, userId } = square;

  const { time, start, reset, status } = useTimer({
    initialTime: timer || 120,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeUpdate: () => {
      if (status === 'RUNNING') {
        onTimerUpdate(time);
      }
    },
    onTimeOver: () => {
      dispatch(resetStage(id));
    }
  });

  useEffect(() => {
    if (stage === STAGES.RESERVED) {
      start();
    }
    else if (stage === STAGES.INIT || stage === STAGES.BOUGHT) {
      reset();
    }
  }, [stage]);

  const handleStageChange = () => {
    if (stage === STAGES.INIT) {
      onStageChange(id);
    }
  };

  const onTimerUpdate = (time) => {
    dispatch(updateTime({ id, time }));
  };

  return (
    <Box
      className='square'
      sx={{
        ...squareStyle,
        backgroundColor: getStageColor(stage)
      }}
      onClick={handleStageChange}
    >
      {user?.role === role.admin && userId && stage !== STAGES.RESERVED && (
        <p style={textStyle}>{usersWhoBooked[userId]?.username}</p>
      )}
      {stage === STAGES.RESERVED && (
        <p
          style={{ ...textStyle, color: '000' }}>
          {formatTime(time)}
        </p>
      )}
    </Box>
  )
};

export default Square;