'use client'
import {Komponents, Render} from "./Komponents";
import Interactivity from "./Interactivity";
import CurlyBrace from "./CurlyBrace";
import Propss from "./Propss";
import Conditional from "./Conditional"
// import { Inter } from "next/font/google";
import Staze from "./State";
import Sharing from './Sharing'
import Leduxer from "./Leduxer";
import Kontex from "./Context"
import Refs from './Refs'
import {Effect, Memoz} from './Hooks'

export default function Learning() {
    const h1S = "text-3xl font-bold underline"

    return <>
        <h1 className={h1S}>Komponent</h1>
        <Komponents.Profile/>
        
        <h1 className={h1S}>Curly brace</h1>
        <CurlyBrace.Avatar/>
        <CurlyBrace.Label/>

        <h1 className={h1S}>Double Curlies: &#123;&#123;&#125;&#125;</h1>
        <CurlyBrace.doubleCur/>

        <h1 className={h1S}>Passing props</h1>
        <Propss.Profile/>
        {/* <Propss.SpreadAva/> */}

        <h1 className={h1S}>Render</h1>
        <Render.List/>
        <Render.Pure/>
        {/*<Render.SideEffect/>*/}
        {/* <LikeAndSub/> */}
        <Komponents.UiAsTree/>
        
        <h1 className={h1S}>Render</h1>
        <Conditional.PackingList/>
        <Conditional.List/>
        {/* Interaction */}
        <h1 className={h1S}>Interaction</h1>
        <Interactivity.ClickButton/>
        <Interactivity.Toolbar/>
        <Interactivity.SignUp/>
        <Interactivity.Gallery/>

        <h1 className={h1S}>State</h1>
        <Staze.RequestTracker/>
        {/* <Staze.ObjState/> */}
        <Staze.Form/>
        <Staze.List/>
        <Staze.FeedbackForm/> 
        <Staze.InvoiceForm/>
        <Staze.Duplicate/>
        
        <h1 className={h1S}>Sharing</h1>
        <Sharing.Accordion/>
        
        <h1 className={h1S}>Reducer</h1>
        <Leduxer.TaskWaifu/>

        <h1 className={h1S}>Context && Reducer</h1>
        <Kontex.Page/>
        <Kontex.WibiApp/>

        <Refs.CounterRef/>
        <Refs.Popup/>

        <h1 className={h1S}>Effect</h1>
        <Effect.App/>
        <Memoz.Calculate/>
        <Memoz.Parent/>
        {/* <Effect.AppTodos/> */}
        {/* <Effect.FakeChatServer/> */}
    </>
}