import React from "react";
import { getCommnets,  usePostComment, useDeleteComment, useEditComment } from "@/app/(features)/comments/hooks/useComments";
import { useCounterStore } from "@/store/CounterStore";
import CustomButton from "../component/CustomButton";

export function Comments() {
    const { data, isLoading } = getCommnets();
    const postComment = usePostComment();
    const { count, increment, decrement, reset, setCount } = useCounterStore();

    if(isLoading)
    {
        return <div>Loading...</div>
    }

    console.log(data);

    const handlePostComment = ((e: any) => {
        if (e.key === 'Enter') {
            console.log('Enter key pressed');
            postComment.mutate({
                id: data.length + 1,
                body: e.currentTarget.value
            });
        }
    });

    return <>
        <div>
            {data.map((comment: any) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
        <div>
            <input 
                type="text" 
                placeholder="Add comment" 
                onKeyDown={handlePostComment} 
            />
        </div>
        <div>
            <h1>Count: {count}</h1>
            <CustomButton color="red" onClick={increment}>+</CustomButton>
            <CustomButton color="blue" onClick={decrement}>-</CustomButton>
            <CustomButton color="green" onClick={reset}>Reset</CustomButton>
            <CustomButton color="yellow" onClick={() => setCount(10)}>Reset</CustomButton>
        </div>
    </>
}

export default function Comment({comment}: any)
{
    const [edit, setEdit] = React.useState(false);
    const [text, setText] = React.useState("");
    const deleteComment = useDeleteComment();
    const editComment = useEditComment();
    console.log(text)

    const handleEditComment = () => {
        console.log('Enter key pressed');
        editComment.mutate({
            id: comment.id,
            body: text
        })
    };

    const render = (comment: any, edit: boolean) => {
        if(edit)
        {
            return <>
                <input type="text" 
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    className="px-1" 
                    onClick={() => {
                        setEdit(!edit)
                        handleEditComment()
                    }}>Save</button>
            </>
        }
        return <>
            {comment.body}
            <button
                className="px-1" 
                onClick={() => setEdit(!edit)}>Edit</button>
            <button
                onClick={() => deleteComment.mutate(comment.id)}
            className="px-1" 
            >Delete</button>
        </>
    }

    return <>
        <div key={comment.id}>
            {render(comment, edit)}
        </div>
    </>
}