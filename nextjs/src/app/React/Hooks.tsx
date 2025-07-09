import React from "react";
import {produce} from 'immer'
import {v4} from 'uuid'

const VideoContext = React.createContext<any>(null);

interface todos {
    userId    : number
    id        : number
    title     : string
    completed : boolean
}

interface food {
    id        : string
    name      : string
    calories  : number
}


class Effect 
{
    static VideoPlayer()
    {
        const context = React.useContext(VideoContext);
        const videoRef = React.useRef<any>(null)

        React.useEffect(() => {
            if(context.isPlaying)
            {
                console.log("videoRef play")
                videoRef.current.play();
            } else
            {
                console.log("videoRef pause")
                videoRef.current.pause();
            }
        }, [context.isPlaying]);

        return <>
            <video 
                className="h-[100px]"
                ref={videoRef}
                src={context.src}
                loop
            ></video>
        </>
    }

    static App()
    {
        const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

        return <>
            <button
                onClick={() => setIsPlaying(!isPlaying)}
            >
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <VideoContext value={{
                isPlaying: isPlaying,
                src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            }}>
                <Effect.VideoPlayer/>
            </VideoContext>
        </>
    }

    static AppTodos()
    {
        const [todos, setTodos] = React.useState<todos[]>([])

        React.useEffect(() => {
            // https://jsonplaceholder.typicode.com/todos
            fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
        }, [])

        return <>
        {todos.map(todo => (
            <div key={todo.id}>
                {todo.id} - {todo.title}
            </div>
        ))}
        </>
    }

    static FakeChatServer()
    {
        const [messages, setMessages] = React.useState<any[]>([])
        const msgEndRef = React.useRef<any>(null);

        React.useEffect(() => {
            const interval = setInterval(() => {
                const newMsg = {
                    id: Date.now(),
                    text: `Message at ${new Date().toLocaleTimeString()}`
                }
                setMessages(prev => [...prev, newMsg])
            }, 2000)
            return () => clearInterval(interval)
        }, [])

        React.useEffect(() => {
            msgEndRef.current.scrollIntoView({behavior: 'smooth'})
        }, [messages])

        return <>
            {messages.map(msg => (
                <div key={msg.id}>
                    {msg.text}
                </div>
            ))}
            <div ref={msgEndRef}></div>
        </>
    }
}

class Memoz
{
    static Calculate()
    {
        const [foods, setFoods] = React.useState<food[]>([]);
        const nameRef = React.useRef<HTMLInputElement>(null);
        const caloriesRef = React.useRef<HTMLInputElement>(null);

        function addFood(e: any)
        {
            e.preventDefault();
            if (!nameRef.current!.value.trim() || isNaN(parseInt(caloriesRef.current!.value))) {
                alert("Please enter a valid name and calories.");
                return;
            }
            let food: food = {
                id: v4(),
                name: nameRef.current!.value,
                calories: parseInt(caloriesRef.current!.value)
            } 
            setFoods(produce(draft => {
                draft.push(food)
            }))
        }

        const total = React.useMemo(() => {
            const result = foods.reduce((result, food) => {
                return result + food.calories
            }, 0)
            return result
        }, [foods])

        return <>
            <form onSubmit={addFood}>
                <input className="text-black" type="text" ref={nameRef}/><br />
                <input className="text-black" type="text" ref={caloriesRef}/><br />
                <button type="submit">Submit</button>
            </form>
            {foods.map(food => (
                <div key={food.id}>
                    {food.name} - {food.calories}
                </div>
            ))}
            <div>
                Total: {total}
            </div>
        </>
    }

    static ChildMemo = React.memo(function Child({value}: {value: any}){
        {
            console.log('Child render')
            return <>
                <div>
                    {value}
                </div>
            </>
        }
    }) 


    static Child()
    {
        console.log('Child :D')
        return <>
            <p>Child memo</p>
        </>
    }

    static Parent()
    {
        const [count, setCount] = React.useState<number>(0)

        return <>
            <div>
                <button
                    onClick={() => {
                        console.log('Render')
                        setCount(c => c + 1)
                    }}
                >Increment {count}</button>
                <Memoz.ChildMemo value="Hello" />
                <Memoz.Child/>
            </div>
        </>
    }
}

export {Effect, Memoz}