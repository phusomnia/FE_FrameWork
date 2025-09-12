import { queryClient, QueryClientProvider } from "@/store/QueryStore";

export default function QueryProvider({ children }: any) {
    return <>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>;
    </>
}