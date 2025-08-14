import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();
const originURL = window.location.origin;

export { queryClient, originURL, QueryClientProvider, useMutation, useQuery };