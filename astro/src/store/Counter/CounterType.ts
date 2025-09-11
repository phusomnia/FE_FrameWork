type CounterAction =   
| { type: 'INCREMENT' }
| { type: 'DECREMENT' }
| { type: 'RESET' }
| { type: 'SET_COUNT'; payload: number }

type CounterState = {
    count: number,
    dispatch: (action: CounterAction) => void
}

export type { CounterAction, CounterState }