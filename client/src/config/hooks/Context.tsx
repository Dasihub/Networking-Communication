import React from "react";

interface IContext {
    setAuth: (pre: boolean) => void
    user: {name: string, id: null | number}
    setUser: (pre: {name: string, id: null | number}) => void
}

export const AppContext = React.createContext<Partial<IContext>>({})