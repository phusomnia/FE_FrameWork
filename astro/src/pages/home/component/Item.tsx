import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function Item()
{
    const {data, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: async () => {
            const res = await fetch("./api/home");
            return res.json();
        }
    });

    if (isLoading) return <>Loading...</>;

    return <>
        {data.map((m: any) => {
            return <div key={m.id}>id: {m.id} name: {m.name}</div>
        })}
    </>
}