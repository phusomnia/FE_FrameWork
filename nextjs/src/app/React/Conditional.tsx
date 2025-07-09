type ItemProps = {
    name: string,
    isPacked: boolean
}

class Conditional {
    static Item({name, isPacked}: ItemProps)
    {
        // if(isPacked){
        //     return <>
        //     <li className="item">{name} ✅</li>
        //     </>
        // }
        // return null;

        // return <>{isPacked ? name + ' ✅' : name}</>

        /*
        Logical AND operator (&&)
        */
       return <>
            <li className="item">{name} {isPacked && '✅'}</li>
       </>
    }
    static PackingList()
    {
        return <>
        <section>
            <h1>Sally Ride's Packing List</h1>
            <ul>
                <Conditional.Item 
                    isPacked={true}
                    name="Space suit"
                />
                <Conditional.Item 
                    isPacked={false}
                    name="Space suit"
                />
            </ul>
        </section>
        </>
    }

    static List()
    {
        const items = ['a', 'b', 'c'];
        const listItems = items.map((i, index) => 
            <li key={index}>{i}</li>
        );
        return <ul>{listItems}</ul>
    }
}

export default Conditional