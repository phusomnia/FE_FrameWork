import { create } from 'zustand'

type CounterState = {
    count: number,
    increment: () => void
    decrement: () => void
    reset: () => void
    setCount: (value: number) => void
}

export const useCounterStore = create<CounterState>((set) => ({
    count: 0,
    increment: () => set(state => incrementFunc(state)),
    decrement: () => set(state => decrementFunc(state)),
    reset: () => set(resetFunc),
    setCount: (value: number) => set(setFunc(value))
}));

const incrementFunc = (state: any) => {
    return {
        count: state.count + 1
    }
}

const decrementFunc = (state: any) => {
    if(state.count === 0) return state
    return {
        count: state.count - 1
    }
}  

const resetFunc = (state: any) => {
    return {
        count: 0
    }
}

const setFunc = (value: number) => {
    return {
        count: value
    }
}