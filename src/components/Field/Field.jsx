import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { changeStage } from '../../features/boxes/boxesSlice';
import Square from "../Box/Square";
import "./Field.css";

function Field() {
    return (
        <>
            <div className="field">
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
            </div>
        </>
    );
}

export default Field;