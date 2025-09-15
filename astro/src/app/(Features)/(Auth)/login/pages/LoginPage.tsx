import { useForm } from "@/Hooks/useForm.ts";
import {useAuthorize, useLogin} from "../api/useAuth.ts" 
import { fieldConfigs } from "@/Config/ValidationConfigs.ts";
import {useNavigate} from "react-router";
import React from "react";

export function LoginPage()
{
    const form = useForm({
        username: "",
        password: ""
    }, fieldConfigs.login)

    const login = useLogin();
    const { isPending: loginPending } = login;
    
    if (loginPending) return <div>Login...</div>
    
    const onSubmit = async (values: any) => {
        await login.mutateAsync({
            username: values.username,
            password: values.password
        })
        window.location.href = "/dashboard";
    };
    
    return <>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
                <input
                    className="border"
                    {...form.validate("username")}
                    value={form.value.username}
                    placeholder="type your username"
                />
                {form.errors.username && <p className="text-red-500">{form.errors.username}</p>}
            </div>

            <div>
                <input
                    {...form.validate("password")}
                    value={form.value.password}
                    placeholder="type your password"
                />
                {form.errors.password && <p className="text-red-500">{form.errors.password}</p>}
            </div>

            <button type="submit">Submit</button>
        </form>
    </>
}