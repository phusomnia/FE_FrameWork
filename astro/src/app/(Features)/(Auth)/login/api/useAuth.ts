import { queryClient, useMutation, useQuery } from "@/store/QueryStore.ts";
import type {AuthRequest} from "@/app/(Features)/(Auth)/dashboard/types.ts";

function useLogin()
{
    return useMutation({
        mutationFn: async (data: any) => {
            const response: any = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data),
                credentials: "include"
            });
            
            const res = await response.json();
            
            if (!response.ok)
            {
                const err = {
                    status: res.status, 
                    errorMessage: res.message
                }
                throw new Error(err.errorMessage)
            }
            
            return res;
        },
        onSuccess: async (res: any) => {
            alert(res.message)
            localStorage.setItem("access-token", res.data["access-token"]);
        },
        onError: (err: any) => {
            alert(err.message)
        }
    });
}

function useAuthorize()
{
    return useMutation({
        mutationFn: async (request: AuthRequest) => {
            const response: any = await fetch(`http://localhost:8080/api/v1/auth/${request.url}?roleAllowed=${request.roleAllowed}`, {
                headers: { 
                    'Authorization': `Bearer ${request.token}`
                }
            })
            
            const res = await response.json();

            if (!response.ok)
            {
                const err = {
                    status: res.status,
                    errorMessage: res.message
                }
                throw new Error(err.errorMessage)
            }
            
            return res
        } ,
        onSuccess: (res: any) => {
            console.log(res);
            return res;
        },
        onError: (err: any) => {
            console.log(err);
            return err;
        }
    })
}

export {
    useLogin,
    useAuthorize
}