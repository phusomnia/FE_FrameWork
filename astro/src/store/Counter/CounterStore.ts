import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CounterState, CounterAction } from './CounterType';
import CoutnerService from './CounterService';

const service = new CoutnerService();

function counterReducer(state: CounterState, action: CounterAction): {count: number} {
    switch(action.type)
    {
        case 'INCREMENT':
            return service.incrementFunc(state);
        case "DECREMENT":
            return service.decrementFunc(state);
        case 'RESET':
            return service.resetFunc();
        default: 
            return { count : state.count }        
    }
}

export function createCounterStore (
    storageKey: string,
    initialCount = 0
) {
    return create<CounterState>()(
        persist(
            (set) => ({
                    count: initialCount,
                    dispatch: (action: CounterAction) => {
                        set((state: CounterState) => counterReducer(state, action))
                    }
                }
            ),
            {
                name: storageKey,
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({ count: state.count })
            }
        )
    )
}

const usePageView = createCounterStore('page-view', 0)

export {
    usePageView
}