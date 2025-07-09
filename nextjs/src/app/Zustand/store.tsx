import {create} from 'zustand'

type CountState = {
    value: number,
    count: () => void
}

export const useCountStore = create<CountState>((set) => ({
    value: 0,
    count: () => set((state) => (
        {
        value: state.value + 1
    }))
}))