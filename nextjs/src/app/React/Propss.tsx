import React from 'react';

type AvaProps = {
    person: {
        name: string,
        imageSrc: string
    }
    size: string | number
}

class Propss
{

    static Avatar_1({person, size}: AvaProps)
    {
        return <>   
            <h1>{person.name}</h1>
        </>
    }

    static Avatar_2(props: AvaProps)
    {
        return <>   
            <h1>{props.size}</h1>
        </>
    }

    static Profile()
    {
        const name: string = "a";
        const size = 300;
        return <>
            <Propss.Avatar_1 person={{name: name, imageSrc: name}} size={size}/>
            <Propss.Avatar_2 person={{name: name, imageSrc: name}} size={size}/>
            <Propss.SpreadAva person={{name: name, imageSrc: name}} size={400}/>
        </>
    }

    /* 
        Spread syntax
    */
    static SpreadAva(props: AvaProps)
    {
        return <>
            <div className="card">
                <Propss.Avatar_2 {...props}/>
            </div>
        </>
    }
}

export default Propss