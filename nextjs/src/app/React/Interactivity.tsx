import React, { useState } from "react";

class Interactivity {
    
    static handleClick()
    {
        alert('You click')
    }
    static ClickButton()
    {
        return <>
            <button onClick={Interactivity.handleClick}>
                Click
            </button>
            <button onClick={() => {
                alert('you clicked me!')
            }}>
                Click V2
            </button>
        </>
    }

    static AlertButton({message, children}
        : {
            message: string
            children: React.ReactNode
        }
    )
    {
        return (
            <button 
                className="bg-cyan-500 p-[5px] rounded"
                onClick={() => alert(message)}>
                {children}
            </button>
        );
    }

    static Toolbar()
    {
        return <>
            <div>
                <Interactivity.AlertButton
                    message="Hello"
                >Play game</Interactivity.AlertButton>
            </div>
        </>
    }
    
    static SignUp()
    {
        return <>
            <form onSubmit={(e) => {
                e.preventDefault();
                alert('Submitting!');
            }}>
                <input/>
                <button>Send</button>
            </form>
        </>
    }

    static collection: {name: string, des?: string}[] = [
        {
            name: "A",
            des: "aaa"
        },
        {
            name: "B",
            des: "bus"
        },
        {
            name: "C",
            des: "cow"
        },
    ]

    static Gallery()
    {
        const [index, setIndex] = useState<number>(0);
        const [show, setShow] = useState<boolean>(false)
        
        var data = Interactivity.collection;

        function handleClick(type: string)
        {
            if(type == "+")
            {
                if(index < data.length - 1)
                {
                    setIndex(idx => idx + 1);
                }
            }
            else if(type == "-")
            {
                if(index > 0)
                {
                    setIndex(idx => idx - 1);
                }
            }
        }

        function handleShow(): void 
        {
            setShow(show => !show)
        }

        let favs = data[index];
        return <>
            <div>
                <button 
                    className="p-[5px] bg-yellow-400"
                    onClick={() => handleClick("-")}>
                Prev
                </button>
                <button 
                    className="p-[5px] bg-purple-400"
                    onClick={() => handleClick("+")}>
                Next
                </button>
            </div>
            <div>{index + 1} of { Interactivity.collection.length}</div>
            <button 
                className="p-[2px] bg-cyan-200"
                onClick={handleShow}
            >
                Show
            </button>
            {show && <p>{favs.des}</p>}
            <div>{favs.name}</div>
        </>
    }
}

export default Interactivity
