import {Action, HeadingProps, Waifu, WibiAction } from './Type'
import React, { useReducer } from 'react'
import { createContext } from 'react'
import {v4} from 'uuid'

const levelContext = createContext(0)
const WibiContext = createContext<any>(null)
const WibiDispatchContext = createContext<any>(null)

function wibiReducer(wibis: Waifu[], action: WibiAction)
{
    switch(action.type)
    {
        case 'add':
            console.log('add')
            return [...wibis, {id: v4(), name: action.wibi.name}]
        default:
            return wibis
    }
}

const wibiList: Waifu[] = [
    {id: 1, name: "Nijikita"},
    {id: 2, name: "Ryo"},
    {id: 3, name: "Kita"}
]

class Kontex
{
    static Page()
    {
        return <>
            <Kontex.Section>
                <Kontex.Heading level={1}>Title</Kontex.Heading>
                <Kontex.Section>
                    <Kontex.Heading level={2}>He he</Kontex.Heading>
                    <Kontex.Heading level={2}>He he</Kontex.Heading>
                </Kontex.Section>
            </Kontex.Section>
        </>
    }
    
    static Section({children}: {children: React.ReactNode})
    {
        const level = React.useContext(levelContext);
        return <>
            <section className="section border p-[10px]">
                <levelContext.Provider value={level + 1}>
                    {children}
                </levelContext.Provider>
            </section>
        </>
    }
    
    static Heading({children}: HeadingProps)
    {
        const level = React.useContext(levelContext);
        switch(level)
        {
            case 1:
                return <p className="text-2xl">{children}</p>
            case 2:
                return <p className="text-3xl">{children}</p>
        }
    }

    static WibiApp()
    {
        const [wibis, wibiDispatch] = React.useReducer(
            wibiReducer, 
            wibiList
        );

        return <>
            <WibiContext value={wibis}>
                <WibiDispatchContext value={wibiDispatch}>
                    <AddWibi/>
                    <WibiList/>
                </WibiDispatchContext>
            </WibiContext>
        </>
    }
}

function AddWibi()
{
    const [name, setName] = React.useState<string>("");
    const wibis = React.useContext<any>(WibiContext);
    const wibiDispatch = React.useContext<any>(WibiDispatchContext);

    function handleAddWibi(name: string)
    {
        wibis.name = name
        wibiDispatch({
            type: "add",
            wibi: wibis
        })
    }

    return <>
        <input 
            className="text-black"
            type="text" 
            onChange={(e) => setName(e.target.value)}
        />
        <button 
            onClick={() => handleAddWibi(name)}
        >
            Add
        </button>
    </>
}

function WibiList()
{
    const wibis: Waifu[] = React.useContext(WibiContext);
    return <>
        <ul>
            {wibis.map(w => (
                <li key={w.id}>
                    {w.name}
                </li>
            ))}
        </ul>
    </>
}

export default Kontex