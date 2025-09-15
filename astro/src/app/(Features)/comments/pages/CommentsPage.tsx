import React from "react";
import {
    usePostComment,
    useDeleteComment,
    useEditComment,
    getComments
} from "@/app/(Features)/comments/api/useComments";
import { usePageView } from "@/store/Counter/CounterStore";
import CustomButton from "../component/CustomButton";
import { useToggle } from "@/Hooks/useToggle";
import { useForm } from "@/Hooks/useForm";

const fieldConfigs = {
    comment: {
        rules: [{ required: "Comment is required" }]
    }
}

export function CommentsPage() {
    const {data, isLoading} = getComments();
    const postComment = usePostComment();
    
    // -- store --
    const countPage = usePageView((state) => state.count)
    const dispatchPage = usePageView((state) => state.dispatch)
    
    const [edit, toggleEdit] = useToggle();
    

    const form = useForm(
        {
            comment: "",
            agree: false,
            gender: "",
        },
        fieldConfigs
    );

    const randomUUID = crypto.randomUUID();
    
    if (isLoading) {
        return <div>Loading...</div>
    }
    console.log(data);
    
    const onSubmit = (values: any) => {
        postComment.mutate({
            id: randomUUID,
            body: values.comment
        })
    };

    return <>
        <div>
            {data.map((comment: any) => (
                <Comment key={comment.id} comment={comment}/>
            ))}
        </div>
        <div>
            <div className="border p-4">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <input
                        {...form.validate("comment")}
                        value={form.value.comment}
                        placeholder="Add comment"
                    />
                    {form.errors.comment && <p className="text-red-500">{form.errors.comment}</p>}

                    <div>
                        {form.value.agree ? <h1>True</h1> : <h1>False</h1>}
                        <input
                            name="agree"
                            type="checkbox"
                            onChange={form.handleChange}
                            checked={form.value.agree}
                        />
                    </div>

                    <div className="flex">
                        <h1 className="py-2 justify-center">Select gender</h1>
                        <select
                            className="border p-2"
                            name="gender"
                            value={form.value.gender}
                            onChange={form.handleChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        <div>
            <h1>Count: {countPage}</h1>
            <CustomButton color="red"    onClick={() => dispatchPage({ type: 'INCREMENT' })}>+</CustomButton>
            <CustomButton color="blue"   onClick={() => dispatchPage({ type: 'DECREMENT' })}>-</CustomButton>
            <CustomButton color="green"  onClick={() => dispatchPage({ type: 'RESET' })}>Reset</CustomButton>
            <CustomButton color="yellow" onClick={() => dispatchPage({ type: 'SET_COUNT', payload: 42 })}>Reset</CustomButton>
        </div>
        {edit && <div>Editing</div>}
        <button onClick={toggleEdit}>Toggle</button>
    </>
}

export default function Comment({comment}: {comment: any}) {
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
        {
            edit ? 
            <>
                <input type="text"
                       onChange={(e) => setText(e.target.value)}
                />
                <button
                    className="px-1"
                    onClick={() => {
                        setEdit(!edit)
                        handleEditComment()
                    }}>Save
                </button>
            </> 
                : 
            <>
                {comment.body}
                <button
                    className="px-1"
                    onClick={() => setEdit(!edit)}>Edit
                </button>
                <button
                    onClick={() => deleteComment.mutate(comment.id)}
                    className="px-1"
                >Delete
                </button>
            </>
        }
        </div>
    </>
}