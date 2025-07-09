import React from "react";

type imgProps = {
    src: string
    size: number | string
}

type childrenProp = {
    children: React.ReactNode
}

class Komponents {
    /*
        Fowarding props with JSX spread syntax
    */
    static Avatar(prop: imgProps)  {
        return (
            <>
                <img
                    height={prop.size}
                    width={prop.size}
                    src={prop.src}
                />
            </>
        );
    }

    static Profile() {
        const data: imgProps[] = [
            {
                src: "https://m.media-amazon.com/images/M/MV5BOTJiNjMyYzQtODA3YS00YjNjLWExYzYtMGI1YWVlZjY2YWU4XkEyXkFqcGc@._V1_.jpg",
                size: "300"
            },
            {
                src: "https://m.media-amazon.com/images/M/MV5BOTJiNjMyYzQtODA3YS00YjNjLWExYzYtMGI1YWVlZjY2YWU4XkEyXkFqcGc@._V1_.jpg",
                size: "200"
            }
        ]

        return <>
            <Komponents.Avatar {...data[0]}/>

            <Komponents.Card>
                <Komponents.Avatar {...data[1]}/>
            </Komponents.Card>
        </>
    }

    static Card({children}: childrenProp){
        return <>
        <div className="card">
            {children}
        </div>
        </>
    }
    
    static UiAsTree(){
        function Header(){
            return <>
                <h1 className="">Header</h1>
                <Nav/>
            </>
        }
        
        function Nav(){
            return <>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </>
        }
        
        function Main(){
            return <>
            <div>
                <Article/>
            </div>
            </>
        }
        
        function Article(){
            return <>
            <h2>Article</h2>
            </>
        }
        
        return <>
        <div>
            <Header/>
            <Main/>
        </div>
        </>
    }
}

type Person = {
    name: string
}

const people: Person[] = [
    {
        name: "a"
    },
    {
        name: "b"
    },
    {
        name: "c"
    },
]

class Render {
    static List(){
        const listPeople = people.map((p, index) =>
            <li key={index}>{p.name}</li>
        );
        console.log(listPeople)
        return <ul>{listPeople}</ul>
    }

    static Pure(){
        type recipeProp = {
            drinker: number
            task: number
        }

        function Recipe(prop: recipeProp) {
            return <>
                <ol>
                    <li>#{prop.task}: Drink {prop.drinker} cups of water.</li>
                </ol>
            </>
        }

        return <>
            <Recipe task={1} drinker={1}/>
        </>
    }


    static SideEffect(){
        /*
            this effect occur in client rendering or SPA
        */
        let guest = 0;

        function Cup(){
            guest = guest + 1;
            return <h2>Tea cup for guest #{guest}</h2>
        }

        return <>
            <Cup/>
            <Cup/>
            <Cup/>
        </>
    }
}

export {
    Komponents,
    Render
};

