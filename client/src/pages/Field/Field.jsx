import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changeStageReserved, changeStageBought } from '../../redux/slices/boxesSlice';
import { setModalOpen } from '../../redux/slices/modalSlice';

import { Square } from '../../components';
import Button from '@mui/material/Button';

import useActiveUsers from '../../common/hooks/useActiveUsers';
import { role } from '../../common/constants/roles';
import { STAGES } from '../../common/constants/squareConstants';

import './Field.css';

function Field({ isAuth, currentUserId }) {
  const dispatch = useDispatch();
  const { squares } = useSelector(({ box }) => box);
  const { userInfo, usersWhoBooked } = useSelector(({ user }) => user);

  const [error, setError] = React.useState(false);

  useActiveUsers();

  const handleStageChange = (id) => {
    if (userInfo?.role === role.admin) {
      return;
    }

    error && setError(false);

    if (!isAuth) {
      dispatch(setModalOpen(true));
    } else {
      dispatch(changeStageReserved({ id, userId: currentUserId }));
    }
  };

  const onBuy = async () => {
    const result = Boolean(Math.floor(Math.random() * 2));

    const buyPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (result) {
          resolve();
        } else {
          reject();
        }
      }, 500);
    });

    try {
      await buyPromise;
      dispatch(changeStageBought(result));
    } catch (err) {
      dispatch(changeStageBought(result));
      setError(true);
    }
  };

  const isAnyReserved = squares.some(square => square.stage === STAGES.RESERVED);

  return (
    <div className="field-container">
      <div className="field-wrapper">
        {squares &&
          squares.map(square => {
            return (
              <Square
                key={square.id}
                square={square}
                user={userInfo}
                usersWhoBooked={usersWhoBooked}
                onStageChange={handleStageChange}
              />)
          })}
      </div>
      {isAnyReserved && (
        <Button
          className="buy-btn"
          variant="contained"
          size="medium"
          onClick={onBuy}
        >
          Buy
        </Button>
      )}
      {error && (
        <p className="error">
          Недостаточно денег
        </p>
      )}
    </div>
  )
};

export default Field;