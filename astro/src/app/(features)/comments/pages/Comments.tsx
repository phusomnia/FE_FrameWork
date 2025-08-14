import React from "react";
import { getCommnets,  usePostComment, useDeleteComment, useEditComment } from "@/app/(features)/comments/api/useComments";
import { useCounterStore } from "@/store/CounterStore";
import CustomButton from "../component/CustomButton";
import { useToggle } from "@/hooks/useToggle";
import { useForm } from "@/hooks/useForm";

type CommentProps = {
    comment?: string
    username?: string
}

export function Comments() {
    const { data, isLoading } = getCommnets();
    const postComment = usePostComment();
    const { count, increment, decrement, reset, setCount } = useCounterStore();
    const [edit, toggleEdit] = useToggle();

    const formValues: CommentProps = { comment: '' }  
    const { value, handleChange } = useForm(formValues);

    if(isLoading)
    {
        return <div>Loading...</div>
    }
    console.log(data);
    console.log(value)

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
                name="comment"
                type="text" 
                placeholder="Add comment" 
                onChange={handleChange}
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
        {edit && <div>Editing</div>}
        <button onClick={toggleEdit}>Toggle</button>
    </>
}

export default function Comment({comment}: any)
{
    const [edit, setEdit] = useToggle();
    const [text, setText] = React.useState("");
    const deleteComment = useDeleteComment();
    const editComment = useEditComment();

    const handleEditComment = () => {
        console.log('Enter key pressed');
        editComment.mutate({
            id: comment.id,
            body: text
        })
    };

    return <>
        <div key={comment.id}>
            {edit ? <>
                <input type="text" 
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    className="px-1" 
                    onClick={() => {
                        setEdit(!edit)
                        handleEditComment()
                    }}>Save</button>
            </> : <>
                {comment.body}
                <button
                    className="px-1" 
                    onClick={() => setEdit(!edit)}>Edit</button>
                <button
                    onClick={() => deleteComment.mutate(comment.id)}
                className="px-1" 
                >Delete</button>
            </>}
        </div>
    </>
}