import { ArrayOfPercentagesOfNumbers } from "./interfaceArrayOfPercentagesOfNumbers";
import { ArrayStrings } from "./interfaceArrayStrings";
import { ArraySumValue } from "./interfaceArraySumValue";
import { Value } from "./interfaceValue";

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
    arrayOfPercentagesOfNumbers: ArrayOfPercentagesOfNumbers;
    statusArrayOfPercentagesOfNumbers: 'idle' | 'loading' | 'failed';
    arrayOfNearestNumbers: Value[];
    statusArrayOfNearestNumbers: 'idle' | 'loading' | 'failed';
}