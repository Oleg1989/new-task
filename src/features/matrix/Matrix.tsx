import React from 'react';
import cuid from 'cuid';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import { ArrayStrings } from '../../app/interface/interfaceArrayStrings';
// import { Value } from '../../app/interface/interfaceValue';
import {
  selectM,
  selectN,
  selectX,
  selectArrayValue,
  selectArraySum,
  selectArrayAverage,
  increment,
  deleteStr,
  addStr,
  findClosestValues
} from './matrixSlice';
// import { ArraySumValue } from '../../app/interface/interfaceArraySumValue';
import { Form } from '../../features/matrix/form/Form';
//simport styles from './Matrix.module.css';

export function Matrix() {
  const M = useAppSelector(selectM);
  const N = useAppSelector(selectN);
  const X = useAppSelector(selectX);
  const arrayValue = useAppSelector(selectArrayValue);
  const arraySum = useAppSelector(selectArraySum);
  const arrayAverage = useAppSelector(selectArrayAverage);
  const dispatch = useAppDispatch();
  // const [arrayStrings, setArrayStrings] = useState<ArrayStrings[]>([]);
  // const [arrayValue, setArrayValue] = useState<Value[]>([]);


  const clikValue = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).id) {
      dispatch(increment((event.target as HTMLElement).id));
    }
  }

  const deleteString: React.MouseEventHandler<HTMLElement> = (event) => {
    if ((event.target as HTMLElement).dataset.deleteid!) {
      dispatch(deleteStr((event.target as HTMLElement).dataset.deleteid!));
    }
  }

  const addString = () => {
    dispatch(addStr());
  }

  const showNambers: React.MouseEventHandler<HTMLElement> = (event) => {
    if ((event.target as HTMLElement).id) {
      dispatch(findClosestValues((event.target as HTMLElement).id))
    }
  }

  return (
    <div>
      <Form />
      {arrayValue.length ?
        <>
          <button type="button" onClick={addString}>Добавити рядок</button>
          <table>
            <caption>Матриця чисел - <br />(Рядки (M): {M}; <br />Колонки (N): {N}; <br />Кількість найближчих чисел (X): {X})</caption>
            <thead>
            </thead>
            <tbody onClick={(event) => {
              clikValue(event);
            }}
              onMouseOver={showNambers}
            >
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
                        {arrayAverage.map(val => {
                          return (
                            <td key={cuid()} className="td-average">
                              {val}
                            </td>
                          );
                        })}
                      </tr>
                    </>
                  );
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
                  );
                }
              })}
            </tbody>
          </table></> : <h1>Введіть параметри матриці</h1>}
    </div >
  );
}
