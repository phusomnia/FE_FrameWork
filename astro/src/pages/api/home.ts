import type { APIRoute } from "astro";
import data from "./data.json"

export const GET: APIRoute = async ({params, request}) => {
    return new Response(JSON.stringify(data), {status: 200})
}

export const POST: APIRoute = async ({request}) => {
    const data = await request.json();
    return new Response(JSON.stringify({message: data}), {status: 200})
}