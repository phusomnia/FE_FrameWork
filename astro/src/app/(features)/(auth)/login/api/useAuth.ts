import { queryClient, useMutation, useQuery } from "@/store/QueryStore.ts";

export function useLogin()
{
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            return response.json();
        },
        onError: (error: any) => {
            console.error(error.message)
        }
    });
}