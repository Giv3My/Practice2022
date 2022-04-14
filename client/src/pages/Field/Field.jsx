import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changeStageReserved, changeStageBought, changeErrorState } from '../../redux/slices/boxesSlice';

import { Navbar, Square } from '../../components';
import Button from '@mui/material/Button';

import { STAGES } from '../../common/constants/squareConstants';

import './Field.css';

function Field() {
  const dispatch = useDispatch();
  const { squares, buyError: error } = useSelector(({ box }) => box);

  React.useEffect(() => {
    dispatch(changeErrorState(false));
  }, []);

  const handleStageChange = (id) => {
    if (error) {
      dispatch(changeErrorState(false));
    }

    dispatch(changeStageReserved(id));
  };

  const onBuy = () => {
    const result = Boolean(Math.floor(Math.random() * 2));

    setTimeout(() => {
      dispatch(changeStageBought(result));
    }, 500);
  };

  const isAnyReserved = squares.some(square => square.stage === STAGES.RESERVED);

  return (
    <>
      <Navbar />
      <div className="field-container">
        <div className="field-wrapper">
          {squares &&
            squares.map(square => {
              return (
                <Square
                  square={square}
                  onStageChange={handleStageChange}
                  key={square.id}
                />)
            })}
        </div>
        {isAnyReserved &&
          (<Button
            className="buy-btn"
            variant="contained"
            size="medium"
            onClick={onBuy}
          >
            Buy
          </Button>)
        }
        {error &&
          <p className="error">
            Недостаточно денег
          </p>
        }
      </div>
    </>
  )
};

export default Field;