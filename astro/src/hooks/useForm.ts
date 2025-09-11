import React from "react"

type Rule = 
    | { required   : string }
    | { pattern   : RegExp; message: string }
    | { minLength : number; message: string }
    | { maxLength : number; message: string };

type FieldConfig = {
    rules?: Rule[];
}

type FieldConfigs<T> = Partial<Record<keyof T, FieldConfig>>;

export function useForm<T extends Record<string, any>>(
    initialValue: T, 
    configs?: FieldConfigs<T>
)
{
    const [value, setValue] = React.useState<T>(initialValue)
    const [errors, setErrors] = React.useState<Partial<Record<keyof T, string | undefined>>>({})
    
    const fieldConfigs = React.useRef<FieldConfigs<T>>(configs || {});

    const validate = (name: keyof T) => {        
        return {
            name, 
            value: value[name],
            onChange: handleChange
        }
    }
    
    const validateField = (name: string, fieldValue: any): string | undefined => {
        const config = fieldConfigs.current[name];
        
        if (!config?.rules) return
        
        for (const rule of config.rules)
        {
            if ("required" in rule && !fieldValue)
            {
                return rule.required;
            }
            if ("pattern" in rule && !rule.pattern.test(fieldValue))
            {
                return rule.message;
            }
            if ("minLength" in rule && fieldValue.length < rule.minLength) 
            {
                return rule.message;
            }
            if ("maxLength" in rule && fieldValue.length > rule.maxLength) 
            {
                return rule.message;
            }
            return undefined;
        }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type } = e.target;
        
        let newValue: any;
        switch (type)
        {
            case "checkbox":
                newValue = (e.target as HTMLInputElement).checked;
                break;
            case "file":
                newValue = (e.target as HTMLInputElement).files;
                break;
            default:
                newValue = e.target.value;
        }
        
        setValue((prev) => {
            const updated = {
                ...prev, 
                [name]: newValue
            };

            // -- sync error --
            // const errorMsg = validateField(name, newValue);
            // setErrors((prevErrors) => ({
            //     ...prevErrors,
            //     [name]: errorMsg
            // }))
            
            return updated
        });
    };
    
    const validateAll = () => {
        const newErrors: Partial<Record<keyof T, string>> = {};
        for (const key in value) {
            const msg = validateField(key, value[key]);
            if (msg) newErrors[key] = msg;
        }
        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = (cb: (values: T) => void) => (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault();
        const errs = validateAll();
        if (Object.keys(errs).length === 0) {
            cb(value);
        }
    }

    return { value, handleChange, handleSubmit, validate, errors };
}