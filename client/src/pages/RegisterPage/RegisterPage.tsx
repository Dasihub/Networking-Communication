import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Input} from "../../components";
import {useHttp} from "../../config/hooks/useHttp";
import {useMessage} from "../../config/hooks/useMessage";
import {IMessage} from "../../config/types/types";

type formState = {
    name: string
    login: string
    password: string
    password_2: string
}

interface Res extends IMessage {
    data: formState[]
    register: boolean
}

const RegisterPage: React.FC = () => {
    const message = useMessage()
    const navigate = useNavigate()
    const {request, loader} = useHttp()
    const [form, setForm] = React.useState<formState>({
        name: '',
        login: '',
        password: '',
        password_2: ''
    })

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const register = async (e: React.FormEvent): Promise<void> => {
        try {
            e.preventDefault()
            if (form.name && form.login && form.password && form.password_2) {
                if (form.password === form.password_2) {
                    const res: Res = await request('/auth/register', 'POST', {name: form.name, login: form.login, password: form.password})
                    message(res.message, res.type)
                    if (res.register) {
                        return navigate('/login')
                    }
                }
                return message('Пароли не похожи!', 'warning')
            }
            message('Заполните все поля!', 'warning')
        } catch (e) {
        }
    }

    return (
        <div className={"item_auth"}>
            <form>
                <div className={"container_auth"}>
                    <h1>Регистрация</h1>
                    <div>
                        <Input
                            value={form.name}
                            change={change}
                            id={'name'}
                            name={'name'}
                            type={'text'}
                            label={'Имя'}
                            placeholder={'Имя'}
                        />
                    </div>
                    <div>
                        <Input
                            value={form.login}
                            change={change}
                            id={'login'}
                            name={'login'}
                            type={'login'}
                            placeholder={'Логин'}
                            label={'Логин'}
                        />
                    </div>
                    <div>
                        <Input
                            value={form.password}
                            change={change}
                            id={'password'}
                            name={'password'}
                            type={'password'}
                            placeholder={'Пароль'}
                            label={'Пароль'}
                        />
                    </div>
                    <div>
                        <Input
                            value={form.password_2}
                            change={change}
                            id={'password_2'}
                            name={'password_2'}
                            type={'password'}
                            placeholder={'Повторите пароль'}
                            label={'Повторите пароль'}
                        />
                    </div>
                    <Button
                        type={'submit'}
                        value={'Зарегистрироваться'}
                        click={register}
                        loader={loader}
                    />
                    <NavLink to={'/login'}><p>Авторизация</p></NavLink>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage