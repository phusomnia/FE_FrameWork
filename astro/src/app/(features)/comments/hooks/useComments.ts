import { queryClient, useMutation, useQuery } from "@/store/QueryStore";

export function getCommnets() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: async () => { 
            const response = await fetch('http://localhost:1337/api/comments');
            return response.json();
        }
    }, queryClient);
}

export function usePostComment() {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch('http://localhost:1337/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.json();
        }
    });
}

export function useEditComment() {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch(`http://localhost:1337/api/comments`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.json();
        }
    })
}

export function useDeleteComment() {
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`http://localhost:1337/api/comments?id=${id}`, {
                method: 'DELETE'
            });
            return response.json();
        }
    });
}