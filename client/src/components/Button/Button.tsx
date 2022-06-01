import React from "react";
import {Loader} from "../index";
import './button.scss'

interface IProps {
    value: string
    click: () => void
    loader?: boolean
    disabled?: boolean
    width?: string
    type?: 'button' | 'submit'
}

const Button: React.FC<IProps> = ({value, disabled , loader, width, click, type}) => {
    return (
        <button
            type={type}
            className="btn"
            style={{width}}
            disabled={disabled}
            onClick={click}
        >
            {
                loader ?
                    <Loader type={'little'}/>
                    : value
            }
        </button>
    )
}

export default Button