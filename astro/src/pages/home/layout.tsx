import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Counter from "./component/Counter";
import Item from "./component/Item";

const queryClient = new QueryClient();

export default function HomeLayout()
{
    return <>
        <QueryClientProvider client={queryClient}>
            <Item/>
            <Counter/>
        </QueryClientProvider>
    </>
}