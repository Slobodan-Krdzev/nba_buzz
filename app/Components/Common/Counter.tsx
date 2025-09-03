'use client'
import { decrement, increment } from '@/app/Redux/Slices/counterSlice';
import { AppDispatch, RootState } from '@/app/Redux/store';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

interface CounterProps {
    borderColor?: string
}

const Counter = ({borderColor}: CounterProps) => {

 const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={`flex justify-between items-stretch  min-w-[100px]  basis-[40%] border-[1px] border-[${borderColor}]`}>
          <button className="basis-1/3 disabled:text-gray-300" 
          disabled={count === 1} onClick={() => {
            if(count > 1)dispatch(decrement())
            
          }}>-</button>
          <p className="bg-[#e4e4e4] basis-1/3 text-center flex justify-center items-center border-x-[1.5px]">
            {count}
          </p>
          <button className="basis-1/3 " onClick={() => {
            dispatch(increment())
          }}>+</button>
        </div>
  )
}

export default Counter
