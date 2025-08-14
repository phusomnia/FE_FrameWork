import { queryClient, QueryClientProvider } from "@/store/QueryStore";

export default function ContextProvider({ children }: any) {
    return <>
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>;
    </>
}