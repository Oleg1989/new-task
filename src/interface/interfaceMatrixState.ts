import { ArrayOfPercentagesOfNumbers } from "./interfaceArrayOfPercentagesOfNumbers";
import { ArrayStrings } from "./interfaceArrayStrings";
import { ArraySumValue } from "./interfaceArraySumValue";
import { Value } from "./interfaceValue";

export interface MatrixState {
    M: number;
    statusM: 'idle' | 'added' | 'changed';
    N: number;
    statusN: 'idle' | 'added';
    X: number;
    statusX: 'idle' | 'added';
    arrayValue: ArrayStrings[];
    statusArrayValue: 'idle' | 'added' | 'changed';
    arraySum: ArraySumValue[];
    statusArraySum: 'idle' | 'added' | 'changed';
    arrayAverage: number[];
    statusArrayAverage: 'idle' | 'added' | 'changed';
    arrayOfPercentagesOfNumbers: ArrayOfPercentagesOfNumbers;
    statusArrayOfPercentagesOfNumbers: 'idle' | 'added' | 'resete';
    arrayOfNearestNumbers: Value[];
    statusArrayOfNearestNumbers: 'idle' | 'added' | 'resete';
}