import React from "react";
import QueryProvider from '@/Layouts/QueryProvider';
import { BrowserRouter } from "react-router-dom";
import {LoginPage} from "@/app/(Features)/(Auth)/login/pages/LoginPage.tsx";

export default function LoginLayout() {
    return <>
        <QueryProvider>
            <LoginPage/>
        </QueryProvider>
    </>
}