import type { CounterState } from "./CounterType"

class CoutnerService 
{
    incrementFunc = (state: CounterState) => {
        return {
            count: state.count + 1
        }
    }

    decrementFunc = (state: CounterState) => {
        return {
            count: state.count > 0 ? state.count - 1 : 0 
        }
    }  

    resetFunc = () => {
        return {
            count: 0
        }
    }

    setFunc = (value: number) => {
        return {
            count: value
        }
    }
}

export default CoutnerService