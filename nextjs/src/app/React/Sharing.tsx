import react from "react"

type PanelProps = {
    title: string,
    children: react.ReactNode
    status: string
    onShow: () => void
}

class Sharing {

    static Accordion()
    {
        const [activeIndex, setActiveIndex] = react.useState(0);

        return <>
            <p>Bocchi The Rock Waifus</p>
            <Sharing.Panel
                title="Nikita"
                status={activeIndex === 0 ? "active" : "inactive"}
                onShow={() => setActiveIndex(0)}
            >It&#39;s Nikita
            </Sharing.Panel>

            <Sharing.Panel
                title="Bocchi"
                status={activeIndex === 1 ? "active" : "inactive"}
                onShow={() => setActiveIndex(1)}
            >It&#39;s Bocchi
            </Sharing.Panel>
        </>
    }

    static Panel({title, children, status, onShow}: PanelProps) {
        
        const statePanel = (status: string, children: react.ReactNode) => {
            if(status === "active")
            {
                return <>
                    <p>{children}</p>
                </>
            } 
            else if(status === 'inactive') {
                return <>
                    <button
                        className="p-[1px] bg-slate-300"
                        onClick={onShow}
                    >Show</button>
                </>
            }
        }

        console.log(status)

        return <>
            <section className="Panel">
                <p>{title}</p>
                {statePanel(status, children)}
            </section>
        </>
    }
}

export default Sharing