import React, { useState, useEffect } from 'react';
import cuid from 'cuid';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ArrayStrings } from '../../app/interface/interfaceArrayStrings';
import { Value } from '../../app/interface/interfaceValue';
import {
  selectM,
  selectN,
  selectX,
  selectArrayValue,
  increment,
  addArrayValue
  //selectMatrix,
} from './matrixSlice';
//simport styles from './Matrix.module.css';

export function Matrix() {
  const M = useAppSelector(selectM);
  const N = useAppSelector(selectN);
  const arrayValue = useAppSelector(selectArrayValue);
  const dispatch = useAppDispatch();
  // const [arrayStrings, setArrayStrings] = useState<ArrayStrings[]>([]);
  // const [arrayValue, setArrayValue] = useState<Value[]>([]);

  // const incrementValue = Number(incrementAmount) || 0;

  const clikValue = (event: Event) => {
    console.log((event.target as HTMLElement).id);

    dispatch(increment(
      {
        perntId: (event.target as HTMLElement).parentElement!.id,
        childId: (event.target as HTMLElement).id,
      }
    ));
  }

  useEffect(() => {
    let arrayStrings: ArrayStrings[] = [];
    for (let i = 0; i < M; i++) {
      let arrayValue: Value[] = [];
      for (let j = 0; j < N; j++) {
        arrayValue.push({
          id: cuid(),
          amount: Math.floor(Math.random() * (999 - 100 + 1)) + 100,
        });
      }
      arrayStrings.push({
        id: cuid(),
        string: arrayValue,
      });
    }
    dispatch(addArrayValue(arrayStrings));

  }, [M, N, dispatch]);
  return (
    <div>
      <table>
        <caption>Матриця чисел</caption>
        <thead>
        </thead>
        <tbody onClick={(event) => {
          clikValue(event as unknown as Event);
        }}>
          {arrayValue.map((str, index) => {
            if (index + 1 === M) {
              return (
                <>
                  <tr id={str.id} key={index}>
                    {str.string.map((val, index) => {
                      if (index + 1 === N) {
                        return (
                          <>
                            <td id={val.id} key={index}>
                              {val.amount}
                            </td>
                            <td id={cuid()} key={cuid()}>
                              Сума
                            </td>
                          </>
                        );
                      }
                      return <td id={val.id} key={index}>
                        {val.amount}
                      </td>
                    })}
                  </tr>
                  <tr key={index + 1}>
                    {str.string.map((val, index) => {
                      return <td id={cuid()} key={cuid()}>
                        Сер
                      </td>;
                    })}
                  </tr>
                </>
              )
            }
            return <tr id={str.id} key={index}>
              {str.string.map((val, index) => {
                if (index + 1 === N) {
                  return (
                    <>
                      <td id={val.id} key={index}>
                        {val.amount}
                      </td>
                      <td id={cuid()} key={cuid()}>
                        Сума
                      </td>
                    </>
                  );
                }
                return <td id={val.id} key={index}>
                  {val.amount}
                </td>
              })}
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}
