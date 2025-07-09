'use client';
import React from 'react'
import { useCountStore } from './store';

export default function Zustand()
{
    const count = useCountStore((state) => state.value)
    const setCount = useCountStore((state) => state.count)
    
    return <>
        <p>Count {count}</p>
        <button onClick={setCount}>Set</button>
    </>
}