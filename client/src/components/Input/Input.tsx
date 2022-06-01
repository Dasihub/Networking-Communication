import React from "react";
import './input.scss'

interface IProps {
    value: string,
    change: (e: React.ChangeEvent<HTMLInputElement>) => void
    id: string
    name: string
    type: 'text' | 'login' | 'password' | 'radio' | 'checkbox'
    placeholder?: string
    style?: any
    label?: string
}

const Input: React.FC<IProps> = ({value, id, name, change, style, placeholder, label, type}) => {
    return (
        <>
            <label className={'label'} htmlFor={id}>{label}</label>
            <br/>
            <input
                id={id}
                name={name}
                type={type}
                style={style}
                placeholder={placeholder}
                onChange={change}
                className={'input'}
                value={value}
            />
        </>
    )
}

export default Input