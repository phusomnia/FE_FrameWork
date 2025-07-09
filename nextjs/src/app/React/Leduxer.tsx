import react from "react";
import {WaifuListProps, Waifu} from './Type'
// import { randomUUID } from 'crypto'
import {v4 as uuidv4} from 'uuid'

type WaifuAction = {
    type: string;  // Generic string type for the action type
    waifu?: Waifu;
    id?: number | string;
};

function waifuReducer(state: Waifu[], action: WaifuAction): Waifu[]{
    switch(action.type)
    {
        case 'added':
            console.log(action.waifu)
            if (!action.waifu) return state;
            return [...state, action.waifu];
        case 'edit':
            return state.map(s => {
                if(s.id === action.waifu?.id)
                {
                    return action.waifu
                } else 
                {
                    return s
                }
            })
        case 'delete': 
            return state.filter(s => s.id !== action.id)
        default:
            return state
    }
}

const waifusList: Waifu[] = [
    { id: uuidv4(), name: "Nijikita"},
    { id: uuidv4(), name: "Kita"},
    { id: uuidv4(), name: "Yamada"}
]

class Leduxer
{
    static TaskWaifu()
    {
        // const [waifus, setWaifus] = react.useState(waifusList)
        const [waifuss, dispatch] = react.useReducer(waifuReducer, waifusList);
        
        const handleAddWaifu = (name: string) => 
        {
            const addWaifuDTO: Waifu = {
                id: uuidv4(),
                name: name
            }
            dispatch({
                type: 'added',
                waifu: addWaifuDTO
            });
        }

        const handleChangeWaifu = (waifu: Waifu) =>
        {
            dispatch({
                type: 'edit',
                waifu: waifu
            })
        }

        const handleDeleteWaifu = (waifuId: string | number) =>
        {
            dispatch({
                type: 'delete',
                id: waifuId
            })
        }

        return <>
            <p>Waifu list: </p>
            <Leduxer.AddWaifu onAddWaifu={handleAddWaifu}></Leduxer.AddWaifu>
            <Leduxer.WaifuList 
                waifus={waifuss} 
                onChangeWaifu={handleChangeWaifu} 
                onDeleteWaifu={handleDeleteWaifu}
            ></Leduxer.WaifuList>
        </>
    }

    static AddWaifu({onAddWaifu}: any)
    {
        const [text, setText] = react.useState("")
        return <>
            <input 
                type="text"
                placeholder="Add waifu"
                onChange={e => setText(e.target.value)} 
            />
            <button
                onClick={() => onAddWaifu(text)}
            >
                Add
            </button>
        </>
    }
    
    static WaifuList({waifus, onChangeWaifu, onDeleteWaifu}: WaifuListProps)
    {
        const [editId, setEditId] = react.useState<number | null | string>(null)
        const [editName, setEditName] = react.useState("");

        const editState = (editId: string | number | null, waifu: Waifu) => {
            if(editId === waifu.id)
            {
                return <>
                    <input type="text" 
                        onChange={e => setEditName(e.target.value)}
                    />
                    <button
                        className='rounded m-[2px] p-[1px] bg-gray-500'
                        onClick={() => {
                            const waifuDTO = {
                                id: editId,
                                name: editName
                            }
                            onChangeWaifu(waifuDTO)
                            setEditId(null)
                        }}
                    >Save</button>  
                </>
            } else 
            {
                return <>
                    <button 
                        className='rounded m-[2px] p-[1px] bg-blue-500' 
                        onClick={() => setEditId(waifu.id)}
                        >Edit
                    </button>
                </>
            } 
        }

        return <>
            {waifus.map(w => (
                <li key={w.id}>
                    {w.name}
                    {editState(editId, w)}
                    <button 
                        className='rounded p-[1px] bg-red-500'
                        onClick={() => onDeleteWaifu(w.id)}
                    >Delete
                    </button>
                </li>
            ))}
        </>
    }
}

export default Leduxer