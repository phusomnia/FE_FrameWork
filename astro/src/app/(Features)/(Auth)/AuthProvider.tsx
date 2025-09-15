import React from 'react';
import {useAuthorize} from "@/app/(Features)/(Auth)/login/api/useAuth.ts";
import type {AuthProviderProps} from "@/app/(Features)/(Auth)/dashboard/types.ts";

export default function AuthProvider({ roleAllowed, url, children }: AuthProviderProps) {
    const auth = useAuthorize();
    const token = localStorage.getItem("access-token");


    const { isError } = auth;

    React.useEffect(() => {
        if (token) {
            auth.mutate({
                token: token,
                roleAllowed: roleAllowed,
                url: url
            });
        }
    }, [token, roleAllowed, url]);


    if (!token) {
        return <div>No token found</div>;
    }

    if (isError) {
        return <div>Not authorized</div>
    }
    
    return <>{children}</>;
}