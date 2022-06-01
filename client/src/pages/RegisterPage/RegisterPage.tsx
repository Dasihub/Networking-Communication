import React from "react";
import {NavLink} from "react-router-dom";
import {Button, Input} from "../../components";
import {useHttp} from "../../config/hooks/useHttp";
import {useMessage} from "../../config/hooks/useMessage";

type formState = {
    name: string
    login: string
    password: string
    password_2: string
}

const RegisterPage: React.FC = () => {
    const [form, setForm] = React.useState<formState>({
        name: '',
        login: '',
        password: '',
        password_2: ''
    })

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
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
                            value={form.password}
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
                        click={() => {}}
                    />
                    <NavLink to={'/login'}><p>Авторизация</p></NavLink>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage