import React from "react";

export default function Counter()
{
    const [count, setCount] = React.useState(0);

    return <>
        <div className="bg-amber-200">
            Count: {count}
        </div>
        <button 
            onClick={() => setCount(c => c + 1)}
        >
            Click
        </button>
    </>
}