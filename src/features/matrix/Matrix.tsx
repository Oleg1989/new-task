import React, { useState, useEffect, TableHTMLAttributes } from 'react';
import cuid from 'cuid';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ArrayStrings } from '../../app/interface/interfaceArrayStrings';
import { Value } from '../../app/interface/interfaceValue';
import {
  selectM,
  selectN,
  selectX,
  selectArrayValue,
  selectArraySum,
  selectArrayAverage,
  increment,
  deleteStr
  //selectMatrix,
} from './matrixSlice';
import { ArraySumValue } from '../../app/interface/interfaceArraySumValue';
import { Form } from '../../features/matrix/form/Form';
//simport styles from './Matrix.module.css';

export function Matrix() {
  const M = useAppSelector(selectM);
  const N = useAppSelector(selectN);
  const arrayValue = useAppSelector(selectArrayValue);
  const arraySum = useAppSelector(selectArraySum);
  const arrayAverage = useAppSelector(selectArrayAverage);
  const dispatch = useAppDispatch();
  // const [arrayStrings, setArrayStrings] = useState<ArrayStrings[]>([]);
  // const [arrayValue, setArrayValue] = useState<Value[]>([]);

  // const incrementValue = Number(incrementAmount) || 0;

  const clikValue = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).id) {
      // console.log((event.target as HTMLElement).id);
      dispatch(increment((event.target as HTMLElement).id));
    }
  }

  const deleteString: React.MouseEventHandler<HTMLElement> = (event) => {
    if ((event.target as HTMLElement).dataset.deleteid!) {
      // console.log((event.target as HTMLElement).dataset.deleteid);
      dispatch(deleteStr((event.target as HTMLElement).dataset.deleteid!));
    }
  }

  // useEffect(() => {
  //   let arrayStrings: ArrayStrings[] = [];
  //   for (let i = 0; i < M; i++) {
  //     let arrayValue: Value[] = [];
  //     for (let j = 0; j < N; j++) {
  //       arrayValue.push({
  //         id: cuid(),
  //         amount: Math.floor(Math.random() * (999 - 100 + 1)) + 100,
  //       });
  //     }
  //     arrayStrings.push({
  //       id: cuid(),
  //       string: arrayValue,
  //     });
  //   }
  //   dispatch(addArrayValue(arrayStrings));

  // }, [M, N, dispatch]);
  return (
    <div>
      <Form />
      <table>
        <caption>Матриця чисел</caption>
        <thead>
        </thead>
        <tbody onClick={(event) => {
          clikValue(event);
        }}>
          {arrayValue.map((str, index) => {
            if (index === M - 1) {
              return (
                <>
                  <tr key={str.id}>
                    {str.string.map((val, index) => {
                      if (index === N - 1) {
                        return (
                          <>
                            <td id={val.id} key={val.id}>
                              {val.amount}
                            </td>
                            {arraySum.map(val => {
                              if (val.id === str.id) {
                                return (
                                  <>
                                    <td id={str.id} key={cuid()} className="td-sum">
                                      {val.amount}
                                    </td>
                                    <td key={cuid()} data-deleteid={str.id} className="delete-button" onClick={deleteString}>
                                      Delete
                                    </td>
                                  </>
                                );
                              }
                              return <></>;
                            })}
                          </>
                        );
                      } else {
                        return (
                          <td id={val.id} key={val.id}>
                            {val.amount}
                          </td>
                        );
                      }
                    })}
                  </tr>
                  <tr key={cuid()}>
                    {
                      arrayAverage.map(val => {
                        return (
                          <td key={cuid()} className="td-average">
                            {val}
                          </td>
                        );
                      })
                    }
                  </tr>
                </>
              )
            } else {
              return (
                <tr key={str.id}>
                  {str.string.map((val, index) => {
                    if (index === N - 1) {
                      return (
                        <>
                          <td id={val.id} key={val.id}>
                            {val.amount}
                          </td>
                          {arraySum.map(val => {
                            if (val.id === str.id) {
                              return (
                                <>
                                  <td id={str.id} key={cuid()} className="td-sum">
                                    {val.amount}
                                  </td>
                                  <td key={cuid()} data-deleteid={str.id} className="delete-button" onClick={deleteString}>
                                    Delete
                                  </td>
                                </>
                              );
                            }
                            return <></>;
                          })}
                        </>
                      );
                    } else {
                      return (
                        <td id={val.id} key={val.id}>
                          {val.amount}
                        </td>
                      );
                    }
                  })}
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </div >
  );
}
