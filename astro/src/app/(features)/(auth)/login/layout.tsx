import React from "react";
import QueryProvider from '@/layouts/QueryProvider';
import {LoginForm} from "@/app/(features)/(auth)/login/pages/Login.tsx";

export default function LoginLayout() {
    return <>
        <QueryProvider>
            <LoginForm/>
        </QueryProvider>
    </>
}