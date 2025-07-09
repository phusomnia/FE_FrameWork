import { randomUUID, UUID } from "crypto";
import {v4 as uuidv4} from 'uuid'
import React, { useState } from "react"
import { produce } from 'immer'
import { AtRule } from "postcss";

class Staze {
    static RequestTracker() 
    {
        const [pending, setPending] = useState<number>(0);
        const [completed, setCompleted] = useState<number>(0);

        async function handleClick()
        {
            setPending(p => p + 1)
            await new Promise(r => {
                setTimeout(r, 3000);
            })
            setPending(p => p - 1);
            setCompleted(c => c + 1);
        }

        return <>
            <p>
                Pending: {pending}
            </p>
            <p>
                Completed: {completed}
            </p>
            <button 
                className="p=[5px] bg-cyan-200"
                onClick={handleClick}>
                Buy
            </button>
        </>
    }

    static ObjState()
    {
        const [pos, setPos] = useState({
            x: 0,
            y: 0
        });

        return <>
            <div
            className="relative w-[100vw] h-[100vh] bg-white"
            onPointerMove={e => {
                setPos({
                    x: e.clientX,  
                    y: e.clientY
                })
            }}
            >
                <div
                className="absolute radius bg-red-500 rounded-full w-[20px] h-[20px]"
                style={{
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                    left: -10,
                    right: -10
                }}
                >

                </div>
            </div>
        </>
    }

    // Update objects in State
    static Form()
    {
        const [person, setPerson] = useState({
            firstname: 'abc',
            lastname: 'd',
            email: 'example@gmail.com'
        });

        function handleInput(e: any, type: string){
            if(type == "firstname")
            {
                setPerson({
                    ...person,
                    firstname: e.target.value
                })
            }
            if(type == "lastname")
            {
                setPerson({
                    ...person,
                    lastname: e.target.value
                })
            }
            if(type == "email")
            {
                setPerson({
                    ...person,
                    email: e.target.value
                })
            }
        }

        return <>
            <div>
                <div>
                    <label>
                        Firstname:
                        <input value={person.firstname} 
                        onChange={(e) => handleInput(e, "firstname")}
                        /> 
                    </label>
                </div>
                <div>
                    <label>
                        Lastname:
                        <input value={person.lastname} 
                        onChange={(e) => handleInput(e, "lastname")}
                        /> 
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input value={person.email} 
                        onChange={(e) => handleInput(e, "email")}
                        /> 
                    </label>
                </div>
                <p>
                    {person.firstname}{' '}
                    {person.lastname}{' '}
                    {person.email}{' '}
                </p>
            </div>
        </>
    }
    
    // Updating Arrays in State
    static List()
    {
        type arstist = {
            id      : string,
            name    : string
            checked : boolean
        }

        const [name, setName] = useState<string>('');
        const [artists, setArtists] = useState<arstist[]>([]);
        const [editMode, setEditMode] = useState(false)

        const addArtist = () =>
        {
            var artistDTO: arstist= {
                id: uuidv4(),
                name: name,
                checked: false
            };
            setArtists(produce(draft => {
                draft.push(artistDTO)
            }))
        }

        const updateArtist = (artId: string, editName: string) => 
        {
            console.log(artId, editName)
            setArtists(produce(artist => {
                const editArtist = artist.find(a => a.id === artId)
                if(editArtist)
                {
                    editArtist.name = editName
                }
            }))
        }

        const handleChecked = (artId: string, newChecked: boolean) => 
        {
            console.log(artId, newChecked);
            const artList = [...artists];
            const artWork = artList.find(a => a.id === artId);
            if(artWork){
                artWork.checked = newChecked;
                setArtists(artList);    
            }
        }

        return <>
            <h1>Check string: </h1>
            <input 
                type="text" 
                value={name}
                onChange={e => {
                    setName(e.target.value)
                }}
            />
            <button
                className="rounded p-[5px] bg-slate-400"
                onClick={() => {
                    // setArtists([...artists, {
                    //     id: uuidv4(),
                    //     name: name,
                    //     checked: false    
                    // }])
                    addArtist()
                }}
            >
                Add
            </button>
            <ul>
                {artists.map(artist => 
                    <li key={artist.id}>
                        <input 
                            type="checkbox" 
                            checked={artist.checked}
                            onChange={e => handleChecked(artist.id, e.target.checked)}
                        />
                        {artist.name}
                        {editMode ? <>
                            <input 
                                className="text-black"
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                onBlur={() => {
                                    updateArtist(artist.id, name)
                                    setEditMode(em => !em)
                                }} 
                            />
                        </> : <>
                            <button
                                className="ml-[10px] p-[1px] rounded bg-cyan-600" 
                                onClick={() => {
                                    setEditMode(em => !em)
                                }}
                            >Edit</button>
                        </>}
                        {artist && <button
                            className="ml-[10px] p-[1px] rounded bg-red-600"
                            onClick={() => setArtists(artists.filter(a => a.id !== artist.id))}
                        >
                        Delete
                        </button>}
                    </li>
                )}
            </ul>
        </>
    }

    // Avoid con
    static FeedbackForm()
    {
        const [text, setText] = useState('');
        /*
            Declare state that should be never at the same time
            example:
            bad approach
                isSending, isSent
            better way
                status
        */
        const [status, setStatus] = useState('typing')

        async function handleSubmit(e: any)
        {
            e.preventDefault();
            setStatus("sending");
            await new Promise(res => setTimeout(res, 2000));
            setStatus('sent')
        }

        function stateForm(status: string)
        {
            if(status === 'sending')
            {
                return <>
                    <p>Sending...</p>
                </>
            }
            else {
                return <>
                    <button 
                        type="submit"
                        disabled={status === "isSending"}>
                        Send
                    </button>
                </>
            }
        }

        if(status === 'sent')
        {
            return <>
                <p>Thanks for feeback</p>
            </>
        }

        return <>
        <form onSubmit={handleSubmit}>
            <p>Hello how is your day?</p>
            <textarea
                className="text-black"
                disabled={status === "isSending"}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            {stateForm(status)}
            <br />
        </form>
        </>
    }

    static InvoiceForm()
    {
        /**
         * caculate some information from the komponent props or its existing state variables
         * during rendering
        */
        const [quantity, setQuantity] = useState(0)
        const [unit, setUnit] = useState(0)

        const total = quantity * unit;

        return <>
            <h2>Invoice form</h2>
            <label htmlFor="">
                Quantity:
                <input 
                className="text-black"
                type="number" 
                onChange={e => setQuantity(parseInt(e.target.value))}
                />
            </label>
            <br />
            <label htmlFor="">
                Unit:
                <input 
                className="text-black"
                type="number" 
                onChange={e => setUnit(parseInt(e.target.value))}
                />
            </label>
            <p>Total: {!Number.isNaN(total) ? toVND(total.toString()) : 0}</p>
        </>
    }

    static Duplicate()
    {
        type Waifu = {
            id: number,
            name: string
        }

        const listWaifus: Waifu[] = [
            { id: 1, name: "Nijikita"},
            { id: 2, name: "Yamada"},
            { id: 3, name: "Kita"},
        ];

        const [waifus, setWaifus] = useState(listWaifus);
        const [selectedId, setSelectedId] = useState(1);

        function handleChangeWaifu(id: number, e: any)
        {
            setWaifus(waifus.map(waifu => {
                if(waifu.id === id){
                    return {
                        ...waifu,
                        name: e.target.value
                    }
                } else {
                    return waifu
                }
            }))
        }

        const selectedWaifu = waifus.find(w => w.id === selectedId);

        return <>
            <p>What is your favorite waifu?</p>
            {waifus.map(w => (
                <li key={w.id}>
                    <input 
                        className="text-black"
                        type="text" 
                        value={w.name}
                        onChange={e => {handleChangeWaifu(w.id, e)}}
                    />
                    <button
                    onClick={() => {
                        setSelectedId(w.id)
                    }}
                    >
                        Choose
                    </button>
                </li>
            ))}
            <p>{selectedWaifu?.name}</p>
        </>
    }
}

function toVND(value: string)
{
    value = value.toString().replace(/\./g, "");
    const formatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
    })
    .format(Number(value))
    .replace("VND", "đồng")
    .trim()

    return formatted
} 

export default Staze