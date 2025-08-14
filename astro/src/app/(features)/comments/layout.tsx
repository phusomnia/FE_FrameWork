import React from "react";
import { Comments } from "./pages/Comments";
import ContextProvider from '@/layouts/ContextProvider';

export default function CommentsLayout() {
    console.log("MainLayout");
    return <>
        <ContextProvider>
            <Comments/>
        </ContextProvider>
    </>
}