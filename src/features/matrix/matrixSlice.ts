import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import cuid from 'cuid';

import { MatrixState } from '../../app/interface/interfaceMatrixState';
//import { ArrayStrings } from '../../app/interface/interfaceArrayStrings';
//import { ArraySumValue } from '../../app/interface/interfaceArraySumValue';
import { Value } from '../../app/interface/interfaceValue';
import { Params } from '../../app/interface/interfaceParams';

const initialState: MatrixState = {
  M: 0,
  statusM: 'idle',
  N: 0,
  statusN: 'idle',
  X: 0,
  statusX: 'idle',
  arrayValue: [],
  statusArrayValue: 'idle',
  arraySum: [],
  statusArraySum: 'idle',
  arrayAverage: [],
  statusArrayAverage: 'idle',
  arrayOfPercentagesOfNumbers: { id: '', string: [] },
  statusArrayOfPercentagesOfNumbers: 'idle',
  arrayOfNearestNumbers: [],
  statusArrayOfNearestNumbers: 'idle',
};

export const matrixSlice = createSlice({
  name: 'matrix',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      state.arrayValue.forEach(str => {
        str.string.forEach(val => {
          if (val.id === action.payload) {
            val.amount = val.amount + 1;
          }
        });
      });

      state.arrayValue.forEach(str => {
        str.string.forEach(val => {
          if (action.payload === val.id) {
            state.arraySum.forEach(sum => {
              if (sum.id === str.id) {
                sum.amount = sum.amount + 1;
              }
            });
          }
        });
      });

      let arr: number[] = [];
      state.arrayValue.forEach((str, index) => {
        if (index === 0) {
          str.string.forEach((val, i) => {
            arr[i] = val.amount;
          });
        } else {
          str.string.forEach((val, i) => {
            arr[i] += val.amount;
          });
        }
      });
      arr.forEach((val, index) => {
        state.arrayAverage[index] = parseFloat((val / state.M).toFixed(1));
      });
    },
    initializeParameters: (state, action: PayloadAction<Params>) => {
      state.M = action.payload.M;
      state.N = action.payload.N;
      state.X = action.payload.X;

      state.arrayValue.length = 0;
      state.arrayAverage.length = 0;
      state.arraySum.length = 0;

      for (let i = 0; i < state.M; i++) {
        let arrayAmount: Value[] = [];
        for (let j = 0; j < state.N; j++) {
          arrayAmount.push({
            id: cuid(),
            amount: Math.floor(Math.random() * (999 - 100 + 1)) + 100,
          });
        }
        state.arrayValue.push({
          id: cuid(),
          string: arrayAmount,
        });
      }

      state.arrayValue.forEach(str => {
        let sum: number = 0;
        str.string.forEach(val => { sum += val.amount });
        state.arraySum.push({
          id: str.id,
          amount: sum
        });
      });

      let arr: number[] = [];
      state.arrayValue.forEach((str, index) => {
        if (index === 0) {
          str.string.forEach((val, i) => {
            arr[i] = val.amount;
          });
        } else {
          str.string.forEach((val, i) => {
            arr[i] += val.amount;
          });
        }
      });
      arr.forEach(val => {
        state.arrayAverage.push(parseFloat((val / state.M).toFixed(1)));
      });
    },
    deleteStr: (state, action: PayloadAction<string>) => {
      state.arrayValue = [...state.arrayValue.filter(str => str.id !== action.payload)];
      state.M = state.M - 1;

      let arr: number[] = [];
      state.arrayValue.forEach((str, index) => {
        if (index === 0) {
          str.string.forEach((val, i) => {
            arr[i] = val.amount;
          });
        } else {
          str.string.forEach((val, i) => {
            arr[i] += val.amount;
          });
        }
      });
      arr.forEach((val, index) => {
        state.arrayAverage[index] = parseFloat((val / state.M).toFixed(1));
      });
    },
    addStr: (state) => {
      state.M = state.M + 1;

      let newString: Value[] = [];
      for (let i = 0; i < state.N; i++) {
        newString.push({
          id: cuid(),
          amount: Math.floor(Math.random() * (999 - 100 + 1)) + 100,
        });
      }
      state.arrayValue.unshift({
        id: cuid(),
        string: newString,
      });

      state.arraySum.length = 0;
      state.arrayValue.forEach(str => {
        let sum: number = 0;
        str.string.forEach(val => { sum += val.amount });
        state.arraySum.unshift({
          id: str.id,
          amount: sum
        });
      });

      let arr: number[] = [];
      state.arrayValue.forEach((str, index) => {
        if (index === 0) {
          str.string.forEach((val, i) => {
            arr[i] = val.amount;
          });
        } else {
          str.string.forEach((val, i) => {
            arr[i] += val.amount;
          });
        }
      });
      arr.forEach((val, index) => {
        state.arrayAverage[index] = parseFloat((val / state.M).toFixed(1));
      });
    },
    findClosestValues: (state, action: PayloadAction<string>) => {
      state.arrayOfNearestNumbers.length = 0;

      let number!: Value;
      state.arrayValue.forEach(str => {
        str.string.forEach(val => {
          if (val.id === action.payload) {
            number = { ...val };
          }
        });
      });
      //console.log(number);
      if (number) {
        let newArrayValue: Value[] = [];
        state.arrayValue.forEach(str => {
          str.string.forEach(val => {
            newArrayValue.push(val);
          });
        });

        newArrayValue.sort((a: Value, b: Value): number => {
          if (a.amount > b.amount) return 1;
          if (a.amount < b.amount) return -1;
          return 0;
        });

        let arraySmallerNumbers: Value[] = [];
        let arrayLargerNumbers: Value[] = [];
        let arrayDuplicate: Value[] = [];

        newArrayValue.forEach(val => {
          if (number.amount === val.amount && arrayDuplicate.length <= state.X && number.id !== val.id) {
            arrayDuplicate.push(val);
          }
          if ((number.amount > val.amount)) {
            arraySmallerNumbers.push(val);
          }
          // if ((number.amount > val.amount) && (arraySmallerNumbers.length === state.X)) {
          //   arraySmallerNumbers.map(num => {
          //     if (num.amount < val.amount) {
          //       console.log("Ok");
          //       return num = { ...val };
          //     }
          //   });
          // }
          if (number.amount < val.amount && arrayLargerNumbers.length <= state.X) {
            if (arrayLargerNumbers.length < state.X) {
              arrayLargerNumbers.push(val);
            }
          }
        });

        // arraySmallerNumbers.forEach(val => console.log(val.amount));
        // arrayLargerNumbers.forEach(val => console.log(val.amount));
        // arrayDuplicate.forEach(val => console.log(val.amount));
        arraySmallerNumbers.reverse();
        arraySmallerNumbers = arraySmallerNumbers.slice(0, state.X);
        // arraySmallerNumbers.forEach(val => console.log(val.amount));
        // arrayLargerNumbers.forEach(val => console.log(val.amount));


        let arrayNumbers: Value[] = [];
        if (arrayDuplicate.length) {
          arrayNumbers = arrayDuplicate.map(val => val);
        }

        //arrayNumbers.forEach(val => console.log(val.amount));

        if (arrayNumbers.length < state.X) {
          for (let i = 0; i < state.X; i++) {
            if (arrayLargerNumbers.length > i && arraySmallerNumbers.length > i) {
              if (arrayLargerNumbers[i].amount - number.amount === number.amount - arraySmallerNumbers[i].amount) {
                arrayNumbers.push(arrayLargerNumbers[i]);
                if (arrayNumbers.length < state.X) {
                  arrayNumbers.push(arraySmallerNumbers[i]);
                }
              }
              if (arrayLargerNumbers[i].amount - number.amount > number.amount - arraySmallerNumbers[i].amount) {
                if (arrayNumbers.length < state.X) {
                  arrayNumbers.push(arraySmallerNumbers[i]);
                }
              }
              if (arrayLargerNumbers[i].amount - number.amount < number.amount - arraySmallerNumbers[i].amount) {
                if (arrayNumbers.length < state.X) {
                  arrayNumbers.push(arrayLargerNumbers[i]);
                }
              }
            }
          }
        }

        //arrayNumbers.forEach(val => console.log(val.amount));
        state.arrayOfNearestNumbers = [...arrayNumbers];

      }

    },
    getThePercentagesOfStringNumbers: (state, action: PayloadAction<string>) => {
      const sumStr = state.arraySum.find(str => str.id === action.payload);
      state.arrayOfPercentagesOfNumbers = { id: '', string: [] };

      state.arrayValue.forEach(str => {
        if (str.id === action.payload) {
          state.arrayOfPercentagesOfNumbers.id = action.payload;
          str.string.forEach(val => {
            state.arrayOfPercentagesOfNumbers.string.push(
              {
                id: val.id,
                amount: Math.round(val.amount * 100 / sumStr?.amount!),
              }
            );
          });
        }
      });
    },
    reseteThePercentagesOfStringNumbers: (state) => {
      state.arrayOfPercentagesOfNumbers = { id: '', string: [] };
    }

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     });
  // },
});

export const {
  increment,
  initializeParameters,
  deleteStr,
  addStr,
  findClosestValues,
  getThePercentagesOfStringNumbers,
  reseteThePercentagesOfStringNumbers
} = matrixSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectMatrix = (state: RootState) => state.matrix.value;

export const selectM = (state: RootState) => state.matrix.M;
export const selectN = (state: RootState) => state.matrix.N;
export const selectX = (state: RootState) => state.matrix.X;
export const selectArrayValue = (state: RootState) => state.matrix.arrayValue;
export const selectArraySum = (state: RootState) => state.matrix.arraySum;
export const selectArrayAverage = (state: RootState) => state.matrix.arrayAverage;
export const selectArrayOfNearestNumbers = (state: RootState) => state.matrix.arrayOfNearestNumbers;
export const selectArrayOfPercentagesOfNumbers = (state: RootState) => state.matrix.arrayOfPercentagesOfNumbers;

export default matrixSlice.reducer;
