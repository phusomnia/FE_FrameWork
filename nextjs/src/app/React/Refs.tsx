import React from 'react'

class Refs
{
    /**
     * Refs are escape hatch to hold onto values that aren't used for rendering
     * prop: current, which can be read or setted
    */
    static CounterRef()
    {
        let ref = React.useRef<number>(0)
        
        function incre(){
            ref.current = ref.current + 1;
            alert(ref.current)
        }

        return <>
            <p>{ref.current}</p>
            <button onClick={incre}>
                +
            </button>
        </>
    }

    static Popup()
    {
        const divRef = React.useRef<any>(null);

        function toggle()
        {
            const box = divRef.current;
            if(box.style.visibility === 'hidden')
            {
                box.style.visibility = 'visible'
            } else 
            {
                box.style.visibility = 'hidden'
            }
        };

        return <>
            <div
                ref={divRef}
                style={{
                    visibility: 'hidden'
                }}
            >
                :D
            </div>
            <button
                onClick={toggle}
            >
                Show
            </button>
        </>
    }
}

export default Refs