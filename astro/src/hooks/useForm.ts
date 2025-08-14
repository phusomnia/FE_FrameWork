import React from "react"

export function useForm<T extends Record<string, any>>(initialValue: T){
    const [value, setValue] = React.useState(initialValue)
    
    const handleChange = (e: any) => {
        const {name} = e.target;
        setValue((v: any) => ({
                ...v,
                [name]: e.target.value
            }
        ));
    };

    return { value, handleChange }
}