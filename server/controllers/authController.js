require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {db} = require('../db/db')
const {json} = require("express");

class AuthController {
    async login(req, res) {
        try {
            const {login, password} = req.body
            const {rows} = await db.query(`select * from user_ where login='${login}'`)
            if (!rows.length) {
                return res.status(404).json({
                    message: 'Пользователь не найден!',
                    type: 'warning',
                    data: [],
                    auth: false
                })
            }
            const isPassword = await bcrypt.compare(password, rows[0].password)
            if (!isPassword) {
                return res.status(404).json({
                    message: 'Неправильный пароль!',
                    type: 'warning',
                    data: [],
                    auth: false
                })
            }
            const token = jwt.sign({name: rows[0].name, id: rows[0].id, login: rows[0].login}, process.env.JWT, {expiresIn: '1h'})
            res.status(200).cookie('token', token, {httpOnly: true, maxAge: 604800}).json({
                message: 'Авторизация прошла успешно!',
                type: 'success',
                data: [{
                    name: rows[0].name,
                    id: rows[0].id,
                    login: rows[0].login
                }],
                auth: true
            })
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
                auth: false
            })
        }
    }

    async register(req, res) {
        try {
            const {name, login, password} = req.body
            const {rows} = await db.query(`select * from user_ where login='${login}'`)
            if (rows.length) {
                return res.status(303).json({
                    message: 'Пользователь с таким логином уже существует!',
                    type: 'warning',
                    data: [],
                    register: false
                })
            }
            const hashPassword = await bcrypt.hash(password, 10)
            await db.query(`insert into user_ (name, login, password) values ('${name}', '${login}', '${hashPassword}')`)
            res.status(201).json({
                message: 'Регистрация прошла успешно!',
                type: 'success',
                data: [],
                register: true
            })
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
                register: false
            })
        }
    }

    async check(req, res) {
        try {
            const {token} = req.cookies
            if (!token) {
                res.status(200).json({
                    message: 'Вы еще не авторизованы!',
                    type: 'info',
                    data: [],
                    auth: false
                })
            }
            const decryptToken = jwt.verify(token, process.env.JWT)
            res.status(200).json({
                message: 'Вы авторизованы!',
                type: 'error',
                data: [{
                    name: decryptToken.name,
                    id: decryptToken.id,
                    login: decryptToken.login
                }],
                auth: true
            })
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
                auth: false
            })
        }
    }

    async logout(req, res) {
        try {
            res.status(200).clearCookie('token').json({
                message: 'Вы успешно вышли!',
                type: 'info',
                data: [],
                logout: true
            })
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
                logout: false
            })
        }
    }
}

module.exports = new AuthController()