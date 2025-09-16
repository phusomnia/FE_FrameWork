import React from 'react';
import {useAuthorize} from "@/app/(Features)/(Auth)/login/api/useAuth.ts";
import type {AuthProviderProps} from "@/app/(Features)/(Auth)/dashboard/types.ts";

export default function AuthProvider({ roleAllowed, url, children }: AuthProviderProps) {
    const auth = useAuthorize();
    const token = localStorage.getItem("access-token");
    const { isError, isPending } = auth;

    if (!token) {
        return <div>No token found</div>;
    }

    React.useEffect(() => {
        const authorize = async () => {
            await auth.mutateAsync({
                token: token,
                roleAllowed: roleAllowed,
                url: url
            });
        };

        if (token) {
            authorize()
        }
    }, [token]);

    if (isPending) return <div>...</div>
    if (isError) return <div className="text-red-500">Not authorized</div>
    
    return <>{children}</>;
}