import React from "react";
import './loader.scss'

type props = {
    type?: 'little'
}

const Loader: React.FC<props> = ({type}) => {
    if (type) {
        return (
            <div className={"lds-dual-ring_2"}/>
        )
    }
    return (
        <div className={'container_loader'}>
            <div className={"lds-dual-ring"}/>
        </div>
)
}

export default Loader