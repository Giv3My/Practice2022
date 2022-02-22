import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { changeStageReserved, changeStageBought, changeErrorState } from '../../features/boxes/boxesSlice';
import { STAGES } from "../../features/constants";
import Square from "../Box/Square";
import Button from '@mui/material/Button';
import "./Field.css";

function Field() {
    const squares = useSelector((state) => state.box.squares);
    const error = useSelector((state) => state.box.buyError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeErrorState(false));
    }, [])

    const handleStageChange = (id) => {
        if (error)
            dispatch(changeErrorState(false));

        dispatch(changeStageReserved(id));
    }

    const onBuy = () => {
        const result = Boolean(Math.floor(Math.random() * 2));

        setTimeout(() => {
            dispatch(changeStageBought(result));
        }, 500);
    }

    const isAnyReserved = squares.some(square => square.stage === STAGES.RESERVED);

    return (
        <div className="wrapper">
            <div className="field">
                {squares && squares.map(square => {
                    return <Square square={square} onStageChange={handleStageChange} key={square.id} />
                })}
            </div>
            {isAnyReserved && <Button className="buy-btn" variant="contained" size="medium" onClick={onBuy}>Buy</Button>}
            {error ? <p className="error">Недостаточно денег</p> : null}
        </div>
    );
}

export default Field;