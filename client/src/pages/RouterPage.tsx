import React from "react";
import {Routes, Navigate, Route} from 'react-router-dom'
import RegisterPage from "./RegisterPage/RegisterPage";
import AuthPage from "./AuthPage/AuthPage";
import HomePage from "./HomePage/HomePage";

type props = {
    isAuth: boolean
}

const RouterPage: React.FC<props> = ({isAuth}) => {
    if (isAuth) {
        return (
            <Routes>
                <Route path={'/home'} element={<HomePage/>}/>
                <Route path={'/register'} element={<Navigate replace to={'/home'}/>}/>
                <Route path={'/login'} element={<Navigate replace to={'/home'}/>}/>
                <Route path={'/'} element={<Navigate replace to={'/login'}/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path={'/login'} element={<AuthPage/>}/>
            <Route path={'/register'} element={<RegisterPage/>}/>
            <Route path={'/home'} element={<Navigate replace to={'/login'}/>}/>
            <Route path={'/'} element={<Navigate replace to={'/login'}/>}/>
        </Routes>
    )
}

export default RouterPage