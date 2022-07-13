import React from "react";
import {NavLink} from "react-router-dom";
import {Button, Input} from "../../components";
import {useHttp} from "../../config/hooks/useHttp";
import {useMessage} from "../../config/hooks/useMessage";
import {IMessage} from "../../config/types/types";
import {AppContext} from "../../config/hooks/Context";
import './auth_page.scss'

type formState = {
    login: string
    password: string
}

interface Res extends IMessage {
    data: [{ name: string, id: number, login: string }]
    auth: boolean
}

const AuthPage: React.FC = () => {
    const message = useMessage()
    const {request, loader} = useHttp()
    const {setAuth, setUser} = React.useContext(AppContext)
    const [form, setForm] = React.useState<formState>({
        login: '',
        password: ''
    })
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const login = React.useCallback(async (e: React.FormEvent): Promise<void> => {
        try {
            e.preventDefault()
            if (form.login.length && form.password.length) {
                const res: Res = await request('/auth/login', 'POST', {login: form.login, password: form.password})
                message(res.message, res.type)
                if (res.auth) {
                    setUser ? setUser({name: res.data[0].name, id: res.data[0].id}) : null
                    setAuth ? setAuth(res.auth) : null
                    return
                }
                return
            }
            message('Заполните все поля!', 'warning')
        } catch (e) {
        }
    }, [form])

    return (
        <div className="item_auth">
            <form>
                <div className="container_auth">
                    <h1>Авторизация</h1>
                    <div>
                        <Input
                            value={form.login}
                            change={change}
                            id={'login'}
                            name={'login'}
                            type={'text'}
                            label={'Логин'}
                            placeholder={'Логин'}
                        />
                    </div>
                    <div className='eye_container'>
                        <Input
                            value={form.password}
                            change={change}
                            id={'password'}
                            name={'password'}
                            type={showPassword ? 'text' : 'password'}
                            placeholder={'Пароль'}
                            label={'Пароль'}
                        />
                        {
                            showPassword ?
                                <i className="bi bi-eye-fill" onClick={setShowPassword.bind(null, false)}/> :
                                <i className="bi bi-eye-slash-fill" onClick={setShowPassword.bind(null, true)}/>
                        }
                    </div>
                    <Button
                        type={'submit'}
                        value={'Войти'}
                        click={login}
                        loader={loader}
                    />
                    <NavLink to={'/register'}><p>Регистрация</p></NavLink>
                </div>
            </form>
        </div>
    )
}

export default AuthPage