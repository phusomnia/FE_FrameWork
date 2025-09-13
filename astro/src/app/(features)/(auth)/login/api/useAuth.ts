import { queryClient, useMutation, useQuery } from "@/store/QueryStore.ts";

export function useLogin()
{
    return useMutation({
        mutationFn: async (data: any) => {
            const response: any = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const res = await response.json();
            
            if (!response.ok)
            {
                const error = {
                    status: res.status, 
                    errorMessage: res.errorMessage
                }
                throw new Error(error.errorMessage)
            }
            
            return res;
        },
        onSuccess: (data: any) => {
            console.log(data.message)
            alert(data.message)
        },
        onError: (error: any) => {
            console.log(error.message)
            alert(error.message)
        }
    });
}