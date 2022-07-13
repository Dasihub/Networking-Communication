import React from "react";
import {ToastContainer} from "react-toastify";
import RouterPage from "./pages/RouterPage";
import {Loader, Navbar} from "./components";
import {AppContext} from "./config/hooks/Context";
import {useMessage} from "./config/hooks/useMessage";
import {useHttp} from "./config/hooks/useHttp";
import {IMessage} from "./config/types/types";

type userTypes = {
    name: string
    id: null | number
}

interface IRes extends IMessage {
    data: {name: string, id: number, login: string}[]
    auth: boolean
}

const App: React.FC = () => {
    const message = useMessage()
    const {request} = useHttp()
    const [auth, setAuth] = React.useState<boolean>(false)
    const [user, setUser] = React.useState<userTypes>({
        name: '',
        id: null
    })
    const [loader, setLoader] = React.useState<boolean>(true)

    const check = async () => {
        try {
            const res: IRes = await request('/auth/check')
            setLoader(false)
            message(res.message, res.type)
            if (res.auth) {
                setAuth(res.auth)
                setUser({name: res.data[0].name, id: res.data[0].id})
            }
        } catch (e) {
        }
    }

    React.useEffect(() => {
        check()
    }, [])

    if (loader) {
        return (
            <Loader/>
        )
    }

    return (
        <AppContext.Provider value={{setAuth, setUser, user, auth}}>
            <ToastContainer/>
            <Navbar/>
            <RouterPage isAuth={auth}/>
        </AppContext.Provider>
    )
}

export default App