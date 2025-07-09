import React from "react";
import makeine from "../../../public/makeine.jpg"

class CurlyBrace 
{
    /*
    * Passing string with quotes
    * */
    static Avatar()
    {
        const avatar = "https://cdn.rafled.com/anime-icons/images/b568b6896007aba68ad174c968158496084bcd88fd350400c69d59dad5e69f72.jpg";
        const des = "Makima";
        return <>   
            <img
                className="rounded-full w-[100px] h-[100px]"
                src={avatar}
                alt={des}
            />
        </>
    }

    static formatDate(date: Date)
    {
        return new Intl.DateTimeFormat(
            'vi-VN',
            { weekday: 'long'}
        ).format(date);
    }

    static Label()
    {
        const today = new Date();
        return <>
            <h1>Touhout project: {CurlyBrace.formatDate(today)}</h1>
        </>
    }

    static doubleCur()
    {
        const ava = {
            url: makeine,
            theme: {
                color: "pink",
                background: "cyan",
                display: "inline-block",
                borderRadius: "10px",
                width: "300px"
            }
        }

        return <>
            <img
            style={ava.theme}
            src={ava.url.src}
            ></img>
        </>
    }
}

export default CurlyBrace;