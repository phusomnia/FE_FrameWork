import { useForm } from "@/hooks/useForm.ts";
import { useLogin } from "../api/useAuth.ts" 
import React from "react";
import {DatabaseIcon} from "lucide-react";

const fieldConfigs = {
    username: {
        rules: [{ required: "username is required" }]
    },
    password: {
        rules: [
            { required: "username is required" }
        ]
    }
}

export function LoginForm()
{
    const form = useForm({
        username: "",
        password: ""
    }, fieldConfigs)

    const login = useLogin();

    const { data: userdetail, isPending, isSuccess }: any = login;
    
    console.log(isSuccess, userdetail)
    if (isPending) return <div>...</div>
    
    const onSubmit = (values: any) => {
        login.mutate({
            username: values.username,
            password: values.password
        })
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