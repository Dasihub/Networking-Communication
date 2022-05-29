const {db} = require('../db/db')

class WorkingController {
    async getWorking(req, res) {
        try {
            const {id_user} = req.params
            const {rows} = await db.query(`select * from working where id_user=${id_user}`)
            res.status(200).json({
                message: 'Данные успешно получены!',
                type: 'success',
                data: rows,
            })
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
            })
        }
    }

    async addWorking(req, res) {
        try {
            const {id_user, title, description, link_url} = req.body
            const {rows} = await db.query(`insert into working (title, description, link_url, id_user) values ('${title}', '${description}', '${link_url}', ${id_user})`)
            res.status(201).json({
                message: 'Данные успешно созданы!',
                type: 'success',
                data: rows,
            })
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
            })
        }
    }

    async editWorking(req, res) {
        try {
            const {id_working, title, description, link_url} = req.body
            const {rows} = await db.query(`update working set title='${title}', description='${description}', link_url='${link_url}' where id=${id_working}`)
            res.status(200).json({
                message: 'Данные успешно изменено!',
                type: 'success',
                data: rows,
            })
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
            })
        }
    }

    async deleteWorking(req, res) {
        try {
            const {id_working} = req.params
            const {rows} = await db.query(`delete from working where id=${id_working}`)
            res.status(200).json({
                message: 'Данные успешно удалено!',
                type: 'success',
                data: rows,
            })
        } catch (e) {
            res.status(501).json({
                message: 'Ошибка в сервере!',
                type: 'error',
                data: [],
            })
        }
    }
}

module.exports = new WorkingController()