import React from "react";

const App: React.FC = () => {
    const [value, setValue] = React.useState<string>('')

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(pre => pre = e.target.value)
    }

    return (
        <>
            <input
                value={value}
                onChange={change}
            />
            <div>{value}</div>
        </>
    )
}

export default App