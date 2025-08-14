import React from "react";
import { Comments } from "./component/Comments";
import QueryProvider from "@/layouts/QueryProvider";

export default function TodoLayout() {
    console.log("MainLayout");
    return <>
        <div>
            <QueryProvider>
                <Comments />
            </QueryProvider>
        </div>
    </>
}