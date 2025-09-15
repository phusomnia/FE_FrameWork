import React from "react";
import {CommentsPage} from "./pages/CommentsPage.tsx";
import QueryProvider from '@/Layouts/QueryProvider';

export default function CommentsLayout() {
    return <>
        <QueryProvider>
            <CommentsPage/>
        </QueryProvider>
    </>
}