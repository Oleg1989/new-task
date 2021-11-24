import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';


import { initializeParameters } from '../matrixSlice';


export function Form() {
    // const arrayValue = useAppSelector(selectArrayValue);
    // const arraySum = useAppSelector(selectArraySum);
    // const arrayAverage = useAppSelector(selectArrayAverage);
    const dispatch = useAppDispatch();
    // const [arrayStrings, setArrayStrings] = useState<ArrayStrings[]>([]);
    const [paramM, setParamM] = useState<string>('');
    const [paramN, setParamN] = useState<string>('');
    const [paramX, setParamX] = useState<string>('');

    const addParams = () => {
        dispatch(initializeParameters(
            {
                M: parseInt(paramM),
                N: parseInt(paramN),
                X: parseInt(paramX)
            }
        ));

        setParamM('');
        setParamN('');
        setParamX('');
    }

    return (
        <div>
            <form >
                <label htmlFor="Mname">Param M:</label><br />
                <input type="text" id="m" name="Mname" value={paramM} onChange={(event) => setParamM(event.target.value)} /><br />
                <label htmlFor="Nname">Param N:</label><br />
                <input type="text" id="n" name="Nname" value={paramN} onChange={(event) => setParamN(event.target.value)} /><br />
                <label htmlFor="Xname">Param X:</label><br />
                <input type="text" id="x" name="Xname" value={paramX} onChange={(event) => setParamX(event.target.value)} /><br /><br />
                <button type="button" onClick={addParams}>Add params</button>
            </form>

        </div >
    );
}
