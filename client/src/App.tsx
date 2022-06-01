import React from "react";
import {ToastContainer} from "react-toastify";
import RouterPage from "./pages/RouterPage";
import {Navbar} from "./components";

const App: React.FC = () => {
    const [auth, setAuth] = React.useState<boolean>(true)
    return (
        <>
            <ToastContainer/>
            <Navbar/>
            <RouterPage isAuth={auth}/>
        </>
    )
}

export default App