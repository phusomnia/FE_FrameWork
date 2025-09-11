import React from "react";
import { CommentsComponent } from "./pages/CommentsComponent.tsx";
import ContextProvider from '@/layouts/ContextProvider';

export default function CommentsLayout() {
    return <>
        <ContextProvider>
            <CommentsComponent/>
        </ContextProvider>
    </>
}