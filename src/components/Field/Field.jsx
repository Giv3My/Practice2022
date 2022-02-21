import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { changeStageReserved, changeStageBought } from '../../features/boxes/boxesSlice';
import { STAGES } from "../../features/constants";
import Square from "../Box/Square";
import "./Field.css";

function Field() {
    const squares = useSelector((state) => state.box.squares);
    const error = useSelector((state) => state.box.buyError);
    const dispatch = useDispatch();

    const handleStageChange = (id) => {
        dispatch(changeStageReserved(id));
        // console.log(squares);
    }

    const onBuy = () => {
        const result = Boolean(Math.floor(Math.random() * 2));

        setTimeout(() => {
            dispatch(changeStageBought(result));
        }, 500);
    }

    const isAnyReserved = squares.some(square => square.stage === STAGES.RESERVED);

    return (
        <>
            <div className="field">
                {squares && squares.map(square => {
                    return <Square square={square} onStageChange={handleStageChange} key={square.id} />
                })}
            </div>
            {isAnyReserved && <button onClick={onBuy}>Buy</button>}
            {error ? <p>Нет деняк</p> : null}
        </>
    );
}

export default Field;