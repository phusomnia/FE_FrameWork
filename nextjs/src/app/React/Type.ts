import react from "react"

type Waifu = {
    id: string | number,
    name: string
}

type WaifuListProps = {
    waifus: Waifu[]
    onChangeWaifu: (waifu: Waifu) => void
    onDeleteWaifu: (id: number | string) => void
}

type WaifuAction = {
    type: string
    waifu?: Waifu
    id?: number | string
}

type WibiAction = {
    type: string
    wibi: Waifu
}

type HeadingProps = {
    level?: string | number,
    children?: react.ReactNode
}

export type {
    Waifu,
    WaifuListProps,
    WaifuAction,
    WibiAction,
    HeadingProps
}