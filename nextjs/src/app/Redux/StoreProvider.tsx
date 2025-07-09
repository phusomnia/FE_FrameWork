'use client'
import React from "react";
import Redux from "react-redux";
import { makeStore, AppStore } from "./store";

type ChildrenNode = {
    children: React.ReactNode;
}

export default function StoreProvider({children}: ChildrenNode) 
{
    const storeRef = React.useRef<AppStore | null>(null);
    if(!storeRef.current)
    {
        storeRef.current = makeStore();
    }

    return <>
        <Redux.Provider store={storeRef.current}>
            {children}
        </Redux.Provider>
    </>
}