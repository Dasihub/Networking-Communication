import React from "react";
import {ToastContainer} from "react-toastify";
import RouterPage from "./pages/RouterPage";
import {Navbar} from "./components";
import {AppContext} from "./config/hooks/Context";

type userTypes = {
    name: string
    id: null | number
}

const App: React.FC = () => {
    const [auth, setAuth] = React.useState<boolean>(true)
    const [user, setUser] = React.useState<userTypes>({
        name: '',
        id: null
    })

    return (
        <AppContext.Provider value={{setAuth, setUser, user}}>
            <ToastContainer/>
            <Navbar/>
            <RouterPage isAuth={auth}/>
        </AppContext.Provider>
    )
}

export default App