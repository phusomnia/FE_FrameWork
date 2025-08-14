import { queryClient, QueryClientProvider } from "@/store/queryStore";

export default function QueryProvider({ children }: any) {
    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>;
}