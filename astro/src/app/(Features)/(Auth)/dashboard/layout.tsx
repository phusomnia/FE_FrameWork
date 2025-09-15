import React from "react";
import QueryProvider from '@/Layouts/QueryProvider.tsx';
import {DashboardPage} from "./DashboardPage.tsx";
import AuthProvider from "@/app/(Features)/(Auth)/AuthProvider.tsx";

export default function LoginLayout() {
    return <>
        <QueryProvider>
            <AuthProvider url={"dashboard"} roleAllowed={"Admin"}>
                <DashboardPage/>
            </AuthProvider>
        </QueryProvider>
    </>
}