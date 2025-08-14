import type { APIRoute } from "astro";
import data from "./data.json"
import fs from "fs/promises";
import path from "path";

/*
    This is a demo of API routes in Astro
    demonstrating the use of the GET, POST, PUT and DELETE methods
    in case you want to develop fullstack apps

    You can use SQL lib or ORM like Prisma, Drizzle to handle the database
*/

export const GET: APIRoute = async ({params, request}) => {
    return new Response(
        JSON.stringify(data), 
        {status: 200}
    )
}

export const POST: APIRoute = async ({request}) => {
    const newComment = await request.json();

    const currentFilePath = path.join(new URL(import.meta.url).pathname, "../data.json")
    const file = await fs.readFile(path.join(currentFilePath), "utf-8");
    const comments = JSON.parse(file);
    console.log(comments);

    comments.push(newComment);
    console.log(comments)

    await fs.writeFile(path.join(currentFilePath), JSON.stringify(comments, null, 2));

    return new Response(
        JSON.stringify({message: newComment}), 
        {status: 200}
    )
}

export const PUT: APIRoute = async ({request}) => {
    const req = await request.json();
    console.log(req)

    const currentFilePath = path.join(new URL(import.meta.url).pathname, "../data.json")
    const file = await fs.readFile(path.join(currentFilePath), "utf-8");
    const comments = JSON.parse(file);
    console.log(comments);

    const updatedComments = comments.map((m: any) => {
        if(m.id === req.id){
            return {...m, body: req.body}
        }
        return m;
    });
    console.log(updatedComments)
    
    await fs.writeFile(path.join(currentFilePath), JSON.stringify(updatedComments, null, 2));

    return new Response(
        JSON.stringify({message: "Ok"}),
        {status: 200}
    )
}

export const DELETE: APIRoute = async ({request}) => {
    const id = Number(new URL(request.url).searchParams.get("id"));
    console.log(typeof id)

    const currentFilePath = path.join(new URL(import.meta.url).pathname, "../data.json")
    const file = await fs.readFile(path.join(currentFilePath), "utf-8");
    const comments = JSON.parse(file);

    const exist = comments.find((comment: any) => comment.id === id);
    if(!exist)
    {
        return new Response(
            JSON.stringify({message: "Comment not found"}), 
            {status: 404}
        )
    }
    const filteredComments = comments.filter((comment: any) => comment.id !== id);
    console.log("filtered", filteredComments)

    await fs.writeFile(path.join(currentFilePath), JSON.stringify(filteredComments, null, 2));

    return new Response(
        JSON.stringify({message: "Deleted comment succesfully"}), 
        {status: 200}
    )
}