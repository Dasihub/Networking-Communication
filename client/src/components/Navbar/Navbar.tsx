import React from "react";
import {Logo} from "../../img";
import {useHttp} from "../../config/hooks/useHttp";
import {useMessage} from "../../config/hooks/useMessage";
import {Loader} from "../index";
import {IMessage} from "../../config/types/types";
import {AppContext} from "../../config/hooks/Context";
import './navbar.scss'

interface IRes extends IMessage {
    logout: boolean
    data: []
}

const Navbar: React.FC = () => {
    const message = useMessage()
    const {request, loader} = useHttp()
    const {user, setAuth, auth} = React.useContext(AppContext)

    const logout = async () => {
        try {
            const res: IRes = await request('/auth/logout')
            message(res.message, res.type)
            if (res.logout) {
                setAuth ? setAuth(false) : null
            }
        } catch (e) {
        }
    }

    return (
        <>
            {
                loader &&
                <Loader/>
            }
            <div className={'container_navbar'}>
                <div className="logo">
                    <div>
                        <img src={Logo} alt="logo"/>
                    </div>
                    <div>Networking-Communication</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center'}}>
                    {
                        auth &&
                        <>
                            <div className="user">{user?.name}</div>
                            <div>
                                <i onClick={logout} className="bi bi-box-arrow-right"/>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar