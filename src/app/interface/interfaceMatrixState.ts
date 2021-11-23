import { ArrayStrings } from "./interfaceArrayStrings";
import { ArraySumValue } from "./interfaceArraySumValue";

export interface MatrixState {
    M: number;
    statusM: 'idle' | 'loading' | 'failed';
    N: number;
    statusN: 'idle' | 'loading' | 'failed';
    X: number;
    statusX: 'idle' | 'loading' | 'failed';
    arrayValue: ArrayStrings[];
    statusArrayValue: 'idle' | 'loading' | 'failed';
    arraySum: ArraySumValue[];
    statusArraySum: 'idle' | 'loading' | 'failed';
    arrayAverage: number[];
    statusArrayAverage: 'idle' | 'loading' | 'failed';
    arrayInterest: number[];
    statusArrayInterest: 'idle' | 'loading' | 'failed';
}